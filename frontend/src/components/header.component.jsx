import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import {
  logout,
  reset,
} from "../../../../../Users/ewert/Downloads/frontend/src/features/auth/auth.slice.js";
import { useSelector, useDispatch } from "react-redux";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  function onLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Central de ajuda</Link>
      </div>

      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Encerrar sessão
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Entrar
              </Link>
            </li>

            <li>
              <Link to="/register">
                <FaUser /> Cadastre-se
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
