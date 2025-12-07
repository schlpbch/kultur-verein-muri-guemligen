# Convert all images in src/content/events to WebP format
# Requires: ImageMagick (https://imagemagick.org/) or install via: winget install ImageMagick.ImageMagick

param(
    [string]$SourceDir = "src/content/events",
    [int]$Quality = 85,
    [switch]$DeleteOriginals = $false
)

$ErrorActionPreference = "Stop"

# Check if ImageMagick is installed
$magick = Get-Command magick -ErrorAction SilentlyContinue
if (-not $magick) {
    Write-Host "ImageMagick not found. Install it with:" -ForegroundColor Red
    Write-Host "  winget install ImageMagick.ImageMagick" -ForegroundColor Yellow
    Write-Host "Or download from: https://imagemagick.org/script/download.php" -ForegroundColor Yellow
    exit 1
}

Write-Host "Converting images to WebP format..." -ForegroundColor Cyan
Write-Host "Source directory: $SourceDir" -ForegroundColor Gray
Write-Host "Quality: $Quality" -ForegroundColor Gray
Write-Host ""

# Find all image files (jpg, jpeg, png, gif)
$images = Get-ChildItem -Path $SourceDir -Recurse -Include "*.jpg", "*.jpeg", "*.png", "*.gif" -File

if ($images.Count -eq 0) {
    Write-Host "No images found to convert." -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($images.Count) image(s) to convert:" -ForegroundColor Green

$converted = 0
$skipped = 0
$failed = 0

foreach ($image in $images) {
    $webpPath = [System.IO.Path]::ChangeExtension($image.FullName, ".webp")
    $relativePath = $image.FullName.Replace((Get-Location).Path + "\", "")
    
    # Skip if WebP already exists
    if (Test-Path $webpPath) {
        Write-Host "  SKIP: $relativePath (WebP exists)" -ForegroundColor Gray
        $skipped++
        continue
    }
    
    try {
        # Convert to WebP
        & magick $image.FullName -quality $Quality $webpPath
        
        $originalSize = [math]::Round($image.Length / 1KB, 1)
        $webpSize = [math]::Round((Get-Item $webpPath).Length / 1KB, 1)
        $savings = [math]::Round((1 - ($webpSize / $originalSize)) * 100, 1)
        
        Write-Host "  OK: $relativePath -> .webp ($originalSize KB -> $webpSize KB, -$savings%)" -ForegroundColor Green
        
        if ($DeleteOriginals) {
            Remove-Item $image.FullName
            Write-Host "      Deleted original" -ForegroundColor DarkGray
        }
        
        $converted++
    }
    catch {
        Write-Host "  FAIL: $relativePath - $($_.Exception.Message)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Converted: $converted" -ForegroundColor Green
Write-Host "  Skipped: $skipped" -ForegroundColor Gray
Write-Host "  Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Gray" })

if ($converted -gt 0 -and -not $DeleteOriginals) {
    Write-Host ""
    Write-Host "Note: Original files kept. Run with -DeleteOriginals to remove them." -ForegroundColor Yellow
    Write-Host "After converting, update your markdown files to reference .webp instead of .jpg/.png" -ForegroundColor Yellow
}
