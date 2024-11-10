<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
        Songs 
        {{ action }}
      </p>
  
      <!-- FOR DATA SHEET /songs/show/42 -->
    <div v-if="action === 'show'" style="display: flex; justify-content: center;">
      <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 150%;">{{oneSong.song_title}}</p>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Duration</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 200%;">{{oneSong.song_duration}}</p>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Streams</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 200%;">{{oneSong.song_number_of_stream}}</p>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Date of Post</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 200%;">{{oneSong.song_date}}</p>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">Lyrics</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8%; margin-left: 75%; font-size: 120%; width: 20%;">{{oneSong.song_lyrics}}</p>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 200%;">{{oneSong.song_author_id}}</p>
    </div>

    <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
      <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;;border-color: white;text-align: center;" v-model="oneSong.song_title"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Duration</p>    <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.song_duration"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Streams</p>   <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.song_number_of_stream"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Date of Post</p>    <input type="date" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.song_date"/>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">Lyrics</p>    <span class="textarea" role="textbox" contenteditable >{{ oneSong.song_lyrics }}</span>
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author</p>   <input style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.song_author_id"/>
    </div>
  

      <!-- FOR List /songs/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
        <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
          <td>ID</td><td>Title</td><td>Duration</td><td>Number Of Streams</td><td>SHOW DETAILS</td><td>EDIT SONG</td><td>DELETE SONG</td>
        </tr>
        <tr v-for="s of songs" v-bind:key="s.song_id">
          <td style="color: aliceblue; font-weight: bold;">{{ s.song_id }}</td>
          <td style="color: aliceblue; font-weight: bold;">{{ s.song_title }}</td>
          <td style="color: aliceblue; font-weight: bold;">{{ s.song_duration }}</td>
          <td style="color: aliceblue; font-weight: bold;">{{ s.song_number_of_stream }}</td>
          <td><a :href="'/#/songs/show/' + s.song_id" @click="oneSongLoad(s)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
          <td><a :href="'/#/songs/edit/' + s.song_id" @click="oneSongLoad(s)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'" >EDIT</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#fa8c8c'" onMouseLeave="this.style.background='white'"  /></td>
        </tr>
      </table>
    <div style="margin-top: 16%;"></div>
    <footer>
      <p style="color: white; font-weight: bold; font-size: 20px; position: absolute; top: 120%; left: 46%;">Spotiflop</p>
    </footer>  
  </div>
  </template>
  
  <script>
  //import 
  import BacktohomeModule from './BacktohomeModule.vue';
  import Home from './homeModulesAdmin.vue';
  import songs from './songs.json'
  
  export default {
    name: 'Users',

    components: {
      Home,
      BacktohomeModule 
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
    },

    oneSongLoad(song){
      this.oneSong.song_title = song.song_title;
      this.oneSong.song_id = song.song_id;
      this.oneSong.song_duration = song.song_duration;
      this.oneSong.song_number_of_stream = song.song_number_of_stream;
      this.oneSong.song_date = song.song_date;
      this.oneSong.song_lyrics = song.song_lyrics;
      this.oneSong.song_author_id = song.song_author_id;
    },

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
  

  .textarea {
    display: inline-block;
  position: absolute;
  width: 20%;
  overflow: hidden;
  resize: both;
  min-height: 10px;
  line-height: 30px;
  resize: none;
  text-align: left;
  color: aliceblue;
  border-color: #ffffff;
  border-style: solid;
  border-radius: 20px;
  margin-left: 75%;
  margin-top: 6%;
  font-size: 20px;
}

  </style>
  