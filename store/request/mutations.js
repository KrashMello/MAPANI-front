export default {
  updateApplicant(state, [personData, Found]) {
    state.request.applicant.Found = Found; 

    console.log(personData);
    if (Found) {
      state.request.applicant.code = personData.code; 
      state.request.applicant.DNI = personData.DNI;
      state.request.applicant.documentType = personData.documentType;
      state.request.applicant.fullName = personData.fullName;
      state.request.applicant.firstName = personData.firstName;
      state.request.applicant.lastName = personData.lastName;
      state.request.applicant.bornDate = personData.bornDate;
      state.request.applicant.homeTelephone = personData.homeTelephone;
      state.request.applicant.personalPhone = personData.personalPhone;
      state.request.applicant.martialStatus = personData.martialStatus;
      state.request.applicant.email = personData.email;
    } else {
      state.request.applicant.code = "";
      state.request.applicant.DNI = "";
      state.request.applicant.documentType = "";
      state.request.applicant.fullName = "";
      state.request.applicant.firstName = "";
      state.request.applicant.lastName = "";
      state.request.applicant.bornDate = "";
      state.request.applicant.homeTelephone = "";
      state.request.applicant.personalPhone = "";
      state.request.applicant.martialStatus = "";
      state.request.applicant.email = "";
    }
  },
  initRequests(state) {
    state.requests = JSON.parse(localStorage.getItem("_requests_")) || [];
  },
  saveRequests(state) {
    localStorage.setItem("_requests_", JSON.stringify(state.requests));
  },
  addRequests(state, { solicitante, beneficiario }) {
    /* obtener fecha */
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      date = `${day}-0${month}-${year}`;
    } else {
      date = `${day}-${month}-${year}`;
    }
    /* fin fecha */

    let id,
      flag = true;
    while (flag) {
      id = Math.floor(Math.random() * Math.pow(10, 6));
      flag = !!state.requests.find((request) => request.id === id);
    }

    state.requests.push({
      id,
      date,
      solicitante,
      beneficiario,
      done: false,
    });
  },
  removeRequests(state, id) {
    state.requests = state.requests.filter((request) => request.id !== id);
  },
  editRequests(state, { id, solicitante, beneficiario }) {
    state.requests = state.requests.map((request) => {
      if (request.id === id) {
        request.solicitante = solicitante;
        request.beneficiario = beneficiario;
      }
      return request;
    });
  },
};
