import mongoose from 'mongoose';

/**
 * Interaction model tracks user behavior for AI recommendations
 * Types: view, click, add_to_cart, purchase
 * Used for collaborative filtering algorithm
 */
const interactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  type: {
    type: String,
    enum: ['view', 'click', 'add_to_cart', 'purchase'],
    required: true
  },
  weight: {
    type: Number,
    default: function() {
      // Different interaction types have different weights for AI
      const weights = {
        view: 1,
        click: 2,
        add_to_cart: 3,
        purchase: 5
      };
      return weights[this.type] || 1;
    }
  },
  metadata: {
    sessionId: String,
    source: String, // e.g., 'search', 'recommendation', 'category'
    duration: Number // time spent viewing (in seconds)
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 180 // Auto-delete after 180 days for privacy
  }
});

// Compound indexes for efficient queries
interactionSchema.index({ user: 1, createdAt: -1 });
interactionSchema.index({ product: 1, type: 1 });
interactionSchema.index({ user: 1, product: 1 });

const Interaction = mongoose.model('Interaction', interactionSchema);

export default Interaction;
