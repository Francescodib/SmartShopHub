# SmartShop Hub

An AI-powered e-commerce platform with personalized product recommendations using Collaborative Filtering.

## Overview

SmartShop Hub is a demonstration project showcasing modern e-commerce development with integrated artificial intelligence. The platform uses a collaborative filtering algorithm to analyze user behavior and provide personalized product recommendations based on similar users' preferences.

This project demonstrates:
- Full-stack web development (React + Node.js + MongoDB)
- AI/ML integration for real-world applications
- RESTful API design and documentation
- GDPR-compliant data handling
- Modern UI/UX with responsive design
- Automated testing and code quality

## Features

### Core E-commerce Functionality
- **Product Catalog**: Browse 100+ electronics and gadgets
- **Advanced Filtering**: Filter by category, brand, price range, and search
- **Active Filters Display**: Visual badges showing applied filters with one-click removal
- **Shopping Cart**: Add, update, and remove products
- **Secure Checkout**: Complete order placement with shipping details
- **Order History**: View past orders and track status
- **User Authentication**: JWT-based secure login and registration

### Enhanced Navigation & UX
- **Dynamic Breadcrumbs**: Smart navigation showing category and product name
- **Category Dropdown**: Quick access to all product categories from navbar
- **Search Functionality**: Real-time product search integrated in navbar
- **Mobile-Optimized**: Responsive hamburger menu with full navigation
- **Comprehensive Footer**: Professional footer with links, contact info, and social media

### AI-Powered Features
- **Personalized Recommendations**: AI-driven product suggestions based on user behavior
- **Similar Products**: Find related items using collaborative filtering
- **Behavioral Tracking**: Track views, clicks, add-to-cart, and purchases (GDPR compliant)
- **Cold Start Handling**: Popular products for new users
- **Real-time Learning**: Recommendations improve as users interact

### Privacy & Compliance
- **GDPR Compliant**: User consent for data tracking
- **Data Anonymization**: Automatic data expiration after 180 days
- **Privacy Controls**: Users can enable/disable personalized recommendations

## Tech Stack

### Backend
- **Node.js** + **Express**: RESTful API server
- **MongoDB**: NoSQL database for flexible data storage
- **JWT**: Secure authentication
- **Swagger**: API documentation
- **Jest**: Unit testing
- **Docker**: Containerized database deployment

### Frontend
- **React**: Component-based UI framework
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first styling
- **Axios**: HTTP client
- **React Hot Toast**: Notifications

### AI/ML
- **Collaborative Filtering**: User-based recommendation algorithm
- **Cosine Similarity**: Calculate user similarity scores
- **Caching**: Performance optimization for recommendations

## Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Docker Desktop** (recommended) OR MongoDB v5+ installed locally
- **npm** or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartshop-hub
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Backend (.env):
   ```bash
   cd backend
   cp .env.example .env
   ```

   Edit `backend/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/smartshop-hub
   JWT_SECRET=your-super-secret-jwt-key-change-this
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   RECOMMENDATION_CACHE_TTL=3600
   MIN_INTERACTIONS_FOR_RECOMMENDATIONS=3
   ```

   Frontend (.env):
   ```bash
   cd ../frontend
   cp .env.example .env
   ```

   Edit `frontend/.env`:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_NAME=SmartShop Hub
   ```

### Database Setup

#### Option A: Docker (Recommended)

The easiest way to run MongoDB is using Docker:

```bash
# Start MongoDB with Docker Compose
docker-compose up -d

# Verify MongoDB is running
docker-compose ps

# View MongoDB logs
docker-compose logs -f mongodb
```

**Mongo Express (Web UI)** is included and accessible at:
- URL: http://localhost:8081
- Username: `admin`
- Password: `admin123`

**Docker Commands:**
```bash
# Stop MongoDB
docker-compose down

# Stop and remove data (fresh start)
docker-compose down -v

# Restart MongoDB
docker-compose restart mongodb
```

#### Option B: Local MongoDB

If you prefer to run MongoDB locally:

```bash
# Windows
mongod

# Or as Windows service
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Seed the Database

Populate the database with sample data:

```bash
cd backend
npm run seed
```

This creates:
- **120 products** (electronics: laptops, smartphones, headphones, etc.)
- **60 users** with diverse preferences
- **600 interactions** (views, clicks, cart additions, purchases)

Expected output:
```
✅ Created 120 products
✅ Created 60 users
✅ Created 600 interactions
```

### Start the Application

#### Option 1: Concurrent (Single Command)

```bash
# From project root
npm run dev
```

#### Option 2: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
🚀 Server running on port 5000
📚 API Documentation: http://localhost:5000/api-docs
🏥 Health Check: http://localhost:5000/health
MongoDB Connected: localhost
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Browser opens automatically at http://localhost:3000

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs (Swagger UI)
- **MongoDB Web UI**: http://localhost:8081 (if using Docker)

## Screenshots

### Homepage with AI Recommendations
![Homepage](docs/screenshots/homepage.png)
*Main page featuring personalized product recommendations and highlighted categories*

### Product Catalog with Active Filters
![Active Filters](docs/screenshots/active-filters.png)
*Color-coded filter badges (Search, Category, Brand, Price) with individual removal buttons*

### Product Detail with Dynamic Breadcrumbs
![Product Detail](docs/screenshots/product-detail.png)
*Complete product information with smart breadcrumbs: Home > Products > Category > Product Name*

### Dynamic Breadcrumbs Navigation
![Breadcrumbs](docs/screenshots/breadcrumbs.png)
*Contextual navigation showing current location with clickable category links*

### Shopping Cart
![Shopping Cart](docs/screenshots/cart.png)
*Cart management with quantity controls, item removal, and order summary*

### User Profile & Privacy Settings
![Profile Settings](docs/screenshots/profile-settings.png)
*User dashboard with order history and privacy controls for AI tracking*

### Mobile Responsive Design
![Mobile View](docs/screenshots/mobile-responsive.png)
*Fully responsive layout with hamburger menu and touch-optimized interface*

### API Documentation (Swagger UI)
![API Docs](docs/screenshots/api-docs.png)
*Interactive API documentation with all endpoints and request/response schemas*

## Usage

### Demo Account

Test the application with these pre-seeded credentials:

```
Email: demo@example.com
Password: password123
```

### Testing AI Recommendations

1. **Enable Tracking**: Log in → Profile → Settings → Enable personalized recommendations
2. **Browse Products**: View 5-10 different products to generate interaction data
3. **Add to Cart**: Add 2-3 products to your cart
4. **See Recommendations**: Return to homepage to see personalized "Recommended For You" section
5. **Similar Products**: View any product detail page to see "You May Also Like" suggestions

### Privacy Controls

- Navigate to **Profile → Settings**
- Toggle **"Enable Personalized Recommendations"**
- When disabled: System shows popular products instead of personalized ones
- Users can enable/disable at any time

## Project Structure

```
smartshop-hub/
├── backend/
│   ├── src/
│   │   ├── ai/                    # AI recommendation engine
│   │   │   ├── recommendation-engine.js
│   │   │   └── data-tracking.js
│   │   ├── config/                # App configuration
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   ├── controllers/           # Request handlers
│   │   ├── middleware/            # Auth, validation, errors
│   │   ├── models/                # MongoDB schemas
│   │   ├── routes/                # API endpoints
│   │   ├── scripts/               # Utility scripts
│   │   │   └── seed-database.js
│   │   ├── utils/                 # Helper functions
│   │   └── server.js              # Express app entry
│   ├── tests/                     # Jest unit tests
│   ├── .env.example
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/            # Reusable components
│   │   ├── config/                # API configuration
│   │   ├── context/               # React Context (Auth, Cart)
│   │   ├── pages/                 # Route pages
│   │   ├── services/              # API service layer
│   │   ├── App.js                 # Main app + routing
│   │   ├── index.css              # Tailwind styles
│   │   └── index.js               # React entry point
│   ├── .env.example
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
├── docs/
│   └── AI_MODEL_DOCUMENTATION.md  # Detailed AI explanation
├── docker-compose.yml             # MongoDB + Mongo Express
├── .gitignore
├── README.md
└── package.json                   # Root scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/preferences` - Update user preferences

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get all categories
- `GET /api/products/brands/list` - Get all brands
- `GET /api/products/featured/list` - Get featured products

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

### Recommendations (AI)
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/popular` - Get popular products
- `GET /api/recommendations/similar/:id` - Get similar products
- `POST /api/recommendations/track` - Track user interaction
- `GET /api/recommendations/history` - Get interaction history

Full API documentation available at: http://localhost:5000/api-docs

## Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Test Coverage
```bash
cd backend
npm test -- --coverage
```

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Shopping cart operations
- [ ] Checkout and order creation
- [ ] AI recommendations (with tracking enabled)
- [ ] Popular products (with tracking disabled)
- [ ] Profile and order history
- [ ] Privacy settings toggle

## AI Recommendation System

The recommendation engine uses **User-Based Collaborative Filtering** with cosine similarity.

### How It Works

1. **Data Collection**: Tracks user interactions (views, clicks, cart, purchases)
2. **Similarity Calculation**: Finds users with similar behavior patterns
3. **Recommendation Generation**: Suggests products liked by similar users
4. **Continuous Learning**: Updates recommendations as new interactions occur

### Key Features

- **Weighted Interactions**: Purchase (5) > Add to Cart (3) > Click (2) > View (1)
- **Cold Start Handling**: Popular products for new users
- **Performance**: 1-hour caching, MongoDB indexing
- **Privacy**: GDPR compliant, user consent required

For detailed algorithm explanation, see [AI_MODEL_DOCUMENTATION.md](docs/AI_MODEL_DOCUMENTATION.md)

## Deployment

### Docker Deployment (Recommended)

The project includes Docker Compose configuration for easy deployment:

```bash
# Production deployment with Docker
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Manual Deployment

#### Backend

```bash
cd backend

# Build (if using TypeScript) - not needed for this project
# npm run build

# Start production server
NODE_ENV=production npm start
```

#### Frontend

```bash
cd frontend

# Create production build
npm run build

# Serve with static server (e.g., nginx, serve)
npx serve -s build -l 3000
```

### Environment Variables (Production)

Update these for production deployment:

**Backend:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/smartshop-hub
JWT_SECRET=generate-strong-random-secret-here
FRONTEND_URL=https://yourdomain.com
```

**Frontend:**
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### Production Checklist

- [ ] Use MongoDB Atlas or managed MongoDB instance
- [ ] Generate strong JWT secret (32+ characters)
- [ ] Configure CORS for production domain
- [ ] Enable HTTPS/SSL
- [ ] Set up proper logging and monitoring
- [ ] Configure rate limiting
- [ ] Enable production error tracking

## Database Management

### Backup MongoDB Data

```bash
# With Docker
docker exec smartshop-mongodb mongodump --db=smartshop-hub --out=/data/backup
docker cp smartshop-mongodb:/data/backup ./backup

# Local MongoDB
mongodump --db=smartshop-hub --out=./backup
```

### Restore MongoDB Data

```bash
# With Docker
docker cp ./backup smartshop-mongodb:/data/backup
docker exec smartshop-mongodb mongorestore --db=smartshop-hub /data/backup/smartshop-hub

# Local MongoDB
mongorestore --db=smartshop-hub ./backup/smartshop-hub
```

### Reset Database

```bash
# Re-run seed script
cd backend
npm run seed
```

## Troubleshooting

### MongoDB Connection Issues

**Docker:**
```bash
# Check if container is running
docker-compose ps

# Restart MongoDB
docker-compose restart mongodb

# View logs
docker-compose logs mongodb
```

**Local:**
```bash
# Check if MongoDB is running
# Windows
tasklist | findstr mongod

# macOS/Linux
ps aux | grep mongod
```

### Port Already in Use

```bash
# Check what's using port 5000 (Windows)
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill //F //PID <PID>

# macOS/Linux
lsof -ti:5000 | xargs kill -9
```

### Breadcrumbs Not Loading

If breadcrumbs show "Loading..." indefinitely on product detail pages:

**Symptoms:**
- Breadcrumbs stuck on "Loading..."
- Product page displays correctly but navigation doesn't update

**Solutions:**
1. **Check Backend Status**: Ensure backend is running on port 5000
   ```bash
   curl http://localhost:5000/health
   ```

2. **Verify Database Connection**: MongoDB should be accessible
   ```bash
   docker-compose ps  # if using Docker
   ```

3. **Clear Browser Cache**: Hard refresh the page
   - Windows/Linux: `Ctrl + Shift + R`
   - macOS: `Cmd + Shift + R`

4. **Check Console Errors**: Open browser DevTools (F12) and check for API errors

5. **Test API Endpoint**: Verify the product API responds correctly
   ```bash
   curl http://localhost:5000/api/products/<product-id>
   ```

**Expected API Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Product Name",
    "category": "category-name",
    ...
  }
}
```

**Common Issue**: If the API returns data in a different structure, breadcrumbs won't parse it correctly. The component expects `response.data.data.name` and `response.data.data.category`.

### Category Dropdown Not Updating Products

If clicking a category in the navbar dropdown doesn't update the product list when already on `/products` page:

**Symptoms:**
- Dropdown menu works on other pages
- On products page, clicking categories doesn't filter results
- URL doesn't update or filters don't apply

**Solutions:**
1. **Hard Refresh**: Clear component state with `Ctrl + Shift + R`

2. **Check URL**: After clicking, URL should update to `/products?category=<category-name>`

3. **Verify Active Filters**: Filter badges should appear above the product grid

4. **Clear Local Storage**: Sometimes cached state interferes
   ```javascript
   // In browser console (F12)
   localStorage.clear()
   sessionStorage.clear()
   ```

**Technical Note**: The Products component uses React Router's `useSearchParams` hook to synchronize filters with URL parameters. Changes are reflected in real-time.

### Active Filters Not Displaying

If filter badges don't appear even when filters are applied:

**Check:**
1. URL parameters are present: `/products?category=laptops`
2. Browser console for JavaScript errors
3. Filters state in React DevTools

**Fix**: The `hasActiveFilters` variable should be true when any filter is active. Check that filters are properly set in component state.

### Frontend Build Issues

```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# If build fails
npm run build -- --verbose
```

## Contributing

This is a demonstration project showcasing full-stack development with AI integration. Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Use as learning reference
- Fork for your own projects

## License

MIT License - feel free to use this project for learning, portfolio, or commercial purposes.

## Project Highlights

This project demonstrates:

✅ **Full-stack Development**: Complete MERN stack implementation
✅ **AI Integration**: Real-world machine learning application
✅ **API Design**: RESTful architecture with Swagger documentation
✅ **Modern Frontend**: React with hooks, context, and responsive design
✅ **Security**: JWT authentication, password hashing, CORS
✅ **Privacy**: GDPR-compliant data tracking with user consent
✅ **Testing**: Unit tests with Jest
✅ **DevOps**: Docker containerization, environment configuration
✅ **Code Quality**: Clean code, comments, documentation
✅ **Best Practices**: Industry-standard patterns and architecture

## Author

**Francesco di Biase**

Full-Stack Developer specializing in AI-powered web applications.

- 💼 [LinkedIn](https://www.linkedin.com/in/francescodibiase79/)
- 📧 Contact me via LinkedIn for questions or collaboration opportunities

### About This Project

This project is part of a portfolio demonstrating modern web development capabilities and AI integration skills.

**Resources:**
- 📚 Check the `/api-docs` endpoint for interactive API exploration
- 🤖 Review [`docs/AI_MODEL_DOCUMENTATION.md`](docs/AI_MODEL_DOCUMENTATION.md) for detailed AI implementation
- 📖 See [`docs/FEATURES.md`](docs/FEATURES.md) for comprehensive feature documentation
- 📝 Read [`CHANGELOG.md`](CHANGELOG.md) for version history and updates

---

**Built with:** Node.js, React, MongoDB, Express, TailwindCSS, Docker
**Key Features:** AI Recommendations, E-commerce, GDPR Compliance, RESTful API
**Purpose:** Portfolio demonstration of full-stack + AI development skills
**Year:** 2025
