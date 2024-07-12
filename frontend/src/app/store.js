import { configureStore, Tuple } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "../features/auth/auth.slice";
import ticketReducer from "../features/tickets/ticket.slice";
import noteReducer from "../features/notes/notes.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
});

export default store;
