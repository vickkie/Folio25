// @ts-nocheck
import React from 'react';
import styles from './css/notification-item.module.css';

interface Notification {
  id: number;
  content: string;
  isRead: boolean;
  timestamp: string;
}

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
  return (
    <div 
   key={notification.id}
      className={`${styles.item} ${notification.isRead ? styles.read : styles.unread}`}
      onClick={onRead}
    >
      <p className={styles.content}>{notification.content}</p>
      <span className={styles.timestamp}>{notification.timestamp}</span>
    </div>
  );
}

export default NotificationItem;