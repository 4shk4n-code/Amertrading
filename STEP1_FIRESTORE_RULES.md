# STEP 1: Set Firestore Security Rules

## What to do:

1. Open your browser and go to: **https://console.firebase.google.com/**

2. Sign in with your Google account

3. Click on your project: **amer-trading**

4. In the left menu, click **"Firestore Database"**

5. Click the **"Rules"** tab at the top

6. **DELETE** everything in the rules editor

7. **COPY** and **PASTE** this exact code:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if resource.data.active == true;
      allow write: if false;
    }
    match /orders/{orderId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

8. Click the **"Publish"** button

9. Wait for the green message: "Rules published successfully"

✅ **DONE! Rules are set.**

---

**Tell me when you've completed Step 1, and I'll give you Step 2!**

