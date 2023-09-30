import { configureStore } from "@reduxjs/toolkit";
import allStudentsSlice from "./allStudentsSlice";
import allCampusSlice from "./allCampusSlice";

const store = configureStore({
  reducer: {
    allStudents: allStudentsSlice,
    allCampus: allCampusSlice,
  }
});

export default store;