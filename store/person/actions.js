export default {
  addPersons(context, { documentType, DNI, firstName, lastName, homeTelephone, personalPhone, martialStatus, email, }) {
    context.commit("addPersons", { documentType, DNI, firstName, lastName, homeTelephone, personalPhone, martialStatus, email, });
    context.commit("savePersons");
  },
  removePersons(context, code) {
    context.commit("removePersons", parseInt(code));
    context.commit("savePersons");
  },
  editPersons(context, { code, documentType, DNI, firstName, lastName, homeTelephone, personalPhone, martialStatus, email, }) {
    context.commit("editPersons", {
        code: parseInt(code),
        documentType,
        DNI, 
        firstName, 
        lastName, 
        homeTelephone,  
        personalPhone, 
        martialStatus,
        email,
    });
    context.commit("savePersons");
  },
};
