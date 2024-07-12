import React from "react";
import { Link } from "react-router-dom";

export default function TicketItemComponent({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("pt-BR")}</div>

      <div>{ticket.product}</div>

      <div className={`status status-${ticket.status}`}>
        {ticket.status === "new"
          ? "Novo"
          : ticket.status === "open"
            ? "Aberto"
            : "Fechado"}
      </div>

      <Link to={`/ticket/${ticket.id}`} className="btn btn-reverse btn-sm">
        Detalhes
      </Link>
    </div>
  );
}
