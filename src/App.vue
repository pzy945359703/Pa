<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin:0px
}
html,body,#app {
  height: 100%;
}
.container {
  width:80%;
  margin-left:auto;
  margin-right:auto;
}
.white-panel{
  margin-top:20px;
  background-color:white
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
