import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  trade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trade',
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Create compound index for efficient queries
messageSchema.index({ trade: 1, createdAt: 1 });

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
