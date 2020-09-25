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
    parametres: {
      zoom: 1,
      x: 1024,
      y: 720,
      bg: null,
      wp: null,
      group: null,
    },
    context: null,
    curBuilding: {},
    curFloor: null,
  }),

  components: {},

  created() {},

  mounted() {
    fabric.Group.prototype.initialize = (function (initialize) {
      return function () {
        initialize.apply(this, arguments);
        // prepend rect before=behind group objects
        this._objects = [
          new fabric.Rect({
            // position from group center
            left: -0.5 * this.width,
            top: -0.5 * this.height,
            width: this.width,
            height: this.height,

            stroke: "#00f",
            strokeWidth: 2,
            fill: false,
          }),
        ].concat(this._objects);
      };
    })(fabric.Group.prototype.initialize);

    const ref = this.$refs.cvs_pln;
    this.context = new fabric.Canvas("cvs_pln", {
      fireRightClick: true, // <-- enable firing of right click events
      fireMiddleClick: true, // <-- enable firing of middle click events
      stopContextMenu: true, // <--  prevent context menu from showing
    });
    this.preparePane(this.context, this.parametres);
    this.$store.commit("preload");
    this.context.on("mouse:down", (event) => {
      if (event.button === 1) {
        console.log(event);
      }
      if (event.button === 2) {
        console.log(event);
      }
      if (event.button === 3) {
        console.log(event);
        //event.target.selectable = true;
        this.context.setActiveObject(event.target);
      }
    });
     
    this.context.on("mouse:wheel", (opt) => {
      
      //console.log(event);
      var canvas = this.context;
      var delta = opt.e.deltaY*10;
      console.log(opt.e.deltaY);
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
//      var vpt = canvas.viewportTransform;
//      if (zoom < 400 / 1000) {
//        vpt[4] = 200 - (1000 * zoom) / 2;
//        vpt[5] = 200 - (1000 * zoom) / 2;
//      } else {
//        if (vpt[4] >= 0) {
//          vpt[4] = 0;
//        } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
//          vpt[4] = canvas.getWidth() - 1000 * zoom;
//        }
//        if (vpt[5] >= 0) {
//          vpt[5] = 0;
//        } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
//          vpt[5] = canvas.getHeight() - 1000 * zoom;
//        }
//      }
    });
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
    preparePane: function (context, parametres) {
      context.setWidth(parametres.x);
      context.setHeight(parametres.y);
      context.setZoom(parametres.zoom);

      parametres.bg = new fabric.Group([], {
        title: "background",
        uid: "00000000-1000-1000-0000-000000000000",
        width: parametres.x,
        height: parametres.y,
        originX: "center",
        originY: "center",
        dirty: true,
        selectable: false,
      });
      parametres.wp = new fabric.Group([], {
        title: "work space",
        uid: "00000000-9999-0000-0000-000000000000",
        width: parametres.x,
        height: parametres.y,
        originX: "center",
        originY: "center",
        selectable: false,
      });
      parametres.group = new fabric.Group([parametres.bg, parametres.wp], {
        title: "pane",
        uid: "00000000-0000-0000-0000-000000000000",
        left: 0,
        top: 0,
        selectable: false,
      });

      context.add(parametres.bg);
      context.add(parametres.wp);
      context.add(parametres.group);
    },
    setCurBuilding: function (building) {
      this.curBuilding = building;
    },
    setCurFloor: function (floor) {
      this.curFloor = floor;
      this.loadFloorData(floor);
    },
    loadFloorData: function (floor) {
      var fb = this.context;
      var p = this.parametres;
      var bg = p.bg;
      var floorImg = new Image();
      floorImg.src = floor.img;

      bg._objects = [];

      floorImg.onload = function () {
        var i = new fabric.Image(floorImg, {
          name: "bg_i",
          originX: "center",
          originY: "center",
          scaleX:
            floorImg.width > floorImg.height
              ? p.x / floorImg.width
              : p.y / floorImg.height,
          scaleY:
            floorImg.width > floorImg.height
              ? p.x / floorImg.width
              : p.y / floorImg.height,
        });

        bg.add(i);
      };

      fb.requestRenderAll();
    },
    
  },

  watch: {},
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