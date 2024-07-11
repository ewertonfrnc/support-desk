import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import { getTicket, closeTicket } from "../features/tickets/ticket.slice.ts";

import { toast } from "react-toastify";

import BackButtonComponent from "../components/back-button.component.tsx";
import SpinnerComponent from "../components/spinner.component.tsx";

type Props = {};
export default function TicketComponent(props: Props) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ticket, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.tickets,
  );

  function onTicketClose() {
    dispatch(closeTicket(ticket.id));
    toast.success("Ticket fechado");
    navigate("/tickets");
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(id));
  }, [isError, message, id]);

  if (isLoading) return <SpinnerComponent />;

  if (isError) return <h3>Algo deu errado</h3>;

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButtonComponent url={"/tickets"} />

        <h2>
          Ticket ID: {ticket.id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>Criado em: {new Date(ticket.createdAt).toLocaleString("pt-BR")}</h3>

        <h3>Produto: {ticket.product}</h3>

        <hr />

        <div className="ticket-desc">
          <h3>Descrição do problema</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Fechar ticket
        </button>
      )}
    </div>
  );
}
