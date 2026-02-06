# SmartShop Hub - Feature Documentation

Comprehensive guide to all features and functionalities in the SmartShop Hub e-commerce platform.

## Table of Contents

1. [Navigation System](#navigation-system)
2. [Product Browsing](#product-browsing)
3. [Shopping Experience](#shopping-experience)
4. [User Authentication](#user-authentication)
5. [AI Recommendations](#ai-recommendations)
6. [Privacy & Settings](#privacy--settings)
7. [Mobile Experience](#mobile-experience)

---

## Navigation System

### 1. Dynamic Breadcrumbs

**Location**: All pages except homepage
**Component**: `frontend/src/components/Breadcrumbs.js`

**Features**:
- Automatically detects MongoDB ObjectIds in URL paths
- Fetches product data from API to display real information
- Shows hierarchical navigation path
- Clickable links for easy backward navigation
- Loading state while fetching data

**Navigation Pattern**:
```
Home > Products > [Category] > [Product Name]
```

**Examples**:
- `/products` → `Home > Products`
- `/products/6985c3e065453cc97a34459d` → `Home > Products > Laptops > Apple MacBook Pro`
- `/cart` → `Home > Cart`

**Technical Details**:
- Uses React Router's `useLocation` hook
- Detects 24-character hex ObjectIds with regex: `/^[a-f\d]{24}$/i`
- Makes API call to `/api/products/:id` for product info
- Truncates product names longer than 40 characters
- Formats category names (capitalizes first letter)

**User Benefits**:
- Always know where you are in the site
- Quick navigation to parent pages
- SEO-friendly URL structure

---

### 2. Category Dropdown Menu

**Location**: Navbar (all pages)
**Component**: `frontend/src/components/Navbar.js`

**Features**:
- Lists all 6 product categories
- "All Products" option for unfiltered view
- Smooth dropdown animation
- Click-outside detection to close
- Chevron icon rotates when open
- Desktop and mobile versions

**Categories Available**:
1. **Laptops** - High-performance computers
2. **Smartphones** - Latest mobile devices
3. **Headphones** - Audio equipment
4. **Smartwatches** - Wearable technology
5. **Tablets** - Portable computing
6. **Accessories** - Tech accessories and peripherals

**User Interaction**:
1. Click "Categories" button in navbar
2. Dropdown menu appears with all options
3. Click a category to navigate to filtered product list
4. URL updates to `/products?category=<category-name>`
5. Active filter badge appears on products page

**Technical Implementation**:
```javascript
const categories = [
  { name: 'Laptops', slug: 'laptops' },
  { name: 'Smartphones', slug: 'smartphones' },
  // ... more categories
];

const handleCategoryClick = (slug) => {
  navigate(`/products?category=${slug}`);
  setCategoriesOpen(false);
};
```

**Desktop View**:
- Absolute positioned dropdown below button
- Shadow and rounded corners
- Hover effects on items
- Maximum width: 192px (w-48)

**Mobile View**:
- Full-width section in hamburger menu
- Stacked list with clear labels
- Touch-optimized spacing

---

### 3. Search Functionality

**Location**: Navbar (desktop and mobile)
**Component**: `frontend/src/components/Navbar.js`

**Features**:
- Real-time search input
- Available on all pages
- Redirects to products page with search query
- Clears input after submission
- Icon indicator (magnifying glass)

**User Flow**:
1. Type search query in navbar search box
2. Press Enter or click search icon
3. Navigates to `/products?search=<query>`
4. Products page displays filtered results
5. Active filter badge shows search term

**Search Behavior**:
- Searches product names and descriptions
- Case-insensitive matching
- Combines with other filters (category, brand, price)
- Updates URL parameters
- Shows "X products found" count

**Desktop**:
- Visible search bar (width: 256px)
- Positioned in center of navbar
- Always visible on large screens

**Mobile**:
- Full-width search in hamburger menu
- Top of mobile navigation
- Touch-optimized input

---

### 4. Comprehensive Footer

**Location**: Bottom of all pages
**Component**: `frontend/src/components/Footer.js`

**Layout**: Four-column responsive grid

#### Column 1: About
- SmartShop Hub logo and description
- Social media links:
  - GitHub
  - Twitter
  - LinkedIn
- Brief tagline about AI-powered shopping

#### Column 2: Quick Links
- Home
- All Products
- Category links:
  - Laptops
  - Smartphones
  - Headphones

#### Column 3: Customer Service
- My Account
- Order History
- Shopping Cart
- FAQ (anchor link)
- Shipping Info (anchor link)

#### Column 4: Contact Information
- Physical address with icon
- Phone number (clickable tel: link)
- Email address (clickable mailto: link)

**Bottom Bar**:
- Copyright notice with dynamic year
- Legal links:
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
- Project disclaimer

**Design**:
- Dark theme (bg-gray-900)
- Light text (text-gray-300)
- Hover effects on links
- Icon-enhanced contact info
- Responsive grid (1-4 columns based on screen size)

---

## Product Browsing

### 5. Active Filters Display

**Location**: Products page (above product grid)
**Component**: `frontend/src/pages/Products.js` (lines 113-179)

**Features**:
- Visual representation of active filters
- Color-coded badges by filter type
- Individual removal buttons (X icon)
- "Clear All" button
- Only displays when filters are active
- Responsive flex-wrap layout

**Filter Badge Types**:

| Filter | Color | Example |
|--------|-------|---------|
| Search | Teal (primary-100) | `Search: laptop` |
| Category | Blue (blue-100) | `Category: Laptops` |
| Brand | Green (green-100) | `Brand: Apple` |
| Price | Purple (purple-100) | `Price: $1000 - $2000` |

**User Interactions**:
- **Click X on badge**: Removes that specific filter
- **Click "Clear All"**: Removes all filters at once
- **URL updates**: Immediately reflects filter changes

**Technical Implementation**:
```javascript
const hasActiveFilters =
  filters.category || filters.brand ||
  filters.search || filters.minPrice || filters.maxPrice;

{hasActiveFilters && (
  <div className="bg-white rounded-lg shadow-md p-4 mb-6">
    {/* Filter badges */}
  </div>
)}
```

**Benefits**:
- Clear visibility of applied filters
- Easy filter management
- Improved user experience
- Reduces confusion about search results

---

### 6. Product Catalog with Advanced Filtering

**Location**: `/products` page
**Component**: `frontend/src/pages/Products.js`

**Sidebar Filters** (Desktop: always visible, Mobile: toggle):

#### Search Filter
- Text input for product search
- Real-time filtering as you type
- Searches names and descriptions

#### Category Filter
- Dropdown select menu
- Shows all available categories
- "All Categories" default option

#### Brand Filter
- Dropdown select menu
- Dynamically populated from products
- "All Brands" default option

#### Price Range Filter
- Two number inputs (Min and Max)
- Flexible price filtering
- Can use one or both inputs
- Format: $X - $Y in badge

**Filter Behavior**:
- **Cumulative**: All filters work together (AND logic)
- **URL Sync**: Filters persist in URL parameters
- **Page Reset**: Returns to page 1 when filters change
- **Real-time**: Results update immediately

**Product Grid**:
- Responsive columns (1-3 based on screen size)
- Product cards with:
  - Product image with fallback
  - Brand name
  - Product name (truncated if too long)
  - Star rating with count
  - Price
  - "Add to Cart" button
  - "Out of Stock" overlay if applicable

**Pagination**:
- Shows when more than 1 page of results
- Page numbers as buttons
- Previous/Next navigation
- Smooth scroll to top on page change
- Disabled state for first/last pages

---

### 7. Product Detail Page

**Location**: `/products/:id`
**Component**: `frontend/src/pages/ProductDetail.js`

**Information Displayed**:

#### Left Side - Image
- Large product image
- Fallback placeholder if image fails
- Grey background container

#### Right Side - Details
- Brand name (small text)
- Product name (large, bold)
- Star rating with average and count
- Price (large, prominent)
- Description section
- Specifications table (if available)
- Stock status:
  - "In Stock (X available)" - green
  - "Out of Stock" - red

**Purchase Controls**:
- Quantity input (min 1, max stock)
- "Add to Cart" button
  - Disabled if out of stock
  - Shows success toast on add
  - Tracks interaction for AI

**Similar Products Section**:
- "You May Also Like" heading
- 4 similar products (AI-generated)
- Based on collaborative filtering
- Same ProductCard component

**Tracking**:
- **View**: Tracked automatically on page load
- **Click**: Tracked from product cards
- **Add to Cart**: Tracked on button click
- Only if user has tracking enabled

---

## Shopping Experience

### 8. Shopping Cart

**Location**: `/cart` page
**Component**: `frontend/src/pages/Cart.js`

**Features**:

#### Cart Items Display
Each item shows:
- Product image
- Product name (clickable to detail page)
- Brand name
- Price per unit
- Quantity controls:
  - Decrease button (-)
  - Quantity display
  - Increase button (+)
  - Limited by stock availability
- Subtotal for item (price × quantity)
- Remove button (trash icon)

#### Cart Summary
- **Subtotal**: Sum of all item subtotals
- **Tax**: Calculated at 8.5%
- **Shipping**: $10 flat rate (or free over threshold)
- **Total**: Final amount to pay
- **Checkout Button**: Proceeds to checkout
  - Disabled if cart is empty
  - Redirects to /checkout

#### Empty Cart State
- Message: "Your cart is empty"
- "Browse Products" button
- Encouraging icon or illustration

**User Actions**:
- **Update Quantity**: Click +/- buttons
- **Remove Item**: Click trash icon
- **Clear Cart**: Remove all items at once
- **Continue Shopping**: Return to products
- **Proceed to Checkout**: Go to checkout page

**Persistence**:
- Cart stored in React Context
- Persists across page navigation
- Cleared on order completion
- (Optional: localStorage for session persistence)

---

### 9. Checkout Process

**Location**: `/checkout` page (Protected Route)
**Component**: `frontend/src/pages/Checkout.js`

**Steps**:

#### 1. Review Order
- List of items with quantities and prices
- Order summary with totals
- Edit cart button if needed

#### 2. Shipping Information
Form fields:
- Full Name (required)
- Email (required, validated)
- Phone Number (required)
- Address Line 1 (required)
- Address Line 2 (optional)
- City (required)
- State/Province (required)
- Postal Code (required)
- Country (default: selection)

#### 3. Payment Information
- Note: Demo purposes only
- Payment gateway integration placeholder
- Security notice

#### 4. Place Order
- "Place Order" button
- Creates order in database
- Tracks purchase interactions for AI
- Redirects to order confirmation
- Shows success toast

**Validation**:
- All required fields must be filled
- Email format validation
- Phone number format (optional validation)
- Error messages for invalid inputs

**Security**:
- Protected route (requires authentication)
- JWT token verification
- Secure API communication

---

### 10. Order Management

**Location**: `/profile?tab=orders` page
**Component**: `frontend/src/pages/Profile.js`

**Order List Display**:

Each order card shows:
- **Order Number**: Unique identifier
- **Order Date**: Formatted date/time
- **Status Badge**:
  - Pending (yellow)
  - Processing (blue)
  - Shipped (purple)
  - Delivered (green)
  - Cancelled (red)
- **Total Amount**: Final price paid
- **Items Count**: Number of products
- **View Details**: Expandable section

**Order Details** (when expanded):
- Complete item list with:
  - Product name
  - Quantity ordered
  - Price per unit
  - Subtotal
- Shipping address
- Payment information (masked)
- Order timeline/tracking

**Features**:
- Sorted by date (newest first)
- Pagination for many orders
- Search/filter orders (optional)
- Export order history (optional)

---

## User Authentication

### 11. Registration

**Location**: `/register` page
**Component**: `frontend/src/pages/Register.js`

**Form Fields**:
- **Full Name** (required)
- **Email** (required, unique, validated)
- **Password** (required, minimum 6 characters)
- **Confirm Password** (required, must match)

**Validation**:
- Email format check
- Password strength indication (optional)
- Password match verification
- Unique email check (server-side)

**Features**:
- "Already have an account? Login" link
- Terms and conditions checkbox (optional)
- Privacy policy link
- Success toast on registration
- Auto-login after registration
- Redirect to homepage or origin page

**Default Settings**:
- **consentToTracking**: false (opt-in required)
- **role**: "user" (not admin)

---

### 12. Login

**Location**: `/login` page
**Component**: `frontend/src/pages/Login.js`

**Form Fields**:
- **Email** (required)
- **Password** (required)

**Features**:
- "Remember me" checkbox (optional)
- "Forgot password?" link (optional feature)
- "Don't have an account? Register" link
- Error messages for:
  - Invalid credentials
  - Account not found
  - Server errors
- Success toast on login
- Redirect to origin page or homepage

**Authentication Flow**:
1. User submits credentials
2. POST to `/api/auth/login`
3. Server validates credentials
4. Returns JWT token + user data
5. Token stored in Context
6. User data stored in Context
7. Automatic redirect

**Security**:
- Passwords hashed with bcrypt
- JWT token in memory (not localStorage)
- Token expiry: 7 days (configurable)
- Rate limiting on endpoint

---

### 13. User Profile

**Location**: `/profile` page (Protected Route)
**Component**: `frontend/src/pages/Profile.js`

**Tabs**:

#### Profile Tab
- Display user information:
  - Name
  - Email
  - Member since date
- Edit profile button (optional)
- Change password button (optional)

#### Orders Tab
- Order history (see Order Management)
- Detailed order information
- Order status tracking

#### Settings Tab
- **Privacy Settings**:
  - Enable/Disable Personalized Recommendations
  - Toggle switch with description
  - Immediate effect on tracking
  - Clear explanation of implications

**Privacy Toggle**:
```
[  ] Enable Personalized Recommendations

When enabled, we track your browsing and purchase
behavior to provide personalized product suggestions.
Data is kept for 180 days and complies with GDPR.
You can disable this at any time.
```

**Features**:
- Logout button
- Delete account button (optional)
- Data export request (GDPR)
- View privacy policy

---

## AI Recommendations

### 14. Personalized Recommendations

**Location**: Homepage (when logged in with tracking enabled)
**Component**: `frontend/src/pages/Home.js`

**"Recommended For You" Section**:

**Requirements**:
- User must be logged in
- Tracking consent enabled
- Minimum 3 interactions recorded

**Display**:
- Section title: "Recommended For You"
- Subtitle explaining personalization
- Grid of recommended products (4-8 items)
- Same ProductCard component as catalog
- "View All" link to products page (optional)

**Algorithm**:
- User-Based Collaborative Filtering
- Finds similar users based on behavior
- Recommends products liked by similar users
- Weighted by interaction type:
  - View: 1 point
  - Click: 2 points
  - Add to Cart: 3 points
  - Purchase: 5 points

**Fallback** (if insufficient data):
- Shows popular products instead
- Message: "Trending Products"
- Based on global interaction counts

---

### 15. Similar Products

**Location**: Product detail page bottom
**Component**: `frontend/src/pages/ProductDetail.js`

**"You May Also Like" Section**:

**Features**:
- Shows 4 similar products
- Based on the current product
- Uses product-based collaborative filtering
- Finds products purchased/viewed together
- Different algorithm than personalized recommendations

**Display**:
- Section title: "You May Also Like"
- Grid of 4 ProductCards
- Responsive layout (1-4 columns)
- Click product to view details

**Algorithm**:
- Finds users who interacted with current product
- Looks at what else they interacted with
- Ranks by co-occurrence frequency
- Filters out current product
- Returns top 4 results

**Use Cases**:
- Product discovery
- Cross-selling
- Increase average order value
- Reduce search time

---

### 16. Interaction Tracking

**Tracking Points**:

| Event | Trigger | Weight | Consent Required |
|-------|---------|--------|-----------------|
| **View** | Product detail page load | 1 | Yes |
| **Click** | Click on ProductCard | 2 | Yes |
| **Add to Cart** | Add to cart button | 3 | Yes |
| **Purchase** | Order completion | 5 | Yes |

**Tracked Data**:
- User ID (authenticated users only)
- Product ID
- Interaction type
- Timestamp
- Optional metadata:
  - Session ID
  - Source (search, recommendation, category)
  - Duration on page

**Data Retention**:
- Automatic expiry: 180 days
- MongoDB TTL index
- GDPR compliant
- User can request deletion

**Privacy Controls**:
- Opt-in only (default: disabled)
- Toggle in Profile > Settings
- Clear explanation provided
- Real-time effect (no page refresh needed)

---

## Privacy & Settings

### 17. GDPR Compliance

**Features**:

#### Consent Management
- Default: Tracking disabled
- Must opt-in explicitly
- Clear consent language
- Easy opt-out anytime

#### Data Minimization
- Only essential data collected
- No sensitive personal information
- Anonymous interaction tracking
- Minimal user profile data

#### Right to Access
- View all stored data
- Download data export (optional)
- Transparency report (optional)

#### Right to Deletion
- Delete interaction history
- Remove account completely
- Clear all tracking data
- Cannot undo deletion

#### Data Retention
- Interactions: 180 days maximum
- Orders: Kept for legal requirements
- Account: Until user requests deletion
- Automatic cleanup via TTL indexes

**Legal Basis**:
- Consent (tracking)
- Contract (orders, account)
- Legitimate interest (security, fraud prevention)

---

### 18. Privacy Settings

**Location**: Profile > Settings tab

**Options**:

#### Personalized Recommendations
- **Toggle switch**
- **States**:
  - Enabled (green): AI tracking active
  - Disabled (grey): No tracking, show popular products
- **Effect**: Immediate
- **Information**: Clear explanation of what's tracked

**Explanation Text**:
```
When enabled:
✓ We analyze your browsing behavior
✓ You get personalized product suggestions
✓ Similar products shown based on your interests
✓ Data kept for 180 days

When disabled:
✗ No behavior tracking
✗ Generic popular products shown
✗ No personalized recommendations
```

---

## Mobile Experience

### 19. Responsive Design

**Breakpoints** (Tailwind CSS):
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px

**Mobile-First Approach**:
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-optimized interface
- Readable font sizes

---

### 20. Mobile Navigation

**Hamburger Menu**:

**Trigger**: Icon button (3 horizontal lines)
**Location**: Top right corner on mobile

**Menu Contents**:
1. **Search Bar**: Full-width at top
2. **Home Link**: With icon
3. **All Products Link**: With icon
4. **Categories Section**:
   - Label: "Categories"
   - Indented list of all categories
5. **My Orders** (if logged in)
6. **User Section**:
   - Profile link (if logged in)
   - Logout button (if logged in)
   - Login button (if not logged in)
   - Sign Up button (if not logged in)

**Behavior**:
- Slides in from right (optional animation)
- Overlay background darkens page
- Click outside to close
- X icon to close explicitly
- Smooth transitions

---

### 21. Touch Optimizations

**Tap Targets**:
- Minimum 44×44px touch areas
- Extra padding on mobile buttons
- Larger clickable areas
- Spacing between interactive elements

**Gestures**:
- Swipe gestures (optional)
- Pull-to-refresh (optional)
- Touch-friendly sliders

**Forms**:
- Large input fields
- Appropriate keyboards (email, tel, number)
- Clear validation messages
- Submit buttons easy to tap

---

## Technical Features

### 22. Performance Optimization

**Frontend**:
- Code splitting
- Lazy loading components
- Image optimization
- Caching strategies

**Backend**:
- Database indexing
- Query optimization
- Response caching (1 hour for recommendations)
- Batch processing

**Metrics**:
- Page load: < 2 seconds
- API response: < 200ms (cached)
- Time to Interactive: < 3 seconds

---

### 23. Error Handling

**User-Facing**:
- Toast notifications for errors
- Friendly error messages
- Retry options
- Fallback UI components

**Developer-Facing**:
- Console logging
- Error boundaries (React)
- API error responses
- Stack traces in development

---

### 24. Accessibility

**Features**:
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Alt text for images
- Screen reader friendly

**Standards**:
- WCAG 2.1 Level AA compliance (goal)
- Color contrast ratios
- Text scalability
- Form labeling

---

## Future Enhancements

See [CHANGELOG.md](../CHANGELOG.md) for planned features and roadmap.

---

**Document Version**: 1.1.0
**Last Updated**: February 6, 2025
**Author**: Francesco di Biase
**LinkedIn**: [francescodibiase79](https://www.linkedin.com/in/francescodibiase79/)
