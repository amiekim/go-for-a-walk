// import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { createLogger } from "redux-logger";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage" // localStorage
// // import storageSession from "redux-persist/lib/storage/session"; // sessionStorage
// import AsyncStorage from '@react-native-community/async-storage';
// import rootReducer from "./reducers";

// export let store;


// const configureStore = () => {
//     const logger = createLogger();
//     const enhancer = compose(composeWithDevTools(applyMiddleware(logger)));

//     const isServer = typeof window === "undefined";

//     if (isServer) {
//         store = createStore(rootReducer, enhancer);
//         return store;
//     } else {
//         const persistConfig = {
//             key: "root",
//             storage,
//             whitelist: ['loginReducer']
//         };

//         const persistedReducer = persistReducer(persistConfig, rootReducer);
//         store = createStore(persistedReducer, enhancer);
//         let persistor = persistStore(store);

//         return { store, persistor };
//     }
// };

// export default configureStore;
