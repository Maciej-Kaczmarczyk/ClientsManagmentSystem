import authService from "./authService";
import api from "../config/axiosConfig";

const notesService = {
  getAllNotes: async (clientId: number) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .get(`clients/${clientId}/notes`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  getNote: async (clientId: number, noteId: number) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .get(`clients/${clientId}/notes/${noteId}`)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  addNote: async (
    clientId: number,
    header: string,
    body: string,
    date: Date,
  ) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .post(`clients/${clientId}/notes`, {
        clientId: clientId,
        header: header,
        body: body,
        date: date,
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
    clientId: number,
    noteId: number,
    header: string,
    body: string,
    date: Date,
  ) => {
    await authService.refreshToken(); // Refresh token before request
    return api
      .put(`clients/${clientId}/notes/${noteId}`, {
        header: header,
        body: body,
        date: date,
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
