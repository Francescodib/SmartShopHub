# SmartShop Hub

An AI-powered e-commerce platform with personalized product recommendations using Collaborative Filtering.

## Overview

SmartShop Hub is a modern e-commerce application that leverages artificial intelligence to provide personalized product recommendations to users. The platform uses a collaborative filtering algorithm to analyze user behavior and suggest products based on similar users' preferences.

## Features

### Core E-commerce Functionality
- **Product Catalog**: Browse 100+ electronics and gadgets
- **Advanced Filtering**: Filter by category, brand, price range, and search
- **Shopping Cart**: Add, update, and remove products
- **Secure Checkout**: Complete order placement with shipping details
- **Order History**: View past orders and track status
- **User Authentication**: JWT-based secure login and registration

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

- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn

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
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smartshop-hub
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

   Frontend (.env):
   ```bash
   cd ../frontend
   cp .env.example .env
   ```

   Edit `frontend/.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

5. **Seed the database**
   ```bash
   cd backend
   npm run seed
   ```

   This will create:
   - 100+ products (electronics category)
   - 60 users
   - 600 interactions

6. **Start the application**

   In one terminal (Backend):
   ```bash
   cd backend
   npm run dev
   ```

   In another terminal (Frontend):
   ```bash
   cd frontend
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

## Usage

### Demo Account

You can use these demo credentials to test the application:

```
Email: john.smith0@example.com
Password: password123
```

### Testing Recommendations

1. **Enable Tracking**: Log in and go to Profile → Settings
2. **Browse Products**: View and interact with different products
3. **See Recommendations**: Visit the home page to see personalized suggestions
4. **Purchase Products**: Complete a purchase to increase recommendation accuracy

## Project Structure

```
smartshop-hub/
├── backend/
│   ├── src/
│   │   ├── ai/
│   │   │   ├── recommendation-engine.js
│   │   │   └── data-tracking.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   │   └── seed-database.js
│   │   ├── utils/
│   │   └── server.js
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── docs/
│   └── AI_MODEL_DOCUMENTATION.md
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/preferences` - Update user preferences

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories/list` - Get categories
- `GET /api/products/brands/list` - Get brands
- `GET /api/products/featured/list` - Get featured products

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

### Recommendations (AI)
- `GET /api/recommendations` - Get personalized recommendations
- `GET /api/recommendations/popular` - Get popular products
- `GET /api/recommendations/similar/:id` - Get similar products
- `POST /api/recommendations/track` - Track user interaction
- `GET /api/recommendations/history` - Get interaction history

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

## AI Recommendation System

The recommendation engine uses **User-Based Collaborative Filtering**. See [AI_MODEL_DOCUMENTATION.md](docs/AI_MODEL_DOCUMENTATION.md) for detailed information about:

- Algorithm explanation
- Data collection and processing
- Performance optimization
- Metrics and evaluation

## Deployment

### Production Build

1. **Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm run build
   ```

### Environment Variables (Production)

Update environment variables for production:
- Use production MongoDB URI (e.g., MongoDB Atlas)
- Generate strong JWT secret
- Set NODE_ENV=production
- Configure CORS for production domain

## Contributing

This is a learning project for a web development course. Contributions are welcome for educational purposes.

## License

MIT License

## Acknowledgments

- Built as part of a Web Development with AI course
- Utilizes modern web development best practices
- Implements GDPR-compliant data tracking
