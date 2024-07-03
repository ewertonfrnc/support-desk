import api from "../../service";

class authService {
  async register(user) {
    const response = await api().post("/users/register", user);

    if (response.data)
      localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  async login(user) {
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
