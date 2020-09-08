<template>
  <div class="header clearfix bordenav">
    <div class="row">
      <div class="col-4 d-md-none d-block">
        <img id="eva_logo" src="../assets/Logo.png" />
      </div>
      <div class="col-md-6 col-4 text-center text-md-left">
        <h3 class="text-muted d-none d-md-inline-block">El Viejo abejorro</h3>
        <h3 class="text-muted d-md-none d-inline-block">EVA</h3>
        <h3 id="subtitulo" class="invisible d-inline-block">Pedidos</h3>
      </div>
      <div class="col-md-6 col-4">
        <nav>
          <ul
            class="nav nav-pills justify-content-center justify-content-md-end"
          >
            <li class="nav-item">
              <router-link href="#" class="nav-link" to="/pedidos"
                >Pedido</router-link
              >
            </li>
            <li class="nav-item">
              <router-link href="#" class="nav-link" to="/contacto"
                >Contacto</router-link
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script></script>

<style>
.bordenav {
  background: rgba(255, 255, 255, 0.8);
  padding: 25px;
  border-image: url("../assets/bordenav.png") 33% 33% 33% 33% repeat;
  border-top: 5px solid #764332;
  border-bottom: 5px solid #764332;
  margin-bottom: 0px;
}
#subtitulo {
  color: red;
}

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: #000;
  background-color: #f3f4be;
}
</style>
