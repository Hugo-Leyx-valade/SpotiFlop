<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BacktohomeModule></BacktohomeModule>
    

    <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
      Songs 
      {{ action }} {{ id }}
    </p>

    <div class="flex items-center justify-between">
    </div>

    <!-- FOR DATA SHEET /songs/show/42 -->
  <div v-if="action === 'show'" style="display: flex; justify-content: center;">
    <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 150%;">{{oneSong.title}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Duration</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 200%;">{{oneSong.duration}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Streams</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 200%;">{{oneSong.number_of_streams}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Date of Post</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 200%;">{{formatDate(oneSong.date_of_post)}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">Lyrics</p>    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8%; margin-left: 75%; font-size: 120%; width: 20%;">{{oneSong.lyrics}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 200%;">{{oneSong.alias}}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 32%; margin-left: 37%; font-size: 200%;">Genre</p>   <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 32%; margin-left: 50%; font-size: 200%;">{{oneSong.name}}</p>

  </div>

  <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
    <img src="../assets/pink-cover.png" alt="logo_white" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: -5%;"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: -23%; font-size: 200%;">Title</p>   <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; margin-left: -23%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;;border-color: white;text-align: center;" v-model="oneSong.title"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: 30%; font-size: 200%;">Duration</p>    <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21%; margin-left: 30%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.duration"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 18%; margin-left: -40%; font-size: 200%;">Number of Streams</p>   <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 21.2%; margin-left: -32.5%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.number_of_streams"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28%; margin-left: -3%; font-size: 180%;">Date of Post</p>    <input type="date" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 31%; margin-left: -3%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.date_of_post"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; margin-left: 75%; font-size: 200%;">Lyrics</p>    <span class="textarea" role="textbox" contenteditable >{{ oneSong.lyrics }}</span>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 4%; margin-left: 30%; font-size: 200%;">Author</p>   <input style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 7%; margin-left: 30%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.alias"/>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 32%; margin-left: 37%; font-size: 200%;">Genre</p>   <input style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 32%; margin-left: 55%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;border-color: white;text-align: center;" v-model="oneSong.name"/>
      <input type="button" value="Save Changes" @click="sendEditRequest()" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'"/>
    </div>

    <!-- FOR List /songs/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>ID</td><td>Title</td><td>Duration</td><td>Number Of Streams</td><td>Date Of Post</td><td>Author</td><td>Genre</td><td>SHOW DETAILS</td><td>EDIT SONG</td><td>DELETE SONG</td>
        <a :href="'/#/songs/edit/0'" style="background:white;padding: 15% 25%; color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >ADD</a>
      </tr>
      <tr v-for="s of song" v-bind:key="s.song_id">
        <td style="color: aliceblue; font-weight: bold;">{{ s.id_song }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.duration }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.number_of_streams }}</td>

        <td style="color: aliceblue; font-weight: bold;">{{ formatDate(s.date_of_post) }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.alias }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ s.name }}</td>
        <td><a :href="'/#/songs/show/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
        <td><a :href="'/#/songs/edit/' + s.id_song" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'" >EDIT</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(s.id_song)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#fa8c8c'" onMouseLeave="this.style.background='white'"  /></td>
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

export default {
 
  name: 'Songs',
  components: {
    Home,
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
      }
    }
  },

  mounted() {
  this.changeBodyBackgroundColor();
  },


  methods:{

    async getAllData() {
    try {
      let responseSong = await fetch("http://localhost:9000/songsapi/list");
      this.song = await responseSong.json();
      console.log(" songs " + this.song[1].song_title );
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
      this.oneSong = responseSong.data;
      console.log("oneSong: " + this.oneSong.title+" "+ this.oneSong.duration+" "+ this.oneSong.number_of_streams+" "+ this.oneSong.date_of_post+" "+ this.oneSong.lyrics+" "+ this.oneSong.id_author+" "+ this.oneSong.id_genre);
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
      try {
        alert("ADDING... " + this.oneSong.title);
        let response = await this.$http.post("http://localhost:9000/songsapi/add", this.oneSong);
        alert("ADDED: " + response.data.rowsAdded);
        this.$router.push({ path: '/songs/list/all' });
        this.getAllData();
      }
      catch (ex) { console.log(ex); }
    },

  async sendEditRequest() {
    try {
      if(this.$props.id === "0"){
        let response = await this.$http.post(
            "http://localhost:9000/songsapi/add/",this.oneSong);
        alert("Added: " + response.data.rowsUpdated);
        this.$router.push({ path: '/songs/list/all' });
        this.getAllData();
      }
      let response = await this.$http.post(
            "http://localhost:9000/songsapi/update/" + this.oneSong.id_song, this.oneSong);
      alert("EDITED: " + response.data.rowsUpdated);
      this.$router.push({ path: '/songs/list/all' });
      this.getAllData();
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

  created(){
  this.getAllData();
}

}

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


</style>
