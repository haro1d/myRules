<template>
  <div id="app">
    <div id="nav">
      <el-button @click="test">安妮</el-button>
      <br>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
 export default {
   data () {
     return {
       
     }
   },
   methods: {
     test(){
       console.log(123);
     }
   },
 }
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-button {
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s linear, border 0.3s linear;
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(
      circle,
      #000 10%,
      rgba(0, 0, 0, 0) 10.01%
    );
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }
  &:active:after {
    transform: scale(0);
    opacity: 0.1;
    transition: 0s;
  }
}
</style>
