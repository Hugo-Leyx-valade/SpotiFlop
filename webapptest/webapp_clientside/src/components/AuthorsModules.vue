<template>
  <div class="hello">
    <home></home>
    <p id="nav_link">
      <a href="/#/authors/list/all" class="link-offset-2 link-underline link-underline-opacity-0 ">Back to the list of authors</a>
      <a href="/#/authors/list/top50" class="link-offset-2 link-underline link-underline-opacity-0">The current TOP 50 authors</a>
    </p>

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

    
    <div v-if="action === 'edit'" class="grid gap-3 ">
      <div class=" input-group" style="padding-left: 30%; padding-right: 60%;">
        <span class="input-group-text">Alias</span>
        <input type="text" name="authors_alias" class="form-control" value="Alias" v-model="oneAuthors.author_alias"/>
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
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Alias: {{ a.authors_alias }}</h5>
              <p class="card-text">ID: {{ a.authors_id }}</p>
              <div id="buttons">
                <a :href="'/#/authors/show/' + a.authors_id" class="btn btn-success mb-2">SHOW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import home from './homeModules.vue';

export default {
  name: 'Authors',
  props:['action','id'],
  components: {
    home
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
     
      this.authors = [ { authors_id:1, authors_alias:"Earth, Wind & Fire", authors_first_name:null, authors_last_name:null, authors_biography:null, authors_verification:1},
        { authors_id:1, authors_alias:"Michael Jackson", authors_first_name:"Michael", authors_last_name:"Jackson", authors_biography:null, authors_verification:1},
        { authors_id:1, authors_alias:"Imagine Dragons", authors_first_name:null, authors_last_name:null, authors_biography:null, authors_verification:1},
        { authors_id:1, authors_alias:"The Weeknd", authors_first_name:null, authors_last_name:null, authors_biography:null, authors_verification:1}];
      }
      catch (ex) {console.log(ex);}
    },
    async refreshOneAuthor(){
      if(this.$props.id ==="all" || this.$props.id=="0") return;
      try{
        this.oneAuthors = this.authors.find(author=>authors.author.id==this.$props.id);
      }catch (ex){console.log(ex);}
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
  width: 95%; margin: 20px;
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
