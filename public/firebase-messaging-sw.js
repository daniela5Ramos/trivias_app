importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDTR2uPU3EQJyuTEBApIZJxZULBjbKK09k",
  authDomain: "test-push-cc9bd.firebaseapp.com",
  projectId: "test-push-cc9bd",
  storageBucket: "test-push-cc9bd.firebasestorage.app",
  messagingSenderId: "859424279036",
  appId: "1:859424279036:web:e50ff0876eecce12cb0a79",
  measurementId: "G-EFCWZQJZ3J"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje en segundo plano:', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, { body, icon });
});

