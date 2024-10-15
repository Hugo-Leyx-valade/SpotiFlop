
<template>
    <div class="home">
        <header>
            <a href="/#/home"><img id="icon" src="../assets/spotify-playlist_white.png" alt="logo_white"></a>
        </header>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            message: 'Hello, SpotiFlop!'
        };
    }
};
</script>

<style scoped>
.home {
    text-align: center;
    margin-top: 50px;
}


#icon {
    position: fixed;
    width: 50px;
    height: 65px;
    top: 10px;
    left: 10px;
}

</style>