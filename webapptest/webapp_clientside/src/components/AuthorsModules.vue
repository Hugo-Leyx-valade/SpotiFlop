<template>
  <div class="hello">
    <p>
      ACTION = {{ action }} <br />
      ID = {{ id }} <br/>
      <a href="/#/authors/list/all">Back to the list of authors</a>
      <a href="/#/authors/list/top50">The current TOP 50 authors</a>
    </p>

    <!-- FOR DATA SHEET /authors/show/42 -->
    <table v-if="action === 'show'" class="table table-dark table-striped table-hover table-bordered ">
      <tr><td>ID</td><td>{{oneAuthors.author_id}}</td></tr>
      <tr><td>ALIAS</td><td>{{oneAuthors.author_alias}}</td></tr>
      <tr><td> FIRST NAME </td><td>{{oneAuthors.author_first_name}}</td></tr>
      <tr><td>last_name</td><td>{{oneAuthors.author_last_name}}</td></tr>
      <tr><td>biography</td><td>{{oneAuthors.author_biography}}</td></tr>
      <tr><td>verified</td><td>{{oneAuthors.author_verified}}</td></tr>
    </table>

    <!-- FOR FORMS /authors/edit/42 -->
    <table  v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
      <tr><td>ALIAS</td><td><input type="text" name="authors_alias" v-model="oneAuthors.author_alias"/></td></tr>
      <tr><td> FIRST NAME </td><td><input type="text" name="authors_first_name" v-model="oneAuthors.author_first_name" /></td></tr>
      <tr><td>last_name</td><td><input type="text" name="authors_last_name" v-model="oneAuthors.author_last_name" /></td></tr>
      <tr><td>biography</td><td><input type="text" name="authors_biography" v-model="oneAuthors.author_biography" /></td></tr>
      <tr><td>verified</td>
        <td>
          <select name="authors_verified" v-model="oneAuthors.author_verified">
            <option>
              0
            </option>
            <option>
              1
            </option>
          </select>
        </td>
      </tr>

      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>

    <!-- FOR List /authors/list/all -->
    <table v-if="action === 'list'" class="table table-hover">
      <tr>
        <td>ID</td><td>alias</td><td>SHOW DATASHEET</td><td>EDIT AUTHOR</td><td>DELETE AUTHOR</td>
      </tr>
      <tr v-for="a of authors" v-bind:key="a.authors_id">
        <td>{{ a.authors_id }}</td>
        <td>{{ a.authors_alias }}</td>
        <td><a :href="'/#/authors/show/' + a.authors_id">[SHOW]</a></td>
        <td><a :href="`/#/authors/edit/${a.authors_id}`">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  name: 'Authors',
  props:['action','id'],
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

#app td{
  text-align: left;
}

</style>
