<template>
  <div class="hello" onload="changeBodyBackgroundColor()">
    <BacktohomeModule></BacktohomeModule>

    <p style="font-family: 'LilGrotesk-bold'; color: white ; font-size: 60px; top:20%; left: 38.9%;">
      Genres
      {{ action }} {{ id }}
    </p>

    <div class="flex items-center justify-between"></div>

    <!-- FOR DATA SHEET /genres/show/42 -->
    <div v-if="action === 'show'" style="display: flex; justify-content: center;">
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; font-size: 200%;">Name</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; font-size: 150%;">{{ oneGenre.name }}</p>
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 10%; font-size: 150%;">Description</p>   
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 14%; font-size: 120%; width: 30%;">{{ oneGenre.description }}</p>
    </div>

    <!-- FOR EDIT /genres/edit/42 -->
    <div v-if="action === 'edit'" style="display: flex; justify-content: center;">
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 2.5%; font-size: 200%;">Name</p>   
      <input type="text" style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 5.4%; font-size: 120%; background-color: transparent; border-radius: 20px; width:20%; border-color: white; text-align: center;" v-model="oneGenre.name"/>
      
      <p style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 10%; font-size: 200%;">Description</p>   
      <textarea style="color: aliceblue; font-weight: bold; position: absolute; margin-top: 14%; font-size: 120%; background-color: transparent; border-radius: 20px; width:30%; border-color: white; text-align: left;" v-model="oneGenre.description"></textarea>

      <input type="button" value="Save Changes" @click="sendEditRequest()" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'"/>
    </div>

    <!-- FOR List /genres/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr style="color: white; text-transform: capitalize; font-weight: bolder;">
        <td>ID</td><td>Name</td><td>Description</td><td>SHOW DETAILS</td><td>EDIT GENRE</td><td>DELETE GENRE</td>
        <a :href="'/#/genres/edit/0'" style="background:white;padding: 15% 25%; color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >ADD</a>
      </tr>
      <tr v-for="g of genres" v-bind:key="g.id_genre">
        <td style="color: aliceblue; font-weight: bold;">{{ g.id_genre }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ g.name }}</td>
        <td style="color: aliceblue; font-weight: bold;">{{ g.description }}</td>
        <td><a :href="'/#/genres/show/' + g.id_genre" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#7efca4'" onMouseLeave="this.style.background='white'" >SHOW</a></td>
        <td><a :href="'/#/genres/edit/' + g.id_genre" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#6efff3'" onMouseLeave="this.style.background='white'" >EDIT</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(g.id_genre)" style="color: black; font-weight: bold; text-decoration:none; border-radius: 25px;" onMouseOver="this.style.background='#fa8c8c'" onMouseLeave="this.style.background='white'"  /></td>
      </tr>
    </table>
    <div style="margin-top: 16%;"></div>
    <footer>
      <p style="color: white; font-weight: bold; font-size: 20px; position: absolute; top: 120%; left: 46%;">Spotiflop</p>
    </footer>  
  </div>
</template>

<script>
// Import
import BacktohomeModule from './BacktohomeModule.vue';

export default {
  name: 'Genres',
  components: {
    BacktohomeModule
  },
  props:['action','id'],
  data () {
    return {
      genres: [],
      oneGenre: {
        id_genre: 0,
        name: '',
        description: ''
      }
    }
  },

  mounted() {
    this.changeBodyBackgroundColor();
  },

  methods: {
    async getAllData() {
      try {
        let responseGenre = await fetch("http://localhost:9000/genresapi/list");
        this.genres = await responseGenre.json();
        this.refreshOneGenre();
      } catch (ex) { console.log(ex); }
    },

    formatDate(incomingDate) {
      const date = new Date(incomingDate);
      return `${date.getFullYear()}`-`${(date.getMonth() + 1).toString().padStart(2, '0')}`-`${date.getDate().toString().padStart(2, '0')}`;
    },

    async refreshOneGenre() {
      if (this.$props.id === "0") {
        this.oneGenre = {
          id_genre: 0,
          name: '',
          description: ''
        };
        return;
      }
      try {
        let responseGenre = await this.$http.get("http://localhost:9000/genresapi/show/" + this.$props.id);
        this.oneGenre = responseGenre.data;
      } catch (ex) { console.log(ex); }
    },

    async sendDeleteRequest(genreId) {
      try {
        alert("DELETING... " + genreId);
        let response = await this.$http.get("http://localhost:9000/genresapi/del/" + genreId);
        alert("DELETED: " + response.data.rowsDeleted);
        this.getAllData();
      } catch (ex) { console.log(ex); }
    },

    async sendAddRequest() {
      try {
        alert("ADDING... " + this.oneGenre.name);
        let response = await this.$http.post("http://localhost:9000/genresapi/add", this.oneGenre);
        alert("ADDED: " + response.data.rowsAdded);
        this.$router.push({ path: '/genres/list/all' });
        this.getAllData();
      } catch (ex) { console.log(ex); }
    },

    async sendEditRequest() {
      try {
        if (this.$props.id === "0") {
          let response = await this.$http.post("http://localhost:9000/genresapi/add", this.oneGenre);
          alert("Added: " + response.data.rowsUpdated);
        } else {
          let response = await this.$http.post("http://localhost:9000/genresapi/update/" + this.oneGenre.id_genre, this.oneGenre);
          alert("EDITED: " + response.data.rowsUpdated);
        }
        this.$router.push({ path: '/genres/list/all' });
        this.getAllData();
      } catch (ex) { console.log(ex); }
    },

    changeBodyBackgroundColor() {
      document.body.style.background = 'linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 100%) no-repeat';
      document.body.style.backgroundSize = 'cover';
      document.body.style.height = '100%';
      document.body.style.backgroundColor = 'rgb(0,0,0)';
    }
  },

  watch: {
    id: function(newVal, oldVAl) {
      this.refreshOneGenre();
    }
  },

  created() {
    this.getAllData();
  }
}
</script>

<style scoped>
h1, h2, h3, h4 {
  color: white;
}
table {
  font-size: 1.2em;
  color: white;
}

</style>