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
    )
      state.project.sponsors.push(sponsor);
  },
};
