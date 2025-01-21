import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const tradeSchema = new mongoose.Schema({
  trade: {
    type: mongoose.Schema.Types.ObjectId,
    enum:{},
    ref: 'Trade', // Reference to the 'Trade' model
  },
  type: {
    type: String,
    enum: ['buy', 'sell'],
    required: true
  },
  // Support both old and new schema
  assetType: {
    type: String,
    enum: ['BTC', 'ETH', 'USDT'],
  },
  cryptocurrency: {
    type: String,
    enum: ['BTC', 'ETH', 'USDT'],
  },
  amount: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  terms: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['open', 'active', 'in_progress', 'completed', 'cancelled'],
    default: 'open'
  },
  // Support both old and new schema
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [messageSchema]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      // Convert old schema to new schema
      if (ret.cryptocurrency && !ret.assetType) {
        ret.assetType = ret.cryptocurrency;
        delete ret.cryptocurrency;
      }
      if (ret.userId && !ret.seller) {
        ret.seller = ret.userId;
        delete ret.userId;
      }

      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Create indexes for better query performance
tradeSchema.index({ seller: 1 });
tradeSchema.index({ userId: 1 });
tradeSchema.index({ buyer: 1 });
tradeSchema.index({ status: 1 });
tradeSchema.index({ createdAt: -1 });

// Pre-save middleware to ensure either assetType or cryptocurrency is set
tradeSchema.pre('save', function(next) {
  if (!this.assetType && !this.cryptocurrency) {
    next(new Error('Either assetType or cryptocurrency must be set'));
  }
  if (!this.seller && !this.userId) {
    next(new Error('Either seller or userId must be set'));
  }
  // this.updatedAt = new Date();
  next();
});

// Delete existing model if it exists to prevent the index error
if (mongoose.models.Trade) {
  delete mongoose.models.Trade;
}

const Trade = mongoose.model('Trade', tradeSchema);

export default Trade;
