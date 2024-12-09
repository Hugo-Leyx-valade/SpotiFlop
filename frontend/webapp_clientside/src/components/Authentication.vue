    <template>
        <div class="authentication" onload="changeBodyBackgroundColor()">
        <BacktohomeModule></BacktohomeModule>
        <div v-if="action === 'option'">
            <img
            src="../assets/spotyflop.png"
            alt="logo"
            style="width: 65%; height: auto; display: block; margin: 0 auto;"
            />
            <div
            class="content d-flex justify-content-center"
            id="txt"
            style="display: flex; align-content: center;"
            >
            <p
                id="txt1"
                style="font-family: 'LilGrotesk-bold'; color: #22d05d; font-size: 100px; position: fixed; top: 40%; left: 38.9%;"
            >
                SpotiFlop
            </p>
            </div>
    
            <!-- Buttons Container -->
            <div class="buttons-container">
            <!-- Login Button -->
            <a href="/#/authentication/login">
                <input
                type="button"
                value="Login"
                class="auth-button login-button"
                />
            </a>
    
            <!-- Register Button -->
            <a href="/#/authentication/register">
                <input
                type="button"
                value="Register"
                class="auth-button register-button"
                />
            </a>
            </div>
        </div>
    
        <!-- Login Form -->
        <form v-if="action === 'login'" @submit.prevent="loginUser">
            <input type="text" v-model="username" placeholder="Username" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>

        <!-- Register Form -->
        <form v-if="action === 'register'" @submit.prevent="registerUser">
            <input type="text" v-model="newUsername" placeholder="Username" required />
            <input type="text" v-model="newFirstname" placeholder="First Name" required />
            <input type="text" v-model="newLastname" placeholder="Last Name" required />
            <input type="email" v-model="email" placeholder="Email" required />
            <input type="date" v-model="date_of_birth" placeholder="Date of Birth" required />
            <input type="password" v-model="newPassword" placeholder="Password" required />
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
            <select v-model="genderSelection" required>
                <option value="" disabled selected>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <button type="submit">Register</button>
            <p v-if="registerError" class="error-message">{{ registerError }}</p>
            <p v-if="registerSuccess" class="success-message">{{ registerSuccess }}</p>
        </form>
        </div>
    </template>
    

    <script>
import authentication from '../../authentication';
import BacktohomeModule from './BacktohomeModule.vue';
import CryptoJS from 'crypto-js';
    
    export default {
        name: 'Authentication',
        props: ['action'],
        components: {
            BacktohomeModule,
        },
        data() {
            return {
                // Champs pour le formulaire de connexion
                username: '',
                password: '',
    
                // Champs pour le formulaire d'inscription
                newUsername: '',
                newFirstname: '',
                newLastname: '',
                email: '',
                newPassword: '',
                confirmPassword: '',
                date_of_birth: '',
                genderSelection: '',
    
                // Messages d'erreur et de succès
                errorMessage: '',
                successMessage: '',
                registerError: '',
                registerSuccess: '',
            };
        },
    
        methods: {
            // Fonction générique pour soumettre des formulaires
            async submitForm(method, endpoint, params) {
                console.log("Requête envoyée :", params); // Affichez les données envoyées
                try {
                    let response = null;
                    if (method === "post") {
                        response = await this.$http.post("http://localhost:9000/auth/" + endpoint, params);
                    } else {
                        response = await this.$http.get("http://localhost:9000/auth/" + endpoint);
                    }
                    return response.data; 
                } catch (error) {
                    console.error(error);
                }
            },

    
            // Gestion de la connexion
            async loginUser() {
                if (!this.username || !this.password) {
                    this.errorMessage = "Veuillez remplir tous les champs.";
                    return;
                }
    
                const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);
    
                try {
                    let response = await this.submitForm("post", "login", {
                        username: this.username,
                        userpass: hashedPassword,
                    });
                    
                    console.log(response); // Log the response to check its structure
                    this.userdata = await response.loginResult;
                    console.log("userdata : ",this.userdata);
                    if (response && this.userdata) {
                        this.successMessage = "Connexion réussie !";
                        alert(this.successMessage);
                        // Vérifier et rediriger selon le rôle

                        const role = response.role || "user";
                        if (role === "admin") {
                            this.$router.push("/adminPanel");
                        } else {
                            this.$router.push("/adminPanel");
                        }
                    } else {
                        this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
                        alert(this.errorMessage);
                    }
                } catch (error) {
                    console.error("Erreur lors de la connexion :", error);
                    this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
                    alert(this.errorMessage);
                }
            },
    
            // Gestion de la déconnexion
            async logoutUser() {
                try {
                    const response = await authentication.submitForm("get", "logout", null);
                    console.log("response", response); // Log the response to check its structure
                    this.userdata = response.logoutResult;
                    console.log("userdata : ",this.userdata);

                    if (response && this.userdata) {
                        this.userdata = null; // Supprimer les données utilisateur
                        alert("Vous avez été déconnecté.");
                        this.$router.push("/authentication/login");
                    } else {
                        alert("Erreur lors de la déconnexion.");
                    }
                } catch (error) {
                    console.error("Erreur lors de la déconnexion :", error);
                    alert("Une erreur est survenue. Veuillez réessayer.");
                }
            },
    
            // Gestion de l'inscription
            async registerUser() {
                if (!this.newUsername || !this.newPassword || !this.confirmPassword || !this.email || !this.newFirstname || !this.newLastname || !this.date_of_birth) {
                    this.registerError = "Veuillez remplir tous les champs.";
                    return;
                }
    
                if (this.newPassword !== this.confirmPassword) {
                    this.registerError = "Les mots de passe ne correspondent pas.";
                    return;
                }
    
                const genreMap = { male: 0, female: 1 };
    
                try {
                    const response = await this.submitForm("post", "register", {
                        username: this.newUsername,
                        first_name: this.newFirstname,
                        last_name: this.newLastname,
                        email: this.email,
                        password: this.newPassword,
                        date_of_birth: this.date_of_birth,
                        genre: genreMap[this.genderSelection] || "0",
                    });
    
                    if (response.success) {
                        this.registerSuccess = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
                        setTimeout(() => {
                            this.$router.push("/authentication/login");
                        }, 1000);
                    } else {
                        this.registerError = response.message || "Une erreur est survenue lors de l'inscription.";
                    }
                } catch (error) {
                    console.error("Erreur lors de l'inscription :", error);
                    this.registerError = "Une erreur est survenue. Veuillez réessayer.";
                }
            },
        },
    };
    </script>
    

    <style scoped>
    a,
    input[type='button'] {
        margin: 0 !important;
        padding: 10px 20px !important;
        display: block !important;
        visibility: visible !important;
    }
    
    .buttons-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 60%;
    }
    
    .auth-button {
        padding: 20px 60px;
        border-radius: 100px;
        margin-bottom: 20px;
        border: none;
        cursor: pointer;
        font-size: 18px;
    }
    
    .login-button {
        color: white;
        background-color: #22d05d;
    }
    
    .register-button {
        color: whitesmoke;
        background-color: grey;
    }
    
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
    