import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { enableMapSet } from "immer";
import moveReducer from "./slices/moveSlice";
import dataReducer from "./slices/dataSlice";

// Enable the MapSet plugin
enableMapSet();

// Configure the Redux store
export const store = configureStore({
  reducer: {
    move: moveReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
