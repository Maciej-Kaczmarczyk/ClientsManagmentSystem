import authService from "./authService";
import api from "../config/axiosConfig";

const notesService = {
  getAllNotes: async (id: number) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .get(`clients/${id}/notes`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getNote: async (id: number, noteId: number) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .get(`clients/${id}/notes/${noteId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  addNote: async (
    client_id: number,
    note_header: string,
    note_body: string,
    note_date: Date,
  ) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .post(`clients/${client_id}/notes`, {
        client_id: client_id,
        note_header: note_header,
        note_body: note_body,
        note_date: note_date,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  deleteNote: async (client_id: number, note_id: number) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .delete(`clients/${client_id}/notes/${note_id}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  updateNote: async (
    client_id: number,
    note_id: number,
    note_header: string,
    note_body: string,
    note_date: Date,
  ) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .put(`clients/${client_id}/notes/${note_id}`, {
        note_header: note_header,
        note_body: note_body,
        note_date: note_date,
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

export default notesService;
