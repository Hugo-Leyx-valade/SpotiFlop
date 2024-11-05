<template>
    <div class="homeAdmin" onload="changeBodyBackgroundColor()">
        <BackgroundModule></BackgroundModule>
        <BacktohomeModule></BacktohomeModule>
        <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 39.5%;" >SpotiFlop</span>

        <section class="content d-flex justify-content-center" id="slider">
            <input type="radio" name="slider" id="s1">
            <input type="radio" name="slider" id="s2">
            <input type="radio" name="slider" id="s3" checked>
            <label for="s1" id="slide1">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-save-fill" viewBox="0 0 16 16" style="margin-top:30% ;">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </label>
            <label for="s2" id="slide2">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-save-fill" viewBox="0 0 16 16" style="margin-top:25% ;">
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
                </svg>
            </label>
            <label for="s3" id="slide3">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-save-fill" viewBox="0 0 16 16" style="margin-top:25% ;">
                    <path fill-rule="evenodd" d="M2.854 15.854A.5.5 0 0 1 2 15.5V14H.5a.5.5 0 0 1-.354-.854l1.5-1.5A.5.5 0 0 1 2 11.5h1.793l.53-.53c-.771-.802-1.328-1.58-1.704-2.32-.798-1.575-.775-2.996-.213-4.092C3.426 2.565 6.18 1.809 8 3.233c1.25-.98 2.944-.928 4.212-.152L13.292 2 12.147.854A.5.5 0 0 1 12.5 0h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.854.354L14 2.707l-1.006 1.006c.236.248.44.531.6.845.562 1.096.585 2.517-.213 4.092-.793 1.563-2.395 3.288-5.105 5.08L8 13.912l-.276-.182a22 22 0 0 1-2.685-2.062l-.539.54V14a.5.5 0 0 1-.146.354zm2.893-4.894A20.4 20.4 0 0 0 8 12.71c2.456-1.666 3.827-3.207 4.489-4.512.679-1.34.607-2.42.215-3.185-.817-1.595-3.087-2.054-4.346-.761L8 4.62l-.358-.368c-1.259-1.293-3.53-.834-4.346.761-.392.766-.464 1.845.215 3.185.323.636.815 1.33 1.519 2.065l1.866-1.867a.5.5 0 1 1 .708.708z"/>
                </svg>
            </label>
        </section>
    <div style="margin-top: 7%;">
        <p>SpotiFlop</p>
    </div>
    </div>
</template>

<script>

import BacktohomeModule from './BacktohomeModule.vue';


export default {
    name: 'Home',
    components: {
        BacktohomeModule
    },

    mounted() {
    this.changeBodyBackgroundColor();
    },

    methods:{
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
.home {
    text-align: center;
    margin-top: 50px;
}



[type=radio] {
    display: none;
}

#slider {
    height: 35vw;
    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
}

#slider label {
    margin: auto;
    width: 30%;
    height: 90%;
    border-radius: 30px;
    position: absolute;
    left: 0; right: 0; top: 10%;
    cursor: pointer;
    transition: transform 0.4s ease;
}

#s1:checked ~ #slide3, #s2:checked ~ #slide1,
#s3:checked ~ #slide2
{
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
    transform: translate3d(-30%,13%,-150px);
}


#s1:checked ~ #slide1, #s2:checked ~ #slide2,
#s3:checked ~ #slide3
{
    box-shadow: 0 13px 25px 0 rgba(0,0,0,.3), 0 11px 7px 0 rgba(0,0,0,.19);
    transform: translate3d(0,10%,0);
}

#s1:checked ~ #slide2, #s2:checked ~ #slide3,
#s3:checked ~ #slide1
 {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
    transform: translate3d(30%,13%,-150px);
}


#slide1 {background: rgb(60,43,117);
        background: linear-gradient(180deg, rgb(57, 221, 57) 0%, rgb(5, 66, 41) 64%); 
    }
#slide2 { background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    }
#slide3 { background: rgb(0,255,128);
    background: linear-gradient(135deg, rgba(0,255,128,1) 0%, rgba(255,255,255,1) 100%);
}



</style>