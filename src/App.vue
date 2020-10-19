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

      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNavDropdown"
      >
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
                >
                  {{ building.name }}
                </option>
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
                >
                  {{ floor.name }}
                </option>
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
            >
              place list
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <div id="sidebar" class="bg-light shadow sidebar_left">
      <ul class="nav flex-column text-white">
        <li class="nav-item">
          <button
            class="btn btn-outline-primary"
            @click="
              paneOperation_zoom(context, {
                e: {
                  deltaY: 6,
                  offsetX: parametres.x / 2,
                  offsetY: parametres.y / 2,
                },
              })
            "
          >
            zoom out
          </button>
        </li>
        <li class="nav-item">
          <button
            class="btn btn-outline-primary"
            @click="
              paneOperation_zoom(parametres.bg, {
                e: {
                  deltaY: -6,
                  offsetX: parametres.x / 2,
                  offsetY: parametres.y / 2,
                },
              })
            "
          >
            zoom in
          </button>
        </li>
        <li class="nav-item">
          <button
            class="btn btn-outline-primary"
            @click="
              paneOperation_rotate(parametres.bg, {
                e: {
                  deltaY: -6,
                  offsetX: parametres.x / 2,
                  offsetY: parametres.y / 2,
                },
              })
            "
          >
            rotate right
          </button>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-primary" @click="ddd()">
            Disabled
          </button>
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
        <canvas id="cvs_pln" style="border: 1px solid #000000"> </canvas>
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
      Drager: {
        isDrag: false,
        x: 0,
        y: 0,
      },
      Rotator: {
        isRotate: false,
        ang: 0,
        x: 0,
        y: 0,
      },
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
      renderOnAddRemove: true,
    });
    this.preparePane(this.context, this.parametres);
    this.$store.commit("preload");
    this.context.on("mouse:down", (event) => {
      //if (event.button === 1) {
      //  console.log(event);
      //}
      if (event.button === 3) {
        console.log(event);
        this.parametres.Drager = {
          isDrag: true,
          dx: 0,
          dy: 0,
          x: 0,
          y: 0,
        };
      }
      if (event.button === 2) {
        console.log(event);
        this.parametres.Rotator = {
          isRotate: true,
          ang: 0,
          x: 0,
          y: 0,
        };
      }
    });
    this.context.on("mouse:up", (event) => {
      //if (event.button === 1) {
      //  console.log(event);
      //}
      if (event.button === 3) {
        console.log(event);
        this.parametres.Drager = {
          isDrag: false,
          dx: 0,
          dy: 0,
          x: 0,
          y: 0,
        };
      }
      if (event.button === 2) {
        console.log(event);
         this.parametres.Rotator = {
          isRotate: false,
          ang: 0,
          x: 0,
          y: 0,
        };
      }
    });
    this.context.on("mouse:move", (event) => {
      if (this.parametres.Drager.isDrag) {
        this.paneOperation_drag(this.parametres.bg, event);
      }
      if(this.parametres.Rotator.isRotate){
        this.paneOperation_rotate(this.parametres.bg, event);
      }
    });

    this.context.on("mouse:wheel", (event) => {
      this.paneOperation_zoom(this.context, event);
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
    paneOperation_zoom: function (context, event) {
      var delta = event.e.deltaY * 10;
      var zoom = this.context.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      this.context.zoomToPoint(
        { x: event.e.offsetX, y: event.e.offsetY },
        zoom
      );
      event.e.preventDefault();
      event.e.stopPropagation();
    },
    paneOperation_rotate: function (obj, event) {
      console.log(event);
      
      let ang = obj.angel;
      ang = ang + 15;
      obj.angle = obj.angle + 15;
      this.context.requestRenderAll();
    },
    paneOperation_drag: function (obj, event) {
      let Drager = this.parametres.Drager;

      Drager.dx = Drager.x === 0 ? 0 : Drager.x - event.e.clientX;
      Drager.dy = Drager.y === 0 ? 0 : Drager.y - event.e.clientY;
      Drager.x = event.e.clientX;
      Drager.y = event.e.clientY;

      obj.left = this.parametres.bg.left + -1 * Drager.dx;
      obj.top = this.parametres.bg.top - Drager.dy;
      obj.setCoords();
      this.context.requestRenderAll();
    },
    preparePane: function (context, parametres) {
      context.setWidth(parametres.x);
      context.setHeight(parametres.y);
      context.setZoom(parametres.zoom);

      parametres.bg = new fabric.Group([], {
        title: "background",
        uid: "00000000-1000-1000-0000-000000000000",
        left: parametres.x / 2,
        top: parametres.y / 2,
        width: parametres.x,
        height: parametres.y,
        originX: "center",
        originY: "center",
        dirty: false,
        selectable: false,
      });

      context.add(parametres.bg);
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

      floorImg.onload = function () {
        for (let obj in bg._objects) {
          bg.remove(bg._objects[obj]);
        }

        var i = new fabric.Image(floorImg);
        i.set({
          name: "bg_i" + floor.name,
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
        bg.bringToFront(i);
        console.log(bg._objects);
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
.btn-fab.btn {
  position: fixed;
  width: 50px;
  height: 50px;
  right: 20px;
  bottom: 20px;
  border-radius: 50%;
}
</style>