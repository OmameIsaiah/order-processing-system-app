import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private currentId = 0;

  constructor() {}

  showNotification(message: string, type: 'success' | 'error') {
    const notification: Notification = {
      id: this.currentId++,
      message,
      type,
    };

    // Add the new notification
    this.notificationsSubject.next([...this.notificationsSubject.value, notification]);

    // Automatically remove the notification after 10 seconds
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 10000);
  }

  removeNotification(id: number) {
    const updatedNotifications = this.notificationsSubject.value.filter(
      (notification) => notification.id !== id
    );
    this.notificationsSubject.next(updatedNotifications);
  }
}