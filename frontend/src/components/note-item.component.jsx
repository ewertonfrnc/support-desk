import { useSelector } from "react-redux";

export default function NoteItemComponent({ note }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "white",
        color: note.isStaff ? "white" : "black",
      }}
    >
      <h4>
        Comentário de{" "}
        {note.isStaff ? <span>Equipe</span> : <span>{user.name}</span>}
      </h4>

      <p>{note.text}</p>

      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("pt-BR")}
      </div>
    </div>
  );
}
