import { configureStore } from "@reduxjs/toolkit";
import allStudentsSlice from "./allStudentsSlice";

const store = configureStore({
  reducer: {
    allStudents: allStudentsSlice,
  }
});

export default store;