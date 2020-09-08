<template>
  <div class="row">
    <div class="col-md-6 offset-md-3 col-12 mt-3 mb-3 text-center">
      <form @submit.prevent="">
        <div v-if="confirmado">
          <h1>Su pedido está confirmado! gracias!</h1>
        </div>
        <div v-if="confirmado === null && existe">
          <h1>Confirmar el pedido número: {{ $route.params.idPedido }}</h1>
          <input type="hidden" v-model="check" />
          <button class="btn btn-success" @click="confirmar">Confirmar</button>
        </div>
        <div v-if="!existe">
          <h1>El pedido no existe</h1>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { productosCollection } from "../../firebase";
export default {
  data() {
    return {
      idProducto: "",
      idPedido: "",
      check: "",
      confirmado: null,
      existe: false
    };
  },
  mounted() {
    productosCollection
      .doc(this.$route.params.idProducto)
      .collection("pedidos")
      .doc(this.$route.params.idPedido)
      .get()
      .then(
        pedido =>
          pedido.exists &&
          this.pedidoExiste() &&
          pedido.data().confirmado &&
          this.pedidoConfirmado(true)
      );
  },
  methods: {
    pedidoConfirmado(val) {
      this.confirmado = val;
    },
    pedidoExiste() {
      this.existe = true;
      return true;
    },
    confirmar() {
      if (this.check == "") {
        try {
          productosCollection
            .doc(this.$route.params.idProducto)
            .collection("pedidos")
            .doc(this.$route.params.idPedido)
            .update({ confirmado: true })
            .then(() => (this.confirmado = true));
        } catch (error) {
          this.confirmado = false;
          console.log(error);
        }
      }
    }
  }
};
</script>

<style></style>
