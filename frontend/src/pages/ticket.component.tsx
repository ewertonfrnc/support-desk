import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import { getTicket, reset } from "../features/tickets/ticket.slice.ts";

import { toast } from "react-toastify";

import BackButtonComponent from "../components/back-button.component.tsx";
import SpinnerComponent from "../components/spinner.component.tsx";

type Props = {};
export default function TicketComponent(props: Props) {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { ticket, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.tickets,
  );

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
      <div className="ticket-header">
        <BackButtonComponent url={"/tickets"} />

        <h2>
          Ticket ID: {ticket.id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>

        <h3>
          Data de submissão:{" "}
          {new Date(ticket.createdAt).toLocaleString("pt-BR")}
        </h3>

        <hr />

        <div className="ticket-desc">
          <h3>Descrição do problema</h3>
          <p>{ticket.description}</p>
        </div>
      </div>
    </div>
  );
}
