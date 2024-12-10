<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BacktohomeModule></BacktohomeModule>
    <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%;" >Authors {{ action }} {{ id }}</span>

    <div id="tables" style="margin-top: 13%;">
      <div v-if="action === 'show'" style="width: 50%; margin-left: 5%; margin-top: -3%; background-color: none; border-radius: 8px; padding: 10px;">
        <div style="font-size: 400%; color: white; font-weight: 900; text-align: left; display: flex;">
            <span style="color: #4CAF50;"></span> {{oneAuthor.alias}}
            <div v-if="oneAuthor.verified === 1" style="color: #73ffcc; font-size: 40%;">Verified</div>
            <div v-if="oneAuthor.verified === 0" style="color: #73ffcc; font-size: 40%;">Not Verified</div>
        </div>
        <div style="text-align: left; margin-top: 0%; display: flex;">
          <div style="font-size: 200%; color: white; text-align: left; margin-top: 0%;">{{oneAuthor.first_name}} {{oneAuthor.last_name}}</div>
        </div>
        <div style="margin-bottom: 15px; font-size: 16px; color: white; text-align: left;">
            <span style="color: #4CAF50;"></span> {{oneAuthor.biography}}
        </div>
        <div style="text-align: center; margin-left: -91%; margin-top: 5%;">
            <a :href="'/#/authors/edit/' + oneAuthor.id_author" 
                style="color: green; background-color: aliceblue; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;"
                >EDIT</a>
        </div>
        <h1 v-if="action === 'show'" style="font-size: 400%; font-weight: 900; margin-top: 15%; text-align: left; text-shadow: 2px 2px 4px green; color: aliceblue;">SONGS</h1>
        </div>
      </div>

      <table v-if="action === 'show'" style="width: 100%; margin-top: 5%; border-collapse: collapse;" class="table table-striped table-bordered table-hover">
        <tr id="song-body" v-for="x of songAuthor" :key="x.id_song" class="table-row">
        <td class="table-cell">{{ x.title }}</td>
        <td class="table-cell" style="padding-right: 20px;">{{ x.duration }}</td>
        <td class="table-cell">{{ x.number_of_streams }}</td>
        <td class="table-cell">{{ formatDate(x.date_of_post) }}</td>
        <td class="table-cell">{{ x.alias }}</td>
        <td class="table-cell">{{ x.name }}</td>
        <td class="table-cell">
          <a :href="'/#/songs/show/' + x.id_song" class="show-link" style="color: green;">SHOW</a>
        </td>
      </tr>
  </table>

    
    <div v-if="action === 'edit'" class="container2 ">
      <form class="song-form" @submit.prevent="sendEditRequest" enctype="multipart/form-data" 
      style="margin: 2% auto; z-index: 1; display: flex; flex-direction: column; align-items: center; background-color: #f9f9f9; padding: 2%; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); width: 50%;">
  
  <!-- Alias Input -->
  <div class="input-group" style="width: 100%; margin-bottom: 15px; display: flex; flex-direction: column;">
    <label for="authors_alias" style="margin-bottom: 5px; font-weight: bold;">Alias</label>
    <input type="text" id="authors_alias" name="authors_alias" aria-label="Alias" class="form-control" 
           v-model="oneAuthor.alias" 
           placeholder="Alias"
           style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; width: 100%; box-sizing: border-box;">
  </div>
  
  <!-- First and Last Name -->
  <div class="input-group" style="width: 100%; margin-bottom: 15px; display: flex; gap: 10px;">
    <input type="text" aria-label="First name" class="form-control" v-model="oneAuthor.first_name" 
           placeholder="First Name"
           style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex: 1;">
    <input type="text" aria-label="Last name" class="form-control" v-model="oneAuthor.last_name" 
           placeholder="Last Name"
           style="padding: 10px; border: 1px solid #ccc; border-radius: 5px; flex: 1;">
  </div>
  
  <!-- Biography Textarea -->
  <div class="input-group" style="width: 100%; margin-bottom: 15px;">
    <label for="bio" style="margin-bottom: 5px; font-weight: bold;">Biography</label>
    <textarea id="bio" role="textbox" v-model="oneAuthor.biography"
              placeholder="Enter biography..." 
              style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; height: 100px;"></textarea>
  </div>
  
  <!-- Verified Dropdown -->
  <div class="input-group" style="width: 100%; margin-bottom: 15px; display: flex; align-items: center;">
    <label for="authors_verified" style="margin-right: 10px; font-weight: bold;">Verified:</label>
    <select name="authors_verified" id="authors_verified" v-model="oneAuthor.verified" 
            style="padding: 10px; border: 1px solid #ccc; border-radius: 5px;">
      <option value="0">Not Verified</option>
      <option value="1">Verified</option>
    </select>
  </div>
  
  <!-- Buttons -->
  <div id="buttons_container" style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
    <button class="btn btn-danger" 
            style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #dc3545; color: #fff; cursor: pointer;" 
            @click="sendDeleteRequest(oneAuthor.id_author)">DELETE</button>
    <input type="button" value="SEND" 
        class="btn btn-success" 
        style="padding: 10px 20px; border: none; border-radius: 5px; background-color: #28a745; color: #fff; cursor: pointer;" 
        @click="sendEditRequest()" />
  </div>
</form>
  </div>
  
    <!-- FOR List /authors/list/all -->
    <a v-if="action === 'list'" 
   :href="'/#/authors/edit/0'" 
   style="display: inline-block; padding: 10px 20px; margin-left: 90%; background-color: white; color: black; font-weight: bold; text-decoration: none; border: 2px solid #7efca4; border-radius: 25px; transition: all 0.3s ease; cursor: pointer;" 
   onMouseOver="this.style.background='#7efca4'; this.style.color='white';" 
   onMouseLeave="this.style.background='white'; this.style.color='black';">
   ADD
</a>

<!-- Authors List Container -->
<div v-if="action === 'list'" class="container" style="margin-top: 20px; padding: 0 10px; display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
  
  <!-- Author Card -->
  <div class="author-card" 
       v-for="a of authors" 
       v-bind:key="a.authors_id" 
       @click="$router.push('/authors/show/' + a.id_author)" 
       style="width: 200px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease; cursor: pointer;" 
       onMouseOver="this.style.transform='scale(1.05)'" 
       onMouseLeave="this.style.transform='scale(1)'">

    <!-- Image Container -->
    <div 
  class="image-container" 
  style="position: relative; height: 150px; background-color: #f0f0f0; display: flex; justify-content: center; align-items: center;"
>
  <!-- Image Element -->
  <img 
  id="image" 
  :src="require('@/assets/' + a.image)" 
  alt="Author Image" 
  style="height: 100%; object-fit: cover;" 
/>
  <!-- Overlay with Author Name -->
  <div 
    class="overlay" 
    style="position: absolute; bottom: 0; width: 100%; background: rgba(0, 0, 0, 0.6); color: white; padding: 10px; text-align: center; font-size: 1rem; font-weight: bold;"
  >
    {{ a.alias }}
  </div>
</div></div>

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
    this.changeBodyBackgroundColor();    
  },

  


  data () {
    return {
      file: "",
      authors : [],
      songAuthor : [],
      song : [],
      oneAuthor : {
        author_id: 0,
        author_alias:'',
        author_first_name: '',
        author_last_name:'',
        author_biography:'',
        author_verified:0,
        author_image: "",
      }
    }
  },

  methods:{

async getAllData() {
try {
  let responseAuthor = await this.$http.get("http://localhost:9000/authorsapi/list");
  this.authors = await responseAuthor.data;
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
        alais:'',
        first_name: '',
        last_name:'',
        biography:'',
        verified:0,
        image: "",
      };
      this.songAuthor = [];
  return;
}
try {
  let responseAuthor = await this.$http.get("http://localhost:9000/authorsapi/show/" + this.$props.id);
  var result = responseAuthor.data;
  if(result.error === 0){
    for (var i = 1; i < result.object.songs.length; i++) {
      this.songAuthor.push(result.object.songs[i]);
    }
    this.oneAuthor = result.object.author;
    console.log("hugo" + JSON.stringify(this.oneAuthor.image));
    // this.oneCar = this.cars.find(car => car.car_id == this.$props.id);
  }else{
    alert("Can't resolve ! ")
  }
}
catch (ex) { console.log(ex); }
},



async sendDeleteRequest(authorsId) {
  alert("DELETING... " + authorsId);
  let response = await this.$http.get("http://localhost:9000/authorsapi/del/" + authorsId);
  if(response.data === false){
    alert("This author look to not exist")
  }else{
  alert("DELETED: " + response.data.rowsDeleted);
  this.$router.push({ path: '/authors/list/all' });
  this.getAllData();
  }
},


async sendEditRequest() {
try {
  this.oneAuthor.image="default.png";
  if(this.$props.id === "0"){
      let response = await this.$http.post(
                "http://localhost:9000/authorsapi/add/",this.oneAuthor);
  if(response.data.state === false){
      alert(response.data.message);
  }else{
            alert("Added: " + response.data.rowsUpdated);
            this.$router.push({ path: '/authors/list/all' });
            this.getAllData();
    }
  }else{
      let response = await this.$http.post(
            "http://localhost:9000/authorsapi/update/" + this.oneAuthor.id_author, this.oneAuthor);
      if(response.data === false){
        alert("Error in one of the input field.")
      }else{
      alert("EDITED: " + response.data.rowsUpdated);
      this.$router.push({ path: '/authors/list/all' });
      this.getAllData();
      }
    }
  }
catch (ex) { console.log(ex); }
},

formatDate(incomingDate) {
      const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;},

changeBodyBackgroundColor() {
  document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
  document.body.style.backgroundSize = 'cover';
  document.body.style.height = '100%';
  document.body.style.backgroundColor = 'rgb(0,0,0)';
},
},

watch:{
id: function(newVal, oldVAl){
  this.refreshOneAuthor();
  console.log("hugo" + this.oneAuthor);
},

},

created(){
this.getAllData();
},



}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
  background: rgb(59,228,119);
  background: linear-gradient(180deg, rgba(59,228,119,1) 0%, rgba(59,228,119,1) 0%, rgba(0,0,0,1) 74%);
}


*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: sans-serif;
}

.search-container{
    margin-top: 150px;
    /*position: relative;*/
}

.search-container input{
    width: 350px;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}

.search-container input:focus{
    width: 500px;
}

.search-container i {

    /*position: absolute;*/
    top: 50%;
    right: 20px;
    transform: translate(-50%);
    color: #555;

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


/* Table Styles */
.table {
  width: 100%;
  margin-top: 5%;
  border-collapse: collapse;
  background-color: #1e1e1e41; /* Dark background for better contrast */
  border-radius: 10px;
  overflow: hidden;
  border: none; /* Supprime la bordure extérieure */
}

/* Header Row */
.table-header {
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  background-color: #333; /* Darker shade for header */
  text-align: left;
}

/* Table Rows */
.table-row:nth-child(even) {
  background-color: #ffffff33; /* Alternate row color */
}

.table-row:nth-child(odd) {
  background-color: #bbbbbb5d;
}

.table-row:hover {
  background-color: #d4ffd469; /* Highlight row on hover */
  cursor: pointer;
}

/* Table Cells */
.table-cell {
  color: aliceblue;
  font-weight: bold;
  padding: 1%;
  text-align: left;
  border: none; /* Supprime les bordures des cellules */
}

/* Links */
.show-link {
  color: black;
  font-weight: bold;
  text-decoration: none;
  background-color: white;
  padding: 5px 10px;
  border-radius: 25px;
  display: inline-block;
  transition: background-color 0.3s, color 0.3s;
}

.show-link:hover {
  background-color: #7efca4;
  color: #1e1e1e;
}
</style>
