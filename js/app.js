// Registrar el Service Worker principal
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../sw.js')
        .then((registration) => {
            console.log('Service Worker registrado:', registration);

            // Inicializar Firebase Messaging
            import('https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js').then(({ initializeApp }) => {
                import('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js').then(({ getMessaging, getToken, onMessage }) => {
                    const firebaseConfig = {
                        apiKey: "AIzaSyDTR2uPU3EQJyuTEBApIZJxZULBjbKK09k",
                        authDomain: "test-push-cc9bd.firebaseapp.com",
                        projectId: "test-push-cc9bd",
                        storageBucket: "test-push-cc9bd.firebasestorage.app",
                        messagingSenderId: "859424279036",
                        appId: "1:859424279036:web:e50ff0876eecce12cb0a79",
                        measurementId: "G-EFCWZQJZ3J"
                    };

                    // Inicializar Firebase
                    const app = initializeApp(firebaseConfig);
                    const messaging = getMessaging(app);

                    // Solicitar permiso de notificación
                    Notification.requestPermission()
                        .then((permission) => {
                            if (permission === 'granted') {
                                console.log('Permiso de notificación otorgado');

                                // Obtener el token de FCM
                                getToken(messaging, { vapidKey: 'BPqLtyEQs3QyRgR6LWLb4qmxZLx9OmJVhZ5IWk8kg1xkDzne2VSOa3SmWkHFE2OiJ7XeZIuELC5k-tmzbVh8KdQ' })
                                    .then((currentToken) => {
                                        if (currentToken) {
                                            console.log('Token de notificación FCM:', currentToken);
                                            // Enviar el token al backend o usarlo según tu lógica
                                        } else {
                                            console.warn('No se obtuvo un token.');
                                        }
                                    })
                                    .catch((err) => console.error('Error al obtener el token de FCM:', err));
                            } else {
                                console.warn('Permiso de notificación denegado.');
                            }
                        });

                    // Manejar mensajes en primer plano
                    onMessage(messaging, (payload) => {
                        console.log('Mensaje recibido en primer plano:', payload);
                        const { title, body, icon } = payload.notification;
                        new Notification(title, { body, icon });
                    });
                });
            });
        })
        .catch((error) => console.error('Error al registrar el Service Worker:', error));
}
