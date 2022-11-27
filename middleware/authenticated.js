export default ({ app, redirect }) => {
  // If the user is not authenticated
  
  if (!app.$cookies.get("token")) {
    return redirect("/");
  }
}
