import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

export default function HomeComponent() {
  return (
    <>
      <section className="heading">
        <h1>Como podemos te ajudar hoje?</h1>
        <p>Por favor escolha uma das opções abaixo</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Criar novo ticket
      </Link>

      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        Ver meus tickets
      </Link>
    </>
  );
}
