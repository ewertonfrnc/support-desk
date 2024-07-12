import { useEffect } from "react";

import { getTickets, reset } from "../features/tickets/ticket.slice.js";

import SpinnerComponent from "../components/spinner.component.jsx";
import BackButtonComponent from "../components/back-button.component.jsx";
import TicketItemComponent from "../components/ticket-item.component.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function TicketsComponent() {
  const dispatch = useDispatch();

  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets,
  );

  useEffect(() => {
    dispatch(getTickets());

    return () => {
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
