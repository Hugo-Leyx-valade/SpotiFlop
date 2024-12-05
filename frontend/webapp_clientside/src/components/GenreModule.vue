<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;"> 
        {{ oneGenre.name }}
      </p>
  
      <!-- FOR DATA SHEET /songs/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
        <thead>
          <tr>
            <th>Title</th>
            <th>Number Of Streams</th>
            <th>Date Of Post</th>
            <th>Duration</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in songs" :key="s.id_song">
            <td>{{ s.title }}</td>
            <td>{{ s.number_of_streams }}</td>
            <td>{{ formatDate(s.date_of_post) }}</td>
            <td>{{ s.duration }}</td>
            <td>{{ s.alias }}</td>
            <td><a :href="'/#/songs/show/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
          </tr>
        </tbody>
      </table>
  



      <!-- FOR List /songs/list/all -->
     <!-- Genre List Container -->
     <div v-if="action === 'list'" class="container" style="margin-top: 20px; padding: 0 10px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
  
  <!-- Genre Card -->
      <div class="genre-card" 
          v-for="g in genres" 
          :key="g.id_genre" 
          @click="$router.push('/genres/show/' + g.id_genre);" 
          style="width: 250px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; cursor: pointer;" 
          onMouseOver="this.style.transform='scale(1.05)'" 
          onMouseLeave="this.style.transform='scale(1)'"> 
    <!-- Genre Name -->
    <div style="padding: 20px; text-align: center; font-size: 1.2rem; font-weight: bold; color: #333;">
      {{ g.name }}
    </div>
  </div>

</div>
  
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
        songs:[],
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
      try {
        let allGenre = await this.$http.get("http://localhost:9000/genresapi/list/");
        this.genres = await allGenre.data;
        console.log(JSON.stringify(this.genres));
        this.refreshOneGenre();
    } catch (ex) {
        console.log(ex);
        }
    },

    formatDate(incomingDate) {
      const date = new Date(incomingDate);
  // Format the date (e.g., as 'YYYY-MM-DD')
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
},


async refreshOneGenre(){
      if (this.$props.id === "all" || this.$props.id === "0") {
        this.oneGenre = {
          id_genre: 0,
          name: "",
        };
        this.songs = [];
        return;
    }
    try {
      let responseGenre = await this.$http.get("http://localhost:9000/genresapi/show/" + this.$props.id);
      var result = responseGenre.data;
      if(result.error === 0){
        this.oneGenre = result.object.genre[0];
        this.songs = result.object.songs;
      }else{
    alert("Can't resolve ! ")
  }
    }
    catch (ex) { console.log(ex); }
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
  