<template>
    <div class="authentication" onload="changeBodyBackgroundColor()">
        <BacktohomeModule></BacktohomeModule>
        <div v-if="action === 'option'">
            <img src="../assets/spotyflop.png" alt="logo" style="width: 65%; height: auto; display: block; margin: 0 auto;" />
            <div class="content d-flex justify-content-center" id="txt" style="display: flex; align-content: center;">
                <p id="txt1" style="font-family: 'LilGrotesk-bold'; color: #22d05d ; font-size: 100px; position:fixed; top: 40%; left: 38.9%;">SpotiFlop</p>
            </div>
            
            <div style="display: flex; position: fixed; align-self: center; justify-content: center;">
                <a href="/#/authentication/login" style="margin-top: 300%; margin-left: 200%;  border-radius: 100px; padding-bottom: 0%;"><input type="button" value=" Login  " style="padding-left: 180%; padding-right: 180%; border-radius: 100px; color: white; background-color: #22d05d;"/></a>
            </div>

            <div style="display: flex; position: fixed; align-self: center; justify-content: center;">
                <a href="/#/authentication/register" style="margin-top: 350%; margin-left: 180%; border-radius: 100px;"><input type="button" value="Register" style="padding-left: 150%; padding-right: 150%; border-radius: 100px; color: whitesmoke; background-color: grey;"/></a>
            </div>

            
        </div>
        
        <div v-if="action === 'login'" class="login">
            <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%; color: white;" >Authentication</span>
            <form @submit.prevent="submitForm" style="margin-top: 20%;">
                <input v-model="username" placeholder="Username" />
                <input v-model="password" type="password" placeholder="Password" />
                <button type="submit" @click.prevent="submitForm()">Login</button>
            </form>
            <div id='text'></div>
        </div>

        <div v-if="action === 'register'" id="register" >
            <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%; color: white;" >Authentication</span>
            <form @submit.prevent="submitForm" style="margin-top: 20%;">
                <input v-model="username" placeholder="Username" />
                <input v-model="first_name" type="First Name" placeholder="First Name" />
                <input v-model="last_name" type="Last Name" placeholder="Last Name" />
                <input v-model="email" type="Email" placeholder="Email" />
                <input v-model="date" type="date" placeholder="Date of Birth" />
                <input v-model="password" type="password" placeholder="Password" />
                <button type="submit" @click.prevent="registerNewUser()" placeholder="Register"/>
            </form>
            <div id='text'></div>
        </div>

    </div>
</template>

<script>
import json from "../components/users.json";
import BacktohomeModule from './BacktohomeModule.vue';

export default {
    name: 'Authentication',
    props:['action'],
    components: {
    BacktohomeModule
    },
    
    mounted() {
    this.changeBodyBackgroundColor();
    },

data() {
    return {
    username: '',
    password: '',
    myJson: json,
    greetingMessage: '',
    };
},

methods: {
    submitForm : function () {
        const myJson = this.myJson;
        console.log(myJson);
        const user = myJson.find(user => user.user_username === this.username && user.user_password === this.password);
        if (user) {
            if(user.user_role === "admin"){
                console.log("Login successful");
                this.$router.push('/adminPanel');
            } else {
                console.log("Login successful");
                this.$router.push('/homeUser');
            }
        } else {
            console.log("submit Login failed");
        }
    },


    checkAllFieldsFilled : function (){ 
        if(this.username === "" || this.first_name === "" || this.last_name === "" || this.email === "" || this.date === "" || this.password === ""){
            return false;this
        } else {
            return true;
        }
    },

    checkEmailExist : function(){
            const myJson = this.myJson;
            console.log('hugo'+ myJson);
            if (myJson.find(user => user.user_email === this.email)) {
                return true;
            } else {
                return false;
            }
        },

    checkUsernameExist : function (){
            const myJson =  this.myJson;
            if (myJson.find(user => user.user_username === this.username)) {
                return true;
            } else {
                return false;
            };
        },

    registerNewUser : function () {
        const myJson = this.myJson;
        console.log(myJson);
        const newUser = {
            user_username: this.username,
            user_first_name: this.first_name,
            user_last_name: this.last_name,
            user_email: this.email,
            user_date: this.date,
            user_password: this.password,
            user_role: "user"
        };
        if(this.checkAllFieldsFilled()){
            if (this.checkEmailExist()) {
                alert("An account with this email already exists please try login");
                const container = document.getElementById("register");
                var login = document.createElement("input");
                login.setAttribute("type", "button")
                login.setAttribute("id", "loginFromRegister")
                login.setAttribute("value", "Login")
                login.setAttribute("onclick", "location.href='/#/authentication/login'; document.getElementById('loginFromRegister').style='display: none';")
                login.setAttribute("placeholder", "Login")
                login.setAttribute("style", "padding-left: 44%; padding-right: 46%; border-radius: 100px; color: whitesmoke; background-color: grey; margin-top: 5%; padding-bottom: 2%; padding-top: 2%;");
                container.appendChild(login);
            } else if(this.checkUsernameExist()){
                alert("Username already taken !");
            } else {
                console.log("Register successful");
                this.myJson.push(newUser);
                myJson.push(newUser);
                this.$router.push('/homeUser');
            }     
        }else{
            alert("Please fill all fields");
    }
},



    changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(255,255,250,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    }
},

};


</script>

<style scoped>
.authentication {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.authentication h1 {
    text-align: center;
}

.authentication form {
    display: flex;
    flex-direction: column;
}

.authentication div {
    margin-bottom: 15px;
}

.authentication label {
    margin-bottom: 5px;
}

.authentication input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.authentication button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.authentication button:hover {
    background-color: #369f6b;
}


</style>