import axios from "axios";

export default {

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

            // Données utilisateur
            user: null,
        };
    },
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
            try {
                let response = await this.submitForm("post", "login", {
                    username: this.username,
                    userpass: this.password,
                });
                
                console.log(response); // Log the response to check its structure
                this.userdata = await response.loginResult;
                console.log("userdata : ",this.userdata);
                if (response && this.userdata) {
                    this.successMessage = "Connexion réussie !";
                    alert(this.successMessage);
                    
                    const userinfo = await this.getUserInfo();
                    console.log("User info:", userinfo);
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

        async getUserInfo() {
            try{
                const response = await this.submitForm("get", "user");
                if (response && response.success) {
                    console.log("User info:", response.data);
                    this.user = response.data;
                    return user;
                    
                } else {
                    this.errorMessage = response.message || "Erreur lors de la récupération des informations.";
                    alert(this.errorMessage);
                }

            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
                this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
                alert(this.errorMessage);
            }
        },

        // Gestion de la déconnexion
        async logoutUser() {
            const userinfo = await this.getUserInfo();
            if(!userinfo){
                alert("Impossible de récupérer les informations utilisateur. Déconnexion annulée.");
                return;
            }
            try {
                const response = await this.submitForm("get", "logout", {
                    username: userinfo.username,
                });
                console.log("Response from server:", response); // Log pour vérifier la structure
        
                if (response && response.logoutResult) {
                    alert("Vous avez été déconnecté.");
                    user = null;
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
                await this.submitForm("post", "register", {
                    username: this.newUsername,
                    first_name: this.newFirstname,
                    last_name: this.newLastname,
                    email: this.email,
                    password: this.newPassword,
                    date_of_birth: this.date_of_birth,
                    genre: genreMap[this.genderSelection] || "0",
                });

                const response = JSON.parse(this.msg); // Convertir la réponse JSON
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

    };
    
    
    export async function isConnected() {
        let connected = false;
        console.log("him here");
        try{
            const response = await submitForm("get", "protected");
            console.log("role",response);
            if (response === "admin" || response==="user") {
                connected = true;
                return connected;
               
            }else{
                connected = false;
                //this.$router.push("/authentication/login");
                alert("CONNECTE TOAAAA");
                return connected;

            }
        }catch(error){
            console.error("Erreur lors de la vérification de la connexion :", error);
            return false;
        }
    }

    async function submitForm(method, endpoint, params) {
        console.log("Requête envoyée :", params); // Affichez les données envoyées
        try {
            let response = null;
            if (method === "post") {
                response = await axios.post("http://localhost:9000/auth/" + endpoint, params);
            } else {
                response = await axios.get("http://localhost:9000/auth/" + endpoint);
            }
            return response.data; 
        } catch (error) {
            console.error(error);
        }
    }

    import { submitForm } from './authentication'; // Import de submitForm

    export async function getUserInfo() {
        try {
            const response = await submitForm("get", "user"); // Appelle la fonction importée
            if (response && response.success) {
                console.log("User info:", response.data); // Log les données utilisateur
                return response.data; // Retourne les données utilisateur
            } else {
                console.error("Erreur lors de la récupération des informations :", response.message);
                return null; // Retourne null en cas d'erreur
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des informations utilisateur :", error);
            return null; // Retourne null en cas d'erreur
        }
    }
    

    export async function checkRole() {
        try {
            let userInfo = await submitForm("get", "admin"); // Appelle getUserInfo pour obtenir les données utilisateur
            console.log("User info:", userInfo); // Log les données utilisateur
            console.log("User role:", userInfo.role); // Log le rôle de l'utilisateur
            if (userInfo && userInfo.role === "admin") {
                console.log("L'utilisateur est un administrateur.");
                return { data: true }; // Retourne vrai si admin
            } else {
                console.log("L'utilisateur n'est pas un administrateur.");
                return { data: false }; // Retourne faux sinon
            }
        } catch (error) {
            console.error("Erreur lors de la vérification des droits d'administrateur :", error);
            return { data: false }; // Défaut en cas d'erreur
        }
    }
    
    
    

    export async function isAdmin() {
        const adminCheck = await checkRole(); // Vérifie si l'utilisateur est admin
        console.log("L'utilisateur est admin ?", adminCheck.data);
        if (!adminCheck.data) {
            alert("YOU ARE NOT AN ADMIN YOU CAN'T DO ANYTHING");
        }
        return adminCheck.data; // Retourne le résultat de la vérification
    }
    


        

