<template>
    <div class="hello" onload="changeBodyBackgroundColor()">
      <BacktohomeModule></BacktohomeModule>
      <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
        User 
        {{ action }}
        ({{ id }}) <br/>
      </p>
  
      <!-- FOR DATA SHEET /users/show/42 -->
      <div v-if="action === 'show'" style="display: flex; justify-content: center;">
        <img v-if="oneUser.user_genre === 1" src='../assets/boy2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        <img v-if="oneUser.user_genre === 0" src='../assets/girl2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.9%; margin-left: 0%; font-size: 150%;">ID</p>   
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.3%; margin-left: 0%; font-size: 120%;">{{oneUser.user_id}}</p> 

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 6.4%; margin-left: -32%; font-size: 150%;">UserName</p>   
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 9%; margin-left: -32%; font-size: 120%;">{{oneUser.user_username}}</p>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8.4%; margin-left: 32%; font-size: 150%;">First Name</p>    
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 11%; margin-left: 32%; font-size: 120%;">{{oneUser.user_first_name}}</p>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 20.3%; margin-left: 32%; font-size: 150%;">Last Name</p>   
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 22.7%; margin-left: 32%; font-size: 120%;">{{oneUser.user_last_name}}</p>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: -25%; font-size: 150%;">Email</p>    
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: -25%; font-size: 120%;">{{oneUser.user_email}}</p>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: 25%; font-size: 150%;">Date of birth</p>    
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: 25%; font-size: 120%; width: 20%;">{{oneUser.user_date_of_birth}}</p>

      </div>
  
      <!-- FOR FORMS /users/edit/42 -->
      <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
        <img v-if="oneUser.user_genre === 1" src='../assets/boy2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        <img v-if="oneUser.user_genre === 0" src='../assets/girl2.png' :alt="oneUser.user_picture" style="position: absolute; width: 45%; height: auto; margin-top: 5%; margin-left: 0%;" />
        
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.9%; margin-left: 0%; font-size: 150%;">ID</p>   
        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.3%; margin-left: 0%; font-size: 120%;">{{oneUser.user_id}}</p> 

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 6.4%; margin-left: -32%; font-size: 150%;" >UserName</p>   
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 9%; margin-left: -32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center; border-color: white;"  v-model="oneUser.user_username"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 8.4%; margin-left: 32%; font-size: 150%;">First Name</p>    
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 11%; margin-left: 32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="oneUser.user_first_name"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 20.3%; margin-left: 32%; font-size: 150%;">Last Name</p>   
        <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 22.7%; margin-left: 32%; font-size: 120%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="oneUser.user_last_name"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: -25%; font-size: 150%;">Email</p>    
        <input type="email" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: -25%; font-size: 120%;background-color: transparent; border-radius: 20px;width:20%;text-align: center;border-color: white;" v-model="oneUser.user_email"/>

        <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 26%; margin-left: 25%; font-size: 150%;">Date of birth</p>    
        <input type="date" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 28.8%; margin-left: 25%; font-size: 120%; width: 20%;background-color: transparent; border-radius: 20px;width:10%;text-align: center;border-color: white;" v-model="oneUser.user_date_of_birt"/>

        <input type="button" value="CONFIRM CHANGES" @click="id === '0' ? addUser() : sendEditRequest()" style="position: absolute; border-radius: 100px; margin-top: 35%; margin-left: 15%;" />
        <input type="button" value="RESET PASSWORD " @click="id === '0' ? addUser() : sendResetPasswordRequest()" style="position: absolute; border-radius: 100px; margin-top: 35%;  margin-left: -15%;"/>
      </div>

      
      <!-- FOR List /authors/list/all -->
      <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
        <tr>
          <td>ID</td><td>Username</td><td>SHOW INFORMATIONS</td><td>EDIT USER</td><td>DELETE USER</td>
        </tr>
        <tr v-for="u of users" v-bind:key="u.user_id">
          <td>{{ u.user_id }}</td>
          <td>{{ u.user_username }}</td>
          <td><a :href="'/#/users/show/' + u.user_id" @click="oneUserLoad(u)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
          <td><a :href="`/#/users/edit/${u.user_id}`" @click="oneUserLoad(u)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >EDIT</a></td>
          <td><input type="button" value="DELETE" @click="sendDeleteRequest()" /></td>
        </tr>
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
    color: white;
    background-color: #333;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'LilGrotesk', sans-serif;
  }
  
  #app table tr{
    background-color: #444;
  }

  #app td, #app th{
    padding: 10px;
    border: 1px solid #555;
    text-align: center;
    font-weight: bold;

  }

  input[type="button"]{
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
  }

  input[type="button"]:hover {
    background-color: #37a875;
  }



  
  </style>
  