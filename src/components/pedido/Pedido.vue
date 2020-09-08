<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-12 mt-3 mb-3">
      <h4 class="text-center borde-wood bg-white p-2">Pedido</h4>
      <div class="card">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            class="card-body borde-wood pedidos-form"
            role="form"
            @submit.prevent="handleSubmit(enviar)"
          >
            <div class="form-group">
              <label>Su Nombre (*)</label>
              <ValidationProvider
                name="Nombre"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  name="nombre"
                  v-model="pedido.nombre"
                  type="text"
                  class="form-control"
                  placeholder="Ingrese su nombre aquí"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Producto (*)</label>
              <ValidationProvider
                name="Producto"
                rules="required|numeric|min:1"
                v-slot="{ errors }"
              >
                <select
                  name="producto"
                  v-model="producto_id"
                  class="form-control"
                  @change="getimg"
                >
                  <option value="-1" selected>Seleccione un producto</option>
                  <option
                    :key="prod.id"
                    v-for="prod in productos"
                    :value="prod.id"
                    >{{ prod.nombre }}</option
                  >
                </select>
                <span v-show="imagen_show" id="img_producto">
                  <img v-bind:src="imagen" alt class="img-producto" />
                  <h4 class="img-producto-caption">
                    Precio: $ {{ imagen_precio }}
                  </h4>
                </span>
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Cantidad (*)</label>
              <ValidationProvider
                name="Cantidad"
                rules="required|min_value:1"
                v-slot="{ errors }"
              >
                <input
                  name="cantidad"
                  v-model="pedido.cantidad"
                  type="number"
                  class="form-control"
                  placeholder="Ingresa la cantidad"
                  @change="setPrecio"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div v-show="imagen_precio && pedido.cantidad != 0">
              <hr />
              <h4 class="blue">
                <!-- class="img-producto-caption"> -->
                Precio: $ {{ imagen_precio * pedido.cantidad }}
              </h4>
            </div>
            <hr />

            <h4>Datos de contacto:</h4>
            <hr />
            <div class="form-group">
              <label>Email (*)</label>
              <ValidationProvider
                name="Email"
                rules="required|email"
                v-slot="{ errors }"
              >
                <input
                  name="email"
                  class="form-control"
                  v-model="pedido.email"
                  type="email"
                  placeholder="Ingrese su Email aquí"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Celular</label>
              <ValidationProvider rules="required" v-slot="{ errors }">
                <input
                  name="telefono"
                  v-model="pedido.telefono"
                  type="tel"
                  class="form-control"
                  placeholder="Ingrese su número de Teléfono aquí"
                />
                <span class="help-block alert-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>

            <div class="form-group">
              <label>Comentarios</label>
              <textarea
                class="form-control"
                v-model="pedido.comentarios"
                placeholder="Ingrese aquí algún comentario o sugerencia que desee"
              ></textarea>
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

            <label>Los campos marcados con (*) son obligatorios</label>

            <hr />
            <Loading
              v-show="loading"
              msg="Enviando Correo de confirmación. Pasadas las 24 horas de la solicitud el pedido caducará"
            ></Loading>
            <div>
              <input type="submit" class="btn btn-primary" value="Enviar" />
            </div>
          </form>
        </ValidationObserver>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import Loading from "../loading.vue";
import { productosCollection } from "../../firebase";
import axios from "axios";
import emailjs from "emailjs-com";
import * as env from "../../environment";

export default {
  components: {
    Loading: Loading
  },
  data() {
    return {
      pedido: {
        nombre: "",
        cantidad: 0,
        comentarios: "",
        telefono: "",
        email: "",
        precio: 0
      },
      producto_id: -1,
      imagen: "",
      imagen_precio: "",
      imagen_show: false,
      loading: false,
      productos: [],
      rcapt_sig_key: "6LeVD8kZAAAAANsIyw7dBS3D20XY54zroaTQxUjc",
      rcapt_id: 0,
      captcha_req: false
    };
  },

  mounted() {
    this.getProductsCollection();
    emailjs.init(env[process.env.NODE_ENV].VUE_APP_EMAILJS_USER);
  },

  methods: {
    setPrecio() {
      this.pedido.precio = this.imagen_precio * this.pedido.cantidad;
    },
    getProductsCollection() {
      try {
        productosCollection.get().then(querySnapshot => {
          this.productos = querySnapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
    getimg() {
      var img = document.getElementById("img_producto");
      if (!this.imagen_show) this.imagen_show = true;

      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id === this.producto_id) {
          this.imagen = this.productos[i].imagen;
          this.imagen_precio = this.productos[i].precio;
        }
      }
      $("#img_producto").addClass("aparece");
      img.addEventListener(
        "webkitAnimationEnd",
        () => {
          $("#img_producto").removeClass("aparece");
        },
        false
      );
      img.addEventListener(
        "animationend",
        () => {
          $("#img_producto").removeClass("aparece");
        },
        false
      );
    },

    onCaptchaVerify(token) {
      const url = env[process.env.NODE_ENV].VUE_APP_URL_BACKEND;
      axios
        .get(`${url}?recaptcha_abejorro=1&token=${token}`)
        .then(({ status, data }) => {
          if (status === 200) {
            try {
              const selectedProd = this.productos.find(
                prod => prod.id == this.producto_id
              );
              const nuevoPedido = productosCollection
                .doc(this.producto_id)
                .collection("pedidos")
                .add({ ...this.pedido, confirmado: false })
                .then(nuevoPedido => {
                  const params = {
                    ...this.pedido,
                    pedido_id: nuevoPedido.id,
                    producto: selectedProd.nombre,
                    link_confirmacion: `${
                      env[process.env.NODE_ENV].VUE_APP_BASE_URL
                    }/confirmar/${this.producto_id}/${nuevoPedido.id}`
                  };
                  emailjs.send("abejorro_mail", "template_pedido_new", params);
                  swal({
                    title: "Enviado!",
                    text: "El pedido fue enviado correctamente",
                    timer: 2000,
                    button: true
                  });
                  this.pedido.nombre = "";
                  this.pedido.cantidad = 0;
                  this.pedido.comentarios = "";
                  this.pedido.telefono = "";
                  this.pedido.email = "";
                  this.pedido.precio = 0;
                  document.querySelector("form.pedidos-form").reset();
                  this.loading = false;
                });
            } catch (error) {
              swal({
                title: "Hay errores",
                text: "No se pudo realizar el pedido",
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
    enviar(_evt) {
      this.loading = true;
      this.captcha_req = false;
      window.grecaptcha.ready(function() {
        window.grecaptcha.execute(this.rcapt_sig_key);
      });
    }
  }
};
</script>

<style>
.aparece {
  animation-name: fadein;
  animation-duration: 1s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.img-producto-caption {
  display: inline-block;
  width: 40%;
  padding: 5%;
}

.img-producto {
  display: inline-block;
  width: 50%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.blue {
  color: #2e64fe;
}
</style>
