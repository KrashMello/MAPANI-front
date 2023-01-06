export default {
  setProjects: (state, projects) => {
    state.projects = projects;
  },
  setProject: (state, project) => {
    state.project = project;
  },
  addSponsorsToProject: (state, sponsor) => {
    if (
      state.project.sponsors.filter((v) => v.code === sponsor.code).length === 0
    ) {
      sponsor.delete = false;
      state.project.sponsors.push(sponsor);
    }
  },
  deleteSponsorsToProject: (state, data) => {
    state.project.sponsors = state.project.sponsors.filter(
      (v) => v.code !== data.code
    );
  },
  changeDeleteSponsors: (state, [data, status]) => {
    if (state.project.sponsors.filter((v) => v.code === data.code).length === 0) {
      data.delete = false;  
      state.project.sponsors.push(data);
    }
    else {
      state.project.sponsors = state.project.sponsors.map((v) => {
        if (v.code === data.code) {
          v.delete = status;
        }
        return v;
      });
    }
  },
};
