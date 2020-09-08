import Vue from "vue";
import App from "./App.vue";

import Router from "./routes.js";

import VueResource from "vue-resource";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.min";
import { ValidationObserver } from "vee-validate";
import VueRecaptcha from "vue-recaptcha";

Vue.use(VueResource);

Vue.http.options.root = "";

// Vue.http.options.xhr = {withCredentials: true};
// Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
// Vue.http.headers.common['Authorization'] = 'Basic giova_840@hotmail.com:pepe';

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (response.status > 400 && response.status < 500)
      swal(response.status.toString(), response.body.error, "error");
    else if (response.status == 500)
      swal(
        response.status.toString(),
        "We are experiencing a problem with our servers!",
        "error"
      );
  });
});

Vue.component("ValidationProvider", ValidationProvider);

Vue.component("ValidationObserver", ValidationObserver);

Vue.component("VueRecaptcha", VueRecaptcha);

var vm = new Vue({
  el: "#app",
  render: h => h(App),
  router: Router
});
