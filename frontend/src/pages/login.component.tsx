import { ChangeEvent, FormEvent, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/auth.slice.ts";

export default function LoginComponent() {
  const dispatch = useDispatch();
  const { user, isSuccess, isLoading, errorMessage } = useSelector(
    (state) => state.auth,
  );

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formValues;

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(login({ email, password }));
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Entrar
        </h1>

        <p>Entre na sua conta para conseguir suporte</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
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
            <button className="btn btn-block">Cadastrar</button>
          </div>
        </form>
      </section>
    </>
  );
}
