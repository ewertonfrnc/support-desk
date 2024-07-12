import api from "../../service/index.js";

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

  async closeTicket(ticketId, token) {
    const { data } = await api().put(
      `/tickets/${ticketId}`,
      { status: "closed" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.ticket;
  }
}

export default new ticketService();
