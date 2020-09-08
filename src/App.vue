<template>
  <div class="container-narrow fondo" id="app">
    <div id="principal">
      <div class="d-none d-md-block">
        <img id="eva_logo" src="./assets/Logo.png" />
      </div>
      <navbar></navbar>
      <div class="container-fluid">
        <transition
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar.vue";
import Loading from "./components/loading.vue";
export default {
  data() {
    return {
      loaded: false,
    };
  },
  components: {
    navbar: Navbar,
    loading: Loading,
  },

  mounted() {
    //do something after mounting vue instance
    this.load();
    console.log("process.env", process.env.NODE_ENV);
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        document.body.querySelector("#principal").style;
      },
      false
    );
  },
  methods: {
    load() {
      //ponemos esta parte adentro para "escuchar"  cuando la imagen termina de realizar su animación y disparar las siguientes,
      var loading = document.getElementById("loading");
      loading.addEventListener(
        "animationend",
        function () {
          // $("#principal").removeClass("invisible")
          $("#subtitulo").removeClass("invisible");
          $("#subtitulo").addClass("animated");
          $("#subtitulo").addClass("evaInDown");
          $("#eva_logo").addClass("animated");
          $("#eva_logo").addClass("eva");
        },
        false
      );
    },
  },
};
</script>

<style>
/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-right: 15px;
  padding-left: 15px;
}

#eva_logo {
  width: 100%;
}

.fondo {
  min-height: 100vh;
  background-image: url("./assets/panal.svg");
  background-size: 400%;
  background-position: 46%;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.borde-wood {
  border: 2px solid #764332;
  background-color: #fcfcfc;
}

/* Custom page header */
.header {
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
}
/* Make the masthead heading the same height as the navigation */
.header h3 {
  margin-top: 0;
  margin-bottom: 0;
  line-height: 40px;
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

/* Customize container */
@media screen and (min-width: 768px) {
  .container {
    max-width: 730px;
  }

  .container-narrow > hr {
    margin: 30px 0;
  }

  .fondo {
    background-size: 140%;
    display: block;
  }
  #eva_logo {
    padding: 1rem;
    width: 200px;
  }
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
}
.jumbotron .btn {
  padding: 14px 24px;
  font-size: 21px;
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;
}
.marketing p + h4 {
  margin-top: 28px;
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-right: 0;
    padding-left: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
</style>
