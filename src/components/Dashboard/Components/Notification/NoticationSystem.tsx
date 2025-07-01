// Additional imports for Notification types
import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { dbFirestore, dbRealtime } from './../../../../Firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, onValue, update } from 'firebase/database';
import NotificationItem from './NotificationItem';
//@ts-ignore
import styles from './css/notification-system.module.css';

interface Notification {
  id: string | number;
  content: string;
  isRead: boolean;
  timestamp: string;
  username: string;
  userId: string;
  source: 'firestore' | 'realtime';
  type: 'transactions' | 'general'; // New property
}

interface NotificationSystemProps {
  userId: string;
}

export default function NotificationSystem({ userId }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = async () => {
    await Promise.all(notifications.map(n => markAsRead(n.id, n.source)));
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markAsRead = async (id: string | number, source: 'firestore' | 'realtime') => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));

    if (source === 'firestore') {
      const notificationDocRef = doc(dbFirestore, `notifications/${userId}/transactions`, id as string);
      await updateDoc(notificationDocRef, { isRead: true });
    } else if (source === 'realtime') {
      const notificationRef = ref(dbRealtime, `notifications/${userId}/transactions/${id}`);
      await update(notificationRef, { isRead: true });
    }
  };

  const fetchFirestoreNotifications = async (type: 'transactions' | 'general') => {
    const collectionPath = `notifications/${userId}/${type}`;
    const querySnapshot = await getDocs(collection(dbFirestore, collectionPath));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().message,
      isRead: doc.data().isRead || false,
      timestamp: new Date(doc.data().timestamp).toLocaleString(),
      username: doc.data().username,
      userId: doc.data().userId,
      source: 'firestore',
      type
    }));
  };

  const fetchRealtimeDatabaseNotifications = (type: 'transactions' | 'general') => {
    const notificationsRef = ref(dbRealtime, `notifications/${userId}/${type}`);
    return new Promise<Notification[]>((resolve) => {
      onValue(notificationsRef, (snapshot) => {
        const data = snapshot.val();
        const realtimeNotifications: Notification[] = [];

        if (data) {
          Object.keys(data).forEach(notificationId => {
            const notificationData = data[notificationId];
            realtimeNotifications.push({
              id: notificationId,
              content: notificationData.message,
              isRead: notificationData.isRead || false,
              timestamp: new Date(notificationData.timestamp).toLocaleString(),
              username: notificationData.username,
              userId: notificationData.userId,
              source: 'realtime',
              type
            });
          });
        }

        resolve(realtimeNotifications);
      });
    });
  };

  const fetchAllNotifications = async () => {
    const [firestoreTransactions, firestoreGeneral] = await Promise.all([
      fetchFirestoreNotifications('transactions'),
      fetchFirestoreNotifications('general')
    ]);
    
    const [realtimeTransactions, realtimeGeneral] = await Promise.all([
      fetchRealtimeDatabaseNotifications('transactions'),
      fetchRealtimeDatabaseNotifications('general')
    ]);

    const combinedNotifications = [
      ...firestoreTransactions,
      ...firestoreGeneral,
      ...realtimeTransactions,
      ...realtimeGeneral
    ];

    const sortedNotifications = combinedNotifications.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setNotifications(sortedNotifications);
  };

  useEffect(() => {
    fetchAllNotifications();

    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userId]);

  return (
    <div className={styles.container}>
      <button 
        className={styles.bellButton} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className={styles.bellIcon} />
        {unreadCount > 0 && (
          <span className={styles.badge}>{unreadCount}</span>
        )}
      </button>
      {isOpen && (
        <div className={styles.popover} ref={popoverRef}>
          <div className={styles.header}>
            <h2 className={styles.title}>Notifications</h2>
            <button className={styles.markReadButton} onClick={markAllAsRead}>
              Mark all as read
            </button>
          </div>
          <div className={styles.notificationList}>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={() => markAsRead(notification.id, notification.source)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
