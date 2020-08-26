<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">VueC</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-button size="sm" >
            <b-icon icon="pencil-square"></b-icon>Save
          </b-button>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav right>
            <b-button-group>
              <b-button v-b-toggle.sidebar-right>object list</b-button>
            </b-button-group>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-overlay rounded="sm">
      <b-sidebar id="sidebar-right" title="Object list" right shadow>
        <b-card title="Card with overlay" >
          <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
          <b-card-text>Click the button to toggle the overlay:</b-card-text>
        </b-card>
      </b-sidebar>
      <span>{{provider.x}}, {{provider.y}}</span>
      <canvas
        id="contex"
        ref="select"
        width="500"
        height="600"
        @mousemove="showCoordinates"
        
      ></canvas>
      <!--<div class="container">
        <div class="row">
          <span>{{provider.x}}, {{provider.y}}</span>
          <button @click="addBox">add box</button>
          <button id="saveData" @click="saveData">nn</button>
        </div>
        <div class="row">
          <canvas
            id="contex"
            ref="select"
            width="500"
            height="600"
            @mousemove="showCoordinates"
            @mousedown="addBoxInPlace"
          ></canvas>
        </div>
      </div>-->
    </b-overlay>
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
    }
  }
}
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
</style>
