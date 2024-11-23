<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BackgroundModule></BackgroundModule>
    <BacktohomeModule></BacktohomeModule>
    <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%;" >Authors {{ action }} {{ id }}</span>

    <div id="tables" style="margin-top: 13%;">
    <!-- FOR DATA SHEET /authors/show/42 -->
      <table v-if="action === 'show'" class="table table-primary table-striped table-hover table-bordered border-success ">
        <tr><td>ID</td><td>{{oneAuthors.author_id}}</td></tr>
        <tr><td>Alias</td><td>{{oneAuthors.author_alias}}</td></tr>
        <tr><td>First Name</td><td>{{oneAuthors.author_first_name}}</td></tr>
        <tr><td>Last Name</td><td>{{oneAuthors.author_last_name}}</td></tr>
        <tr><td>Biography</td><td>{{oneAuthors.author_biography}}</td></tr>
        <tr><td>Verified</td><td>{{oneAuthors.author_verified}}</td></tr>
        <tr><td><a :href="'/#/authors/edit/' + oneAuthors.author_id" class="btn btn-primary mb-2"   @click="oneAuthorsLoad(oneAuthors)"  >[EDIT]</a></td></tr>
      </table>
    </div>
    
    <div v-if="action === 'edit'" class="container ">
      <div class=" input-group" style="padding-left: 30%; padding-right: 60%;">
        <span class="input-group-text" style="margin-bottom: 5%;">Alias</span>
        <input type="text" name="authors_alias" class="form-control" v-model="oneAuthors.author_alias" :placeholder="oneAuthors.author_alias" style="margin-bottom: 5%;">
      </div>
      <div class=" input-group" style="padding-left: 30%; padding-right: 30%;">
        <span class="input-group-text">First and last name</span>
        <input type="text" aria-label="First name" class="form-control" v-model="oneAuthors.author_first_name" >
        <input type="text" aria-label="Last name" class="form-control" v-model="oneAuthors.author_last_name">
      </div>
      <div class="p-2 g-col-6"><input type="text" name="authors_biography" value="Biography" v-model="oneAuthors.author_biography" /></div>
      <div class="p-2 g-col-6"><select name="authors_verified" v-model="oneAuthors.author_verified">
            <option>
              0
            </option>
            <option>
              1
            </option>
          </select>
        </div>
      <div id="buttons_container" class="g-col-6 mt-5" >
          <button class="btn btn-danger" style="margin-right: 0.2%;" @click="sendDeleteRequest(a.authors_id)">DELETE</button>
          <input type="button" value="SEND" class="btn btn-success " style="margin-left: 0.3%;" @click="sendEditRequest(a.authors_id)" />
      </div>  
    </div>

    <!-- FOR List /authors/list/all -->
    <div v-if="action === 'list'" class="container">
      <div class="row">
        <div class="author-card" v-for="a of authors" v-bind:key="a.authors_id">
          <a :href="'/#/authors/show/' + a.authors_id" class="link-offset-2 link-underline link-underline-opacity-0" @click="oneAuthorsLoad(a)">
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

    this.changeBodyBackgroundColor();
    this.printAuthors(element);
    },

  


  data () {
    return {
      authors : [],
      song : [],
      oneAuthors : {
        author_id: 0,
        author_alias:'X',
        author_first_name: 'Y',
        author_last_name:'z',
        author_biography:'something in the world',
        author_verified:1,
        author_image: "",
      }
    }
  },
  methods:{

async getAllData() {
try {
  let responseAuthor = await fetch("http://localhost:9000/authorsapi/list");
  console.log(responseAuthor)
  this.authors = await responseAuthor.json();
  console.log(" songs" + this.song[1].song_title );
  /*
  this.brands = [ { brand_id: 1, brand_name: "BMW" }, { brand_id: 2, brand_name: "Audi" }, { brand_id: 3, brand_name: "Citroen" } ];
  this.cars = [ { car_id: 1, car_brand: 2, car_name: "Audi S4", car_baseprice: 40000, car_isfancy: 0, car_realprice: 45000 }, { car_id: 2, car_brand: 1, car_name: "BMW i8", car_baseprice: 80000, car_isfancy: 1, car_realprice: 90000 } ];
  */
  this.refreshOneAuthor();
}
catch (ex) {"hugp" + console.log(ex); }
}, 

formatDate(incomingDate) {
const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
return formattedDate;
},

async refreshOneAuthor() {
if (this.$props.id === "all" || this.$props.id === "0") {
  this.oneAuthor = {
    song_id: 0,
    song_title: '',
    song_duration: '0:0',
    song_number_of_stream: 0,
    song_date: '0000-00-00',
    song_lyrics: "",
  };
  return;
}
try {
  let responseAuthor = await this.$http.get("http://localhost:9000/authorsapi/show/" + this.$props.id);
  this.oneAuthor = responseAuthor.data;
  console.log("oneAuthor: " + this.oneAuthor.title);
  // this.oneCar = this.cars.find(car => car.car_id == this.$props.id);
}
catch (ex) { console.log(ex); }
},



async sendDeleteRequest(authorsId) {
try {
  alert("DELETING... " + authorsId);
  let response = await this.$http.get("http://localhost:9000/authorsapi/del/" + authorsId);
  alert("DELETED: " + response.data.rowsDeleted);
  this.getAllData();
}
catch (ex) { console.log(ex); }
},



async sendEditRequest() {
try {
  alert("EDITING... " + this.oneAuthor.id_author);
  let response = await this.$http.post(
        "http://localhost:9000/authorsapi/update/" + this.oneAuthor.id_author, this.onrAuthor);
  alert("EDITED: " + response.data.rowsUpdated);
  this.$router.push({ path: '/song' });
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
  margin: 100px 0 0 200px;
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
</style>
