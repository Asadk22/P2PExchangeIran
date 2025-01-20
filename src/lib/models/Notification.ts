import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['new_trade', 'new_message', 'trade_update'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tradeId: {
    type: Schema.Types.ObjectId,
    ref: 'Trade',
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for better query performance
NotificationSchema.index({ userId: 1, createdAt: -1 });
NotificationSchema.index({ userId: 1, read: 1 });

export default mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
