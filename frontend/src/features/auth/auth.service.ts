import api from "../../service";
import {
  LoginPayload,
  RegisterPayload,
} from "../../interfaces/auth.interface.ts";

class authService {
  async register(user: RegisterPayload) {
    const response = await api().post("/users/register", user);

    if (response.data)
      localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  async login(user: LoginPayload) {
    const response = await api().post("/users/login", user);

    if (response.data)
      localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new authService();
