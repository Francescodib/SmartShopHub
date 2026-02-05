import { describe, test, expect, beforeAll } from '@jest/globals';
import recommendationEngine from '../src/ai/recommendation-engine.js';

describe('Recommendation Engine', () => {
  describe('Cosine Similarity Calculation', () => {
    test('should calculate similarity between identical users', () => {
      const userA = { product1: 5, product2: 3, product3: 4 };
      const userB = { product1: 5, product2: 3, product3: 4 };

      const similarity = recommendationEngine.calculateCosineSimilarity(userA, userB);

      expect(similarity).toBeCloseTo(1.0, 2);
    });

    test('should calculate similarity between different users', () => {
      const userA = { product1: 5, product2: 3 };
      const userB = { product1: 3, product2: 5 };

      const similarity = recommendationEngine.calculateCosineSimilarity(userA, userB);

      expect(similarity).toBeGreaterThan(0);
      expect(similarity).toBeLessThan(1);
    });

    test('should return 0 for users with no common products', () => {
      const userA = { product1: 5, product2: 3 };
      const userB = { product3: 4, product4: 2 };

      const similarity = recommendationEngine.calculateCosineSimilarity(userA, userB);

      expect(similarity).toBe(0);
    });

    test('should handle empty user vectors', () => {
      const userA = {};
      const userB = { product1: 5 };

      const similarity = recommendationEngine.calculateCosineSimilarity(userA, userB);

      expect(similarity).toBe(0);
    });
  });

  describe('Find Similar Users', () => {
    test('should find similar users from interaction matrix', () => {
      const matrix = {
        user1: { product1: 5, product2: 3, product3: 4 },
        user2: { product1: 4, product2: 4, product3: 3 },
        user3: { product4: 5, product5: 2 }
      };

      const similarUsers = recommendationEngine.findSimilarUsers('user1', matrix, 2);

      expect(similarUsers).toHaveLength(2);
      expect(similarUsers[0].userId).toBe('user2');
      expect(similarUsers[0].similarity).toBeGreaterThan(0);
    });

    test('should return empty array for user not in matrix', () => {
      const matrix = {
        user1: { product1: 5 }
      };

      const similarUsers = recommendationEngine.findSimilarUsers('user999', matrix);

      expect(similarUsers).toHaveLength(0);
    });

    test('should limit results to k users', () => {
      const matrix = {
        user1: { product1: 5 },
        user2: { product1: 4 },
        user3: { product1: 3 },
        user4: { product1: 2 },
        user5: { product1: 1 }
      };

      const similarUsers = recommendationEngine.findSimilarUsers('user1', matrix, 2);

      expect(similarUsers).toHaveLength(2);
    });
  });

  describe('Cache Management', () => {
    test('should clear user cache', () => {
      const userId = 'test-user-123';

      // Clear cache should not throw error
      expect(() => {
        recommendationEngine.clearUserCache(userId);
      }).not.toThrow();
    });

    test('should clear all cache', () => {
      expect(() => {
        recommendationEngine.clearAllCache();
      }).not.toThrow();
    });
  });
});
