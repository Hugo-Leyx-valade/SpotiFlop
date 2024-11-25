<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
        User 
        {{ action }} {{ id }}
      </p>
      

      <!-- FOR DATA SHEET /users/show/42 -->
      <div v-if="action === 'show'" style="display: flex; justify-content: center;">
      <a :href="'/#/users/edit/' + user[0].id_user" class="button-33" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'" >EDIT</a>

    <!-- User Image -->
    <img v-if="user[0].genre === 1" src='../assets/boy2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
    <img v-if="user[0].genre === 0" src='../assets/girl2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
    
    <!-- User Info -->
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.9%; margin-left: 0%; font-size: 150%;">ID</p>   
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.3%; margin-left: 0%; font-size: 120%;">{{user[0].id_user}}</p>

    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 6.4%; margin-left: -32%; font-size: 150%;">UserName</p>   
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 9%; margin-left: -32%; font-size: 120%;">{{user[0].username}}</p>

    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8.4%; margin-left: 32%; font-size: 150%;">First Name</p>    
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 11%; margin-left: 32%; font-size: 120%;">{{user[0].first_name}}</p>

    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 20.3%; margin-left: 32%; font-size: 150%;">Last Name</p>   
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 22.7%; margin-left: 32%; font-size: 120%;">{{user[0].last_name}}</p>

    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: -25%; font-size: 150%;">Email</p>    
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: -25%; font-size: 120%;">{{user[0].email}}</p>

    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: 25%; font-size: 150%;">Date of birth</p>    
    <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: 25%; font-size: 120%; width: 20%;">{{formatDate(user[0].date_of_birth)}}</p>
</div>

<!-- Playlist Header -->
<h1 v-if="action === 'show'" style="font-size: 400%; font-weight: 900; margin-top: 35%; text-align: center; text-shadow: 2px 2px 4px green; color: aliceblue;">PLAYLIST</h1>
<!-- Table -->
<table v-if="action === 'show'" class="table table-striped table-bordered table-hover" style="width: 50%; margin: 3% auto; border-radius: 10px;">
  <thead>
    <tr>  
      <th>Username</th>
      <th>Email</th>
      <th>Show Information</th>
      <th>Edit User</th>
      <th>Delete User</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="u in user" :key="u.id_user">
      <td>{{ u.username }}</td>
      <td>{{ u.email }}</td>
      <td>
        <a :href="'/#/users/show/'+u.id_user" class="action-button show">SHOW</a>
      </td>
      <td>
        <a :href="`/#/users/edit/${u.user_id}`" class="action-button edit">EDIT</a>
      </td>
      <td>
        <input type="button" value="DELETE" @click="sendDeleteRequest()" class="action-button delete" />
      </td>
    </tr>
  </tbody>
  </table>

        
      <!-- FOR FORMS /users/edit/42 -->
      <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
        <img v-if="user[0].genre === 1" src='../assets/boy2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        <img v-if="user[0].genre === 0" src='../assets/girl2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.9%; margin-left: 0%; font-size: 150%;">ID</p>   
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.3%; margin-left: 0%; font-size: 120%;">{{user[0].id_user}}</p> 

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 6.4%; margin-left: -32%; font-size: 150%;" >UserName</p>   
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 9%; margin-left: -32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center; border-color: white;"  v-model="user[0].username"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8.4%; margin-left: 32%; font-size: 150%;">First Name</p>    
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 11%; margin-left: 32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="user[0].first_name"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 20.3%; margin-left: 32%; font-size: 150%;">Last Name</p>   
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 22.7%; margin-left: 32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="user[0].last_name"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: -25%; font-size: 150%;">Email</p>    
        <input type="email" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: -25%; font-size: 120%;background-color: transparent; border-radius: 20px;width:20%;text-align: center;border-color: white;" v-model="user[0].email"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: 25%; font-size: 150%;">Date of birth</p>    
        <input type="date" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: 25%; font-size: 120%; width: 20%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="user[0].date_of_birth"/>

        <input type="button" value="CONFIRM CHANGES" @click="id === '0' ? addUser() : sendEditRequest()" style="position: absolute; border-radius: 100px; margin-top: 35%; margin-left: 15%;" />
        <input type="button" value="RESET PASSWORD " @click="id === '0' ? addUser() : sendResetPasswordRequest()" style="position: absolute; border-radius: 100px; margin-top: 35%;  margin-left: -15%;"/>
      </div>

      
      <!-- FOR List /authors/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover" style="background-color: transparent; opacity: 0.9;">
  <thead>
    <tr>
      <th>ID</th>
      <th>Username</th>
      <th>Email</th>
      <th>Show Information</th>
      <th>Edit User</th>
      <th>Delete User</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="u in users" :key="u.id_user">
      <td>{{ u.id_user }}</td>
      <td>{{ u.username }}</td>
      <td>{{ u.email }}</td>
      <td>
        <a :href="'/#/users/show/'+u.id_user" class="action-button show">SHOW</a>
      </td>
      <td>
        <a :href="`/#/users/edit/${u.user_id}`" class="action-button edit">EDIT</a>
      </td>
      <td>
        <input type="button" value="DELETE" @click="sendDeleteRequest()" class="action-button delete" />
      </td>
    </tr>
  </tbody>
</table>
</div>
  </template>
  
  <script>
  import home from './homeModulesAdmin.vue';
  import user from "./users.json";
  import BacktohomeModule from './BacktohomeModule.vue';


  console.log(user)

  export default {
    name: 'Users',
    props:['action','id'],
    data () {
      return {
        users : [],
        user:[],
        oneUser : {
          user_id: 0,
          user_username:'X',
          user_first_name: 'Y',
          user_last_name:'z',
          user_email:'you@something.com',
          user_password: '********',
          user_role: 'user',
          user_date_of_birth: 'K',
          user_genre:0,
          user_picture: '../assets/boy2.png',
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
          let responseSong = await fetch("http://localhost:9000/usersapi/list");
          this.users = await responseSong.json();
          console.log(" users " + this.users.length);
          this.refreshOneUser();
        }
        catch (ex) {console.log(ex);}
      },


      formatDate(incomingDate) {
      const date = new Date(incomingDate);
// Format the date (e.g., as 'YYYY-MM-DD')
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return formattedDate;},

      async refreshOneUser(){
        if(this.$props.id ==="all" || this.$props.id=="0") {
          this.oneUser = {
          user_id: 0,
          user_username:'oui',
          user_first_name: 'non',
          user_last_name:'bril',
          user_email:'you@something.com',
          user_password: '********',
          user_role: 'user',
          user_date_of_birth: 'K',
          user_genre:0,
        }
        return;
        };
        try{
          let response = await this.$http.get("http://localhost:9000/usersapi/show/" + this.$props.id);
          this.user = response.data;
          console.log(" user " + this.users.length);
        }catch (ex){console.log(ex);}
      },

      changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    },


    oneUserLoad(user){
      this.oneUser.user_id = user.user_id;
      this.oneUser.user_username = user.user_username;
      this.oneUser.user_first_name = user.user_first_name;
      this.oneUser.user_last_name = user.user_last_name;
      this.oneUser.user_email = user.user_email;
      this.oneUser.user_password = user.user_password;
      this.oneUser.user_role = user.user_role;
      this.oneUser.user_date_of_birth = user.user_date_of_birth;
      this.oneUser.user_genre = user.genre;
      this.changeGenderImage();
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
  
        async sendEditRequest(id){
          console.log(user[user_id])
        },
    },
    
    
    watch:{
      id: function(newVal, oldVAl){
        this.refreshOneUser();
        console.log(this.user) //to display if the new user has been added correctly 

      }
    },
  
    created(){
      this.getALLData();
      console.log(this.users) //to display if the new user has been added correctly 
    },
    
    components: {
      home,
      BacktohomeModule,
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
    width: 95%; 
    margin: 20px;
    color: rgba(255, 255, 255, 0);
    background-color: transparent;
    border-radius: 1px;
    overflow: hidden;
    font-family: 'LilGrotesk', sans-serif;
  }
  
  #app table tr{
    background-color: #44444400;
  }

  #app td, #app th{
    padding: 10px;
    border: 1px solid #ffffff;
    text-align: center;
    font-weight: bold;

  }

  .table {
  background-color: transparent !important;
  opacity: 0.9;
}

  /* General table styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  background-color: rgba(255, 255, 255, 0.425);
}

th {
  background-color:none;
}

td {
  background-color:none;
}

.action-button {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 25px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #6efff3;
}

/* Styling for specific action buttons */
.show:hover {
  background-color: #7efca4;
}

.edit:hover {
  background-color: #6efff3;
}

.delete:hover {
  background-color: #ff6600;
}

/* Responsive Design */
@media (max-width: 767px) {
  table {
    width: 100%;
    font-size: 14px;
  }

  /* Hide unnecessary columns on small screens */
  td:nth-child(4), th:nth-child(4),
  td:nth-child(5), th:nth-child(5),
  td:nth-child(6), th:nth-child(6) {
    display: none;
  }

  /* Stacked layout for small screens */
  tbody tr {
    display: block;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
  }

  tbody tr td {
    display: block;
    text-align: right;
    padding: 10px;
    border: none;
    position: relative;
  }

  tbody tr td::before {
    content: attr(data-label);
    font-weight: bold;
    position: absolute;
    left: 10px;
    top: 10px;
  }


}

  /* Adjusting the action buttons for mobile */
  .action-button {
    width: 100%;
    padding: 8px;
    text-align: center;
  }


/* CSS */
.button-33 {
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  margin-left: 60%;
  margin-top: 2%;
  padding: 1% 2%;
}

.button-33:hover {
  box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
  transform: scale(1.05) rotate(-1deg);}

  
  </style>
  