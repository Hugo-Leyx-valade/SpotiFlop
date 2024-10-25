<template>
    <div class="authentication" onload="changeBodyBackgroundColor()">
        <BacktohomeModule></BacktohomeModule>
        <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 33%; color: white;" >Authentication</span>
        <form @submit.prevent="submitForm" style="margin-top: 20%;">
            <input v-model="username" placeholder="Username" />
            <input v-model="password" type="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        <div id='text'></div>
    </div>
</template>

<script>
import json from "../components/users.json";
import BacktohomeModule from './BacktohomeModule.vue';

export default {
    name: 'Authentication',
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
    submitForm() {
        const myJson = this.myJson;
        console.log(myJson);
        const user = myJson.find(user => user.user_username === this.username && user.user_password === this.password);
        if (user) {
            if(user.user_role === "admin"){
                console.log("Login successful");
                this.$router.push('/homeAdmin');
            } else {
                console.log("Login successful");
                alert("connection succesfull but the page is under construction !")
            }
        } else {
            console.log("Login failed");
        }
    },

    changeBodyBackgroundColor() {
        document.body.style.background ='linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = 'rgb(0,0,0)';
    }

}
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