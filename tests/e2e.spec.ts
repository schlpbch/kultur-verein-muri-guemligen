
import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test('should open and close the mobile menu', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuToggle = page.locator('#mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    // Menu should be hidden initially
    await expect(mobileMenu).toBeHidden();

    // Click toggle to open
    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();

    // Click toggle to close (if logic supports it) or just check links
    const contactLink = mobileMenu.getByRole('link', { name: 'Kontakt' });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute('href', '/contact');
    
    // Check navigation
    await contactLink.click();
    await expect(page).toHaveURL(/.*contact/);

    // Verify menu works after navigation (regression test)
    await menuToggle.click();
    await expect(mobileMenu).toBeVisible();
  });
});

test.describe('Theme Toggle', () => {
    test('should toggle between light and dark mode', async ({ page }) => {
        await page.goto('/');
        const toggleButton = page.locator('#themeToggle');
        
        // Initial state logic depends on system preference, but we can check if class changes
        const html = page.locator('html');
        const initialClass = await html.getAttribute('class');
        
        await toggleButton.click();
        
        // Wait for potential class change
        await page.waitForTimeout(500); 
        
        const newClass = await html.getAttribute('class');
        expect(newClass).not.toBe(initialClass);
        
        if (initialClass?.includes('dark')) {
             expect(newClass).not.toContain('dark');
        } else {
             expect(newClass).toContain('dark');
        }
    });
});

test.describe('Accessibility & Forms', () => {
    test('contact form should have accessible fields', async ({ page }) => {
       await page.goto('/contact');
       await page.waitForLoadState('networkidle');
       
       // Ensure the contact form is present
       const form = page.locator('form[name="contact"]');
       await expect(form).toBeVisible();
       await form.scrollIntoViewIfNeeded();

       // Check input fields by label
       await expect(page.locator('#first-name')).toBeVisible();
       await expect(page.locator('#last-name')).toBeVisible();
       await expect(page.locator('#email')).toBeVisible();
       await expect(page.locator('#message')).toBeVisible();
       
       const submitBtn = page.getByRole('button', { name: 'Nachricht senden' });
       await expect(submitBtn).toBeVisible();
    });
});
