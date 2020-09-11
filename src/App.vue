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

      <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        <ul class="nav">
          <li class="nav-item">
            <div class="input-group">
              <select
                class="custom-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
              >
                <option>building...</option>
                <option
                  v-for="building in planing"
                  :key="building.id"
                  @click="setCurBuilding(building)"
                >{{building.name}}</option>
              </select>
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button">Button</button>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="input-group">
              <select class="custom-select" id="inputGroupSelect04">
                <option selected>floor...</option>
                <option
                  v-for="floor in floorList"
                  :key="floor.id"
                  @click="setCurFloor(floor)"
                >{{floor.name}}</option>
              </select>
              <!--<option value="1">One</option>
                <option value="2">Two</option>
              <option value="3">Three</option>-->
            </div>
          </li>
          <li class="nav-item">
            <button
              class="btn btn-light"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavRight"
              aria-controls="navbarNavRight"
              aria-expanded="true"
              aria-label="Toggle navigation"
            >place list</button>
          </li>
        </ul>
      </div>
    </nav>
    <div id="sidebar" class="bg-light shadow sidebar_left">
      <ul class="nav flex-column text-white">
        <li class="nav-item">
          <button class="btn btn-outline-primary">tool 1</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary">tool 2</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary">tool 3</button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary">Disabled</button>
        </li>
      </ul>
    </div>
    <div class="main">
      <!--<div class="col">
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
      </div>-->
      <div class="container">
        <canvas id="cvs_pln" style="border:1px solid #000000;"></canvas>
      </div>
    </div>
    <div
      id="navbarNavRight"
      class="collapse navbar-collapse-right-to-left bg-info shadow-lg sidebar_right"
    >
      <ul class="nav">
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
      <div class="card">
        <!--<div class="card-header">Featured</div>-->
        <div class="card-body">
          <!--<ul class="list-group list-group-flush">
            <li class="list-group-item">id {{obj.id}}</li>
            <li class="list-group-item">{{obj.jj}}</li>
            <li class="list-group-item">{{obj.jsonity}}</li>
          </ul>-->
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
    curBuilding: {},
    curFloor: null,
  }),

  components: {},

  created() {},

  mounted() {
    const ref = this.$refs.cvs_pln;
    this.context = new fabric.Canvas("cvs_pln");
    this.context.setWidth(1024);
    this.context.setHeight(720);
    this.context.renderOnAddRemove = true;

    this.$store.commit("preload");

    //var fuu = this.context;
    //
    //var srcI =;
    //
    // var pugImg = new Image();
    // pugImg.src = srcI;
    //var imgInstance = new fabric.Image(pugImg, {
    //   left: 10,
    //   top: 10,
    //   height: 70,
    //   width: 124,
    // });
    //this.context.add(imgInstance);

    //pugImg.onload = function () {
    //           //fuu.setHeight(500);
    //           //fuu.setWidth(500);
    //           fuu.setBackgroundImage(srcI, fuu.renderAll.bind(fuu));
    //       };
    //fabric.Image.fromURL(srcI, function (img) {
    //  img.set({ top: 0, left: 0, angle: 0, opacity: 1, selectable: true });
    //  fuu.add(img);
    //});
  },

  computed: {
    planing() {
      return this.$store.getters.getPlaningAll;
    },
    floorList() {
      return this.curBuilding.floors;
    },
  },

  methods: {
    setCurBuilding: function (building) {
      this.curBuilding = building;
    },
    setCurFloor: function (floor) {
      this.curFloor = floor;
      this.loadFloorData(floor);
    },
    loadFloorData: function (floor) {
      let fb = this.context;
      var floorImg = new Image();
      floorImg.src = floor.img;
      //var imgInstance = new fabric.Image(floorImg, {
      //  left: 1,
      //  top: 1,
      //  height: 1204,
      //  width: 720,
      //});
      //this.context.add(imgInstance);

      floorImg.onload = function () {
        fb.setBackgroundImage(floor.img, fb.renderAll.bind(fb));
      };
      fabric.Image.fromURL(floor.img, function (img) {
        img.set({ top: 0, left: 0, angle: 0, opacity: 1, selectable: true });
        fb.add(img);
      });
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

#sidebar,
#navbarNavRight {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
  margin-top: 55px;
}

.sidebar_left {
  width: 160px;
  top: 0;
  left: 0;
}

.sidebar_right {
  top: 0;
  right: 0;
  padding: 15px;
}

.main {
  margin-left: 160px;
}

.nav-item {
  margin-right: 5px;
}
.card {
  margin-bottom: 15px;
}

.navbar-collapse-right-to-left {
  left: 50%;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  _width: 100%;
  transition: all 0.4s ease;
  display: block;
}
.navbar-collapse-right-to-left.collapsing {
  height: auto !important;
  margin-left: 50%;
  left: 50%;
  transition: all 0.2s ease;
}
.navbar-collapse-right-to-left.show {
  right: 0;
}
</style>
