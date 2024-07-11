import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks.ts";
import { getTickets, reset } from "../features/tickets/ticket.slice.ts";

import SpinnerComponent from "../components/spinner.component.tsx";
import BackButtonComponent from "../components/back-button.component.tsx";
import TicketItemComponent from "../components/ticket-item.component.tsx";

type Props = {};
export default function TicketsComponent(props: Props) {
  const dispatch = useAppDispatch();

  const { tickets, isLoading, isSuccess } = useAppSelector(
    (state) => state.tickets,
  );

  useEffect(() => {
    dispatch(getTickets());

    return (isSuccess: boolean) => {
      if (isSuccess) dispatch(reset());
    };
  }, [isSuccess]);

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <BackButtonComponent url="/" />

      <h1>Tickets</h1>

      <div className="tickets">
        <div className="ticket-headings">
          <div>Data</div>
          <div>Produto</div>
          <div>Status</div>
          <div></div>
        </div>

        {tickets.tickets &&
          tickets.tickets.map((ticket) => (
            <TicketItemComponent key={ticket.id} ticket={ticket} />
          ))}
      </div>
    </>
  );
}
