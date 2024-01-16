importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
	'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
	apiKey: "AIzaSyDBAqcnfCocQO1n0d02sm72gU00CzbJfKk",
    authDomain: "angular-bios.firebaseapp.com",
    projectId: "angular-bios",
    storageBucket: "angular-bios.appspot.com",
    messagingSenderId: "48115962748",
    appId: "1:48115962748:web:c42ac33932649b2d670af9",
    measurementId: "G-X5T5W82WRK"
});

const messaging = firebase?.messaging?.isSupported()
	? firebase.messaging()
	: null;