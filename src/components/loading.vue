<template>
  <div class="loading-container">
    <div class="loading text-center">
      <h5 class="green">
        {{ msg }}
      </h5>
      <img src="../assets/carga-celda-panal.gif" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: "Cargando..."
    }
  }
};
</script>

<style>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: #f3f4be77;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  background: #ffffff88;
  padding: 2rem;
}

.loading img {
  width: 2rem;
  height: 2rem;
}

.green {
  color: #00cc00;
}
</style>
