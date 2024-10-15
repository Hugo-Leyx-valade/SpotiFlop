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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background-color: rgba(245, 244, 244, 0);
}

body{
  background-color: rgb(78, 77, 77);
}

@font-face {
  font-family: 'LilGrotesk-regular'; /* Name your font family */
  src: url('./assets/Fonts/LilGrotesk-Regular.otf'); /* Locate the .ttf file within your directory*/
}

@font-face {
  font-family: 'LilGrotesk-bold'; /* Name your font family */
  src: url('./assets/Fonts/LilGrotesk-Bold.otf'); /* Locate the .ttf file within your directory*/
}



</style>
