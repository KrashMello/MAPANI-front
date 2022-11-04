export default {
  savePersons(state) {
    localStorage.setItem("_persons_", JSON.stringify(state.persons));
  },
  addPersons(
    state,
    {
      documentType,
      DNI,
      firstName,
      lastName,
      homeTelephone,
      personalPhone,
      martialStatus,
      email,
    }
  ) {
    let code,
      flag = true;
    while (flag) {
      code = Math.floor(Math.random() * Math.pow(10, 6));
      flag = !!state.persons.find((findPerson) => findPerson.code === code);
    }

    state.persons.push({
      code,
      DNI,
      documentType,
      firstName,
      lastName,
      homeTelephone,
      personalPhone,
      martialStatus,
      email,
      done: false,
    });
  },
  removePersons(state, code) {
    state.persons = state.persons.filter(
      (findPerson) => findPerson.code !== code
    );
  },
  editPersons(
    state,
    {
      code,
      documentType,
      DNI,
      firstName,
      lastName,
      homeTelephone,
      personalPhone,
      martialStatus,
      email,
    }
  ) {
    state.persons = state.persons.map((findPerson) => {
      if (findPerson.code === code) {
        findPerson.documentType = documentType;
        findPerson.DNI = DNI;
        findPerson.firstName = firstName;
        findPerson.lastName = lastName;
        findPerson.homeTelephone = homeTelephone;
        findPerson.personalPhone = personalPhone;
        findPerson.martialStatus = martialStatus;
        findPerson.email = email;
      }
      return findPerson;
    });
  },
};
