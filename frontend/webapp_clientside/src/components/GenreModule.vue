<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <Home></Home>
      <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; margin-top: -15%; margin-bottom: 7%;" >Genre</span>
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
            <td><a :href="'/#/songs/show/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='white'" onMouseLeave="this.style.background='transparent'" >SHOW</a></td>
          </tr>
        </tbody>
      </table>
  



      <!-- FOR List /songs/list/all -->
     <!-- Genre List Container -->

     <div 
  v-if="action === 'list'" 
  class="container"
  style="margin-top: 60px; display: grid; grid-template-columns: repeat(3, 10fr); gap: 20px; padding-left: 20%; padding-right: 20%;"
>
  <!-- Genre Card -->
  <div 
    class="genre-card" 
    v-for="g in genres" 
    :key="g.id_genre" 
    @click="$router.push('/genres/show/' + g.id_genre);"
    style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; cursor: pointer;" 
    onMouseOver="this.style.transform='scale(1.05)'" 
    onMouseLeave="this.style.transform='scale(1)'"
  >
    <!-- Genre Name -->
    <div style="padding: 20%; text-align: center; font-size: 1.1rem; font-weight: bold; color: #333;">
      {{ g.name }}
    </div>
  </div>
</div>

  
    </div>
  </template>
  
  <script>
  import Home from './BacktohomeModule.vue';
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
      document.body.style.background = 'linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat';
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
  
  /* General table styling */
/* General table styling */
.table {
  width: 80%; /* Adjust the table's width */
  margin: 20px auto; /* Center the table on the page */
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.5); /* 50% transparent background */
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

/* Table headers styling */
.table th {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  padding: 12px 15px;
}

/* Table cells styling */
.table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

/* Zebra striping for rows */
.table tbody tr:nth-child(even) {
  background-color: rgba(200, 230, 201, 0.3); /* Slightly tinted for even rows */
}

/* Hover effect for table rows */
.table tbody tr:hover {
  background-color: rgba(143, 188, 143, 0.5); /* A soft hover effect */
}

/* "SHOW" link styling */
.table tbody tr td a {
  color: #333;
  font-weight: bold;
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 25px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.table tbody tr td a:hover {
  background-color: #7efca4;
  color: black;
}

/* Center the table and add spacing from other elements */
body {
  background-color: #f0f0f0; /* Ensure the body has a soft background for contrast */
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}


  
  </style>
  