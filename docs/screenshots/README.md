# Screenshots Guide

This folder contains all screenshots used in the project documentation.

## Required Screenshots

### 1. homepage.png
**What to capture**:
- Full homepage view
- Show "Featured Products" or "Recommended For You" section (if logged in)
- Navbar with logo and categories dropdown visible
- At least 4-8 product cards visible
- Footer at bottom

**Browser size**: 1920x1080 (full HD)
**State**: Logged in with AI tracking enabled (to show recommendations)

---

### 2. products-catalog.png
**What to capture**:
- Products page with sidebar filters visible
- Multiple products in grid (at least 6 visible)
- Active filters section showing multiple filters (category + brand + price)
- Pagination at bottom
- Breadcrumbs at top showing "Home > Products"

**Browser size**: 1920x1080
**State**: Apply these filters before taking screenshot:
- Category: "laptops"
- Brand: Any brand (e.g., "Apple")
- Price: Set a range (e.g., 500-2000)

---

### 3. active-filters.png
**What to capture**:
- Close-up crop of just the "Active Filters" section
- Show all 4 types of filters simultaneously:
  - Search badge (teal)
  - Category badge (blue)
  - Brand badge (green)
  - Price badge (purple)
- Include the "Clear All" button
- Show X icons on each badge clearly

**Browser size**: Any (crop to content)
**State**: URL should be something like:
`/products?search=laptop&category=laptops&brand=Apple&minPrice=500&maxPrice=2000`

---

### 4. product-detail.png
**What to capture**:
- Full product detail page
- Breadcrumbs showing: "Home > Products > Laptops > [Product Name]"
- Product image on left
- Product information on right (name, price, description, specs)
- "Add to Cart" button and quantity selector
- "You May Also Like" section at bottom with 4 products
- Footer visible at bottom

**Browser size**: 1920x1080 with scroll to show full page
**State**: Navigate to any laptop product detail page

---

### 5. breadcrumbs.png
**What to capture**:
- Close-up of just the breadcrumbs navigation bar
- Should show: "Home > Products > Laptops > Apple MacBook Pro" (or similar)
- Highlight that category is clickable (optional: take with hover state)

**Browser size**: Crop to breadcrumb area only
**State**: On a product detail page

---

### 6. navbar-dropdown.png
**What to capture**:
- Navbar with categories dropdown menu **open**
- Show all 6 categories listed
- "All Products" option at top
- Chevron icon rotated
- Search bar visible
- Shopping cart icon with badge (if items in cart)

**Browser size**: 1920x1080 or crop to navbar area
**State**:
- Click "Categories" dropdown
- Optionally add 1-2 items to cart to show cart badge

---

### 7. cart.png
**What to capture**:
- Shopping cart page with 2-3 items
- Show quantity controls (+/- buttons)
- Individual item totals
- Cart summary on right (Subtotal, Tax, Shipping, Total)
- "Proceed to Checkout" button
- Breadcrumbs: "Home > Cart"

**Browser size**: 1920x1080
**State**: Add 2-3 different products to cart

---

### 8. profile-settings.png
**What to capture**:
- User profile page
- Settings tab selected/active
- Privacy settings section visible
- "Enable Personalized Recommendations" toggle switch
- Explanation text under toggle
- Maybe show Orders tab with 1-2 orders (optional)

**Browser size**: 1920x1080
**State**:
- Logged in
- Navigate to Profile > Settings tab

---

### 9. mobile-responsive.png
**What to capture**:
- Mobile view of the site (iPhone or Android size)
- Hamburger menu **open** showing:
  - Search bar
  - Home link
  - All Products link
  - Categories section with list
  - User menu (Login/Profile)
- Shows responsive layout

**Browser size**: 375x812 (iPhone X) or 414x896 (iPhone 11 Pro Max)
**How to capture**:
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone X or similar)
4. Open hamburger menu
5. Take screenshot

---

### 10. api-docs.png
**What to capture**:
- Swagger UI page at http://localhost:5000/api-docs
- Show expanded endpoint groups (Auth, Products, Recommendations, Orders)
- Maybe expand one endpoint (e.g., GET /api/products) to show details
- Show request/response schemas

**Browser size**: 1920x1080
**State**: Backend must be running

---

## Screenshot Tips

### General Guidelines
1. **Clean Browser**: Use incognito mode or clear extensions for clean screenshots
2. **Real Data**: Use realistic product names and data (from seed script)
3. **Consistency**: Use same browser and zoom level (100%) for all screenshots
4. **Quality**: Save as PNG for best quality (not JPEG)
5. **File Names**: Use exact names specified above (lowercase, hyphenated)

### Tools
- **Windows**:
  - Snipping Tool (Win + Shift + S)
  - Full page: Use browser extension like "GoFullPage"
- **macOS**:
  - Cmd + Shift + 4 (area selection)
  - Cmd + Shift + 3 (full screen)
- **Browser DevTools**:
  - F12 → Ctrl/Cmd + Shift + P → "Capture screenshot"

### Recommended Browser
- **Chrome** or **Edge** (Chromium-based)
- Zoom level: **100%**
- Window size: **1920x1080** for desktop views

### What to Avoid
- ❌ Browser bookmarks bar
- ❌ Operating system taskbar
- ❌ Personal information in screenshots
- ❌ Lorem ipsum or placeholder text
- ❌ Broken images or error states (unless showing error handling)
- ❌ Empty carts or product lists (show real data)

---

## After Taking Screenshots

### File Checklist
Make sure all these files exist in this folder:
- [ ] homepage.png
- [ ] products-catalog.png
- [ ] active-filters.png
- [ ] product-detail.png
- [ ] breadcrumbs.png
- [ ] navbar-dropdown.png
- [ ] cart.png
- [ ] profile-settings.png
- [ ] mobile-responsive.png
- [ ] api-docs.png

### Verification
1. Open each image to verify:
   - Correct content captured
   - Good resolution and quality
   - No sensitive information visible
   - File size reasonable (< 500KB each, optimize if needed)

2. Check README.md displays them correctly:
   ```bash
   # From project root
   # Open README.md in browser or IDE preview
   ```

3. Consider creating a few additional screenshots:
   - Login page
   - Registration page
   - Checkout page
   - Order confirmation
   - Empty states (empty cart, no orders)

---

## Optional: Optimize Screenshots

If file sizes are large (> 500KB), optimize them:

### Using Online Tools
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)

### Using Command Line (ImageMagick)
```bash
# Install ImageMagick
# Windows: choco install imagemagick
# macOS: brew install imagemagick

# Optimize all PNGs in folder
for file in *.png; do
  convert "$file" -quality 85 -strip "optimized-$file"
done
```

### Using npm package
```bash
npm install -g imageoptim-cli
imageoptim --directory ./screenshots
```

---

**Last Updated**: February 6, 2025
**Purpose**: Documentation screenshots for SmartShop Hub README
