import Vue from "vue";
import VueRouter from "vue-router";
import Pedido from "./components/pedido/Pedido.vue";
import Confirmacion from "./components/pedido/Confirmacion.vue";
import Contacto from "./components/contacto/Contacto.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Pedido,
      meta: {
        // esto es el equivalente a middleware en Laravel
        forVisitors: true
      }
    },
    {
      path: "/pedidos",
      component: Pedido, //require('./components/pedido/Pedido.vue'),
      meta: {
        // esto es el equivalente a middleware en Laravel
        forVisitors: true
      }
    },
    {
      path: "/contacto",
      component: Contacto,
      meta: {
        forVisitors: true
      }
    },
    {
      path: "/confirmar/:idProducto/:idPedido",
      component: Confirmacion,
      meta: {
        forVisitors: true
      }
    }
  ],

  linkActiveClass: "active",

  mode: "history" //esto quita el numeral del principio de la ruta página
});

export default router;
