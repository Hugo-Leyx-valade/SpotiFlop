<template>
  <div id="app">
      <router-view/>
      <div style="padding-top: 500px;">
      </div>
      <footer>
        <p>SpotiFlop</p>
      </footer>
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
  
}

body{
  background: linear-gradient(180deg, rgba(59,228,119,1) 0%, rgba(59,228,119,1) 0%, rgba(0,0,0,1) 74%) no-repeat; 
  background-size: cover;
  height:100%;
  background-color: rgb(0, 0, 0);
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
