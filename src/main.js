import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";

import "./assets/main.scss";
import "primeicons/primeicons.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);

app.component("Button", Button);
app.component("Toast", Toast);

app.mount("#app");
