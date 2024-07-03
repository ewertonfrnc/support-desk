import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/auth.slice.ts";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
