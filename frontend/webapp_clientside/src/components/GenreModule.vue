<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <home></home>
      <p>
        ACTION = {{ action }} <br />
        ID = {{ id }} <br/>
        <a href="/#/genres/list/all">Back to the list of genres</a>
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
          <td>ID</td><td>Name</td><td>SHOW DETAILS</td><td>EDIT GENRE</td><td>DELETE GENRE</td>
        </tr>
        <tr v-for="g of genres" v-bind:key="g.genre_id">
          <td>{{ g.genre_id }}</td>
          <td>{{ g.genre_name }}</td>
          <td><a :href="'/#/genres/show/' + g.genre_id">[SHOW]</a></td>
          <td><a :href="`/#/genres/edit/${g.genre_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </table>
  
    </div>
  </template>
  
  <script>
  import Home from './homeModulesAdmin.vue';

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
      this.genres = [
        { genre_id: 1, genre_name: 'Rock' },
        { genre_id: 2, genre_name: 'Jazz' },
        { genre_id: 3, genre_name: 'Hip Hop' },
        { genre_id: 4, genre_name: 'Classical' },
        { genre_id: 5, genre_name: 'Pop' },
        { genre_id: 6, genre_name: 'Electronic' },
        { genre_id: 7, genre_name: 'Reggae' },
        { genre_id: 8, genre_name: 'Blues' },
        { genre_id: 9, genre_name: 'R&B' },
        { genre_id: 10, genre_name: 'Country' },
        { genre_id: 11, genre_name: 'Folk' },
        { genre_id: 12, genre_name: 'Metal' },
        { genre_id: 13, genre_name: 'Indie' },
        { genre_id: 14, genre_name: 'Techno' },
        { genre_id: 15, genre_name: 'Soul' },
        { genre_id: 16, genre_name: 'Funk' },
        { genre_id: 17, genre_name: 'Psytrance' },
        { genre_id: 18, genre_name: 'Afrobeat' },
        { genre_id: 19, genre_name: 'Salsa' },
        { genre_id: 20, genre_name: 'Dubstep' },
      ];
    } catch (ex) {
        console.log(ex);
        }
    },
      async refreshOneGenre(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneGenre = this.genres.find(genre=>this.genres.genre.id==this.$props.id);
        }catch (ex){console.log(ex);}
      },

      changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    }

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
    color: #ffffff;
  }
  
  #app table {
    width: 95%; margin: 20px;
  }
  
  #app td{
    text-align: left;
  }
  
  </style>
  