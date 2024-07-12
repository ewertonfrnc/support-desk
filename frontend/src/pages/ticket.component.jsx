import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getTicket, closeTicket } from "../features/tickets/ticket.slice.js";
import { getNotes, createNote } from "../features/notes/notes.slice.js";

import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "react-modal";

import BackButtonComponent from "../components/back-button.component.jsx";
import SpinnerComponent from "../components/spinner.component.jsx";
import NoteItemComponent from "../components/note-item.component.jsx";
import { useDispatch, useSelector } from "react-redux";

Modal.setAppElement("#root");

export default function TicketComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets,
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes,
  );

  function onTicketClose() {
    dispatch(closeTicket(ticket.id));
    toast.success("Ticket fechado");
    navigate("/tickets");
  }

  function openModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function onNoteSubmit(e) {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId: ticket.id }));
    openModal();
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(id));
    dispatch(getNotes(id));
  }, [isError, message, id]);

  if (isLoading || notesIsLoading) return <SpinnerComponent />;

  if (isError) return <h3>Algo deu errado</h3>;

  // @ts-ignore
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
        <button className="btn" onClick={openModal}>
          <FaPlus /> Adicionar comentário
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={modalIsOpen}
        style={{
          content: {
            width: "600px",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            position: "relative",
          },
        }}
        contentLabel="Adicionar comentário"
      >
        <h2>Adicionar comentário</h2>

        <button className="btn-close" onClick={openModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Comentário"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn">
              Adicionar
            </button>
          </div>
        </form>
      </Modal>

      <h2>Comentários</h2>
      {notes.map((note) => (
        <NoteItemComponent key={note.id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Fechar ticket
        </button>
      )}
    </div>
  );
}
