<template>
  <div id="app">
    <div class="container">
      <div class="col">
        <!---->
        <div class="row">
          <span>{{provider.x}}, {{provider.y}}</span>
          <button @click="addBox">add box</button>
        </div>
        <div class="row">
          <canvas id="contex" ref="select" width="800" height="600" @mousemove="showCoordinates">
          </canvas>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'App',
 data: () => ({
      provider: {
        x:50,
        y:130,
       
        obj:[]
  },
   context: null,
  }),
  components: {
    
  },
  mounted() {
    this.$refs.select.height = window.innerHeight;
    this.$refs.select.width = window.innerWidth;
    this.context = this.$refs.select.getContext("2d");
    // this.ctx.fillRect(0,0,500,500);
  },
  methods: {
    showCoordinates: function (e) {
      console.log(this);
       this.provider.x = e.offsetX;
       this.provider.y = e.offsetY;
    },
    addBox: function (){
      this.context.beginPath();
      this.context.rect(20, 20, 150, 100);
      this.context.stroke();
      //this.provider.context.addBox()   
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
  margin-top: 60px;
}
#contex {
  border: 1px solid grey;
}
</style>
