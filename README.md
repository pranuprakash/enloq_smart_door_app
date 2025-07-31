# Enloq Smart Door App 🚪📱

![image](https://github.com/shitiz4553/SmartDoorApp/assets/98811765/a891dd3a-4383-4cff-a19f-243bb7a29403)

A comprehensive React Native mobile application for managing smart door access control systems. This app enables users to control smart doors, manage guest access, and monitor door usage through QR code/NFC scanning.

## 🌟 Features

### 🔐 **Authentication & User Management**
- **User Registration**: Secure signup with email verification
- **Login System**: Firebase authentication integration
- **Profile Management**: Update user information and preferences
- **Premises Setup**: Configure and link premises to user accounts

### 🚪 **Smart Door Management**
- **Add Doors**: Link smart doors to your premises using Door ID
- **Door Configuration**: Set nicknames and manage door settings
- **Door Details**: View comprehensive door information and access history
- **Multi-Door Support**: Manage multiple smart doors from a single dashboard

### 👥 **Guest Access Control**
- **Guest Pass Generation**: Create temporary access passes for visitors
- **Guest Management**: Add, remove, and manage guest permissions
- **Access Duration Control**: Set expiry dates for guest access
- **Guest Pass Monitoring**: Track guest access patterns and history

### 📱 **Smart Access Methods**
- **QR Code Scanning**: Fast door access via camera-based QR scanning
- **NFC Support**: Near Field Communication for contactless access
- **Real-time Validation**: Instant access permission verification
- **Access Logging**: Comprehensive access event tracking

### 📊 **Dashboard & Monitoring**
- **Unified Dashboard**: Central hub for all smart door activities
- **Real-time Updates**: Live status updates using Firebase listeners
- **Access History**: Detailed logs of all door access events
- **Guest Activity**: Monitor guest access patterns and usage

### 🛍️ **Store Integration**
- **Product Catalog**: Browse and purchase smart door products
- **Device Management**: Manage purchased devices and warranties

## 🛠️ **Technology Stack**

### **Frontend**
- **React Native**: `0.71.8` - Cross-platform mobile development
- **Expo**: `~48.0.18` - Development platform and build tools
- **React Navigation**: `^6.1.7` - Navigation and routing
- **Zustand**: `^4.3.8` - State management

### **Backend & Database**
- **Firebase**: `^9.23.0` - Backend-as-a-Service
  - **Firestore**: NoSQL database for app data
  - **Authentication**: User management and security
  - **Real-time Database**: Live data synchronization
  - **Storage**: File and media storage

### **UI & UX**
- **Expo Linear Gradient**: `~12.1.2` - Beautiful gradient effects
- **Lottie Animations**: `5.1.4` - Smooth micro-interactions
- **Custom Typography**: Space Grotesk font family
- **Material Icons**: Comprehensive icon library

### **Device Features**
- **Expo Camera**: `~13.2.1` - Camera access and controls
- **Expo Barcode Scanner**: `~12.3.2` - QR/Barcode scanning
- **AsyncStorage**: Local data persistence
- **Gesture Handler**: Touch gesture recognition

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android)
- Firebase project setup

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/enloq-smart-door-app.git
   cd enloq-smart-door-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Copy your Firebase config to the `.env` file

5. **Start the development server**
   ```bash
   expo start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device testing

## ⚙️ **Configuration**

### **Firebase Structure**

The app uses the following Firestore collections:

```
users/
├── {userId}/
│   ├── email: string
│   ├── name: string
│   ├── premisesID: string
│   └── userType: string

premises/
├── {premisesId}/
│   ├── name: string
│   ├── address: string
│   ├── linkedDoors/
│   │   └── {doorId}/
│   │       ├── doorNickname: string
│   │       ├── accessibleBy: array
│   │       └── timestamp: timestamp

smartDoors/
├── {doorId}/
│   ├── doorLinked: boolean
│   ├── premisesID: string
│   ├── purchaserEmail: string
│   └── doorData: object

accessEvents/
├── {eventId}/
│   ├── userId: string
│   ├── doorId: string
│   ├── accessGranted: boolean
│   ├── timestamp: timestamp
│   └── guestEmail: string
```

### **Security Rules**

Ensure your Firestore security rules allow authenticated users to:
- Read/write their own user data
- Access premises they're linked to
- Read smart door data for linked premises
- Create access event logs

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `EXPO_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | ✅ |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | ✅ |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | ✅ |
| `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | ✅ |
| `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | ✅ |
| `EXPO_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | ✅ |
| `EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase Analytics ID | ✅ |

## 📱 **Usage**

### **First Time Setup**
1. **Download and install** the app
2. **Create account** using email and password
3. **Setup premises** by providing location details
4. **Link smart doors** using Door ID and purchaser email
5. **Configure access permissions** for yourself and guests

### **Daily Operations**
1. **Scan QR codes** to access doors
2. **Add guest passes** for temporary access
3. **Monitor access** through the dashboard
4. **Manage permissions** as needed

### **Guest Access Workflow**
1. **Add guest** with email and access duration
2. **Guest receives** access credentials
3. **Guest scans** QR code at the door
4. **System validates** permissions in real-time
5. **Access granted/denied** based on permissions

## 📁 **Project Structure**

```
enloq_smart_door_app/
├── App.js                          # Main app entry point
├── app.json                        # Expo configuration
├── assets/                         # Images, fonts, animations
│   ├── fonts/                      # Custom font files
│   ├── *.png                       # Image assets
│   └── *.json                      # Lottie animations
├── components/                     # Reusable UI components
│   ├── Buttons/                    # Button components
│   ├── Cards/                      # Card layouts
│   ├── Typography/                 # Text components
│   └── utils/                      # Utility components
├── config/
│   └── firebase.js                 # Firebase configuration
├── route/
│   └── MasterRoute.js              # Navigation setup
├── src/
│   ├── screens/                    # App screens
│   │   ├── AddDoorScreen.js        # Link new smart doors
│   │   ├── AddGuestScreen.js       # Create guest passes
│   │   ├── CameraScreen.js         # QR code scanning
│   │   ├── DashboardScreen.js      # Main dashboard
│   │   ├── DoorDetailsScreen.js    # Door information
│   │   ├── DoorsScreen.js          # Door management
│   │   ├── LoginScreen.js          # User authentication
│   │   ├── ProfileScreen.js        # User profile
│   │   ├── ResultScreen.js         # Access results
│   │   └── ...                     # Other screens
│   └── Theme/                      # App theming
└── store/                          # State management
    └── index.js                    # Zustand store
```

## 🔧 **Development**

### **Available Scripts**
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web browser

### **Code Style**
- Follow React Native best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain consistent file structure

### **Testing**
- Test on both iOS and Android devices
- Verify QR code scanning functionality
- Test offline scenarios
- Validate Firebase security rules

## 🚨 **Security Considerations**

- **Environment Variables**: Never commit `.env` files to version control
- **Firebase Rules**: Implement proper Firestore security rules
- **Authentication**: Use Firebase Auth for secure user management
- **Access Control**: Validate permissions server-side
- **Data Encryption**: Sensitive data is encrypted in transit

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow the existing code style
- Add comments for complex functionality
- Update documentation for new features
- Test thoroughly before submitting

## 📄 **License**

This project is private and confidential. All rights reserved.

## 🆘 **Support**

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🏗️ **Roadmap**

- [ ] Biometric authentication integration
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant support
- [ ] API for third-party integrations
- [ ] Voice command support
- [ ] Smart home integration

---

**Built with ❤️ using React Native and Firebase**