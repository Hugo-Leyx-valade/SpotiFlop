<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BackgroundModule></BackgroundModule>
    <BacktohomeModule></BacktohomeModule>
    <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 39.5%;" >SpotiFlop</span>

    <div id="tables" style="margin-top: 13%;">
    <!-- FOR DATA SHEET /authors/show/42 -->
      <table v-if="action === 'show'" class="table table-primary table-striped table-hover table-bordered border-success ">
        <tr><td>ID</td><td>{{oneAuthors.author_id}}</td></tr>
        <tr><td>ALIAS</td><td>{{oneAuthors.author_alias}}</td></tr>
        <tr><td> FIRST NAME </td><td>{{oneAuthors.author_first_name}}</td></tr>
        <tr><td>last_name</td><td>{{oneAuthors.author_last_name}}</td></tr>
        <tr><td>biography</td><td>{{oneAuthors.author_biography}}</td></tr>
        <tr><td>verified</td><td>{{oneAuthors.author_verified}}</td></tr>
        <tr><td><a :href="'/#/authors/edit/' + oneAuthors.author_id" class="btn btn-primary mb-2">[EDIT]</a></td></tr>
      </table>
    </div>
    
    <div v-if="action === 'edit'" class="grid gap-3 ">
      <div class=" input-group" style="padding-left: 30%; padding-right: 60%;">
        <span class="input-group-text" style="margin-bottom: 5%;" >Alias</span>
        <input type="text" name="authors_alias" class="form-control" value="Alias" v-model="oneAuthors.author_alias" style="margin-bottom: 5% ;"/>
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
          <input type="button" value="SEND" class="btn btn-success " style="margin-left: 0.3%;" @click="sendEditRequest()" />
      </div>  
    </div>

    <!-- FOR List /authors/list/all -->
    <div v-if="action === 'list'" class="container">
      <div class="row">
        <div class="col-md-4" v-for="a of authors" v-bind:key="a.authors_id">
          <a :href="'/#/authors/show/' + a.authors_id" class="link-offset-2 link-underline link-underline-opacity-0">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title">{{ a.authors_alias }}</h5>
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
import authors from "./authors.json";

export default {
  name: 'Authors',
  props:['action','id'],
  components: {
    BacktohomeModule
  },

  mounted() {
    this.changeBodyBackgroundColor();
    },

  authors: [
        // Example data, replace with your actual data
        { authors_id: 1, authors_alias: 'Author1' },
        { authors_id: 2, authors_alias: 'Author2' },
        { authors_id: 3, authors_alias: 'Author3' }
      ],


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
          this.authors = authors;
        }
        catch (ex) {console.log(ex);}
      },


    async refreshOneAuthor(){
      if(this.$props.id ==="all" || this.$props.id=="0") return;
      try{
        this.oneAuthors = this.authors.find(author=>authors.author.id==this.$props.id);
      }catch (ex){console.log(ex);}
    },

    changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 65%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    }

  },

  watch:{
    id: function(newVal, oldVAl){
      this.refreshOneAuthor();
    }
  },

  created(){
    this.getALLData();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
  background: rgb(59,228,119);
  background: linear-gradient(180deg, rgba(59,228,119,1) 0%, rgba(59,228,119,1) 0%, rgba(0,0,0,1) 74%);
}

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

</style>
