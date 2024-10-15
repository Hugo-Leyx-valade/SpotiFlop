<template>
    <div class="hello">
      <home></home>
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
  import Home from './homeModules.vue';

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
    methods:{
      async getALLData(){
        /*
        let responesAuthors = await this.$http.get("backend/url");
        this.cars = responesAuthors.data;
        let reponseSong = await this.$http.get('wxxx');
        this.song = reponseSong.data;
         */
       try  {
        this.songs = [
          { song_id: 1, song_title: "Let's Groove", song_duration: 5.36, song_number_of_stream: 597458154, song_date: "2013-09-01", song_lyrics: null, song_author_id: 1 },
          { song_id: 2, song_title: "Smooth Criminal", song_duration: 9.25, song_number_of_stream: 988804859, song_date: "2010-11-19", song_lyrics: null, song_author_id: 2 },
          { song_id: 3, song_title: "Enemy", song_duration: 2.53, song_number_of_stream: 1588206980, song_date: "2021-10-28", song_lyrics: null, song_author_id: 3 },
          { song_id: 4, song_title: "Heartless", song_duration: 3.18, song_number_of_stream: 1018698991, song_date: "2020-12-03", song_lyrics: null, song_author_id: 4 },
          { song_id: 5, song_title: "Poker Face", song_duration: 3.57, song_number_of_stream: 1398566907, song_date: "2009-12-20", song_lyrics: null, song_author_id: 5 },
          { song_id: 6, song_title: "Without Me", song_duration: 4.50, song_number_of_stream: 1398566907, song_date: "2009-06-17", song_lyrics: null, song_author_id: 6 },
          { song_id: 7, song_title: "SCOPOLAMINE", song_duration: 2.29, song_number_of_stream: 1876483, song_date: "2023-11-27", song_lyrics: null, song_author_id: 7 },
          { song_id: 8, song_title: "One More Time", song_duration: 5.20, song_number_of_stream: 638173590, song_date: "2001-03-12", song_lyrics: null, song_author_id: 8 },
          { song_id: 9, song_title: "VeridisQuo", song_duration: 5.20, song_number_of_stream: 638173590, song_date: "2001-03-12", song_lyrics: null, song_author_id: 8 },
        ];

        }
        catch (ex) {console.log(ex);}
      },
      async refreshOneSong(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneSong = this.songs.find(song=>this.songs.song.id==this.$props.id);
        }catch (ex){console.log(ex);}
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
  