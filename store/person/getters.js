export default {
  persons: (state) => {
    return state.persons;
  },
  findPerson: (state) => (personCode) => {
    return state.persons.find((person) => person.code === personCode);
  },
  findByDNI:
    (state) =>
    (documentType = null, DNI = null) => {
      if (documentType === null && DNI === null) return state.persons;
      else if (
        state.persons.find(
          (person) => person.documentType === documentType && person.DNI === DNI
        ) === undefined
      )
        return [];
      else
        return new Array(
          state.persons.find(
            (person) =>
              person.documentType === documentType && person.DNI === DNI
          )
        );
    },
};
