<template>
    <div class="background-module" onload="changeBodyBackgroundColor('linear-gradient(180deg, rgba(28,200,89,1) 0%, rgba(0,0,0,1) 65%) no-repeat','rgb(0,0,0)')">
        <!-- Your content here -->
    </div>
</template>

<script>
export default {
    name: 'BackgroundModule',
    mounted() {
    this.changeBodyBackgroundColor();
    },
    methods: {
    changeBodyBackgroundColor(color_grad,bgcolor) {
        document.body.style.background =color_grad ;
        document.body.style.backgroundSize = 'cover';
        document.body.style.height = '100%';
        document.body.style.backgroundColor = bgcolor;
    },
    }
};
</script>

<style scoped>

</style>