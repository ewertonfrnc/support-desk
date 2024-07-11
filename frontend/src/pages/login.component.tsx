import React from "react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { login, reset } from "../features/auth/auth.slice.ts";

import SpinnerComponent from "../components/spinner.component.tsx";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";

export default function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isSuccess, isLoading, isError, message } = useAppSelector(
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

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message]);

  if (isLoading) return <SpinnerComponent />;

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
            <button className="btn btn-block">Entrar</button>
          </div>
        </form>
      </section>
    </>
  );
}
