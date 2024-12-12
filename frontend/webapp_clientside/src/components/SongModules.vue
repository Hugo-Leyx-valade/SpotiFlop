<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
      Songs 
      {{ action }} {{ id }}
    </p>

    <div class="flex items-center justify-between">
    </div>
  
  <div v-if="isConnected">

      <!-- FOR DATA SHEET /songs/show/42 -->
  <div v-if="action === 'show'" style="display: flex; justify-content: center;">
    <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 130%;">{{oneSong.title}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Duration</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 200%;">{{oneSong.duration}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Streams</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 200%;">{{oneSong.number_of_streams}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Date of Post</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 200%;">{{formatDate(oneSong.date_of_post)}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 75%; font-size: 200%;">Lyrics</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 75%; font-size: 120%; width: 20%;">{{oneSong.lyrics}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 140%;">{{oneSong.alias}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 75%; font-size: 200%;">Genre</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 75%; font-size: 200%;"> {{oneSong.name}}</p>

  </div>



  <div v-if="action === 'edit' && isAdmin==='admin'" style="display: flex; justify-content: center;">
    <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%; z-index: -1;"/>
    <form class="song-form" @submit.prevent="sendEditRequest" style="margin-left: 0%; z-index: 1; display: flex">
  <!-- Title -->

  <div style="margin-top: 2.7%;margin-left:-13.5%; display: flex; flex-direction: column; align-items: center; position: absolute;">
    <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%;">Title</p>
    <input type="text" class="input" v-model="oneSong.title" style="width: 330%; margin-top: 75%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"  required />
  </div>

<!-- Duration -->
<div style="margin-top: 18.5%;margin-left:11.5%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%;">Duration</p>
  <input type="text" class="input" v-model="oneSong.duration" pattern="^([0-9][0-9]):([0-9][0-9])$"
  title="Enter a valid time in mm:ss format (e.g., 25:06 or 5:06)" 
  required style="width: 100%; margin-top: 40%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;" />
</div> 


  <!-- Number of Streams -->
<div style="margin-top: 18.5%;margin-left:-24.5%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 180%;">Number of Streams</p>
  <input
    type="text"
    class="input"
    v-model="oneSong.number_of_streams"
    required
    style="width: 70%; margin-top: 22%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"/>
</div>


  <!-- Date of Post -->
<div style="margin-top: 28.5%;margin-left:-6.5%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%;">Date of Post</p>
  <input type="date" placeholder="01/06/2004" class="input" v-model.lazy="oneSong.date_of_post" required style="width: 70%; margin-top: 26%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"/>
</div>

  <!-- Lyrics -->
<div style="margin-top: 5%;margin-left:30%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%; margin-left: 60%;">Lyrics</p>
  <input type="text" class="textarea" role="textbox" v-model="oneSong.lyrics" contenteditable style="width: 400%; margin-top: 60%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"></input>
</div>

  <!-- Author -->
<div style="margin-top: 4.8%;margin-left:12%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%;">Author</p>
  <input type="text" class="input" v-model="oneSong.alias" required style="width: 200%; margin-top: 45%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"/>
</div>
  <!-- Genre -->
  <div style="margin-top: 18.7%;margin-left:32%; display: flex; flex-direction: column; align-items: center; position: absolute;">
  <p class="label" style="color: aliceblue; font-weight: bold;font-size: 200%;">Genre</p>
  <input type="text" class="input" v-model="oneSong.name" required style="width: 120%; margin-top: 50%; ;position: absolute; background-color: transparent; border-radius: 90px; border-width: 1px; text-align: center;color: aliceblue; font-weight: bold; position: absolute; font-size: 120%;"/>
</div>
  <!-- Save Changes -->
  <button type="submit" style="position: absolute; border-radius: 90px; border-width: 0px; color: black; background-color: aliceblue; margin-top: 36%; padding: 0.5% 1%;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='aliceblue'">Submit</button>
</form>
  </div>
    <!-- FOR List /songs/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>Title</td><td>Duration</td><td>Number Of Streams</td><td>Date Of Post</td><td>Author</td><td>Genre</td><td>SHOW DETAILS</td><td v-if="isAdmin==='admin'">EDIT SONG</td><td v-if="isAdmin==='admin'">DELETE SONG</td>
        <a :href="'/#/songs/edit/0'" style="background:white;padding: 15% 25%; color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >ADD</a>
      </tr>
      <tr v-for="s of song" v-bind:key="s.song_id">
        <td style="color: aliceblue; font-weight: bold;">{{ s.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.duration }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.number_of_streams }}</td>

        <td style="color: aliceblue; font-weight: bold;">{{ formatDate(s.date_of_post) }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.alias }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.name }}</td>
        <td ><a :href="'/#/songs/show/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
        <td v-if="isAdmin==='admin'"><a :href="'/#/songs/edit/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'" >EDIT</a></td>
        <td v-if="isAdmin==='admin'"><input type="button" value="DELETE" @click="sendDeleteRequest(s.id_song)" style="color: black;background-color: white; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#fa8c8c'" onMouseLeave="this.style.background='white'"  /></td>
      </tr>
    </table>
  <div style="margin-top: 16%;"></div>
  <footer>
    <p style="color: white; font-weight: bold; font-size: 20px; position: absolute; top: 100%; left: 50%;" >Spotiflop</p>
  </footer>  
  </div>

  <div v-if="(action === 'edit') && (isAdmin!=='admin')" style="display: flex; justify-content: center;">

    <h1 style="font-size: 400%; font-weight: 900; margin-top: 10%; text-align: center; text-shadow: 2px 2px 4px green; color: aliceblue; padding-bottom: 20%;">ACCESS DENIED, WRONG USER</h1>

</div>

</div>
      

    
</template>

<script>
//import 
import BacktohomeModule from './BacktohomeModule.vue';
import {isConnected as checkIfConnected} from '../../authentication.js';
import { isAdmin } from '../../authentication.js';

export default {
 
  name: 'Songs',
  components: {
    BacktohomeModule
  },
  props:['action','id'],
  data () {
    return {
      song : [],
      oneSong : {
        song_id: 0,
        song_title:'X',
        song_duration: 0,
        song_number_of_stream: 0,
        song_date:'',
        song_lyrics: 'lyrics',
        song_author: "",
        song_genre: ""
      },

      isAdmin: false,
      isConnected: false,
    }
  },

  mounted() {
  this.changeBodyBackgroundColor();
  },


  methods:{
    async seeIfAdmin(){
      this.isAdmin = await isAdmin();
    },

    async seeIfConnected(){
      this.isConnected = await isConnected();
    },  

    async getAllData() {
    try {
      let responseSong = await this.$http.get("http://localhost:9000/songsapi/list");
      this.song = responseSong.data;
      console.log(" songs " + this.song.length );
      /*
      this.brands = [ { brand_id: 1, brand_name: "BMW" }, { brand_id: 2, brand_name: "Audi" }, { brand_id: 3, brand_name: "Citroen" } ];
      this.cars = [ { car_id: 1, car_brand: 2, car_name: "Audi S4", car_baseprice: 40000, car_isfancy: 0, car_realprice: 45000 }, { car_id: 2, car_brand: 1, car_name: "BMW i8", car_baseprice: 80000, car_isfancy: 1, car_realprice: 90000 } ];
      */
      this.refreshOneSong();
    }
    catch (ex) {"hugp" + console.log(ex); }
  }, 

  formatDate(incomingDate) {
    const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
},

formatDate2(incomingDate){
  const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
},

  async refreshOneSong() {
    if (this.$props.id === "all" || this.$props.id === "0") {
      this.oneSong = {
        song_id: 0,
        title: '',
        duration: 0,
        number_os_streams: 0,
        date_of_post: '0000-00-00',
        lyrics: "Lyrics",
        author: "",
        genre: ""
      };
      return;
    }
    try {
      let responseSong = await this.$http.get("http://localhost:9000/songsapi/show/" + this.$props.id);
      if(responseSong.data.error === 0){
        this.oneSong = responseSong.data.object;
        this.oneSong.date_of_post = this.formatDate(this.oneSong.date_of_post);
      // this.oneCar = this.cars.find(car => car.car_id == this.$props.id);
      }else{
        alert("Can't resolve this song ! ")
        this.$router.push({ path: '/songs/list/all' });
        this.getAllData();
      }
      // this.oneCar = this.cars.find(car => car.car_id == this.$props.id);
    }
    catch (ex) { console.log(ex); }
  },



  async sendDeleteRequest(songId) {
    try {
      alert("DELETING... " + songId);
      let response = await this.$http.get("http://localhost:9000/songsapi/del/" + songId);
      alert("DELETED: " + response.data.rowsDeleted);
      this.getAllData();
    }
    catch (ex) { console.log(ex); }
  },

async sendAddRequest() {
      alert("ADDING... " + this.oneSong.title);
      let response = await this.$http.post("http://localhost:9000/songsapi/add", this.oneSong);
      if(response.data === false){
    alert("This song look to not exist")
  }else{
      alert("ADDED: " + response.data.rowsAdded);
      this.$router.push({ path: '/songs/list/all' });
      this.getAllData();
  }
},

  async sendEditRequest() {
    try {
      if(this.$props.id === "0"){
        let response = await this.$http.post(
            "http://localhost:9000/songsapi/add/",this.oneSong);
      if(response.data.rowsUpdated === false){
          alert("A field is not correct.")
      }else{
          alert("Added: " + response.data.rowsUpdated);
          this.$router.push({ path: '/songs/list/all' });
          this.getAllData();
      }
    }else{
      let response = await this.$http.post(
            "http://localhost:9000/songsapi/update/" + this.oneSong.id_song, this.oneSong);
      if(response.data.rowsUpdated === false){
        alert("Error in one of the input field.")
      }else{
            alert("EDITED: " + response.data.rowsUpdated);
            this.$router.push({ path: '/songs/list/all' });
            this.getAllData();
      }
    }
  }
    catch (ex) { console.log(ex); }
  },


    changeBodyBackgroundColor() {
      document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
      document.body.style.backgroundSize = 'cover';
      document.body.style.height = '100%';
      document.body.style.backgroundColor = 'rgb(0,0,0)';
  },
  },

  watch:{
    id: function(newVal, oldVAl){
      this.refreshOneSong();
    }
  },

async created(){
    this.isConnected = await checkIfConnected();
    if (this.isConnected !== false) {
        this.getAllData();
        this.isAdmin = this.isConnected.role;
        this.retrieveUser = this.isConnected; // Vérifie si l'utilisateur est admin
        
    } else {
        await this.$router.push("/authentication/login"); // Redirige si non connecté
    }

  },
};
const handleSearch = (value) => {
  searchfilter.value = value;
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

.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 16px;
  font-family: Arial, sans-serif;
}

/* Header styles */
.table tr:first-child {
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: rgba(255, 255, 255, 0);
  text-transform: capitalize;
  font-weight: bolder;
}

/* Row styles */
.table tr {
  transition: background-color 0.3s ease;
}

/* Row hover effect */
.table tr:hover {
  background-color: #d7fff0cc;
}

/* Cell styles */
.table td {
  padding: 12px 15px;
  color: #333;
  font-weight: 500;
  text-align: left; 
}

/* Specific styles for buttons and links */
.table a {
  display: inline-block;
  padding: 8px 15px;
  color: black;
  font-weight: bold;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.table a:hover {
  background-color: #7efca4;
}

.table input[type="button"] {
  padding: 8px 15px;
  color: black;
  font-weight: bold;
  border-radius: 25px;
  background-color: transparent;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.table input[type="button"]:hover {
  background-color: #fa8c8c;
  color: white;
}

/* Add button styles */
.add-button {
  display: inline-block;
  margin: 10px 0;
  padding: 10px 25px;
  background-color: white;
  color: black;
  font-weight: bold;
  text-decoration: none;
  border-radius: 25px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #7efca4;
}
</style>
