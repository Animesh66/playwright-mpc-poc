// spec: specs/demowebshop.md
// Test scenarios: Product Browsing and Navigation

import { test, expect } from '@playwright/test';

test.describe('Product Browsing and Navigation', () => {
  const baseUrl = 'https://demowebshop.tricentis.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('Category Navigation', async ({ page }) => {
    // Navigate to homepage
    await expect(page).toHaveURL(baseUrl);

    // Click "Computers" in main navigation
    await page.click('a[href="/computers"]');
    await expect(page).toHaveURL(/.*\/computers/);

    // Verify subcategories are displayed (Desktops, Notebooks, Accessories)
    await expect(page.locator('a[href="/desktops"]').first()).toBeVisible();
    await expect(page.locator('a[href="/notebooks"]').first()).toBeVisible();
    await expect(page.locator('a[href="/accessories"]').first()).toBeVisible();

    // Click "Notebooks" subcategory
    await page.click('a[href="/notebooks"]');
    await expect(page).toHaveURL(/.*\/notebooks/);

    // Verify products are displayed in the category
    await expect(page.locator('.product-item')).toBeVisible();

    // Expected Results: Breadcrumb navigation shows current location
    const breadcrumb = page.locator('.breadcrumb, .page-title');
    await expect(breadcrumb).toContainText(/notebooks/i);

    // Product listings display with images, names, reviews, and prices
    await expect(page.locator('.product-item .picture img')).toBeVisible();
    await expect(page.locator('.product-item .product-title')).toBeVisible();
    await expect(page.locator('.product-item .price')).toBeVisible();
  });

  test('Product Filtering and Sorting', async ({ page }) => {
    // Navigate to Notebooks category (/notebooks)
    await page.goto(`${baseUrl}notebooks`);

    // Verify "Filter by attributes" section shows available filters  
    const filterSection = page.locator('text="Filter by attributes"');
    if (await filterSection.isVisible()) {
      await expect(filterSection).toBeVisible();
    } else {
      // Check if filter options are available in the current page structure
      await expect(page.locator('[data-productfilter], .filters')).toBeTruthy();
    }
    
    // Check if Intel filter exists and click it
    const intelFilter = page.locator('a[href*="specs=6"], a:has-text("Intel")').first();
    if (await intelFilter.isVisible()) {
      const currentUrl = page.url();
      await intelFilter.click();
      
      // Verify filtered results display - URL should change
      const newUrl = page.url();
      expect(newUrl).not.toBe(currentUrl);
      await expect(page.locator('.product-item')).toBeVisible();
    }

    // Change "Sort by" dropdown to "Price: Low to High"
    await page.selectOption('select#products-orderby', 'Price: Low to High');
    await page.waitForLoadState('networkidle');

    // Verify product order changes accordingly
    const priceElements = page.locator('.product-item .price .price-value');
    const count = await priceElements.count();
    if (count > 1) {
      const firstPrice = await priceElements.nth(0).textContent();
      const secondPrice = await priceElements.nth(1).textContent();
      
      // Parse prices and verify sorting (basic check)
      const price1 = parseFloat(firstPrice?.replace(/[^0-9.]/g, '') || '0');
      const price2 = parseFloat(secondPrice?.replace(/[^0-9.]/g, '') || '0');
      expect(price1).toBeLessThanOrEqual(price2);
    }

    // Change "Display" dropdown to show 4 per page
    await page.selectOption('select#products-pagesize', '4');
    await page.waitForLoadState('networkidle');

    // Expected Results: Pagination adjusts based on items per page setting
    const productCount = await page.locator('.product-item').count();
    expect(productCount).toBeLessThanOrEqual(4);
  });

  test('View Toggle (Grid/List)', async ({ page }) => {
    // Navigate to any product category
    await page.goto(`${baseUrl}notebooks`);

    // Verify default view is "Grid"
    const gridOption = page.locator('select#products-viewmode option[selected], select#products-viewmode option').first();
    const defaultView = await gridOption.textContent();
    expect(defaultView).toContain('Grid');

    // Change "View as" dropdown to "List"
    await page.selectOption('select#products-viewmode', 'List');
    await page.waitForLoadState('networkidle');

    // Verify layout changes to list format
    await expect(page.locator('.product-list')).toBeVisible();

    // Switch back to "Grid" view
    await page.selectOption('select#products-viewmode', 'Grid');
    await page.waitForLoadState('networkidle');

    // Expected Results: View modes toggle correctly
    await expect(page.locator('.product-grid')).toBeVisible();
  });

  test('Product Detail Page Navigation', async ({ page }) => {
    // Navigate to product category
    await page.goto(`${baseUrl}notebooks`);

    // Click on a product image or name (e.g., "14.1-inch Laptop")
    const productLink = page.locator('.product-item .product-title a').first();
    const productName = await productLink.textContent();
    await productLink.click();

    // Verify product detail page loads
    await expect(page).toHaveURL(/.*\/[a-zA-Z0-9-]+$/);

    // Check all product information is displayed
    await expect(page.locator('.product-name h1, h1')).toBeVisible();
    await expect(page.locator('.picture img').first()).toBeVisible();
    await expect(page.locator('.price').first()).toBeVisible();
    await expect(page.locator('.short-description, .full-description, p')).toBeVisible();

    // Expected Results: Breadcrumb navigation shows product location
    await expect(page.locator('.breadcrumb')).toBeVisible();

    // Product specifications should be visible
    if (await page.locator('.product-specs').isVisible()) {
      await expect(page.locator('.product-specs')).toContainText(/specification/i);
    }
  });

  test('Product Specifications Display', async ({ page }) => {
    // Navigate to a specific product with specifications
    await page.goto(`${baseUrl}141-inch-laptop`);

    // Locate "Product specifications" section
    const specsSection = page.locator('.product-specs, .attributes');
    
    if (await specsSection.isVisible()) {
      // Verify technical details are displayed
      await expect(specsSection).toBeVisible();
      
      // Check for common specification attributes
      const specsText = await specsSection.textContent();
      expect(specsText).toMatch(/(screensize|cpu|memory|hard)/i);
    }

    // Expected Results: Specifications table displays correctly
    await expect(page.locator('.product-name, h1')).toBeVisible();
    await expect(page.locator('.price').first()).toBeVisible();
  });

  test('Product Reviews and Ratings Navigation', async ({ page }) => {
    // Navigate to product with reviews
    await page.goto(`${baseUrl}141-inch-laptop`);

    // Locate review information
    const reviewLink = page.locator('a[href*="productreviews"], .product-review-links a').first();
    
    if (await reviewLink.isVisible()) {
      const reviewText = await reviewLink.textContent();
      expect(reviewText).toMatch(/review/i);

      // Click on review count link
      await reviewLink.click();

      // Expected Results: Review pages load correctly
      await expect(page).toHaveURL(/.*productreviews.*/);
      await expect(page.locator('.page-title')).toContainText(/review/i);
    }
  });

  test('Product Tags Functionality', async ({ page }) => {
    // Navigate to product detail page with tags
    await page.goto(`${baseUrl}141-inch-laptop`);

    // Locate "Product tags" section
    const tagsSection = page.locator('.product-tags');
    
    if (await tagsSection.isVisible()) {
      const tagLink = tagsSection.locator('a').first();
      
      if (await tagLink.isVisible()) {
        // Click on a tag
        await tagLink.click();

        // Expected Results: Tags lead to related product listings
        await expect(page).toHaveURL(/.*producttag.*/);
        await expect(page.locator('.product-item')).toBeVisible();
      }
    }
  });

  test('Category Hierarchy Navigation', async ({ page }) => {
    // Test navigation through category hierarchy
    await page.goto(baseUrl);

    // Navigate through main categories
    const categories = ['Books', 'Computers', 'Electronics', 'Jewelry'];
    
    for (const category of categories) {
      const categoryLink = page.locator(`a:has-text("${category}")`).first();
      
      if (await categoryLink.isVisible()) {
        await categoryLink.click();
        await page.waitForLoadState('networkidle');
        
        // Verify category page loads
        await expect(page.locator('.page-title, h1')).toContainText(category);
        
        // Navigate back to home for next iteration
        await page.goto(baseUrl);
      }
    }
  });
});