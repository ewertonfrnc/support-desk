import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  url: string;
};
export default function BackButtonComponent({ url }: Props) {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowCircleLeft /> Voltar
    </Link>
  );
}
