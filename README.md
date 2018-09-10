This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## First Things First

1. Git Clone Repo
2. NPM Install
3. Set Firebase Config on `src/store.js` (Look on Comment Line)
4. npm start for development running

## Take a Note

Please install react-devtool and redux-devtools chrome extension to make this app works.

Redux-devtools:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en

React-devtools:
https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

## Deploy to Firebase

1. Go to Firebase Console and direct to `Develop > Hosting`
2. Install Globally firebase-tools

```
npm install -g firebase-tools
```

4. Login to Firebase, run on cmd `firebase Login`
5. Allow Firebase to collect anonymuous CLI usage? `NO`
6. Run `firebase init`
7. Check-in (Using space): `Firestore: ...` and `Hosting: ...`
8. Select a default Firebase project: `Name your Repo`
9. `firestore Setup` - Hit Enter
10.   `firestore.indexes.json` - Hit Enter
11.   Hosting Setup - using `build` as React build dist folder on that
12.   Configure as SPA = `y`
13.   `npm run build` - build your application
14.   `firebase deploy` - Complete deployment
15.   Check Domain on Firebase console `Develop > Hosting > Dashboard > Domain`
16.   Viola
