BrightAd - Multi-page demo with Firebase integration (client-side)

Files in this package:
- index.html, about.html, contact.html, post.html, login.html, signup.html, admin.html
- style.css
- firebase-config.js   (put your Firebase config object into this file)
- script.js            (loads public ads)
- auth.js              (signup/login handlers)
- post.js              (handles ad creation & image upload)
- admin.js             (admin dashboard to approve/delete ads)
- README.txt

Setup steps (quick):
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication -> Email/Password.
3. Enable Firestore database (in production choose proper rules).
4. Enable Storage for image uploads.
5. Open firebase-config.js and set window.firebaseConfig = { your config values } before initFirebase runs.
6. Upload files to a static host (GitHub Pages, Netlify, or your own server).
7. To make an admin: in Firestore create collection 'users' and set document with uid and field isAdmin=true, or edit the created user document after signup.

Security notes:
- This demo uses client-side checks for admin (isAdmin flag in Firestore). For production, secure admin actions via Cloud Functions and server-side permissions.
- Firestore rules should be configured to restrict writes/approvals to admins only.
