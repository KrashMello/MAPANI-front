export default {
  initRequests(context) {
    context.commit("initRequests");
  },
  addRequests(context, { solicitante, beneficiario }) {
    context.commit("addRequests", { solicitante, beneficiario });
    context.commit("saveRequests");
  },
  removeRequests(context, id) {
    context.commit("removeRequests", parseInt(id));
    context.commit("saveRequests");
  },
  editRequests(context, { id, solicitante, beneficiario }) {
    context.commit("editRequests", {
      id: parseInt(id),
      solicitante,
      beneficiario,
    });
    context.commit("saveRequests");
  },
  findApplicant({ commit, getters }, [documentType, DNI]) {
    let findByDNI = undefined;
    let response = undefined;

    findByDNI = getters.findByDNI(documentType, DNI)[0];
    if (findByDNI === undefined) {
      commit("showResponseSnackbar", {
        code: 1,
        type: "error",
        message: "Nro. de documento, no se encuentra registrado",
      });
    } else {
      commit("updateApplicant", [findByDNI, true]);
      response = findByDNI.firstName + " " + findByDNI.lastName;
      commit("showResponseSnackbar", {
        code: 1,
        type: "success",
        message: response,
      });
    }
  },
  closeFindApplicant({ commit }) {
    commit("showResponseSnackbar", { code: 0, type: "", message: "" });
    commit("updateApplicant", [null, null, false]);
  },
};
