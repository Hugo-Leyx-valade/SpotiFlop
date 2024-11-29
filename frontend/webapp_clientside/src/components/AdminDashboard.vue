<template>
    <div class="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <!-- Add your component content here -->

        <div v-if="action === 'list'" class="card">
            <div id="number of song per authors">
                <canvas id="myChart" style="width:100%;max-width:600px"></canvas>

            </div>
            

        </div>
    </div>
</template>




<script>

export default {
    props:['action'],
    name: 'AdminDashboard',
    data() {
        return {
            infos: [],
            authorsNumberOfSongsX: [],
            authorsNumberOfSongsY: [],
            // Add your component data here
        };
    },
    methods: {

        async getAllData() {
    try {
      let responseSong = await fetch("http://localhost:9000/adminpanel/list");
      this.infos = await responseSong.json();     
      console.log("hugo" + this.infos[0].quantity);
      for(let i = 0; i < this.infos.length; i++) {
        this.authorsNumberOfSongsX.push(this.infos[i].alias);
        this.authorsNumberOfSongsY.push(this.infos[i].quantity);
      }

      /*
      this.brands = [ { brand_id: 1, brand_name: "BMW" }, { brand_id: 2, brand_name: "Audi" }, { brand_id: 3, brand_name: "Citroen" } ];
      this.cars = [ { car_id: 1, car_brand: 2, car_name: "Audi S4", car_baseprice: 40000, car_isfancy: 0, car_realprice: 45000 }, { car_id: 2, car_brand: 1, car_name: "BMW i8", car_baseprice: 80000, car_isfancy: 1, car_realprice: 90000 } ];
      */
      this.refreshOneSong();
    }
    catch (ex) {"hugp" + console.log(ex); }
  }, 

        // Add your component methods here
    },
    mounted() {
        // Add your mounted logic here
    },
    created() {
        this.getAllData();
    }
};
</script>




<style scoped>
.admin-dashboard {
    /* Add your component styles here */
}
</style>