<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
        Genres 
        {{ action }}
      </p>
  
      <!-- FOR DATA SHEET /songs/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
        <tr><td>ID</td><td>{{oneGenre.genre_id}}</td></tr>
        <tr><td>Name</td><td>{{oneGenre.genre_name}}</td></tr>
      </table>
  
      <!-- FOR FORMS /songs/edit/42 -->
      <table v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
      <tr><td>Name</td><td><input type="text" name="genre_name" v-model="oneGenre.genre_name"/></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>
  
      <!-- FOR List /songs/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>Name</td>
        <td>SHOW DETAILS</td>
        <td>EDIT GENRE</td>
        <td>DELETE GENRE</td>
      </tr>
      <tr v-for="g in genres" :key="g.genre_id">
        <td>{{ g.genre_name }}</td>
        <td><a :href="'/#/genres/show/' + g.genre_id" @click="oneGenreLoad(g)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'">SHOW</a></td>
        <td><a :href="'/#/genres/edit/' + g.genre_id" @click="oneGenreLoad(g)" style="color: black; font-weight: bold; text-decoration: none; border-radius: 25px;"onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'">EDIT</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(g.genre_id)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#ff6600'" onMouseLeave="this.style.background='white'"/></td>
      </tr>
    </table>
  
    </div>
  </template>
  
  <script>
  import Home from './homeModulesAdmin.vue';
  import genre from './genres.json'

  export default {
    name: 'Genres',
    components: {
      Home
    },
    props:['action','id'],
    data () {
      return {
        genres : [],
        oneGenre : {
          genre_id: 0,
          genre_name:'',
        }
      }
    },

    mounted() {
    this.changeBodyBackgroundColor();
    },

    methods:{
      async getALLData(){
        /*
        let responesAuthors = await this.$http.get("backend/url");
        this.cars = responesAuthors.data;
        let reponseSong = await this.$http.get('wxxx');
        this.song = reponseSong.data;
         */
         try {
      this.genres = genre;

    } catch (ex) {
        console.log(ex);
        }
    },
      async refreshOneGenre(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneGenre = this.genres.find(genre=>genre.genre_id==this.$props.id);
        }catch (ex){console.log(ex);}
      },

      changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    }

    },

    oneGenreLoad(genre){
      this.oneGenre.genre_id = genre.genre_id;
      this.oneGenre.genre_name = genre.genre_name;
    },
  
    watch:{
      id: function(newVal, oldVAl){
        this.refreshOneGenre();
      }
    },
  
    created(){
      this.getALLData();
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
  
  #app table {
    width: 95%; 
    margin: 20px;
    color: white;
    background-color: #33333300;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'LilGrotesk', sans-serif;
  }
  
  #app table tr{
    background-color: #f1eeee00;
  }

  #app td, #app th{
    padding: 10px;
    border: 2px solid #cfcfcf;
    text-align: center;
    font-weight: bold;

  }
  
  </style>
  