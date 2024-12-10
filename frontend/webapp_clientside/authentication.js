import CryptoJS from 'crypto-js';


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

            const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Hex);
            console.log("Username sent to backend:", this.username);


            try {
                const response = await this.submitForm("post", "login", {
                    username: this.username,
                    userpass: hashedPassword,
                });
                
                console.log(response); // Log the response to check its structure
                if (response && response.loginResult) {
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

        async getUserRole() {
            try{
                const response = await this.submitForm("get", "role", null);
                if (response) {
                    this.role = response.role;
                }else{
                    console.error("Impossible to fetch user role");
                }

            }catch(error){
                console.error("Error while fetching user role", error);
            }
        },

        // Gestion de la déconnexion
        async logoutUser() {
            try {
                const response = await this.submitForm("get", "logout", null);
                console.log("Response from server:", response); // Log pour vérifier la structure
        
                if (response && response.logoutResult) {
                    alert("Vous avez été déconnecté.");
                    this.username = "";
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


