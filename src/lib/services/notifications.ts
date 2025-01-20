export function sendNotification(notification: any) {
  // This function will be called by the notifications route
  // The actual notification sending is handled by the Socket.IO server
  if (global.io) {
    global.io.emit('notification', notification);
  }
}
