import api from "../../service/index.js";

class authService {
  async register(user) {
    const response = await api().post("/users/register", user);

    if (response.data)
      localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user;
  }

  async login(user) {
    const response = await api().post("/users/login", user);

    if (response.data)
      localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user;
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new authService();
