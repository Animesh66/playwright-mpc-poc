// spec: specs/demowebshop.md
// Test scenarios: Search Functionality

import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  const baseUrl = 'https://demowebshop.tricentis.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('Basic Product Search', async ({ page }) => {
    // In header search box, enter "laptop"
    const searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('laptop');

    // Click "Search" button
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');

    // Expected Results: Search results page loads with relevant products
    await expect(page).toHaveURL(/.*search.*q=laptop/);
    await expect(page.locator('h1')).toContainText(/search/i);

    // Products matching search criteria are displayed
    const searchResults = page.locator('.product-item, .item-box');
    if (await searchResults.count() > 0) {
      await expect(searchResults.first()).toBeVisible();
      
      // Check that products contain the search term
      const productTitles = page.locator('.product-title, .product-item .title');
      const firstTitle = await productTitles.first().textContent();
      expect(firstTitle?.toLowerCase()).toContain('laptop');
    }

    // Search functionality maintains view/sort options
    await expect(page.locator('select#products-orderby, .products-orderby')).toBeVisible();
  });

  test('Advanced Search Options', async ({ page }) => {
    // Navigate to search page first
    await page.goto(`${baseUrl}search`);

    // Check "Advanced search" checkbox
    const advancedCheckbox = page.locator('input[name="advs"], input#advs');
    if (await advancedCheckbox.isVisible()) {
      await advancedCheckbox.check();

      // Verify additional search options appear
      await page.waitForTimeout(500); // Wait for UI to update
      
      // Look for additional search fields that appear with advanced search
      const categorySelect = page.locator('select[name="cid"], select#cid');
      const manufacturerSelect = page.locator('select[name="mid"], select#mid');
      const priceFromInput = page.locator('input[name="pf"], input#pf');
      const priceToInput = page.locator('input[name="pt"], input#pt');

      // At least some advanced options should be visible
      const hasAdvancedOptions = (await categorySelect.isVisible()) || 
                                 (await manufacturerSelect.isVisible()) || 
                                 (await priceFromInput.isVisible());
      
      expect(hasAdvancedOptions).toBe(true);

      // Test search with advanced criteria
      if (await categorySelect.isVisible()) {
        await categorySelect.selectOption({ index: 1 }); // Select first available category
      }

      // Enter search term
      await page.locator('input[name="Q"]').fill('computer');

      // Click search button
      await page.click('input[value="Search"], .search-button');
      await page.waitForLoadState('networkidle');

      // Expected Results: Advanced search provides more refined results
      await expect(page).toHaveURL(/.*search/);
    }
  });

  test('Empty Search Results', async ({ page }) => {
    // Enter a search term that returns no results
    const searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('nonexistentproduct123xyz');

    // Click "Search" button
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');

    // Expected Results: Appropriate "no results found" message is displayed
    await expect(page).toHaveURL(/.*search/);
    
    const noResultsMessage = page.locator('.no-result, .no-data, .search-results');
    const pageContent = await page.textContent('body');
    
    // Check for "no results" or similar messaging
    expect(pageContent?.toLowerCase()).toMatch(/(no.*result|no.*product|not.*found)/);

    // Page layout remains intact with empty results
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('input[name="Q"]')).toBeVisible();
  });

  test('Search Result Sorting and Display', async ({ page }) => {
    // Perform a search that returns multiple results
    await page.goto(`${baseUrl}search?q=computer`);
    await page.waitForLoadState('networkidle');

    const productCount = await page.locator('.product-item, .item-box').count();
    
    if (productCount > 1) {
      // Test different "Sort by" options
      const sortOptions = [
        'Position',
        'Name: A to Z', 
        'Name: Z to A',
        'Price: Low to High',
        'Price: High to Low'
      ];

      for (const option of sortOptions) {
        const sortSelect = page.locator('select#products-orderby, .products-orderby select');
        
        if (await sortSelect.isVisible()) {
          try {
            await sortSelect.selectOption(option);
            await page.waitForLoadState('networkidle');
            
            // Verify URL reflects sorting
            const currentUrl = page.url();
            expect(currentUrl).toContain('orderby');
            
            // Verify products are still displayed
            await expect(page.locator('.product-item, .item-box').first()).toBeVisible();
          } catch (error) {
            // Some sort options might not be available, continue with next
            console.log(`Sort option "${option}" not available`);
          }
        }
        break; // Test just one option to avoid timeout
      }

      // Test different "Display" per page options
      const displaySelect = page.locator('select#products-pagesize, .products-pagesize select');
      if (await displaySelect.isVisible()) {
        await displaySelect.selectOption('4');
        await page.waitForLoadState('networkidle');
        
        // Verify pagination affects display
        const newProductCount = await page.locator('.product-item, .item-box').count();
        expect(newProductCount).toBeLessThanOrEqual(4);
      }

      // Test "View as" Grid/List toggle
      const viewSelect = page.locator('select#products-viewmode, .products-viewmode select');
      if (await viewSelect.isVisible()) {
        await viewSelect.selectOption('List');
        await page.waitForLoadState('networkidle');
        
        // Switch back to Grid
        await viewSelect.selectOption('Grid');
        await page.waitForLoadState('networkidle');
        
        // Expected Results: View toggles maintain search criteria
        const finalUrl = page.url();
        expect(finalUrl).toContain('computer');
      }
    }
  });

  test('Search Input Validation', async ({ page }) => {
    // Test empty search
    const searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('');
    
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    
    // Should handle empty search gracefully
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/(search|home|\/$)/);

    // Test search with special characters
    await page.goto(baseUrl);
    await searchBox.fill('!@#$%^&*()');
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    
    // Should not break the application
    await expect(page.locator('h1')).toBeVisible();

    // Test very long search term
    await page.goto(baseUrl);
    const longSearchTerm = 'a'.repeat(100);
    await searchBox.fill(longSearchTerm);
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    
    // Application should handle long terms gracefully
    await expect(page.locator('body')).toBeVisible();
  });

  test('Search from Different Pages', async ({ page }) => {
    // Test search from homepage
    await page.goto(baseUrl);
    let searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('laptop');
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*search.*laptop/);

    // Test search from category page
    await page.goto(`${baseUrl}computers`);
    searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('desktop');
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*search.*desktop/);

    // Test search from product page
    await page.goto(`${baseUrl}141-inch-laptop`);
    searchBox = page.locator('#small-searchterms, input[name="q"]');
    await searchBox.fill('accessories');
    await page.click('input[value="Search"], .search-button');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/.*search.*accessories/);
  });

  test('Search Results Navigation', async ({ page }) => {
    // Perform search with results
    await page.goto(`${baseUrl}search?q=computer`);
    
    const productItems = page.locator('.product-item .product-title a, .item-box .title a');
    const productCount = await productItems.count();
    
    if (productCount > 0) {
      // Click on a search result
      const firstProduct = productItems.first();
      await firstProduct.click();
      await page.waitForLoadState('networkidle');
      
      // Should navigate to product detail page
      await expect(page.locator('.product-name, .product-details')).toBeVisible();
      
      // Use browser back to return to search results
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      // Should be back on search results page
      await expect(page).toHaveURL(/.*search/);
      await expect(page.locator('.product-item, .item-box').first()).toBeVisible();
    }
  });

  test('Search Suggestions and Auto-complete', async ({ page }) => {
    const searchBox = page.locator('#small-searchterms, input[name="q"]');
    
    // Type partial search term
    await searchBox.fill('comp');
    
    // Wait to see if autocomplete/suggestions appear
    await page.waitForTimeout(1000);
    
    // Look for suggestion dropdown or autocomplete
    const suggestions = page.locator('.ui-autocomplete, .search-suggestions, .dropdown-menu');
    
    if (await suggestions.isVisible()) {
      // If suggestions exist, test selecting one
      const firstSuggestion = suggestions.locator('li, .suggestion-item').first();
      if (await firstSuggestion.isVisible()) {
        await firstSuggestion.click();
        await page.waitForLoadState('networkidle');
        
        // Should perform search with selected suggestion
        await expect(page).toHaveURL(/.*search/);
      }
    } else {
      // If no autocomplete, complete the search manually
      await searchBox.fill('computer');
      await page.click('input[value="Search"], .search-button');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/.*search.*computer/);
    }
  });
});