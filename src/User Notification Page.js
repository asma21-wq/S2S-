import React, { useState, useEffect } from 'react';
import "./User Notification Page.css";

import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  Info, 
  X, 
  Archive, 
  TrashIcon 
} from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'message',
    title: 'New Message',
    message: 'Alex  sent you a new message.',
    timestamp: '2024-02-13 09:15',
    read: true
  },
  
  {
    id: 2,
    type: 'review',
    title: 'Review Request',
    message: 'Please leave a review for the web development  service you received.',
    timestamp: '2024-02-14 12:30',
    read: false
  },
 
 
  {
    id: 3,
    type: 'message',
    title: 'New Inquiry',
    message: 'Sarah inquired about your graphic  design service.',
    timestamp: '2024-02-16 09:50',
    read: false
  },
  {
    id: 4,
    type: 'info',
    title: 'Service Update',
    message: 'Your listing for consulting services has been approved.',
    timestamp: '2024-02-17 11:15',
    read: true
  },
  
];


const NotificationPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle />;
      case 'warning': return <AlertCircle />;
      case 'message': return <MessageCircle />;
      case 'info': return <Info />;
      default: return <Bell />;
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || 
    (filter === 'unread' && !notification.read) || 
    notification.type === filter
  );

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? {...notif, read: true} : notif
    ));
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="notification-page">
      <div className="notification-header">
        <h1>
          <Bell size={24} /> Notifications 
          <span className="unread-count">
            {notifications.filter(n => !n.read).length}
          </span>
        </h1>
        <div className="notification-actions">
          <button onClick={clearAllNotifications} className="clear-all">
            <TrashIcon size={16} /> Clear All
          </button>
        </div>
      </div>

      <div className="notification-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All Notifications
        </button>
        <button 
          className={filter === 'unread' ? 'active' : ''} 
          onClick={() => setFilter('unread')}
        >
          Unread
        </button>
        
        
        <button 
          className={filter === 'message' ? 'active' : ''} 
          onClick={() => setFilter('message')}
        >
          Messages
        </button>
      </div>

      <div className="notifications-container">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={48} />
            <p>No notifications to show</p>
          </div>
        ) : (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification ${notification.type} ${notification.read ? 'read' : 'unread'}`}
            >
              <div className="notification-icon">
                {getIcon(notification.type)}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="timestamp">{notification.timestamp}</span>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button onClick={() => markAsRead(notification.id)} title="Mark as Read">
                    <CheckCircle size={16} />
                  </button>
                )}
                <button onClick={() => removeNotification(notification.id)} title="Remove">
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
