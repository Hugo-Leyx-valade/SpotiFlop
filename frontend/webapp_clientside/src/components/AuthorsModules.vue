<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BackgroundModule></BackgroundModule>
    <BacktohomeModule></BacktohomeModule>
    <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%;" >Authors {{ action }} {{ id }}</span>

    <div id="tables" style="margin-top: 13%;">
    <!-- FOR DATA SHEET /authors/show/42 -->
    <div v-if="action === 'show'" style="width: 50%; margin-left: 5%; margin-top: -3%; background-color: none; border-radius: 8px; padding: 10px;">
    <!-- Alias - Large Text, Aligned to the Left -->
      <div style="font-size: 400%; color: white; font-weight: 900; text-align: left;">
          <span style="color: #4CAF50;"></span> {{oneAuthor.alias}}
      </div>
      <!-- First Name and Last Name - Slightly Smaller, Aligned to the Left -->
      <div style="text-align: left; margin-top: 0%; display: flex;">
        <div style="font-size: 200%; color: white; text-align: left; margin-top: 0%;">{{oneAuthor.first_name}} {{oneAuthor.last_name}}</div>
        <div v-if="oneAuthor.verified === 1" style="color: green; font-size: 130%;">Verified</div>
        <div v-if="oneAuthor.verified === 0" style="color: green; font-size: 130%;">Not Verified</div>
      </div>
      <!-- Biography - Aligned to the Left -->
      <div style="margin-bottom: 15px; font-size: 16px; color: white; text-align: left;">
          <span style="color: #4CAF50;"></span> {{oneAuthor.biography}}
      </div>
      <!-- Edit Button - Centered -->
      <div style="text-align: center; margin-left: -91%; margin-top: 5%;">
          <a :href="'/#/authors/edit/' + oneAuthor.id_author" 
              style="color: white; background-color: #007BFF; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
              @click="oneAuthorLoad(oneAuthor)">[EDIT]</a>
      </div>
      <table style="width: 100%; margin-top: 5%; border-collapse: collapse;">
    <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>ID</td>
        <td>Title</td>
        <td>Duration</td>
        <td>Number Of Streams</td>
        <td>Date Of Post</td>
        <td>Author</td>
        <td>Genre</td>
        <td>SHOW DETAILS</td>
        <td>EDIT SONG</td>
        <td>DELETE SONG</td>
    </tr>
    <tr id="song-body" v-for="song in songAuthor" :key="song.id_song">
        <td style="color: aliceblue; font-weight: bold;">{{ song.id_song }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ song.title }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ song.duration }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ song.number_of_streams }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ formatDate(song.date_of_post) }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ song.alias }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ song.name }}</td>
        <td>
            <a :href="'/#/songs/show/' + song.id_song" 
              style="color: black; font-weight: bold; text-decoration: none; border-radius: 25px;"
              @mouseover="this.style.background='#7efca4'" 
              @mouseleave="this.style.background='white'">SHOW</a>
        </td>
        <td>
            <a :href="'/#/songs/edit/' + song.id_song" 
              style="color: black; font-weight: bold; text-decoration: none; border-radius: 25px;"
              @mouseover="this.style.background='#6efff3'" 
              @mouseleave="this.style.background='white'">EDIT</a>
        </td>
        <td>
            <input type="button" value="DELETE" 
                  @click="sendDeleteRequest(song.id_song)" 
                  style="color: black; font-weight: bold; text-decoration: none; border-radius: 25px;"
                  @mouseover="this.style.background='#fa8c8c'" 
                  @mouseleave="this.style.background='white'" />
        </td>
    </tr>
</table>
    </div>
</div>
    
    <div v-if="action === 'edit'" class="container2 ">
      <div class=" input-group" style="padding-left: 30%; padding-right: 60%;">
        <span class="input-group-text" style="margin-bottom: 5%;">Alias</span>
        <input type="text" name="authors_alias" class="form-control" v-model="oneAuthor.alias" :placeholder="oneAuthor.alias" style="margin-bottom: 5%;">
      </div>
      <div class=" input-group" style="padding-left: 30%; padding-right: 30%;">
        <span class="input-group-text">First and last name</span>
        <input type="text" aria-label="First name" class="form-control" v-model="oneAuthor.first_name" >
        <input type="text" aria-label="Last name" class="form-control" v-model="oneAuthor.last_name">
      </div>
      <textarea id="bio" role="textbox" contenteditable v-model="oneAuthor.biography">{{ oneAuthor.biography }}</textarea>
      <div class="p-2 g-col-6"><select name="authors_verified" v-model="oneAuthor.verified" style="padding:0.7% ; border-radius: 1000px;">
            <option>
              0
            </option>
            <option>
              1
            </option>
          </select>
        </div>
      <div id="buttons_container" class="g-col-6 mt-5" >
          <button class="btn btn-danger" style="margin-right: 0.2%;" @click="sendDeleteRequest(oneAuthor.id_author)">DELETE</button>
          <input type="button" value="SEND" class="btn btn-success " style="margin-left: 0.3%;" @click="sendEditRequest()" />
      </div>  
    </div>

    <!-- FOR List /authors/list/all -->
    <a v-if="action === 'list'" :href="'/#/authors/edit/0'" style="padding-bottom: -100%;margin-left: 5%; color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >ADD</a>
    <div v-if="action === 'list'" class="container">

      <div class="row">

        <div class="author-card" v-for="a of authors" v-bind:key="a.authors_id">

          <a :href="'/#/authors/show/' + a.id_author" class="link-offset-2 link-underline link-underline-opacity-0">
            <div class="image-container" style="background-color: white;">
              <div class="overlay">
                <span class="author-name">{{ a.alias }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BacktohomeModule from './BacktohomeModule.vue';

export default {
  name: 'Authors',
  components: {
    BacktohomeModule
  },
  props:['action','id'],
  mounted() {
    this.getSongsFromAuthor(this.$props.id);
    this.changeBodyBackgroundColor();
    this.printAuthors(element);
    },

  


  data () {
    return {
      authors : [],
      songAuthor : [],
      song : [],
      oneAuthor : {
        author_id: 0,
        author_alias:'X',
        author_first_name: 'Y',
        author_last_name:'z',
        author_biography:'',
        author_verified:1,
        author_image: "",
      }
    }
  },

  methods:{

    async getSongsFromAuthor(authorId) {
            if (!authorId) {
                console.warn("Author ID is not set.");
                return; // Exit if authorId is not provided
            }

            try {
                // Fetch songs by author from the API
                let response = await fetch(`http://localhost:9000/authorsapi/songAuthor/4`);
                
                // Check if response is OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Parse JSON response
                const songAuthor = await response.json();
                console.log("Fetched songs:", songAuthor); // Log to check the data
                
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        },

async getAllData() {
try {
  let responseAuthor = await fetch("http://localhost:9000/authorsapi/list");
  this.authors = await responseAuthor.json();
  /*
  this.brands = [ { brand_id: 1, brand_name: "BMW" }, { brand_id: 2, brand_name: "Audi" }, { brand_id: 3, brand_name: "Citroen" } ];
  this.cars = [ { car_id: 1, car_brand: 2, car_name: "Audi S4", car_baseprice: 40000, car_isfancy: 0, car_realprice: 45000 }, { car_id: 2, car_brand: 1, car_name: "BMW i8", car_baseprice: 80000, car_isfancy: 1, car_realprice: 90000 } ];
  */
  this.refreshOneAuthor();
}
catch (ex) {"hugp" + console.log(ex); }
}, 

async refreshOneAuthor() {
if (this.$props.id === "all" || this.$props.id === "0") {
  this.oneAuthor = {
        author_id: 0,
        alais:'X',
        first_name: 'Y',
        last_name:'z',
        biography:'triks',
        verified:1,
        image: "",
      };
  return;
}
try {
  let responseAuthor = await this.$http.get("http://localhost:9000/authorsapi/show/" + this.$props.id);
  this.oneAuthor = responseAuthor.data;
  console.log(this.oneAuthor[0].title)
  console.log("oneAuthor: " + this.oneAuthor.alias);
  // this.oneCar = this.cars.find(car => car.car_id == this.$props.id);
}
catch (ex) { console.log(ex); }
},



async sendDeleteRequest(authorsId) {
try {
  alert("DELETING... " + authorsId);
  let response = await this.$http.get("http://localhost:9000/authorsapi/del/" + authorsId);
  alert("DELETED: " + response.data.rowsDeleted);
  this.$router.push({ path: '/authors/list/all' });
  this.getAllData();
}
catch (ex) { console.log(ex); }
},


async sendAddRequest() {
        try {
          alert("ADDING... " + this.oneAuthor.alias);
          let response = await this.$http.post("http://localhost:9000/songsapi/add", this.oneAuthor);
          alert("ADDED: " + response.data.rowsAdded);
          this.$router.push({ path: '/authors/list/all' });
          this.getAllData();
        }
        catch (ex) { console.log(ex); }
      },


async sendEditRequest() {
try {
  if(this.$props.id === "0"){
    let response = await this.$http.post(
              "http://localhost:9000/authorsapi/add/",this.oneAuthor);
          alert("Added: " + response.data.rowsUpdated);
          this.$router.push({ path: '/authors/list/all' });
          this.getAllData();
  }
  else{
      let response = await this.$http.post(
            "http://localhost:9000/authorsapi/update/" + this.oneAuthor.id_author, this.oneAuthor);
      alert("EDITED: " + response.data.rowsUpdated);
      this.$router.push({ path: '/authors/list/all' });
      this.getAllData();
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
  this.refreshOneAuthor();},

authorId(newVal) {
    this.getSongsFromAuthor(newVal);
}
},

created(){
this.getAllData();
this.getSongsFromAuthor();
},



}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
  background: rgb(59,228,119);
  background: linear-gradient(180deg, rgba(59,228,119,1) 0%, rgba(59,228,119,1) 0%, rgba(0,0,0,1) 74%);
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
  width: 60%; margin: 20px;
}

td{
  color:aliceblue
}

#app td{
  text-align: left;
}

#buttons{
  display: flex;
  justify-content:center;
}

#nav_link{
  display: flex;
  justify-content:center;
}

#nav_link a{
  margin: 10px;
}

.container{
  display: flex;
  margin: 100px 0 0 350px;
  width: 70%;
  height: 450px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  gap: 10px;
}

.author-card{
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 10px;
}

.image-container{
  position: relative;
  width: 100%;
  height: 100%;
}

.author-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid rgba(236, 68, 68, 0.685);
  transition: transform 0.7s ease; /* ajout de la transi sur transform*/
}

.author-card:hover .author-image{
  transform: scale(1.2); /* agrandit de 20%*/

}

.overlay{
  align-content: center;
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.466);
  color: white;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 10px;

}

.author-card:hover .overlay{
  opacity: 1;
}

.author-name{
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  counter-reset: black;
}

#bio {
  display: inline-block;
  position:inherit;
  padding-bottom: 5%;
  width: 35%;
  height: 50%;
  overflow: auto;
  resize: both;
  min-height: 10px;
  line-height: 30px;
  resize: none;
  text-align: left;
  color: rgb(0, 136, 255);
  border-color: #ffffff;
  border-style: solid;
  border-radius: 20px;
  margin-left: 0%;
  margin-top: 1%;
  font-size: 20px;
}
</style>
