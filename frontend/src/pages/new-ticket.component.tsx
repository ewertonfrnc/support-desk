import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks.ts";
import { useAppDispatch } from "../app/hooks.ts";

import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticket.slice.ts";

import SpinnerComponent from "../components/spinner.component.tsx";
import BackButtonComponent from "../components/back-button.component.tsx";

type Props = {};
export default function NewTicketComponent(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.ticket,
  );

  const [name] = useState(user.user.name);
  const [email] = useState(user.user.email);

  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(createTicket({ product, description }));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
    console.log({ isError, isSuccess, isLoading });
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
