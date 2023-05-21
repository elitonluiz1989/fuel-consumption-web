import { createApp } from "vue";
import "@/assets/scss/app.scss";
import App from "./App.vue";
import { AxiosHandler } from "./handlers/axios.handler";

AxiosHandler.configure();

createApp(App).mount("#app");
