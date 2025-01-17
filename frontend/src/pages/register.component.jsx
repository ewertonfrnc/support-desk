import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import SpinnerComponent from "../components/spinner.component.jsx";

import { register, reset } from "../features/auth/auth.slice.js";
import { useDispatch, useSelector } from "react-redux";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth,
  );

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formValues;

  function onChange(e) {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return toast.error("As senhas não são iguais");
    }

    dispatch(register({ name, email, password }));
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  if (isLoading) return <SpinnerComponent />;

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Criar conta
        </h1>

        <p>Crie uma conta para criar os tickets de suporte</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className="form-control"
              placeholder="Insira seu nome"
              required
            />
          </div>

          <div className="form-group">
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className="form-control"
              placeholder="Insira seu e-mail"
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className="form-control"
              placeholder="Insira sua senha"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
              className="form-control"
              placeholder="Confirme sua senha"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Cadastrar</button>
          </div>
        </form>
      </section>
    </>
  );
}
