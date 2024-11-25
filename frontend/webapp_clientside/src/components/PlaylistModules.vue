<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
        Playlists 
        {{ action }} {{ id }}
      </p>
      
      <!-- Détails de la playlist pour /playlist/show/ID -->
    <div v-if="action === 'show'" style="display: flex; justify-content: center;">
      <img src="../assets/pink-cover.png" alt="cover" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 150%;">{{onePlaylist.playlist_title}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Date of Post</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 200%;">{{onePlaylist.playlist_date}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Saves</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 200%;">{{onePlaylist.playlist_num_saves}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Description</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 200%;">{{onePlaylist.playlist_description}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">State</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8%; margin-left: 75%; font-size: 120%;">{{onePlaylist.playlist_state}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author ID</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 200%;">{{onePlaylist.playlist_author_id}}</p>
    </div>

    <!-- Formulaire d'édition de la playlist pour /playlist/edit/ID -->
    <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
      <img src="../assets/pink-cover.png" alt="cover" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>
      <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 120%; background-color: transparent; border-radius: 20px; width:10%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_title"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Date of Post</p>
      <input type="date" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 120%; background-color: transparent; border-radius: 20px; width:10%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_date"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Saves</p>
      <input type="number" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 120%; background-color: transparent; border-radius: 20px; width:10%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_num_saves"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Description</p>
      <textarea style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 120%; background-color: transparent; border-radius: 20px; width:20%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_description"></textarea>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">State</p>
      <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8%; margin-left: 75%; font-size: 120%; background-color: transparent; border-radius: 20px; width:10%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_state"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author ID</p>
      <input style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 120%; background-color: transparent; border-radius: 20px; width:10%; border-color: white; text-align: center;" v-model="onePlaylist.playlist_author_id"/>
    </div>

    <!-- Liste des playlists pour /playlist/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>ID</td><td>Title</td><td>Description</td><td>Number Of Saves</td><td>SHOW DETAILS</td><td>EDIT PLAYLIST</td><td>DELETE PLAYLIST</td>
      </tr>
      <tr v-for="p of playlists" :key="p.playlist_id">
        <td style="color: aliceblue; font-weight: bold;">{{ p.playlist_id }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.playlist_title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.playlist_description }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ p.playlist_num_saves }}</td>
        <td><a :href="'/#/playlist/show/' + p.playlist_id" @click="onePlaylistLoad(p)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'">SHOW</a></td>
        <td><a :href="'/#/playlist/edit/' + p.playlist_id" @click="onePlaylistLoad(p)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#fddbdb'" onMouseLeave="this.style.background='white'">EDIT</a></td>
        <td><button @click="deletePlaylist(p.playlist_id)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#ff0000'" onMouseLeave="this.style.background='white'">DELETE</button></td>
      </tr>
    </table>
  </div>
  </template>
  
  <script>
  import Home from './homeModulesAdmin.vue';
  import playlist from './playlist.json';

  export default {
    name: 'Playlist',
    components: {
      Home
    },
    props:['action','id'],
    data () {
      return {
        playlists : [],
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
        this.playlists = playlist;

        }
        catch (ex) {console.log(ex);}
      },
      async refreshOnePlaylist(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.onePlaylist = this.playlists.find(playlist=>playlist.playlist_id==this.$props.id);
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
        this.refreshOnePlaylist();
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
  