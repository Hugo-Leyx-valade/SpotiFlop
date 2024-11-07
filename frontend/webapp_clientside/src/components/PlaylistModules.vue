<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <home></home>
      <p>
        ACTION = {{ action }} <br />
        ID = {{ id }} <br/>
        <a href="/#/playlist/list/all">Back to the list of playlists</a>
        <a href="/#/playlist/edit/0">Add a new playlist</a><br />
      </p>
  
      <!-- FOR DATA SHEET /songs/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
        <tr><td>ID</td><td>{{onePlaylist.playlist_id}}</td></tr>
        <tr><td>Title</td><td>{{onePlaylist.playlist_title}}</td></tr>
        <tr><td>Date of Post</td><td>{{onePlaylist.playlist_date}}</td></tr>
        <tr><td>Number of Saves</td><td>{{onePlaylist.playlist_num_saves}}</td></tr>
        <tr><td>Description</td><td>{{onePlaylist.playlist_description}}</td></tr>
        <tr><td>State</td><td>{{onePlaylist.playlist_state}}</td></tr>
        <tr><td>Author ID</td><td>{{onePlaylist.playlist_author_id}}</td></tr>
    </table>
  
      <!-- FOR FORMS /songs/edit/42 -->
      <table v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
        <tr><td>Title</td><td><input type="text" name="playlist_title" v-model="onePlaylist.playlist_title"/></td></tr>
        <tr><td>Date of Post</td><td><input type="date" name="playlist_date" v-model="onePlaylist.playlist_date" /></td></tr>
        <tr><td>Number of Saves</td><td><input type="number" name="playlist_num_saves" v-model="onePlaylist.playlist_num_saves" /></td></tr>
        <tr><td>Description</td><td><textarea name="playlist_description" v-model="onePlaylist.playlist_description"></textarea></td></tr>
        <tr><td>State</td><td><input type="text" name="playlist_state" v-model="onePlaylist.playlist_state" /></td></tr>
        <tr><td>Author ID</td><td><input type="text" name="song_author_id" v-model="onePlaylist.playlist_author_id" /></td></tr>
        <tr><td colspan="2">
            <input type="button" value="SEND" @click="sendEditRequest()" />
        </td></tr>
    </table>
  
      <!-- FOR List /songs/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
        <tr>
          <td>ID</td><td>Title</td><td>Description</td><td>Number Of Saves</td><td>SHOW DETAILS</td><td>EDIT PLAYLIST</td><td>DELETE PLAYLIST</td>
        </tr>
        <tr v-for="p of playlist" v-bind:key="p.playlist_id">
          <td>{{ p.playlist_id }}</td>
          <td>{{ p.playlist_title }}</td>
          <td>{{ p.playlist_description }}</td>
          <td>{{ p.playlist_num_saves }}</td>
          <td><a :href="'/#/playlist/show/' + p.playlist_id">[SHOW]</a></td>
          <td><a :href="`/#/playlist/edit/${p.playlist_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </table>
  
    </div>
  </template>
  
  <script>
  import Home from './homeModulesAdmin.vue';

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
        this.playlist = [
        { playlist_id: 1, playlist_title: "Chill Vibes", playlist_date: "2021-06-15", playlist_num_saves: 482, playlist_description: "A playlist with relaxing tracks to wind down your day.", playlist_state: "public", playlist_author_id: 1 },
        { playlist_id: 2, playlist_title: "Workout Hits", playlist_date: "2020-03-12", playlist_num_saves: 1728, playlist_description: "The perfect playlist to pump up your workout sessions.", playlist_state: "public", playlist_author_id: 2 },
        { playlist_id: 3, playlist_title: "Soirée Electro", playlist_date: "2019-11-20", playlist_num_saves: 1156, playlist_description: "A mix of the best electro tracks for an unforgettable party.", playlist_state: "public", playlist_author_id: 3 },
        { playlist_id: 4, playlist_title: "Rock Classics", playlist_date: "2022-01-05", playlist_num_saves: 935, playlist_description: "Classic rock anthems from the 70s, 80s, and 90s.", playlist_state: "private", playlist_author_id: 4 },
        { playlist_id: 5, playlist_title: "Road Trip Tunes", playlist_date: "2021-08-30", playlist_num_saves: 145, playlist_description: "Perfect songs to accompany you on a long drive.", playlist_state: "public", playlist_author_id: 5 },
        { playlist_id: 6, playlist_title: "Jazz & Chill", playlist_date: "2020-10-18", playlist_num_saves: 368, playlist_description: "A smooth blend of jazz for a calm and relaxing atmosphere.", playlist_state: "private", playlist_author_id: 6 },
        { playlist_id: 7, playlist_title: "Summer Hits 2022", playlist_date: "2022-07-12", playlist_num_saves: 1985, playlist_description: "The hottest tracks of the summer 2022.", playlist_state: "public", playlist_author_id: 7 },
        { playlist_id: 8, playlist_title: "Indie Discovery", playlist_date: "2021-04-09", playlist_num_saves: 453, playlist_description: "Discover the best indie tracks of the moment.", playlist_state: "public", playlist_author_id: 8 },
        { playlist_id: 9, playlist_title: "Party Bangers", playlist_date: "2020-12-31", playlist_num_saves: 1689, playlist_description: "The ultimate playlist to get the party started.", playlist_state: "public", playlist_author_id: 9 },
        { playlist_id: 10, playlist_title: "Acoustic Moods", playlist_date: "2019-05-16", playlist_num_saves: 523, playlist_description: "Beautiful acoustic songs to relax and enjoy.", playlist_state: "private", playlist_author_id: 10 },
        { playlist_id: 11, playlist_title: "Deep House Grooves", playlist_date: "2019-08-22", playlist_num_saves: 1248, playlist_description: "Deep house tracks to set the perfect mood.", playlist_state: "public", playlist_author_id: 11 },
        { playlist_id: 12, playlist_title: "Throwback Jams", playlist_date: "2021-02-17", playlist_num_saves: 307, playlist_description: "Hit songs from the early 2000s and 90s for nostalgia lovers.", playlist_state: "private", playlist_author_id: 12 },
        { playlist_id: 13, playlist_title: "Rap Français", playlist_date: "2020-06-25", playlist_num_saves: 1324, playlist_description: "Best of French rap from classic to modern hits.", playlist_state: "public", playlist_author_id: 13 },
        { playlist_id: 14, playlist_title: "Classical Piano", playlist_date: "2022-03-20", playlist_num_saves: 641, playlist_description: "A curated selection of classical piano pieces for focus and relaxation.", playlist_state: "private", playlist_author_id: 14 },
        { playlist_id: 15, playlist_title: "Afrobeats Vibes", playlist_date: "2018-12-11", playlist_num_saves: 894, playlist_description: "Groovy and vibrant Afrobeats tracks.", playlist_state: "public", playlist_author_id: 15 },
        { playlist_id: 16, playlist_title: "Feel Good Songs", playlist_date: "2019-07-14", playlist_num_saves: 1203, playlist_description: "Songs guaranteed to lift your mood.", playlist_state: "public", playlist_author_id: 16 },
        { playlist_id: 17, playlist_title: "Late Night Jazz", playlist_date: "2021-11-01", playlist_num_saves: 489, playlist_description: "Smooth jazz tunes perfect for late-night relaxation.", playlist_state: "private", playlist_author_id: 17 },
        { playlist_id: 18, playlist_title: "Lofi Study Beats", playlist_date: "2020-02-05", playlist_num_saves: 1509, playlist_description: "Chill lofi beats to help you stay focused while studying.", playlist_state: "public", playlist_author_id: 18 },
        { playlist_id: 19, playlist_title: "Metal Mayhem", playlist_date: "2019-09-24", playlist_num_saves: 213, playlist_description: "Hard-hitting metal tracks for the true fans of the genre.", playlist_state: "private", playlist_author_id: 19 },
        { playlist_id: 20, playlist_title: "Romantic Evening", playlist_date: "2021-02-14", playlist_num_saves: 835, playlist_description: "Soft and romantic songs perfect for a cozy evening.", playlist_state: "public", playlist_author_id: 20 },
        // Continuer avec les autres playlists de la table
      ];

        }
        catch (ex) {console.log(ex);}
      },
      async refreshOnePlaylist(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.onePlaylist = this.playlist.find(playlist=>this.playlists.playlist.id==this.$props.id);
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
  