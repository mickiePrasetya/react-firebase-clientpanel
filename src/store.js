import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {
	reactReduxFirebase,
	firebaseReducer,
	reduxReactFirebase
} from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// CUSTOM REDUCER
// @todo

const firebaseConfig = {
	apiKey: 'AIzaSyD9xJe6aoFi4gsD6hk8MQlCnLbANSjj4G4',
	authDomain: 'react-client-panel-bac78.firebaseapp.com',
	databaseURL: 'https://react-client-panel-bac78.firebaseio.com',
	projectId: 'react-client-panel-bac78',
	storageBucket: 'react-client-panel-bac78.appspot.com',
	messagingSenderId: '237403539641'
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// init firebase instance
firebase.initializeApp(firebaseConfig);

// init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
	reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reduxReactFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
