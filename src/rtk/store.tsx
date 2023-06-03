import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import authReducer from "@/rtk/features/authFormSlice";
import authInfoReducer from "@/rtk/features/authSlice";
import buyReducer from "@/rtk/features/buySlice";
import commonReducer from "@/rtk/features/commonSlice";
import homeReducer from "@/rtk/features/homeSlice";
import modalReducer from "@/rtk/features/modalSlice";
import orderReducer from "@/rtk/features/orderSlice";
import repairReducer from "@/rtk/features/repairSlice";
import searchReducer from "@/rtk/features/searchSlice";
import sellReducer from "@/rtk/features/sellSlice";
import testReducer from "@/rtk/features/testSlice";
import themeReducer from "@/rtk/features/themeSlice";
import toastReducer from "@/rtk/features/toastSlice";
import storage from "@/utils/createWebStorage";
import userSlice from "@/rtk/features/userSlice";
import cartSlice from "@/rtk/features/cartSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authInfo"], // include slice name to persist
};

const reducers = combineReducers({
  test: testReducer,
  theme: themeReducer,
  buy: buyReducer,
  sell: sellReducer,
  repair: repairReducer,
  auth: authReducer,
  authInfo: authInfoReducer,
  home: homeReducer,
  toast: toastReducer,
  modal: modalReducer,
  common: commonReducer,
  order: orderReducer,
  search: searchReducer,
  user:userSlice,
  cart:cartSlice
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
