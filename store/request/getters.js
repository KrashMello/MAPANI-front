export default {
  requests: (state) => {
    return state.requests;
  },
  request: (state) => (id) => {
    return state.requests.find((request) => request.id === id);
  },
  getDataApplicant(state) {
    return state.request.applicant;
  },
};
