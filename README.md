# Career Guidance College Listing Web App

## Overview
This is a single-page application (SPA) designed to connect prospective students with college information based on location preferences (India/Abroad). The application provides tools for college exploration, direct application links, and a simulated aptitude test to help students in their college selection process.

The application features a dual login system for administrators and students, with distinct functionalities for each user type.

## 🚀 Key Features

### For Students
- **Location-based College Search**: Filter colleges based on location preferences (India/Abroad)
- **College Information**: View detailed information about colleges including rankings, eligibility criteria, scholarships, and placement statistics
- **Direct Application Links**: Access official college websites directly from the application
- **Aptitude Test**: Take a simulated aptitude test with scores saved for future reference

### For Administrators
- **College Management Dashboard**: Add, view, and manage college data
- **Data Fields**: Manage college information including name, location, ranking, eligibility, scholarships, placement statistics, and application URLs
- **User Management**: Oversee student accounts and application data

## 🛠️ Technology Stack
- **Frontend**: HTML5, CSS3 (Tailwind CSS Framework), Vanilla JavaScript
- **Backend**: Firebase (Authentication & Firestore Database)
- **Version**: Firebase SDK v8 (CDN hosted)

## 📁 Project Structure
```
/ (Project Root)
├── admin-dashboard.html
├── colleges.html
├── login.html
├── location.html
├── register.html
├── signup.html
├── aptitude.html
├── README.md
├── .gitignore
├── css/
│   ├── style.css
│   └── [additional CSS files]
└── js/
    ├── admin-dashboard.js
    └── firebase-config.js
```

## ⚙️ Setup and Configuration

### Firebase Configuration
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Register your web application in the Firebase project settings
3. Replace the placeholder configuration in `js/firebase-config.js` with your actual Firebase project credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### Default Authentication Credentials

how to login/signup the project?

1-signup.html ->select,create account with your email and password,wait for second for account creation.

2-after signup,you will be directed to login pages.

3-In login page ,firstly select admin,then login with same email which you used to signup.
4-Filled the detail of the your colleges,but in Location (india,Abroad),not like up,usa ,only fill the  india,Abroad.

5-after successfull colleges add to list,
then came back to login page 

6- try to select the student ,then login same you signup,then you clearly see the result.



### Firestore Security Rules
Configure your Firestore rules to ensure proper access control:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Colleges collection - allow read access for students
    match /colleges/{document} {
      allow read: if true; // or restrict to authenticated users
      allow write: if request.auth.token.admin == true;
    }
    
    // Aptitude scores collection - allow read/write for authenticated users
    match /aptitude_scores/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Data Consistency
The location field is stored and queried in lowercase to ensure consistency across the application.



## 🔐 User Roles and Permissions

| Role | Permissions |
|------|-------------|
| Student | View college listings, take aptitude tests, access college websites |
| Administrator | All student permissions + add/manage college data |

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support
For support, email [your-email@example.com] or open an issue in the repository.