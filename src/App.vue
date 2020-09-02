<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Vc</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
       
        <div class="input-group">
          <select
            class="custom-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
          >
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button">Button</button>
          </div>
        </div>
       
      </div>
    </nav>
    <div id="sidebar" class="bg-light shadow sidebar_left">
      <ul class="nav flex-column text-white">
        <li class="nav-item">
          <a class="nav-link active" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="col">
        <div class="col bg-primary" style="height:150px"></div>
        <div class="col bg-secondary" style="height:150px"></div>
        <div class="col bg-primary" style="height:150px"></div>
        <div class="col bg-secondary" style="height:150px"></div>
        <div class="col bg-primary" style="height:150px"></div>
        <div class="col bg-secondary" style="height:150px"></div>
        <div class="col bg-primary" style="height:150px"></div>
        <div class="col bg-secondary" style="height:150px"></div>
        <div class="col bg-primary" style="height:150px"></div>
        <div class="col bg-secondary" style="height:150px"></div>
        <div class="col bg-primary" style="height:150px"></div>
      </div>
    </div>
    <div id="sidebar" class="bg-info sidebar_right toggle"></div>
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
.ddd {
  height: 50px;
}

#app {
  height: 100%;
  min-height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#contex {
  border: 1px solid grey;
}

#sidebar {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  margin-top: 55px;
}

.sidebar_left {
  top: 0;
  left: 0;
}

.sidebar_right {
  top: 0;
  right: 0;
}

.main {
  margin-left: 160px;
}

.toggle {
  display: none;
}
</style>
