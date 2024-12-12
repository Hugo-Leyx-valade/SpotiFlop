<template>
    
    <div class="admin-dashboard" v-if="isAdmin && isConnected">
        <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; margin-top: -5%; margin-bottom: 7%;" >Admin Dashboard</span>
        <BacktohomeModule></BacktohomeModule>

        <div class="mosaic-container">
        <div class="table-wrapper">
            <h3 style="font-family: 'LilGrotesk-bold';color: aliceblue;">Songs by Authors</h3>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Number of Songs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(author, index) in songsByAuthors" :key="index">
                        <td>{{ author.alias }}</td>
                        <td>{{ author.quantity }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-wrapper">
            <h3 style="font-family: 'LilGrotesk-bold';color: aliceblue;">User Statistics</h3>
            <table>
                <thead>
                    <tr>
                        <th>Genre</th>
                        <th>Admin</th>
                        <th>Users</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="background-color: rgb(77, 176, 80); color: aliceblue; font-weight: 700;">Girl</td>
                        <td>{{population[0].number_of_users}}</td>
                        <td>{{population[1].number_of_users}}</td>
                    </tr>
                    <tr>
                        <td style="background-color: rgb(77, 176, 80); color: aliceblue; font-weight: 700;">Boy</td>
                        <td>{{population[2].number_of_users}}</td>
                        <td>{{population[3].number_of_users}}</td>
                    </tr>
                    <tr v-if="totalRow">
                        <td>Total</td>
                        <td>All</td>
                        <td>{{ totalRow.number_of_users }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-wrapper">
            <h3 style="font-family: 'LilGrotesk-bold';color: aliceblue;">Style Statistics</h3>
            <table>
                <thead>
                    <tr>
                        <th style="padding-left: 14%;">Style</th>
                        <th style="padding-left: 14%;">Number of Songs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in genreStatistique" :key="index">
                        <td style="padding-left: 14%;">{{ row.name }}</td>
                        <td style="padding-left: 14%;">{{ row.count }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="table-wrapper">
            <h3 style="font-family: 'LilGrotesk-bold';color: aliceblue;">Authors Without Image</h3>
            <table>
                <thead>
                    <tr>
                        <th>Author ID</th>
                        <th>Alias</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(author, index) in authorsWithoutImage" :key="index">
                        <td>{{ author.id_author }}</td>
                        <td>{{ author.alias }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>    
    
</template>




<script>
import BacktohomeModule from './BacktohomeModule.vue';
import {isConnected as checkIfConnected, isAdmin} from '../../authentication.js';


export default {
    name: 'AdminDashboard',
    components: {
        BacktohomeModule,
    },
    data() {
        return {
            isAdmin: false,
            isConnected: false,
            songsByAuthors: [], // Contient les données des auteurs
            isAdmin: false, // Vérifie si l'utilisateur est admin
            isConnected: false, // Vérifie si l'utilisateur est connecté
        };
    },
    methods: {
        async getAllData() {
            try {
                const response = await this.$http.get('http://localhost:9000/adminpanel/list');
                var result = response.data;
                this.songsByAuthors = result.numberOfSongPerAuthor;
                this.population = result.population;
                this.genreStatistique = result.genreStatistique;
                this.authorsWithoutImage = result.authorsWithoutImage;
                console.log('Données récupérées :', JSON.stringify(this.authorsWithoutImage));
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        },
        changeBodyBackgroundColor() {
            document.body.style.background ='linear-gradient(180deg, rgba(51, 204, 51,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
            document.body.style.backgroundSize = 'cover';
            document.body.style.height = '100%';
            document.body.style.backgroundColor = 'rgb(0,0,0)';
        }

    },
    
    async created(){
    this.isConnected = await checkIfConnected();
    if (this.isConnected) {
        this.isAdmin = await isAdmin(); // Vérifie si l'utilisateur est admin
    } else {
        await this.$router.push("/authentication/login"); // Redirige si non connecté
    }
    },

    mounted() {
        this.changeBodyBackgroundColor();
    },
    async created() {
        this.getAllData();
        this.isConnected = await checkIfConnected();
    if (this.isConnected) {
        this.isAdmin = await isAdmin();
        this.getALLData(); // Vérifie si l'utilisateur est admin
        await this.retrieveUser();
    } else {
        await this.$router.push("/authentication/login"); // Redirige si non connecté
    }
    },
};
</script>



<style scoped>
.admin-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
}

.mosaic-container {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: center;
    background-color: #f9f9f900;
    padding: 20px;
    border-radius: 0px;
}

.table-wrapper {
    flex: 1 1 calc(50% - 20px); /* Adjust width to create a 2-column layout */
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-y: auto; /* Enable vertical scrolling */
    max-height: 200px; /* Adjust height based on your needs */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #ffffff2a;
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: center;  /* Centering text */
}

thead {
    background-color: #4CAF50;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1;
}

h3{
    position: sticky;
    top: 1;
    z-index: 1;
}

tbody tr:nth-child(odd) {
    background-color: #ffffffbd;
}

tbody tr:nth-child(even) {
    background-color: #ffffff9c;
}

/* Custom scrollbar for table */
.table-wrapper::-webkit-scrollbar {
    width: 8px;
}

.table-wrapper::-webkit-scrollbar-thumb {
    background-color: #b2eeaae8;
    border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-track {
    background-color: #6b6a6a6e;
}
</style>