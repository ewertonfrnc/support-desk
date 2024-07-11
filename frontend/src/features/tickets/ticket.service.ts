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

  async getTickets(token) {
    const { data } = await api().get("/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  async getTicket(ticketId, token) {
    const { data } = await api().get(`/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.ticket;
  }
}

export default new ticketService();
