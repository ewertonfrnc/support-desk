import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/auth.slice.ts";
import ticketReducer from "../features/tickets/ticket.slice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
