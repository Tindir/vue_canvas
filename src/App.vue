<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">VueC</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav right>
            <b-button-group>
              <b-button size='sm' @click="addBox">
                <b-icon icon='pencil-square'></b-icon>
                Save
              </b-button>
            </b-button-group>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-overlay :show="show" rounded="sm">
      <b-card title="Card with overlay" :aria-hidden="show ? 'true' : null">
        <b-card-text>Laborum consequat non elit enim exercitation cillum.</b-card-text>
        <b-card-text>Click the button to toggle the overlay:</b-card-text>
        <b-button :disabled="show" variant="primary" @click="show = true">Show overlay</b-button>
      </b-card>

 <div class="container" >
        <div class="row">
          <span>{{provider.x}}, {{provider.y}}</span>
          <button @click="addBox">add!!1111!!box</button>
          <button id="saveData" @click="saveData">nn</button>
        </div>
        <div class="row">
          <canvas id="contex" ref="select" width="500" height="600" @mousemove="showCoordinates" @mousedown="addBoxInPlace">
          </canvas>
        </div>
    </div>

    </b-overlay>
  </div>
</template>

<script>
import store from "./store/store";

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
     this.$refs.select.height = 500;
     this.$refs.select.width = 600;
     this.context = this.$refs.select.getContext("2d");
     // this.ctx.fillRect(0,0,500,500);
  },
  methods: {
     showCoordinates: function (e) {
       //console.log(this);
        this.provider.x = e.offsetX;
        this.provider.y = e.offsetY;
     },

     addBoxInPlace: function(e){
       this.provider.curObj = this.$store.dispatch('new_obj');
       this.provider.curObj.id = '999-666-888';
       this.provider.curObj.name = 'obj_' + e.offsetX + '_' + e.offsetY + '';

     this.context.beginPath();
       this.context.rect(e.offsetX, e.offsetY, 150, 100);
       this.context.stroke();

       console.log(this.provider.curObj)
     },

     addBox: function (){
       this.context.beginPath();
       this.context.rect(20, 20, 150, 100);
       this.context.stroke();
     },
     saveData: function(v){

       let dd = {i:12312312, dd:'werwerwer'};
       return JSON.stringify(dd)

     },
     loadData: function(d){
       this.provider.x = d;
     }
   }
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
</style>
