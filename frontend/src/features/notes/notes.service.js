import api from "../../service/index.js";

class NotesService {
  async getNotes(ticketId, token) {
    const { data } = await api().get(`/tickets/${ticketId}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.notes;
  }

  async createNote(noteText, ticketId, token) {
    const { data } = await api().post(
      `/tickets/${ticketId}/notes`,
      { text: noteText },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.note;
  }
}

export default new NotesService();
