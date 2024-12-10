<template>
  <div class="hello" >
    <video autoplay muted loop id="myVideo">
      <source src="../assets/1013.mp4" type="video/mp4">
    </video>

    <a href="/#/authentication/option"><img id="logo-green" src="../assets/spotyflop.png" onmouseover="ChangeLogo(this)"></a>
    <div class="content d-flex justify-content-center" id="txt">
      <p id="txt1" >{{ msg }}</p>
      <p id="txt2" >{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
