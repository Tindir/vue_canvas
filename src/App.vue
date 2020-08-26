<template>
  <div id="app">
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap">
      <a class="navbar-brand" href="#">Vuec\C</a>
      <div class="navbar" id="navbarSupportedContent">
        <button class="btn navbar-btn bg-light">Search</button>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <nav class="col-1 bg-dark sidebar-left">
          <div class="sidebar-sticky">
            <nav class="nav flex-column">
              <a class="nav-link active" href="#">Active</a>
              <a class="nav-link" href="#">Link</a>
              <a class="nav-link" href="#">Link</a>
              <a class="nav-link disabled" href="#">Disabled</a>
            </nav>
          </div>
        </nav>
        <div class="col">
          <div class="row">
            <a href="#" class="btn rounded-circle btn-primary btn-group-fab"><i class="fas fa-bars"></i></a>
            <div class="card" style="width: 18rem;">
              <img class="card-img-top" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p
                  class="card-text"
                >Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "./store/store";
import { fabric } from "fabric";

export default {
  name: "App",
  data: () => ({
    context: null,
    provider: {
      x: 0,
      y: 0,
      curObj: null,
    },
  }),
  components: {},
  mounted() {
    //this.$refs.select.height = 500;
    //this.$refs.select.width = 600;
    //this.context = this.$refs.select.getContext("2d");
    // this.ctx.fillRect(0,0,500,500);
    const ref = this.$refs.select;
    this.context = new fabric.Canvas(ref);
  },
  methods: {
    showCoordinates: function (e) {
      this.provider.x = e.offsetX;
      this.provider.y = e.offsetY;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#contex {
  border: 1px solid grey;
}

.sidebar-left{
  position: fixed;
  top: 0;
  bottom: -5;
  left: 0;
  z-index: 100;
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}
.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;
}

.btn-group-fab {
  position: fixed;
  _width: 50px;
  _height: auto;
  right: 20px; top: 5em;
}
</style>
