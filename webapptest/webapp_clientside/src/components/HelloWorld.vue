<template>
  <div class="hello">

    <h1>{{ msg }}</h1>
    <img id="logo-green" src="../assets/spotyflop.png">
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="/#/authors/list/all"
          target="_blank"
        >
          Authors list
        </a>
      </li>

      <li>
        <a
          href="/#/users/list/all"
          target="_blank"
        >
          Users List
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to SpotiFlop',
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

#logo-green{
  position: fixed;
  top: 0;
  left: 0;
  scale: 40%;
  transition: all 0.3s;
}

</style>
