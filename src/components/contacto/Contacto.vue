<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-12 mt-3 mb-3">
      <h4 class="text-center borde-wood bg-white p-2">Contacto</h4>
      <div class="card">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="card-body borde-wood contacto-form"
            role="form"
            @submit.prevent="handleSubmit(enviar)"
          >
            <!-- <input type="hidden" name="_token" value="{{ csrf_token() }}"> -->
            <div class="form-group">
              <label>Su Nombre (*)</label>
              <ValidationProvider
                name="nombre"
                rules="required|min:3|max:40"
                v-slot="{ errors }"
              >
                <input
                  name="nombre"
                  v-model="contacto.nombre"
                  type="text"
                  class="form-control"
                  placeholder="Ingrese su nombre aquí"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Email (*)</label>
              <ValidationProvider
                name="Email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <input
                  name="email"
                  v-model="contacto.email"
                  type="email"
                  class="form-control"
                  placeholder="Ingresa tu Email aquí"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Asunto (*)</label>
              <ValidationProvider
                name="Asunto"
                rules="required|max:40"
                v-slot="{ errors }"
              >
                <input
                  name="asunto"
                  v-model="contacto.asunto"
                  type="text"
                  class="form-control"
                  placeholder="Ingresa el Asunto"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div>
              <label>Mensaje (*)</label>
              <ValidationProvider
                name="Cuerpo"
                rules="required|min:5|max:500"
                v-slot="{ errors }"
              >
                <textarea
                  class="form-control"
                  name="cuerpo"
                  v-model="contacto.cuerpo"
                  placeholder="Ingresa tu consulta aquí"
                ></textarea>
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <hr />
            <div class="form-group">
              <vue-recaptcha
                :sitekey="rcapt_sig_key"
                class="g-recaptcha"
                @verify="onCaptchaVerify"
                size="invisible"
              ></vue-recaptcha>
            </div>

            <hr />

            <Loading v-show="loading" msg="Enviando su consulta"> </Loading>

            <div>
              <input type="submit" class="btn btn-primary" value="Enviar" />
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import Loading from "../loading.vue";
import { contactoCollection } from "../../firebase";
import axios from "axios";
import emailjs from "emailjs-com";
import * as env from "../../environment";

export default {
  components: {
    Loading: Loading
  },
  data() {
    return {
      contacto: {
        nombre: "",
        email: "",
        asunto: "",
        cuerpo: "",
        enviado: false
      },
      loading: false,
      rcapt_sig_key: "6LeVD8kZAAAAANsIyw7dBS3D20XY54zroaTQxUjc"
    };
  },

  mounted() {
    emailjs.init(env[process.env.NODE_ENV].VUE_APP_EMAILJS_USER);
  },

  methods: {
    onCaptchaVerify(token) {
      const url = env[process.env.NODE_ENV].VUE_APP_URL_BACKEND;
      axios
        .get(`${url}?recaptcha_abejorro=1&token=${token}`)
        .then(({ status, data }) => {
          if (status === 200) {
            try {
              const params = { ...this.contacto };
              delete params.enviado;
              emailjs.send("abejorro_mail", "template_contacto", params);
              contactoCollection.add(this.contacto);
              swal({
                title: "Mensaje enviado!",
                text: "El mensaje fue enviado correctamente",
                timer: 2000,
                button: true
              });
              this.contacto.nombre = 0;
              this.contacto.email = "";
              this.contacto.asunto = "";
              this.contacto.cuerpo = "";
              this.loading = false;
              document.querySelector("form.contacto-form").reset();
            } catch (error) {
              swal({
                title: "Hay errores",
                text: "Error al enviar, intentelo nuevamente",
                timer: 2000,
                button: true
              });
            }
            setTimeout(() => {
              if (this.loading) this.loading = false;
            }, 7000);
          } else {
            swal({
              title: "Hay errores",
              text:
                "Error al verificar que no es un robot, intentelo nuevamente",
              timer: 2000,
              button: true
            });
            this.loading = false;
          }
        });
    },
    enviar() {
      this.loading = true;
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute(this.rcapt_sig_key);
      });
    }
  }
};
</script>

<style></style>
