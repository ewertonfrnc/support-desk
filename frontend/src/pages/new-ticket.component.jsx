import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticket.slice.js";

import SpinnerComponent from "../components/spinner.component.jsx";
import BackButtonComponent from "../components/back-button.component.jsx";
import { useDispatch, useSelector } from "react-redux";

export default function NewTicketComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets,
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);

  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  }

  useEffect(() => {
    dispatch(reset());

    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [isError, isSuccess, message, dispatch, navigate]);

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <BackButtonComponent url="/" />

      <section className="heading">
        <h1>Criar novo ticket</h1>
        <p>Preenchar o formulário abaixo</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Nome do cliente</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="name">Email do cliente</label>
          <input type="email" className="form-control" value={email} disabled />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Produto</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPod">iPod</option>
              <option value="iPad">iPad</option>
              <option value="iPhone">iPhone</option>
              <option value="Macbook">Macbook</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descreva o problema</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Descrição do problema"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Enviar</button>
          </div>
        </form>
      </section>
    </>
  );
}
