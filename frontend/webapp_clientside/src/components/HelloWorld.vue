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
  data() {
    return {
      msg: 'SpotiFlop',
    }
  },

  
  methods: {
    changeColor(event) {
      event.target.src = require('@/assets/spotify-playlist_white.png');
      document.getElementById("txt1").style.webkitTextStroke = "0.5px white"; 
      document.getElementById("txt2").style.color = "white";
    },

    revertColor(event) {
      event.target.src = require('@/assets/spotyflop.png');
      document.getElementById("txt1").style.webkitTextStroke = "0.5px #1bc156"; 
      document.getElementById("txt2").style.color = "#1bc156";
    }

  },


  mounted() {
    // Add event listeners when the component is mounted
    const logo = document.getElementById('logo-green');
    if (logo) {
      logo.addEventListener('mouseover', this.changeColor);
      logo.addEventListener('mouseout', this.revertColor);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@import url("https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  display: flex;
  background: #000;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
}

.content {
  position: relative;
  z-index: -1;
}


.content p {
  color: #fff;
  font-size: 8em;
  position: absolute;
  justify-content: center;
}

.content p:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 0.5px #1bc156;
}

.content p:nth-child(2) {
  color: #1bc156;
  animation: animate 4s ease-in-out infinite;
}


@keyframes animate {
  0%,
  100% {
    clip-path: polygon(
      0% 45%,
      16% 44%,
      33% 50%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}


#myVideo {
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}

</style>
