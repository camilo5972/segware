# Segware Test

React Native App for Posts management.

### Features:

* List posts (All that have been created from different devices)
* Edit a post created on a device
* Delete a post created on a device
* Create a post
* Upvote a post
* Supported languages: Spanish and English (Default English)
* Base support (code) for multi-themes
* Use of Websockets for broadcasting update posts

### Project structure

The mobile application and the backend with the APIs are contained in the repository:
```
segware
│   README.md
└───app
└───backend
```

### Run the backend

For ease of testing I'm using a MongoDB database in a cloud service (mlab). It's not necessary to run a mongod service. The connection data is established in the files `backend/config/production.json` and `backend/config/test.json` (they should be like environment variables but as I said it's for ease of testing).

```bash
# Inside backend folder
$ npm install ---> Only first time
$ npm start
```

### Run the app

Configure the URL where the backend is running in the file `app/utils/constants.js`:

```javascript
export const SPLASH_TIME = 2700;
export const IP = '192.168.0.104:3530'; // Update here with the backend IP
```

Run Metro server:

```bash
# Inside app folder
$ npm install  ---> Only first time
$ npm start

# Run Android
$ npm run android

# Run IOS
npm run ios
```

**Note:**
If you have problems running in IOS you must delete the `app/ios/Pods` and `app/ios/build` folders. Delete the files `app/ios/app.xcworkspace` and `app/ios/Podfile.lock`. Then inside the `ios` folder execute the command `Pod install`.

### Run tests

```bash
# Inside backend folder
$ npm run test

# Inside app folder
$ npm run test
```