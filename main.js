import Jamo from "./Jamo/public/Jamo.js";
import LandingPage from "./Components/LandingPage/LandingPage.js";
import { reducers, initialState } from "./reducers.js";
import RestaurantsPage from "./Components/RestaurantsPage/RestaurantsPage.js";
import { fetchRestaurants } from "./actions/restaurantsActions.js";
import ShowRestaurantPage from "./Components/ShowRestaurantPage/ShowRestaurantPage.js";
import Profile from "./Components/Profile/Profile.js";
import { loginUserWithToken } from "./actions/authActions.js";
const { App, Component, store } = Jamo;

// Configure the store
store.configure({
	initialState,
	reducers,
});

// Setting up initial state
if (localStorage.getItem("token")) {
	loginUserWithToken(localStorage.getItem("token"));
}
fetchRestaurants();

// Create an app instance and add a route
const app = new App("root");
app.addRoute("#/", LandingPage);
app.addRoute("#/restaurants/", RestaurantsPage);
app.addRoute("#/restaurants/show", ShowRestaurantPage);
app.addRoute("#/profile", Profile, true, () => Jamo.store.getState("user"));
app.goToPage("/restaurants/");
