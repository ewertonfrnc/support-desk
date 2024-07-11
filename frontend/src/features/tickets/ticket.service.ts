import api from "../../service";

class ticketService {
  async createTicket(ticketData, token) {
    const { data } = await api().post("/tickets", ticketData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
}

export default new ticketService();
