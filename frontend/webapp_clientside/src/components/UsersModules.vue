<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <p>
        ACTION = {{ action }} <br />
        ID = {{ id }} <br/>
        <a href="/#/users/list/all">Back to the list of users</a>
        <a href="/#/users/edit/0">Add a new user</a><br />
      </p>
  
      <!-- FOR DATA SHEET /users/show/42 -->
      <table v-if="action === 'show'" class="table table-striped table-hover table-bordered ">
        <tr><td>ID</td><td>{{oneUser.user_id}}</td></tr>
        <tr><td>Username</td><td>{{oneUser.user_username}}</td></tr>
        <tr><td>First Name </td><td>{{oneUser.user_first_name}}</td></tr>
        <tr><td>Last Name</td><td>{{oneUser.user_last_name}}</td></tr>
        <tr><td>Email</td><td>{{oneUser.user_email}}</td></tr>
        <tr><td>Password</td><td>{{oneUser.user_password}}</td></tr>
        <tr><td>Role</td><td>{{oneUser.user_role}}</td></tr>
        <tr><td>Date Of Birth</td><td>{{oneUser.user_date_of_birth}}</td></tr>
      </table>
  
      <!-- FOR FORMS /users/edit/42 -->
      <table  v-if="action === 'edit'" class="table table-striped table-hover table-bordered ">
        <tr><td>Username</td><td><input type="text" name="user_username" v-model="user_username"/></td></tr>
        <tr><td>First Name</td><td><input type="text" name="user_first_name" v-model="oneUser.user_first_name" /></td></tr>
        <tr><td>Last Name</td><td><input type="text" name="user_last_name" v-model="oneUser.user_last_name" /></td></tr>
        <tr><td>Email</td><td><input type="text" name="user_email" v-model="oneUser.user_email" /></td></tr>
        <tr><td>Password</td><td><input type="text" name="user_password" v-model="oneUser.user_password" /></td></tr>
        <tr><td>Date Of Birth</td><td><input type="date" name="user_date_of_birth" v-model="oneUser.user_date_of_birth" /></td></tr>
        <tr><td>Role</td>
            <td>
                <select name="role" v-model="oneUser.user_role">
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                </select>
            </td>
        </tr>

        <tr><td colspan="2">
          <input type="button" value="SEND" @click="id === '0' ? addUser() : sendEditRequest()" />
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
  import home from './homeModulesAdmin.vue';
  import user from "./users.json";

  console.log(user)

  export default {
    name: 'Users',
    props:['action','id'],
    data () {
      return {
        users : [],
        oneUser : {
          user_id: 0,
          user_username:'X',
          user_first_name: 'Y',
          user_last_name:'z',
          user_email:'you@something.com',
          user_password: '********',
          user_role: 'user',
          user_date_of_birth: '',
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
          this.users = user;
        }
        catch (ex) {console.log(ex);}
      },
      async refreshOneUser(){
        if(this.$props.id ==="all" || this.$props.id=="0") return;
        try{
          this.oneUser = this.users.find(user=>users.user.id==this.$props.id);
        }catch (ex){console.log(ex);}
      },

      changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    },

    async addUser(){
      console.log("AddUser function called");
      try{
        /*
        let responesUsers = await this.$http.get("backend/url",newUser);
        this.user.push(response.data);
        */
      const newUser = {...this.oneUser, user_id: this.users.length + 1};
      this.users.push(newUser);
      alert("A new user has been added");

      }catch(error){
        console.error("Error when adding a user :", error);
      }
      
    },

        async sendEditRequest(id){
          console.log(user[user_id])
        },
    },
    
    
    watch:{
      id: function(newVal, oldVAl){
        this.refreshOneUser();
      }
    },
  
    created(){
      this.getALLData();
      console.log(this.users) //to display if the new user has been added correctly 
    },
    
    components: {
      home,
    },
  
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
  