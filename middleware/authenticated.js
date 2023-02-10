export default ({ app, redirect, $axios, $cookies }) => {
  // If the user is not authenticated
  $axios.onRequest((config) => {
    config.headers.common["x-access-token"] = `${$cookies.get(
      "x-access-token"
    )}`;
  });
  $axios.onError((error) => {
    if (error.response.data.message === "Unauthorized!") {
      redirect("/");
    }
  });
  if (!app.$cookies.get("x-access-token")) {
    return redirect("/");
  }
};
