import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import axios from "axios";
// You can use the following starter router instead of the default one as a clean starting point
// import router from "./router/starter";
import router from "./router";

// Template components
import BaseBlock from "@/components/BaseBlock.vue";
import BaseBackground from "@/components/BaseBackground.vue";
// import BasePageHeading from "@/components/BasePageHeading.vue";

// Template directives
import clickRipple from "@/directives/clickRipple";

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// Craft new application
const app = createApp(App);

// Register global components
app.component("BaseBlock", BaseBlock);
app.component("BaseBackground", BaseBackground);
// app.component("BasePageHeading", BasePageHeading);

// Register global directives
app.directive("click-ripple", clickRipple);

// Use Pinia and Vue Router
app.use(createPinia());
app.use(router);

// Set up Axios
axios.interceptors.response.use(
    (response) => response, // simply return the response if everything is OK 
    error => {
        if (error.response.status === 422) { // if we catch a 422 error
        localStorage.setItem("token", ""); // clear token
        localStorage.clear(); // clear local storage
        router.push({ name: "auth-signin3" }); // redirect to login page
        }
        return Promise.reject(error); // reject the Promise with the error
    }
)



// ..and finally mount it!
app.mount("#app");
