# Changelog

All notable changes to the SmartShop Hub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-02-06

### Added

#### Navigation Enhancements
- **Dynamic Breadcrumbs Component** (`Breadcrumbs.js`)
  - Automatically detects product IDs in URL using MongoDB ObjectId pattern
  - Fetches product data from API to display category and product name
  - Shows interactive navigation: Home > Products > Category > Product Name
  - Displays "Loading..." state while fetching data
  - Clickable category links navigate to filtered product view
  - Truncates long product names (>40 chars) with ellipsis

- **Category Dropdown Menu** in Navbar
  - Lists all 6 product categories (Laptops, Smartphones, Headphones, etc.)
  - "All Products" option for unfiltered catalog
  - Smooth dropdown animation with chevron icon rotation
  - Click-outside detection to close dropdown
  - Mobile-responsive with full-width categories section

- **Active Filters Display** on Products Page
  - Visual badges showing applied filters above product grid
  - Color-coded by filter type:
    - Search: Teal (primary)
    - Category: Blue
    - Brand: Green
    - Price Range: Purple
  - Individual X buttons to remove specific filters
  - "Clear All" button for bulk filter removal
  - Responsive flex-wrap layout
  - Only displays when filters are active

- **Enhanced Navbar Features**
  - Integrated search bar (desktop and mobile)
  - Mobile hamburger menu with full navigation
  - Orders link for authenticated users
  - Improved spacing and layout

- **Comprehensive Footer Component**
  - Four-column layout: About, Quick Links, Customer Service, Contact
  - Social media links (GitHub, Twitter, LinkedIn)
  - Category quick links
  - Contact information with icons
  - Copyright and legal links
  - Professional dark theme

#### Technical Improvements
- **URL Parameter Synchronization**
  - Products component syncs filters with URL using `useSearchParams`
  - Separate useEffect hooks for URL-to-state and user-interaction flows
  - Prevents circular dependencies in state updates
  - Maintains filter state across page navigation

- **Image Assets**
  - Logo image (128x128px) in `/public/images/logo.png`
  - Placeholder image (800x800px) in `/public/images/placeholder.png`
  - Used throughout application for consistent branding

### Fixed

#### Critical Bug Fixes
- **Breadcrumbs Infinite Loop**
  - Fixed React Hook dependency issue causing infinite re-renders
  - Removed `pathnames` array from useEffect dependencies
  - Calculate paths inside useEffect to avoid recreating array
  - Component now renders correctly without console warnings

- **Breadcrumbs API Response Parsing**
  - Fixed data structure mismatch in API response handling
  - Updated from `data.name` to `response.data.data.name`
  - Added safety checks for `productInfo.category` and `productInfo.name`
  - Prevents undefined errors when API response is incomplete

- **Products Page URL Synchronization**
  - Fixed circular dependency between URL params and filter state
  - Removed `setSearchParams` from products fetch useEffect
  - Added URL updates to `handleFilterChange`, `handlePageChange`, and `clearFilters`
  - Dropdown navigation now works correctly when already on products page

- **Navbar Dropdown on Products Page**
  - Fixed category selection not updating product list
  - Added useEffect to sync URL params with filter state
  - State updates properly when URL changes externally
  - Filters apply immediately without page reload

#### Backend Fixes
- **Rate Limiting for Development**
  - Increased rate limit from 100 to 1000 requests per 15 minutes in dev mode
  - Prevents throttling during testing and development
  - Production maintains secure 100 requests limit

- **Jest ES Modules Configuration**
  - Renamed `jest.config.js` to `jest.config.cjs` for CommonJS compatibility
  - Updated test script to use `--experimental-vm-modules` flag
  - Fixed module import errors in test environment
  - 18/19 tests now passing successfully

- **Password Hashing in Seed Script**
  - Changed from `User.insertMany()` to `User.create()`
  - Ensures bcrypt pre-save hooks execute correctly
  - All seeded users now have properly hashed passwords
  - Demo user credentials work as expected

### Changed

#### Component Updates
- **App.js Layout Structure**
  - Added Breadcrumbs component after Navbar
  - Updated flex layout for sticky footer
  - Improved main content area with `flex-grow`

- **Products Component Refactoring**
  - Separated URL synchronization logic into dedicated useEffect
  - Moved `setSearchParams` calls to user interaction handlers
  - Added `removeFilter` helper function for filter badges
  - Improved filter state management and predictability

- **Breadcrumbs Component Enhancement**
  - Better error handling with try-catch blocks
  - Conditional rendering based on product info availability
  - Loading state while fetching product data
  - Graceful degradation when API fails

### Technical Debt
- **Documentation Updates**
  - Updated README with new navigation features
  - Added troubleshooting section for common issues
  - Created comprehensive CHANGELOG
  - Added screenshot placeholders with descriptions

### Performance
- **Reduced API Calls**
  - Breadcrumbs cache product info per page navigation
  - Products component debounces filter changes
  - Efficient state updates prevent unnecessary re-renders

### Security
- **Environment Variables**
  - Verified all sensitive data uses environment variables
  - No hardcoded secrets or API keys in codebase
  - Proper CORS configuration maintained

---

## [1.0.0] - 2025-01-XX

### Added

#### Core Features
- Full-stack e-commerce platform (MERN stack)
- AI-powered product recommendations using Collaborative Filtering
- User authentication and authorization with JWT
- Shopping cart functionality with session persistence
- Secure checkout process with order management
- Product catalog with 120+ items across 6 categories
- Advanced filtering (category, brand, price range, search)
- Product detail pages with specifications and ratings

#### AI/ML Implementation
- User-based Collaborative Filtering algorithm
- Cosine similarity for user matching
- Weighted interaction tracking (view, click, cart, purchase)
- Cold start handling with popular products
- Personalized recommendations based on user behavior
- Similar products suggestions
- Real-time recommendation updates

#### Privacy & Compliance
- GDPR-compliant data tracking with user consent
- Privacy settings in user profile
- Automatic data expiration after 180 days
- Right to be forgotten implementation
- Transparent data usage policies

#### Developer Experience
- Comprehensive API documentation with Swagger UI
- Docker Compose setup for MongoDB and Mongo Express
- Database seeding script with realistic mock data
- Jest unit tests with good coverage
- Environment-based configuration
- Development and production modes

#### Frontend
- React 18 with hooks and context API
- React Router for client-side routing
- Tailwind CSS for responsive design
- Toast notifications for user feedback
- Loading states and error handling
- Mobile-responsive design

#### Backend
- Express.js RESTful API
- MongoDB with Mongoose ODM
- JWT authentication middleware
- Rate limiting and security headers
- Error handling middleware
- Request validation
- API versioning

#### Documentation
- Comprehensive README with setup instructions
- Detailed AI model documentation
- API endpoint documentation
- Deployment guide
- Troubleshooting section

---

## Version History Summary

- **1.1.0** (2025-02-06): Navigation enhancements, bug fixes, improved UX
- **1.0.0** (2025-01-XX): Initial release with full e-commerce and AI features

---

## Future Roadmap

### Planned Features
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Advanced search with autocomplete
- [ ] Email notifications for orders
- [ ] Admin dashboard for product management
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Order tracking with status updates
- [ ] Product comparison feature
- [ ] Recently viewed products

### AI Enhancements
- [ ] Hybrid filtering (collaborative + content-based)
- [ ] Deep learning recommendation model
- [ ] Context-aware recommendations (time, location)
- [ ] A/B testing framework for algorithms
- [ ] Recommendation diversity algorithms
- [ ] Explainable AI for recommendations

### Technical Improvements
- [ ] TypeScript migration
- [ ] GraphQL API alternative
- [ ] Real-time features with WebSockets
- [ ] Progressive Web App (PWA)
- [ ] Server-side rendering (SSR)
- [ ] Comprehensive E2E testing
- [ ] CI/CD pipeline
- [ ] Monitoring and logging infrastructure
- [ ] Performance optimization and caching strategies
- [ ] Kubernetes deployment configuration

---

**Author**: Francesco di Biase
**Website**: [francescodibiase.com](https://www.francescodibiase.com)
**LinkedIn**: [francescodibiase79](https://www.linkedin.com/in/francescodibiase79/)
**Last Updated**: February 6, 2025
