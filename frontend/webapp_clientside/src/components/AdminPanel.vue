<!--create a panel where admin can choose to go on the different table to edit ...
May be add graph on the frequency of the site and on the number of music added -->


<template>
    <div class="admin-panel" onload="changeBodyBackgroundColor()">
        <BacktohomeModule></BacktohomeModule>
        <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 35%;" >Admin Panel</span>


        <section class="content d-flex justify-content-center" id="slider">
            <input type="radio" name="slider" id="s1">
            <input type="radio" name="slider" id="s2">
            <input type="radio" name="slider" id="s3" checked>
            <input type="radio" name="slider" id="s4">
            <input type="radio" name="slider" id="s5">
            <label for="s1" id="slide1">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-music-note-list" viewBox="0 0 16 16" style="margin-top:25% ;" onclick="window.location.href = '/#/genres/list/all'">
                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2"/>
                    <path fill-rule="evenodd" d="M12 3v10h-1V3z"/>
                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1z"/>
                    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5m0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5"/>
                </svg>
            </label>
            <label for="s2" id="slide2">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-file-earmark-music-fill" viewBox="0 0 16 16" style="margin-top:25% ;" onclick="window.location.href = '/#/songs/list/all'">
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M11 6.64v1.75l-2 .5v3.61c0 .495-.301.883-.662 1.123C7.974 13.866 7.499 14 7 14s-.974-.134-1.338-.377C5.302 13.383 5 12.995 5 12.5s.301-.883.662-1.123C6.026 11.134 6.501 11 7 11c.356 0 .7.068 1 .196V6.89a1 1 0 0 1 .757-.97l1-.25A1 1 0 0 1 11 6.64"/>
                </svg>
            </label>
            <label for="s3" id="slide3">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16" style="margin-top:25% ;"  onclick="window.location.href = '/#/users/list/all'">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>
            </label>
            <label for="s4" id="slide4">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-music-player-fill" viewBox="0 0 16 16" style="margin-top:25% ;"  onclick="window.location.href = '/#/authors/list/all'">
                    <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm1 2h6a1 1 0 0 1 1 1v2.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m3 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                </svg>
            </label>
            <label for="s5" id="slide5">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-vinyl" viewBox="0 0 16 16" style="margin-top:25% ;"  onclick="window.location.href = '/#/playlist/list/all'">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0"/>
                    <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
            </label>
        </section>

    </div>
</template>

<script>
import BacktohomeModule from './BacktohomeModule.vue';

export default {
    name: 'AdminPanel',
    components:{
        BacktohomeModule
    },

    methods: {
        changeBodyBackgroundColor() {
            document.body.style.background ='linear-gradient(180deg, rgba(51, 204, 51,1) 0%, rgba(0,0,0,1) 100%) no-repeat' ;
            document.body.style.backgroundSize = 'cover';
            document.body.style.height = '100%';
            document.body.style.backgroundColor = 'rgb(0,0,0)';
        }
    },

    mounted() {
        this.changeBodyBackgroundColor();
    }
};
</script>

<style scoped>

h1 {
    font-size: 80px;
    color: white;
    text-align: center;
    animation: glow 2s ease-in-out infinite alternate;
    
}

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

#s1:checked ~ #slide5, #s2:checked ~ #slide1,
#s3:checked ~ #slide2, #s4:checked ~ #slide3, 
#s5:checked ~ #slide4
{
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
    transform: translate3d(-30%,13%,-150px);
}


#s1:checked ~ #slide1, #s2:checked ~ #slide2,
#s3:checked ~ #slide3, #s4:checked ~ #slide4,
#s5:checked ~ #slide5
{
    box-shadow: 0 13px 25px 0 rgba(0,0,0,.3), 0 11px 7px 0 rgba(0,0,0,.19);
    transform: translate3d(0,10%,0);
}

#s1:checked ~ #slide2, #s2:checked ~ #slide3,
#s3:checked ~ #slide4, #s4:checked ~ #slide5,
#s5:checked ~ #slide1
 {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
    transform: translate3d(30%,13%,-150px);
}

#s1:checked ~ #slide3, #s2:checked ~ #slide4,
#s3:checked ~ #slide5, #s4:checked ~ #slide1,
#s5:checked ~ #slide2
{
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
    transform: translate3d(-25%,10%,-450px);
    }

#s1:checked ~ #slide4, #s2:checked ~ #slide5,
#s3:checked ~ #slide1, #s4:checked ~ #slide2,
#s5:checked ~ #slide3
{
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
    transform: translate3d(25%,10%,-450px); 
}

#slide1 {background: rgb(60,43,117);
        background: linear-gradient(138deg, rgba(60,43,117,1) 0%, rgba(237,212,193,1) 83%); 
    }
#slide2 { background: rgb(63,94,251);
        background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
    }
#slide3 { background: rgb(0,255,128);
    background: linear-gradient(135deg, rgba(0,255,128,1) 0%, rgba(255,255,255,1) 100%);
}
#slide4 { background: rgb(34,193,195);
        background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(192,120,213,1) 50%, rgba(253,233,45,1) 100%);
}
#slide5 { background: rgb(28,54,200);
    background: linear-gradient(135deg, rgba(28,54,200,1) 0%, rgba(195,44,44,1) 39%, rgba(186,133,40,1) 63%, rgba(171,34,191,1) 98%); }


</style>


