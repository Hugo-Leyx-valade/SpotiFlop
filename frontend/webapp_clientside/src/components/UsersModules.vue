<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <home></home>
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
        <tr><td>Username</td><td><input type="text" name="user_username" v-model="oneUser.user_username"/></td></tr>
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
          <td><input type="button" value="DELETE" @click="sendDeleteRequest(u.user_id)" /></td>
        </tr>
      </table>
  
    </div>
  </template>
  
  <script>
  import home from './homeModulesAdmin.vue';

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
        this.users = [
          { user_id: 1, user_username: 'kallan93', user_first_name: 'Kallan', user_last_name: 'Giraud', user_email: 'kallan.giraud@gmail.com', user_password: 'aZ4@pQr7nDgR', user_role: 'user', user_date_of_birth: '1992-11-15' },
          { user_id: 2, user_username: 'mila86', user_first_name: 'Mila', user_last_name: 'Rochefort', user_email: 'mila.rochefort@yahoo.fr', user_password: '8Fg&kH%JxE12', user_role: 'admin', user_date_of_birth: '1995-06-21' },
          { user_id: 3, user_username: 'levan_12', user_first_name: 'Levan', user_last_name: 'Aubert', user_email: 'levan.aubert@orange.fr', user_password: 'Vh!3fWq$97T', user_role: 'user', user_date_of_birth: '1989-03-03' },
          { user_id: 4, user_username: 'camille92', user_first_name: 'Camille', user_last_name: 'Perret', user_email: 'camille.perret@gmail.com', user_password: 'jP7!9hR6cOpM2', user_role: 'user', user_date_of_birth: '1996-09-12' },
          { user_id: 5, user_username: 'zoe74', user_first_name: 'Zoe', user_last_name: 'Fontaine', user_email: 'zoe.fontaine@sfr.fr', user_password: 'Nf3#bP9kYl8', user_role: 'admin', user_date_of_birth: '1993-07-19' },
          { user_id: 6, user_username: 'jules23', user_first_name: 'Jules', user_last_name: 'Bernard', user_email: 'jules.bernard@hotmail.fr', user_password: 'xP2&aM4nT7qJ9', user_role: 'user', user_date_of_birth: '2001-04-27' },
          { user_id: 7, user_username: 'mathis41', user_first_name: 'Mathis', user_last_name: 'Lemoine', user_email: 'mathis.lemoine@laposte.net', user_password: 'D4s$F7gA3vC6', user_role: 'user', user_date_of_birth: '1997-02-11' },
          { user_id: 8, user_username: 'lea59', user_first_name: 'Lea', user_last_name: 'Renard', user_email: 'lea.renard@gmail.com', user_password: 'eB9&zW5rC3yK8', user_role: 'admin', user_date_of_birth: '1998-08-30' },
          { user_id: 9, user_username: 'lucie84', user_first_name: 'Lucie', user_last_name: 'Descamps', user_email: 'lucie.descamps@yahoo.com', user_password: 'Qj6@pL8nF4dT2', user_role: 'user', user_date_of_birth: '1994-11-05' },
          { user_id: 10, user_username: 'mael37', user_first_name: 'Mael', user_last_name: 'Dumont', user_email: 'mael.dumont@orange.fr', user_password: 'K7l!R2mB3vG5', user_role: 'user', user_date_of_birth: '1990-05-23' },
          { user_id: 11, user_username: 'nina66', user_first_name: 'Nina', user_last_name: 'Gautier', user_email: 'nina.gautier@sfr.fr', user_password: 'Hj9*E3mW8xL6', user_role: 'admin', user_date_of_birth: '1991-12-14' },
          { user_id: 12, user_username: 'axel49', user_first_name: 'Axel', user_last_name: 'Fleury', user_email: 'axel.fleury@gmail.com', user_password: 'uT2&gV7nL5pC4', user_role: 'user', user_date_of_birth: '1999-03-18' },
          { user_id: 13, user_username: 'lola77', user_first_name: 'Lola', user_last_name: 'Collet', user_email: 'lola.collet@hotmail.fr', user_password: 'Rf3#D9bY2vG1', user_role: 'user', user_date_of_birth: '1992-10-09' },
          { user_id: 14, user_username: 'ethan63', user_first_name: 'Ethan', user_last_name: 'Poulain', user_email: 'ethan.poulain@laposte.net', user_password: 'M6l@cR8zY3pG5', user_role: 'admin', user_date_of_birth: '1996-12-28' },
          { user_id: 15, user_username: 'emma52', user_first_name: 'Emma', user_last_name: 'Blanc', user_email: 'emma.blanc@yahoo.fr', user_password: 'Xf8*V3jL2qR9', user_role: 'user', user_date_of_birth: '1995-07-17' },
          { user_id: 16, user_username: 'leo88', user_first_name: 'Leo', user_last_name: 'Morel', user_email: 'leo.morel@orange.fr', user_password: 'T4k!P2jG5mC7', user_role: 'user', user_date_of_birth: '2000-04-02' },
          { user_id: 17, user_username: 'alice38', user_first_name: 'Alice', user_last_name: 'Noir', user_email: 'alice.noir@sfr.fr', user_password: 'Bp7#T9kD3wV6', user_role: 'admin', user_date_of_birth: '1997-05-13' },
          { user_id: 18, user_username: 'adam25', user_first_name: 'Adam', user_last_name: 'Girard', user_email: 'adam.girard@gmail.com', user_password: 'Hj5&L3qP9vT4', user_role: 'user', user_date_of_birth: '1993-11-27' },
          { user_id: 19, user_username: 'ines53', user_first_name: 'Ines', user_last_name: 'Durand', user_email: 'ines.durand@hotmail.fr', user_password: 'F2m@K7pL8zT6', user_role: 'admin', user_date_of_birth: '1994-06-02' },
          { user_id: 20, user_username: 'nathan44', user_first_name: 'Nathan', user_last_name: 'Martin', user_email: 'nathan.martin@laposte.net', user_password: 'J3q&F5kW9lT8', user_role: 'user', user_date_of_birth: '1989-01-15' },
        ];
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
      
    }

    },

    async sendDeleteRequest(user_id){
      console.log("DeleteUser function called");
      try{
        this.users = this.users.filter(user=> user.user_id !== user_id);
        alert("User has been deleted successfully");
        /*
        let responesUsers = await this.$http.get("backend/url",newUser);
        this.user.push(response.data);
        */

        /*const ID = this.users.findIndex(user=> user.user_id === user_id);

        if(ID !== this.users.length && ID !== -1){
          this.users.splice(ID,1);
          alert("User has been deleted successfully");
        }else{
          alert("The user cannot be found");
        }
        */

      }catch(error){
        console.error("Error when deleting a user :", error);
      }


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
  