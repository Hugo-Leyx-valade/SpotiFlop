<template>
    <div>
        <header>
            <router-link id="icon_link" to="/adminPanel">
                <img id="icon" src="../assets/spotify-playlist_white.png" alt="logo_white" />
            </router-link>
        </header>
    </div>
</template>

<script>
export default {
    name: 'BacktohomeModule',
}
</script>

<style scoped>
#icon {
    position: fixed;
    width: 4%;
    height: auto;
    top: 2.7%;
    left: 1%;
}

#icon_link {
    position: fixed;
    width: 4%;
    height: 6%;
    top: 2.7%;
    left: 1%;
}

</style>
