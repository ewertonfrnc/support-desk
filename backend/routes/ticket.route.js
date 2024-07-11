const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const ticketsController = require("../controllers/ticket.controller");

const ticketRouter = express.Router();

ticketRouter
  .route("/")
  .get(authMiddleware.protect, ticketsController.getTickets)
  .post(authMiddleware.protect, ticketsController.createTicket)
  .delete(authMiddleware.protect, ticketsController.deleteTicket);

ticketRouter
  .route("/:id")
  .get(authMiddleware.protect, ticketsController.getTicket)
  .put(authMiddleware.protect, ticketsController.updateTicket)
  .delete(authMiddleware.protect, ticketsController.deleteTicket);

module.exports = ticketRouter;
