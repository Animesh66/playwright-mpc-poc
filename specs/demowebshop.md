# DemoWebShop.tricentis.com - Comprehensive Test Plan

## Application Overview

The Tricentis DemoWebShop is a fully-featured e-commerce demonstration website built on the nopCommerce platform. The application provides a comprehensive online shopping experience with the following key features:

- **Product Management**: Multiple product categories (Books, Computers, Electronics, Apparel & Shoes, Digital downloads, Jewelry, Gift Cards) with hierarchical navigation
- **User Account Management**: Registration, login, customer profiles, order history, and address management
- **Shopping Experience**: Product browsing, detailed product views, search functionality, shopping cart, wishlist, and product comparison
- **Checkout Process**: Multi-step checkout with shipping estimation, discount codes, gift cards, and terms acceptance
- **Content Features**: Newsletter subscription, community poll, recently viewed products, product reviews and ratings
- **Information Pages**: Contact form, about us, shipping & returns, privacy policy, conditions of use
- **Social Integration**: Links to Facebook, Twitter, YouTube, Google+, and RSS feeds

The site demonstrates typical e-commerce workflows with realistic product catalogs, pricing, customer reviews, and business functionality including manufacturers (Tricentis) and product tagging systems.

## Test Scenarios

### 1. User Registration and Account Management

**Seed:** `tests/registration.spec.ts`

#### 1.1 Valid User Registration
**Steps:**
1. Navigate to the homepage (https://demowebshop.tricentis.com/)
2. Click "Register" link in the header
3. Select gender (Male or Female)
4. Enter valid first name "John"
5. Enter valid last name "Doe"
6. Enter valid email "john.doe@example.com"
7. Enter valid password "Password123!"
8. Enter matching confirm password "Password123!"
9. Click "Register" button

**Expected Results:**
- User is successfully registered
- User is redirected to registration success page or logged in automatically
- User can access account-specific features

#### 1.2 Registration with Missing Required Fields
**Steps:**
1. Navigate to registration page
2. Leave first name field empty
3. Enter last name "Doe"
4. Enter email "test@example.com"
5. Enter password "Password123!"
6. Enter confirm password "Password123!"
7. Click "Register" button

**Expected Results:**
- Registration fails with appropriate error message
- Required field validation error displayed for first name
- User remains on registration page

#### 1.3 Registration with Mismatched Passwords
**Steps:**
1. Navigate to registration page
2. Fill in all required fields correctly
3. Enter password "Password123!"
4. Enter confirm password "DifferentPassword!"
5. Click "Register" button

**Expected Results:**
- Registration fails with password mismatch error
- User remains on registration page
- Error message clearly indicates password confirmation issue

#### 1.4 Registration with Invalid Email Format
**Steps:**
1. Navigate to registration page
2. Fill in personal details correctly
3. Enter invalid email "invalid-email-format"
4. Enter valid passwords
5. Click "Register" button

**Expected Results:**
- Registration fails with email format validation error
- User remains on registration page
- Error message indicates proper email format required

### 2. User Authentication

**Seed:** `tests/login.spec.ts`

#### 2.1 Valid User Login
**Steps:**
1. Navigate to homepage
2. Click "Log in" link in header
3. Enter valid email in "Email" field
4. Enter valid password in "Password" field
5. Click "Log in" button

**Expected Results:**
- User is successfully logged in
- Header shows logged-in user state (user account links)
- User is redirected to homepage or account dashboard

#### 2.2 Login with Invalid Credentials
**Steps:**
1. Navigate to login page
2. Enter invalid email "nonexistent@example.com"
3. Enter any password "wrongpassword"
4. Click "Log in" button

**Expected Results:**
- Login fails with appropriate error message
- User remains on login page
- No access to authenticated features granted

#### 2.3 Login with Empty Fields
**Steps:**
1. Navigate to login page
2. Leave email field empty
3. Leave password field empty
4. Click "Log in" button

**Expected Results:**
- Login fails with validation errors
- Required field error messages displayed
- User remains on login page

#### 2.4 Remember Me Functionality
**Steps:**
1. Navigate to login page
2. Enter valid credentials
3. Check "Remember me?" checkbox
4. Click "Log in" button
5. Close browser and reopen
6. Navigate back to the website

**Expected Results:**
- User remains logged in after browser restart
- Session persistence maintained
- User account features accessible

#### 2.5 Password Recovery
**Steps:**
1. Navigate to login page
2. Click "Forgot password?" link
3. Enter registered email address
4. Submit password recovery request

**Expected Results:**
- Password recovery process initiated
- Confirmation message displayed
- User redirected appropriately (Note: Email functionality may be limited in demo)

### 3. Product Browsing and Navigation

#### 3.1 Category Navigation
**Steps:**
1. Navigate to homepage
2. Click "Computers" in main navigation
3. Verify subcategories are displayed (Desktops, Notebooks, Accessories)
4. Click "Notebooks" subcategory
5. Verify products are displayed in the category

**Expected Results:**
- Category pages load correctly
- Breadcrumb navigation shows current location (Home / Computers / Notebooks)
- Product listings display with images, names, reviews, and prices
- Category hierarchy is clearly visible in sidebar

#### 3.2 Product Filtering and Sorting
**Steps:**
1. Navigate to Notebooks category (/notebooks)
2. Verify "Filter by attributes" section shows available filters
3. Click "Intel" filter under "CPU Type"
4. Verify filtered results display
5. Change "Sort by" dropdown to "Price: Low to High"
6. Verify product order changes accordingly
7. Change "Display" dropdown to show 4 per page

**Expected Results:**
- Filtering works correctly and updates product display
- URL updates to reflect applied filters
- Sorting reorders products as expected
- Pagination adjusts based on items per page setting
- Applied filters are visually indicated

#### 3.3 View Toggle (Grid/List)
**Steps:**
1. Navigate to any product category
2. Verify default view is "Grid"
3. Change "View as" dropdown to "List"
4. Verify layout changes to list format
5. Switch back to "Grid" view

**Expected Results:**
- View modes toggle correctly
- Product information remains consistent between views
- Layout adapts appropriately for each view type

### 4. Product Details and Information

#### 4.1 Product Detail Page Navigation
**Steps:**
1. Navigate to product category
2. Click on a product image or name (e.g., "14.1-inch Laptop")
3. Verify product detail page loads
4. Check all product information is displayed

**Expected Results:**
- Product detail page loads with complete information
- Product image, name, description, specifications visible
- Price, availability status, and review count displayed
- Breadcrumb navigation shows product location
- Related products ("Customers who bought this item also bought") section appears

#### 4.2 Product Specifications
**Steps:**
1. Navigate to product detail page
2. Locate "Product specifications" section
3. Verify technical details are displayed (Screensize, CPU Type, Memory, Hardrive)

**Expected Results:**
- Specifications table displays correctly
- All technical attributes are clearly labeled
- Information is accurate and formatted properly

#### 4.3 Product Reviews and Ratings
**Steps:**
1. On product detail page, locate review information
2. Click on review count link (e.g., "1461 review(s)")
3. Click "Add your review" link
4. Verify review functionality

**Expected Results:**
- Review count is clearly displayed and clickable
- Review pages load correctly
- Review submission forms are accessible
- Existing reviews are displayable (if any)

#### 4.4 Product Tags
**Steps:**
1. On product detail page, locate "Product tags" section
2. Click on a tag (e.g., "nice", "computer", "compact")
3. Verify tag functionality

**Expected Results:**
- Tags are clickable and functional
- Clicking tags leads to related product listings
- Tag numbers in parentheses indicate usage count

### 5. Shopping Cart Management

#### 5.1 Add Product to Cart
**Steps:**
1. Navigate to any product detail page
2. Verify quantity field shows default value "1"
3. Click "Add to cart" button
4. Check cart counter in header updates

**Expected Results:**
- Product is added to shopping cart
- Cart counter increments (e.g., from (1) to (2))
- Success notification may be displayed
- Cart icon/link reflects new item count

#### 5.2 View Shopping Cart
**Steps:**
1. Click "Shopping cart" link in header
2. Verify cart contents are displayed
3. Check product details, quantities, and prices

**Expected Results:**
- Shopping cart page loads with current items
- Product images, names, prices displayed correctly
- Quantity controls are functional
- Subtotal calculations are accurate
- Remove checkboxes are available for each item

#### 5.3 Update Cart Quantities
**Steps:**
1. In shopping cart, locate quantity textbox for a product
2. Change quantity from "1" to "3"
3. Click "Update shopping cart" button
4. Verify price calculations update

**Expected Results:**
- Quantity updates correctly
- Total price recalculates automatically
- Subtotal reflects new quantity
- Shipping and tax calculations adjust if applicable

#### 5.4 Remove Items from Cart
**Steps:**
1. In shopping cart, check the remove checkbox for an item
2. Click "Update shopping cart" button
3. Verify item is removed from cart

**Expected Results:**
- Checked items are removed from cart
- Cart totals update accordingly
- Cart counter in header decreases
- Empty cart message displays if no items remain

#### 5.5 Apply Discount Codes
**Steps:**
1. In shopping cart, locate "Discount Code" section
2. Enter a test discount code in the textbox
3. Click "Apply coupon" button
4. Verify system response

**Expected Results:**
- Valid codes apply discounts correctly
- Invalid codes show appropriate error messages
- Cart totals update when discounts are applied
- Applied discounts are clearly displayed

#### 5.6 Gift Card Application
**Steps:**
1. In shopping cart, locate "Gift Cards" section
2. Enter a test gift card code
3. Click "Add gift card" button
4. Verify functionality

**Expected Results:**
- Valid gift cards apply credit correctly
- Invalid codes show appropriate error messages
- Gift card balance is applied to order total
- Applied gift cards are clearly indicated

### 6. Shipping and Location Services

#### 6.1 Estimate Shipping
**Steps:**
1. In shopping cart, locate "Estimate shipping" section
2. Select "United States" from Country dropdown
3. Select a state from "State/province" dropdown
4. Enter ZIP code "10001"
5. Click "Estimate shipping" button

**Expected Results:**
- Shipping calculation completes successfully
- Shipping cost is displayed and added to order total
- Different shipping options may be presented
- International shipping options work for other countries

#### 6.2 Country/State Selection Validation
**Steps:**
1. In shipping estimation, select "Select country" (default option)
2. Try to estimate shipping
3. Select a country but leave state as "Other (Non US)"
4. Test with various country/state combinations

**Expected Results:**
- Validation prevents shipping estimation without proper country selection
- State dropdown updates based on country selection
- Error messages guide user to complete required fields
- International addresses are handled appropriately

### 7. Checkout Process

#### 7.1 Proceed to Checkout (Guest)
**Steps:**
1. Add items to cart with total value over $0
2. In shopping cart, check "I agree with the terms of service" checkbox
3. Click "Checkout" button
4. Verify checkout process begins

**Expected Results:**
- Terms of service agreement is required before checkout
- Checkout process initiates successfully
- User is presented with checkout options (guest vs. registered)
- Appropriate forms are displayed for order completion

#### 7.2 Terms of Service Validation
**Steps:**
1. In shopping cart with items, leave terms checkbox unchecked
2. Attempt to click "Checkout" button
3. Check the checkbox and try again

**Expected Results:**
- Checkout is blocked without terms acceptance
- Validation message indicates terms must be accepted
- Checkout proceeds normally after terms are accepted

### 8. Search Functionality

#### 8.1 Basic Product Search
**Steps:**
1. In header search box, enter "laptop"
2. Click "Search" button
3. Verify search results page displays

**Expected Results:**
- Search results page loads with relevant products
- Search term "laptop" appears in search results
- Products matching search criteria are displayed
- Search functionality maintains view/sort options

#### 8.2 Advanced Search Options
**Steps:**
1. On search results page, check "Advanced search" checkbox
2. Verify additional search options appear
3. Test search with advanced criteria

**Expected Results:**
- Advanced search options are revealed when checkbox is selected
- Additional filters or search parameters become available
- Advanced search provides more refined results
- Search criteria are preserved during navigation

#### 8.3 Empty Search Results
**Steps:**
1. Enter a search term that returns no results (e.g., "nonexistentproduct123")
2. Click "Search" button
3. Verify handling of no results

**Expected Results:**
- Appropriate "no results found" message is displayed
- User is provided with search suggestions or alternatives
- Page layout remains intact with empty results
- User can easily modify search criteria

#### 8.4 Search Result Sorting and Display
**Steps:**
1. Perform a search that returns multiple results
2. Test different "Sort by" options (Position, Name A-Z, Name Z-A, Price Low-High, Price High-Low)
3. Test different "Display" per page options
4. Test "View as" Grid/List toggle

**Expected Results:**
- Sorting works correctly for all options
- Display options properly paginate results
- View toggles maintain search criteria
- URL reflects current search and display preferences

### 9. Wishlist Management

#### 9.1 Add Product to Wishlist
**Steps:**
1. Navigate to a product detail page
2. Look for "Add to wishlist" or wishlist functionality
3. Add product to wishlist (functionality may be on product listings)
4. Check wishlist counter in header

**Expected Results:**
- Products can be added to wishlist
- Wishlist counter updates (e.g., from (0) to (1))
- Wishlist functionality is accessible from product pages

#### 9.2 View Wishlist
**Steps:**
1. Click "Wishlist" link in header
2. Verify wishlist contents
3. Check available actions (move to cart, remove, etc.)

**Expected Results:**
- Wishlist page displays saved products
- Product information is preserved (image, name, price)
- Actions are available to manage wishlist items
- Empty wishlist shows appropriate message

### 10. Product Comparison

#### 10.1 Add Products to Comparison
**Steps:**
1. On product detail page, click "Add to compare list" button
2. Navigate to another product and add to compare list
3. Access compare functionality

**Expected Results:**
- Products are added to comparison list
- Compare functionality becomes accessible
- Multiple products can be compared side by side
- Comparison shows relevant product attributes

#### 10.2 Compare Products
**Steps:**
1. After adding products to compare list
2. Navigate to "Compare products list" from footer links
3. Review comparison interface
4. Test comparison functionality

**Expected Results:**
- Products display in comparison format
- Specifications and features are clearly compared
- Prices and key attributes are easily comparable
- Actions available from comparison view (add to cart, remove from comparison)

### 11. Content and Information Pages

#### 11.1 Newsletter Subscription
**Steps:**
1. Locate newsletter signup in sidebar
2. Enter email address "test@example.com"
3. Click "Subscribe" button
4. Verify subscription process

**Expected Results:**
- Newsletter subscription form accepts valid email
- Confirmation message or feedback provided
- Invalid email formats are rejected with appropriate messages

#### 11.2 Community Poll Participation
**Steps:**
1. Locate "Community poll" section in sidebar
2. View poll question "Do you like nopCommerce?"
3. Select an option (Excellent, Good, Poor, Very bad)
4. Click "Vote" button

**Expected Results:**
- Poll options are selectable (radio buttons)
- Vote submission works correctly
- Results may be displayed after voting
- Only one option can be selected at a time

#### 11.3 Contact Form Submission
**Steps:**
1. Navigate to Contact Us page (/contactus)
2. Fill in "Your name" field with "John Doe"
3. Fill in "Your email" field with "john.doe@example.com"
4. Fill in "Enquiry" field with "Test message about product availability"
5. Click "Submit" button

**Expected Results:**
- Form accepts all required information
- Validation works for email format
- Submission provides confirmation feedback
- Form clears after successful submission

#### 11.4 Information Page Navigation
**Steps:**
1. Click "About us" link in footer
2. Click "Shipping & Returns" link in footer
3. Click "Privacy Notice" link in footer
4. Click "Conditions of Use" link in footer

**Expected Results:**
- All information pages load correctly
- Content is properly formatted and readable
- Navigation remains consistent across pages
- Links in footer work correctly

### 12. Social Media and External Links

#### 12.1 Social Media Links
**Steps:**
1. In footer "Follow us" section, test each social media link:
   - Facebook
   - Twitter
   - RSS
   - YouTube
   - Google+
2. Verify links open correctly

**Expected Results:**
- Social media links open in new tabs/windows
- Links lead to correct social media profiles
- External links function properly
- No broken links in social media section

#### 12.2 External Platform Links
**Steps:**
1. Click "nopCommerce" link in footer
2. Verify external platform links work correctly

**Expected Results:**
- External links open appropriately
- Links lead to correct destinations
- Attribution links function properly

### 13. Recently Viewed Products

#### 13.1 Recently Viewed Tracking
**Steps:**
1. Navigate to several different product pages
2. Check "Recently viewed products" section in sidebar
3. Verify products appear in recently viewed list

**Expected Results:**
- Recently viewed products are tracked automatically
- Product images and names display in sidebar
- Recent products are clickable links
- List updates as new products are viewed

#### 13.2 Recently Viewed Products Page
**Steps:**
1. Click "Recently viewed products" link in footer
2. Verify dedicated page displays full recently viewed list

**Expected Results:**
- Dedicated page shows comprehensive recently viewed products
- Products display with full information (images, names, prices)
- Links to products function correctly
- Page handles empty state appropriately

### 14. Error Handling and Edge Cases

#### 14.1 Invalid URL Navigation
**Steps:**
1. Navigate to non-existent page (e.g., /nonexistentpage)
2. Navigate to malformed product URLs
3. Test various invalid URL patterns

**Expected Results:**
- 404 error pages display appropriately
- Error pages maintain site navigation
- Users can easily return to valid pages
- Error messages are user-friendly

#### 14.2 Browser Back/Forward Navigation
**Steps:**
1. Navigate through several pages using site navigation
2. Use browser back button to return to previous pages
3. Use browser forward button
4. Verify page states are preserved correctly

**Expected Results:**
- Browser navigation works correctly
- Page states are preserved (search results, product lists, etc.)
- Cart contents are maintained during navigation
- No JavaScript errors occur during navigation

#### 14.3 Session Timeout Handling
**Steps:**
1. Log in to the site
2. Leave browser idle for extended period
3. Attempt to perform authenticated actions
4. Test session behavior

**Expected Results:**
- Session timeout is handled gracefully
- Users are redirected to login when session expires
- Cart contents are preserved when possible
- Clear messaging about session status

### 15. Cross-browser and Responsive Testing

#### 15.1 Mobile Responsiveness
**Steps:**
1. Test site on mobile viewport sizes
2. Verify navigation menu adapts for mobile
3. Test touch interactions on mobile devices
4. Check image and content scaling

**Expected Results:**
- Site is fully responsive across device sizes
- Mobile navigation is functional and accessible
- Touch interactions work properly
- Content remains readable and accessible on small screens

#### 15.2 Browser Compatibility
**Steps:**
1. Test core functionality in Chrome, Firefox, Safari, Edge
2. Verify JavaScript functionality works across browsers
3. Test form submissions and interactions
4. Check CSS rendering consistency

**Expected Results:**
- Core functionality works in all major browsers
- Visual consistency maintained across browsers
- No browser-specific errors or issues
- Performance remains acceptable across platforms

### 16. Performance and Load Testing

#### 16.1 Page Load Performance
**Steps:**
1. Measure page load times for key pages (homepage, product pages, cart)
2. Test image loading performance
3. Verify search results load efficiently
4. Test large category page performance

**Expected Results:**
- Pages load within reasonable timeframes
- Images load progressively without blocking page rendering
- Search and filtering operations complete quickly
- Large product catalogs remain responsive

#### 16.2 Form Submission Performance
**Steps:**
1. Test registration form submission speed
2. Test login form performance
3. Test contact form and newsletter signup performance
4. Measure shopping cart update responsiveness

**Expected Results:**
- Form submissions complete within acceptable timeframes
- User feedback is provided during processing
- No timeouts occur during normal operations
- Error handling performs efficiently

## Testing Notes

### Test Environment Considerations
- The DemoWebShop is a demonstration environment with simulated functionality
- Email notifications may not be functional in the demo environment
- Payment processing is simulated and should not use real payment information
- Some admin features may be limited or disabled in the demo

### Test Data Requirements
- Valid email addresses for registration and login testing
- Test product data is pre-populated in the system
- Shopping cart may contain existing items from previous sessions
- Recently viewed products may be pre-populated

### Browser Requirements
- Modern web browsers with JavaScript enabled
- Cookies enabled for proper session management
- Standard viewport sizes for responsive testing
- No specific plugins or extensions required

### Automation Considerations
- All test scenarios are suitable for automation using Playwright
- Test data should be managed to ensure test independence
- Cart and session state should be cleaned up between test runs
- Consider implementing test user accounts for consistent testing