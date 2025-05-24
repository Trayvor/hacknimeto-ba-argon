self.addEventListener('push', function (event) {
    const payload = event.data.json();
    event.waitUntil(
        self.registration.showNotification(payload.title, {
            body: payload.body,
            icon: payload.icon,
            badge: payload.badge,
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    const notificationEvent = event;
    notificationEvent.notification.close();
    event.waitUntil(clients.openWindow('http://147.232.182.163:4173'));
});
