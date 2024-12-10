<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <Home></Home>
      

      <!-- Détails de la playlist pour /playlist/show/ID -->
  <div v-if="action === 'show'" style="display: flex; flex-direction: column; align-items: flex-start;">

    <!-- Playlist Title -->
    <p style="color: aliceblue; font-weight: bold; margin-top: 5.4%; margin-left: 3%; font-size: 500%; font-weight: 800;">
      {{onePlaylist.title}}
    </p>

    <!-- Info Section -->
    <div id="info" 
        style="display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 30px; padding: 10px; color: aliceblue; font-size: 105%; font-weight: lighter;margin-left: 4%; margin-top: -2%;">

      <!-- Username -->
      <span>{{onePlaylist.username}}</span>

      <!-- Download Icon and Number of Saves -->
      <span style="display: flex; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-download" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
        </svg>
        <span style="margin-left: 5px;">{{onePlaylist.number_of_save}}</span>
      </span>

      <!-- Lock/Unlock Icon and State -->
      <span style="display: flex; align-items: center;">
        <svg v-if="onePlaylist.state === 'private'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
        </svg>
        <svg v-if="onePlaylist.state === 'public'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
          <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
        </svg>
        <span>{{onePlaylist.state}}</span>
      </span>
      <p id="date of post" style="color: aliceblue; font-size: 100%; text-align: center; margin-top: 2%;">
        {{formatDate(onePlaylist.date_of_post)}}
      </p>
      <p id="description" style="color: aliceblue; font-size: 120%; text-align: center; margin-top: 2%;">
        {{onePlaylist._description}}
      </p>
      
    </div>
  
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr id="legende" style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>Title</td><td>Username</td><td>Number Of Saves</td><td>Show</td>
      </tr>
      <tr id="values" v-for="p of playlist">
        <td style="color: aliceblue; font-weight: bold;">{{ p.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.alias }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.number_of_streams }}</td>
        <td><a :href="'/#/songs/show/' + p.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'">SHOW</a></td>
      </tr>
    </table>
  
  </div>



    <!-- Formulaire d'édition de la playlist pour /playlist/edit/ID -->
  <div v-if="action === 'edit'" style="display: flex; flex-direction: column; align-items: flex-start;">

<form class="playlist-form" @submit.prevent="sendEditRequest" style="margin-left: 2%; margin-top: 2%;"> 
<!-- Playlist Title -->
<input style="color: aliceblue; font-weight: bold; margin-top: 5.4%; margin-left: 3%; font-size: 500%; font-weight: 800; background-color: transparent;border-radius: 90px;" v-model="onePlaylist.title" required>
  
</input>

<!-- Info Section -->
  <div id="info" 
      style="display: flex; align-items: center; justify-content: flex-start; flex-wrap: wrap; gap: 30px; padding: 10px; color: aliceblue; font-size: 105%; font-weight: lighter;margin-left: 4%; margin-top: -1%;">

    <!-- Username -->
    <span>{{onePlaylist.username}}</span>

    <!-- Download Icon and Number of Saves -->
    <span style="display: flex; align-items: center;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-download" viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
      </svg>
      <span style="margin-left: 5px;">{{onePlaylist.number_of_save}}</span>
    </span>

    <!-- Lock/Unlock Icon and State -->
    <span style="display: flex; align-items: center;">
      <svg v-if="onePlaylist.state === 'private'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
      </svg>
      <svg v-if="onePlaylist.state === 'public'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
      </svg>
      <select class="dropdown" v-model="onePlaylist.state" style="background-color: transparent; border-radius: 90px;color: aliceblue;">
        <option disabled selected>Select an option</option>
        <option value="public" style="color: black;">public</option>
        <option value="private" style="color: black;">private</option>
      </select>
    </span>
    <p id="date of post" style="color: aliceblue; font-size: 100%; text-align: center; margin-top: 2%;">
        {{formatDate(onePlaylist.date_of_post)}}
      </p>
    <textarea id="description" style="color: aliceblue; font-size: 120%; text-align: center; margin-top: 2%; background-color: transparent; border-radius: 90px; width: 40%; height: 1%; font-size: 90%;" v-model="onePlaylist._description">
      {{onePlaylist._description}}
    </textarea>
    <input v-if="id==='0'" type="number" min="0" v-model="onePlaylist.id_user" style="background-color: transparent; border-radius: 90px;color: aliceblue; width: 5%;">

    <button type="submit" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px; border-width: 0px; color: aliceblue;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='transparent'">Submit</button>
  </div>
  
</form>
<table v-if="action === 'edit' && id !=='0'" class="table table-striped table-bordered table-hover">
      <tr id="legende" style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>Title</td><td>Author</td><td>Number Of Streams</td><td>Show</td>
      </tr>
      <tr id="values" v-for="p of playlist">
        <td style="color: aliceblue; font-weight: bold;">{{ p.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.alias }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.number_of_streams }}</td>
        <td><a :href="'/#/songs/show/' + p.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'">SHOW</a></td>
      </tr>
    </table>
</div>



    <!-- Liste des playlists pour /playlist/list/all -->
    <div v-if="action === 'list'" class="filters">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search by Playlist's Name or Maker..." 
        style="margin-bottom: 10px; padding: 10px; width: 20%; border-radius: 90px; border-color: transparent;"
      />
    </div>
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr id="legende" style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>Title</td><td>Number Of Saves</td><td>Date Of Post</td><td>Maker</td><td>Show</td>
      </tr>
      <tr id="values" v-for="p in filteredPlaylist" :key="p.id_playlist">
        <td style="color: aliceblue; font-weight: bold;">{{ p.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.number_of_save }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ formatDate(p.date_of_post) }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.username }}</td>
        <td><a :href="'/#/playlist/show/' + p.id_playlist" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px; color: aliceblue; padding: 10px;" onMouseOver="this.style.background='lightblue'" onMouseLeave="this.style.background='transparent'">SHOW</a></td>
      </tr>
    </table>
  </div>
  </template>
  
  <script>
  import Home from './BacktohomeModule.vue';

  export default {
    name: 'Playlist',
    components: {
      Home
    },
    props:['action','id'],
    data () {
      return {
        searchQuery: "",
        selectedGenre: "",
        playlists : [],
        playlist:[],
        onePlaylist : {
          playlist_id: 0,
          playlist_title:'',
          playlist_date: 0,
          playlist_num_saves: 0,
          playlist_description:'',
          playlist_state: 'public or private',
          playlist_author_id: 0,
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
       try  {
        let responseSong = await this.$http.get("http://localhost:9000/playlist/list");
        this.playlists = await responseSong.data;
        console.log(" songs " + JSON.stringify(this.playlists));
        this.refreshOnePlaylist();

        }
        catch (ex) {console.log(ex);}
      },

      async refreshOnePlaylist(){
        if (this.$props.id === "all" || this.$props.id === "0") {
          this.onePlaylist = {
          id_playlist: 0,
          title:'Playlist name',
          date_of_post: new Date(),
          number_of_save:0,
          _description:'ouio',
          state:'public',
          id_user: 0,
        };
      this.playlist = [];
  return;
    }else{ 
          try{
            let response = await this.$http.get("http://localhost:9000/playlist/show/" + this.$props.id);
            var result = await response.data;
            if(result.error === 0){
              this.onePlaylist = result.object.playlist;
              this.onePlaylist.date_of_post = this.formatDate(this.onePlaylist.date_of_post);
              this.playlist = result.object.songs;
            }else{
              alert("Unknow playlist ...");
            }
          }catch (ex){console.log(ex);}
        }
      },

      async sendEditRequest(){
        try {
          if(this.$props.id === "0"){
            let response = await this.$http.post(
                "http://localhost:9000/playlist/add/",this.onePlaylist);
            if(response.data === false){
              alert("Fild are not correct");
            }else{
              alert("Added: " + response.data.rowsUpdated);
              this.$router.push({ path: '/playlist/list/all' });
              this.getAllData();
            }
          }else{
            let response = await this.$http.post(
                  "http://localhost:9000/playlist/update/" + this.onePlaylist.id_playlist, this.onePlaylist);
            if(response.data === false){
              alert("Fild are not correct");
            }else{
              alert("EDITED: " + response.data.rowsUpdated);
              this.$router.push({ path: '/playlist/list/all' });
              this.getAllData();
            }
        }
      }catch (ex) { console.log(ex); }
  },

      changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 80%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    },

    formatDate(incomingDate) {
      const date = new Date(incomingDate);
  // Format the date (e.g., as 'YYYY-MM-DD')
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;
    },

    },
  
    watch:{
      id: function(newVal, oldVAl){
        this.refreshOnePlaylist();
      }
    },
  
    created(){
      this.getALLData();
    },

    computed: {
      
      filteredPlaylist() {
        return this.playlists.filter(playlist => {
          const matchesSearch = playlist.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||  
                                playlist.username.toLowerCase().includes(this.searchQuery.toLowerCase());
                                return matchesSearch;
        });
      },
    },
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

/* Header styling */
.table thead th {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  padding: 12px;
  border: none;
}

/* Hover effect for body rows only (excluding header row) */
.table tbody tr:hover {
  background-color: #d7fff0cc; /* Highlight color */
  transition: background-color 0.3s ease;
}

/* General table styling */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  overflow: hidden;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: aliceblue;
}

/* Alternate row background colors (optional) */
.table tbody tr:nth-child(odd) {
  background-color: rgba(240, 240, 240, 0.8);
}

.table tbody tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.8);
}

/* Rounded corners for the first and last rows */
.table tbody tr:first-child td:first-child {
  border-top-left-radius: 15px;
}

.table tbody tr:first-child td:last-child {
  border-top-right-radius: 15px;
}

.table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 15px;
}

.table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 15px;
}

#legende{
  background-color: #d7ffe7b2;
}
#legende td{
  color: rgb(53, 53, 48);
  font-weight:900;
  justify-content: center;
  text-align: center;
} 


#values td{
  color: black;
  font-weight: bold;
  justify-content: center;
  text-align: center;
}

#values:hover{
  background-color: #d7ffe741;
}

  </style>
  