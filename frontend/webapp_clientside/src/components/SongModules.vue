<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <p>
        ACTION = {{ action }} <br />
        ID = {{ id }} <br/>
        <a href="/#/songs/list/all">Back to the list of songs</a>
        <a href="/#/songs/edit/0">Add a new song</a><br />
      </p>
  
      <!-- FOR DATA SHEET /songs/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
      <tr><td>ID</td><td>{{oneSong.song_id}}</td></tr>
      <tr><td>Title</td><td>{{oneSong.song_title}}</td></tr>
      <tr><td>Duration</td><td>{{oneSong.song_duration}}</td></tr>
      <tr><td>Number of Streams</td><td>{{oneSong.song_number_of_stream}}</td></tr>
      <tr><td>Date of Post</td><td>{{oneSong.song_date}}</td></tr>
      <tr><td>Lyrics</td><td>{{oneSong.song_lyrics}}</td></tr>
      <tr><td>Author ID</td><td>{{oneSong.song_author_id}}</td></tr>
    </table>
  
      <!-- FOR FORMS /songs/edit/42 -->
      <table v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
      <tr><td>Title</td><td><input type="text" name="song_title" v-model="oneSong.song_title"/></td></tr>
      <tr><td>Duration</td><td><input type="text" name="song_duration" v-model="oneSong.song_duration" /></td></tr>
      <tr><td>Number of Streams</td><td><input type="number" name="song_number_of_stream" v-model="oneSong.song_number_of_stream" /></td></tr>
      <tr><td>Date of Post</td><td><input type="date" name="song_date" v-model="oneSong.song_date" /></td></tr>
      <tr><td>Lyrics</td><td><textarea name="song_lyrics" v-model="oneSong.song_lyrics"></textarea></td></tr>
      <tr><td>Author ID</td><td><input type="text" name="song_author_id" v-model="oneSong.song_author_id" /></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>
  
      <!-- FOR List /songs/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
        <tr>
          <td>ID</td><td>Title</td><td>Duration</td><td>Number Of Streams</td><td>SHOW DETAILS</td><td>EDIT SONG</td><td>DELETE SONG</td>
        </tr>
        <tr v-for="s of songs" v-bind:key="s.song_id">
          <td>{{ s.song_id }}</td>
          <td>{{ s.song_title }}</td>
          <td>{{ s.song_duration }}</td>
          <td>{{ s.song_number_of_stream }}</td>
          <td><a :href="'/#/songs/show/' + s.song_id">[SHOW]</a></td>
          <td><a :href="`/#/songs/edit/${s.song_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </table>
  
    </div>
  </template>
  
  <script>
  import Home from './homeModulesAdmin.vue';
  import songs from './songs.json'
  
  export default {
    name: 'Users',
    components: {
      Home
    },
    props:['action','id'],
    data () {
      return {
        songs : [],
        oneSong : {
          song_id: 0,
          song_title:'X',
          song_duration: 0,
          song_number_of_stream: 0,
          song_date:'',
          song_lyrics: 'lyrics',
          song_author_id: 0,
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
          this.songs = songs;
        }
        catch (ex) {console.log(ex);}
      },
      async refreshOneSong(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneSong = this.songs.find(song=>this.songs.song.id==this.$props.id);
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
        this.refreshOneSong();
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
  