# AI Recommendation System Documentation

## Overview

SmartShop Hub uses a **User-Based Collaborative Filtering** algorithm to provide personalized product recommendations. The system analyzes user behavior patterns and finds similarities between users to suggest products.

## Table of Contents

1. [Algorithm Description](#algorithm-description)
2. [Data Collection](#data-collection)
3. [Recommendation Process](#recommendation-process)
4. [Performance Optimization](#performance-optimization)
5. [Privacy & Compliance](#privacy--compliance)
6. [Metrics & Evaluation](#metrics--evaluation)
7. [Continuous Learning](#continuous-learning)

---

## Algorithm Description

### Collaborative Filtering

Collaborative filtering is a technique that makes predictions about a user's interests by collecting preferences from many users. The underlying assumption is that users who agreed in the past will agree in the future.

### User-Based Approach

Our implementation uses **user-based collaborative filtering**, which:

1. Finds users similar to the target user
2. Identifies products that similar users liked
3. Recommends those products to the target user

### Mathematical Foundation

#### Cosine Similarity

We calculate similarity between users using **cosine similarity**:

```
similarity(A, B) = (A · B) / (||A|| × ||B||)
```

Where:
- `A · B` is the dot product of user vectors
- `||A||` and `||B||` are the magnitudes of the vectors
- Result ranges from 0 (no similarity) to 1 (identical users)

**Example:**

```javascript
User A: { product1: 5, product2: 3, product3: 4 }
User B: { product1: 4, product2: 4, product3: 3 }

// Dot product: (5×4) + (3×4) + (4×3) = 44
// Magnitude A: √(5² + 3² + 4²) = √50 ≈ 7.07
// Magnitude B: √(4² + 4² + 3²) = √41 ≈ 6.40

// Similarity: 44 / (7.07 × 6.40) ≈ 0.97
```

#### Weighted Recommendations

Products are scored based on:

```
score(product) = Σ (similarity(user, neighbor) × interaction_weight(neighbor, product))
```

Where:
- `similarity` is the cosine similarity between users
- `interaction_weight` is the weight of the neighbor's interaction with the product

---

## Data Collection

### Interaction Types

The system tracks four types of user interactions:

| Type | Weight | Description |
|------|--------|-------------|
| `view` | 1 | User views product page |
| `click` | 2 | User clicks on product card |
| `add_to_cart` | 3 | User adds product to cart |
| `purchase` | 5 | User completes purchase |

### Why Different Weights?

Different interactions indicate different levels of interest:

- **View (1)**: Lowest signal - user might be browsing
- **Click (2)**: Moderate interest - user wants more details
- **Add to Cart (3)**: Strong interest - intent to purchase
- **Purchase (5)**: Strongest signal - actual transaction

### Interaction Schema

```javascript
{
  user: ObjectId,
  product: ObjectId,
  type: String, // 'view' | 'click' | 'add_to_cart' | 'purchase'
  weight: Number, // Calculated based on type
  metadata: {
    sessionId: String,
    source: String, // 'search' | 'recommendation' | 'category'
    duration: Number // Time spent viewing (seconds)
  },
  createdAt: Date // Auto-expires after 180 days
}
```

### GDPR Compliance

- **Consent Required**: Users must opt-in to tracking
- **Data Retention**: Interactions auto-delete after 180 days
- **Right to Deletion**: Users can request data removal
- **Anonymization**: No personally identifiable information in interactions

---

## Recommendation Process

### Step-by-Step Flow

#### 1. Build Interaction Matrix

Create a matrix of user-product interactions:

```
        Product1  Product2  Product3
User1      5         3         0
User2      4         0         5
User3      0         4         3
```

Values represent accumulated interaction weights.

#### 2. Calculate User Similarities

For each user pair, calculate cosine similarity:

```javascript
similarities = {
  user1: [
    { userId: 'user2', similarity: 0.85 },
    { userId: 'user3', similarity: 0.42 }
  ]
}
```

#### 3. Find K-Nearest Neighbors

Select the top K most similar users (default K=10):

```javascript
neighbors = findSimilarUsers(targetUser, matrix, k=10)
// Returns: [user2, user5, user7, ...] sorted by similarity
```

#### 4. Generate Recommendations

For each neighbor's products:

```javascript
scores = {}
for (neighbor of neighbors) {
  for (product of neighbor.interactions) {
    if (!targetUser.hasInteractedWith(product)) {
      scores[product] += neighbor.similarity × product.weight
    }
  }
}
```

#### 5. Rank and Return

Sort products by score and return top N:

```javascript
recommendations = sortByScore(scores).slice(0, limit)
```

### Cold Start Problem

For new users with insufficient data:

1. **Fallback to Popular Products**: Show trending items
2. **Threshold**: Minimum 3 interactions required for personalization
3. **Hybrid Approach**: Mix popular items with early personalization

### Example Scenario

**Target User**: Has purchased laptop and headphones

**Similar User Found**:
- Also purchased laptop (weight: 5)
- Also purchased headphones (weight: 5)
- Purchased smartphone (weight: 5)
- Similarity: 0.92

**Recommendation**: Smartphone
- Score: 0.92 × 5 = 4.6

---

## Performance Optimization

### 1. Caching Strategy

```javascript
cache = {
  key: 'recommendations:userId:limit',
  ttl: 3600 seconds (1 hour),
  invalidation: 'on new interaction'
}
```

**Benefits**:
- Reduces database queries
- Faster response times
- Scales better with more users

### 2. Batch Processing

- Interactions can be tracked in batches
- Reduces database writes
- Improves throughput

### 3. Indexing

MongoDB indexes on:
- `{ user: 1, createdAt: -1 }` - Fast user lookup
- `{ product: 1, type: 1 }` - Product statistics
- `{ user: 1, product: 1 }` - Duplicate prevention

### 4. Pre-computation

For very large datasets, consider:
- Pre-computing similarity matrices
- Scheduled batch updates
- Incremental learning

---

## Privacy & Compliance

### User Consent

```javascript
user.consentToTracking = true/false
```

- **Opt-in Required**: Tracking disabled by default
- **Granular Control**: Users can toggle anytime
- **Transparent**: Clear explanation of data usage

### Data Minimization

- Only essential data collected
- No sensitive personal information
- Interactions stored anonymously

### Data Retention

```javascript
createdAt: {
  type: Date,
  default: Date.now,
  expires: 60 * 60 * 24 * 180 // 180 days
}
```

- Automatic deletion after 6 months
- Complies with GDPR storage limitation

### Right to Be Forgotten

```javascript
await deleteUserInteractions(userId)
await clearUserCache(userId)
```

Users can request complete data deletion.

---

## Metrics & Evaluation

### Quality Metrics

#### 1. Precision
Percentage of recommended products that users interact with:

```
Precision = (Relevant Recommendations) / (Total Recommendations)
```

#### 2. Recall
Percentage of relevant products that were recommended:

```
Recall = (Relevant Recommendations) / (All Relevant Products)
```

#### 3. Coverage
Percentage of products that can be recommended:

```
Coverage = (Recommendable Products) / (Total Products)
```

### Performance Metrics

- **Response Time**: < 200ms for cached results
- **Cache Hit Rate**: Target > 80%
- **Scalability**: Handles 1000+ concurrent users

### Business Metrics

- **Click-Through Rate (CTR)**: Percentage of recommended products clicked
- **Conversion Rate**: Percentage of recommendations leading to purchases
- **Average Order Value**: Impact on revenue

---

## Continuous Learning

### Real-Time Updates

1. **New Interaction**:
   - Store in database
   - Clear user cache
   - Next request generates fresh recommendations

2. **Incremental Learning**:
   - No retraining needed
   - Recommendations update automatically
   - Scales with data growth

### Model Evolution

As more data accumulates:

1. **Better Similarity Scores**: More accurate user matching
2. **Improved Coverage**: Recommendations for more products
3. **Reduced Cold Start**: More historical data for new users

### Future Enhancements

Potential improvements:

1. **Hybrid Filtering**: Combine collaborative + content-based
2. **Deep Learning**: Neural networks for complex patterns
3. **Context Awareness**: Time, location, device factors
4. **A/B Testing**: Experiment with algorithm variations
5. **Diversity**: Prevent filter bubbles with diverse recommendations

---

## Technical Implementation

### Core Files

- `backend/src/ai/recommendation-engine.js` - Main algorithm
- `backend/src/ai/data-tracking.js` - Interaction tracking
- `backend/src/models/Interaction.js` - Data schema

### Key Functions

```javascript
// Generate recommendations
getRecommendations(userId, limit)

// Find similar products
getSimilarProducts(productId, limit)

// Track interaction
trackInteraction(userId, productId, type, metadata)

// Calculate similarity
calculateCosineSimilarity(userA, userB)

// Find neighbors
findSimilarUsers(userId, matrix, k)
```

### Integration Points

1. **Product Detail Page**: Track views
2. **Add to Cart**: Track cart additions
3. **Checkout**: Track purchases
4. **Home Page**: Display personalized recommendations
5. **Product Page**: Show similar products

---

## Conclusion

The SmartShop Hub recommendation system successfully implements collaborative filtering to provide personalized product suggestions. The system balances accuracy, performance, and privacy while continuously learning from user behavior.

### Key Strengths

✅ **Accurate**: Leverages proven collaborative filtering
✅ **Privacy-First**: GDPR compliant, user consent required
✅ **Scalable**: Caching and indexing for performance
✅ **Adaptive**: Real-time learning from interactions
✅ **Transparent**: Clear documentation and explainable results

### Success Criteria

The system achieves:
- Personalized recommendations based on user behavior ✓
- Real-time tracking and learning ✓
- Privacy compliance (GDPR) ✓
- Performance optimization (caching) ✓
- Scalable architecture ✓
- Comprehensive documentation ✓

---

**Last Updated**: February 2025
**Version**: 1.1.0
**Author**: Francesco di Biase
**Website**: [francescodibiase.com](https://www.francescodibiase.com)
**LinkedIn**: [francescodibiase79](https://www.linkedin.com/in/francescodibiase79/)
