<template>
    <div class="hello">
      <p>
        ACTION = {{ action }} <br />
        ID = {{ id }} <br/>
        <a href="/#/songs/list/all">Back to the list of users</a>
        <a href="/#/songs/edit/0">Add a new user</a><br />
      </p>
  
      <!-- FOR DATA SHEET /users/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
        <tr><td>ID</td><td>{{oneSong.song_id}}</td></tr>
        <tr><td>Title</td><td>{{oneSong.song_title}}</td></tr>
        <tr><td>Duration </td><td>{{oneSong.song_duration}}</td></tr>
        <tr><td>Number Of Stream</td><td>{{oneSong.song_number_of_stream}}</td></tr>
        <tr><td>Date Of Post</td><td>{{oneSong.song_date}}</td></tr>
        <tr><td>Lyrics</td><td>{{oneSong.song_lyrics}}</td></tr>
        <tr><td>Author</td><td>{{oneSong.song_author}}</td></tr>
      </table>
  
      <!-- FOR FORMS /users/edit/42 -->
      <table  v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
        <tr><td>Title</td><td><input type="text" name="song_title" v-model="oneSong.song_title"/></td></tr>
        <tr><td>Duration</td><td><input type="text" name="song_duration" v-model="oneSong.song_duration" /></td></tr>
        <tr><td>Number Of Stream</td><td><input type="text" name="song_number_of_stream" v-model="oneSong.song_number_of_stream" /></td></tr>
        <tr><td>Date Of Post</td><td><input type="date" name="song_date" v-model="oneSong.song_date" /></td></tr>
        <tr><td>Lyrics</td><td><input type="text" name="song_lyrics" v-model="oneSong.song_lyrics" /></td></tr>
        <tr><td>Author</td><td><input type="text" name="song_author" v-model="oneSong.song_author" /></td></tr>

        <tr><td colspan="2">
          <input type="button" value="SEND" @click="sendEditRequest()" />
        </td></tr>
      </table>
  
      <!-- FOR List /authors/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
        <tr>
          <td>ID</td><td>Username</td><td>First Name</td><td>Last Name</td><td>SHOW DATASHEET</td><td>EDIT USER</td><td>DELETE USER</td>
        </tr>
        <tr v-for="u of users" v-bind:key="u.user_id">
          <td>{{ u.user_id }}</td>
          <td>{{ u.user_username }}</td>
          <td>{{ u.user_first_name }}</td>
          <td>{{ u.user_last_name }}</td>
          <td><a :href="'/#/users/show/' + u.user_id">[SHOW]</a></td>
          <td><a :href="`/#/users/edit/${u.user_id}`">[EDIT]</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
      </table>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'Users',
    props:['action','id'],
    data () {
      return {
        songs : [],
        oneSong : {
          song_id: 0,
          song_title:'X',
          song_duration: 0,
          song_number_of_stream:0,
          song_date:'',
          song_lyrics: '',
          song_author: ,
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
        this.users = [ { user_id:1, user_username:"Triks", user_first_name:'Hugo', user_last_name:'Leyx-Valade', user_email:"triks@gmail.com", user_password:'xskz!?', user_role:'user', user_date_of_birth:'2004/06/13'},
        { user_id:1, user_username:"Aohren", user_first_name:'Harone', user_last_name:'Chitam', user_email:"aohren@gmail.com", user_password:'ajcnlkn!?', user_role:'user', user_date_of_birth:'2004/10/07'},
          ];
        }
        catch (ex) {console.log(ex);}
      },
      async refreshOneUser(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneUser = this.users.find(user=>users.user.id==this.$props.id);
        }catch (ex){console.log(ex);}
      }
    },
  
    watch:{
      id: function(newVal, oldVAl){
        this.refreshOneUser();
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
  