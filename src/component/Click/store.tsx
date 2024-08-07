import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../Click/articleSlice';

const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;