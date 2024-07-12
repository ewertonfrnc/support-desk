import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function BackButtonComponent({ url }) {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Voltar
    </Link>
  );
}
