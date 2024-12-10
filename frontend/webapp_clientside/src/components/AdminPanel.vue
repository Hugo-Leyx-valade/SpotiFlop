<!--create a panel where admin can choose to go on the different table to edit ...
May be add graph on the frequency of the site and on the number of music added -->


<template>
    <div class="admin-panel" onload="changeBodyBackgroundColor()">
        <BacktohomeModule></BacktohomeModule>

        <div class="logout_container">
            <button @click="logoutUser" class="logoutButton">Logout</button>
        </div>
        <div class="search-container">
            <input type="text" placeholder="Search...">
            <i class="fa fa-search"></i>
        </div>
        <span class="content d-flex justify-content-center" style="font-family: 'LilGrotesk-bold'; font-size: 100px; color: white; position: fixed; top: -1.3%; left: 35%;" >Admin Panel</span>


        <section class="content d-flex justify-content-center" id="slider">
            <input type="radio" name="slider" id="s1">
            <input type="radio" name="slider" id="s2">
            <input type="radio" name="slider" id="s3" checked>
            <input type="radio" name="slider" id="s4">
            <input type="radio" name="slider" id="s5">
            <label for="s1" id="slide1">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" viewBox="0 0 24 24" fill="none" style="margin-top: 25%;" onclick="window.location.href = '/#/genres/list/all'">

                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                    <g id="SVGRepo_iconCarrier"> <path d="M2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.2855 9.04765 22.0625 10.6294 21.6165 13.793L21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793Z" stroke="#ffffff" stroke-width="1.5"/> <path d="M12 17C12 17.8284 11.3284 18.5 10.5 18.5C9.67157 18.5 9 17.8284 9 17C9 16.1716 9.67157 15.5 10.5 15.5C11.3284 15.5 12 16.1716 12 17ZM12 17V10.5C12 12.1569 13.8954 13.5 15 13.5" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7" stroke="#ffffff" stroke-width="1.5"/> <path d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5" stroke="#ffffff" stroke-width="1.5"/> </g>

                </svg>
                <p id="texts1" style="color: #f2f2f2; font-size: 300%;">Genres</p>
            </label>

            <label for="s2" id="slide2">
                <svg xmlns="http://www.w3.org/2000/svg" width="300px" height="300px" viewBox="0 0 24 24" fill="none" style="margin-top: 25%;" onclick="window.location.href = '/#/songs/list/all'">

                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                    <g id="SVGRepo_iconCarrier"> <path d="M13.75 2C13.75 1.58579 13.4142 1.25 13 1.25C12.5858 1.25 12.25 1.58579 12.25 2V14.5359C11.4003 13.7384 10.2572 13.25 9 13.25C6.37665 13.25 4.25 15.3766 4.25 18C4.25 20.6234 6.37665 22.75 9 22.75C11.6234 22.75 13.75 20.6234 13.75 18V6.243C14.9875 7.77225 16.8795 8.75 19 8.75C19.4142 8.75 19.75 8.41421 19.75 8C19.75 7.58579 19.4142 7.25 19 7.25C16.1005 7.25 13.75 4.8995 13.75 2Z" fill="#ffffff"/> </g>

                </svg>
                <p id="texts1" style="color: #f2f2f2; font-size: 300%;">Songs</p>

            </label>
            <label for="s3" id="slide3">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="300px" width="300px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" style="margin-top: 25%;" onclick="window.location.href = '/#/authors/list/all'">

                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

                    <g id="SVGRepo_iconCarrier"><g> <path class="st0" d="M270.16,128.905c20.016,8.398,43.083-1.019,51.489-21.067c8.406-20.04-1.035-43.082-21.059-51.48 c-20.048-8.414-43.09,1.028-51.497,21.051C240.688,97.441,250.121,120.507,270.16,128.905z"/> <path class="st0" d="M352.496,122.739c8.526,1.911,16.981-3.468,18.876-11.995c1.902-8.518-3.469-16.972-11.987-18.884 c-8.518-1.894-16.989,3.485-18.884,12.012C338.59,112.382,343.962,120.844,352.496,122.739z"/> <path class="st0" d="M507.467,428.7l-52.741-13.296l-57.639-289.429l26.84,4.761l3.091-13.842l-51.657-13.931l-4.111,18.426 l13.159,2.337l0.081,0.394c-5.5-0.161-10.799,2.962-13.095,8.326l-33.328,53.286l-35.366-20.987L108.486,49.14 c-7.065-4.657-16.556-2.706-21.212,4.359c-4.648,7.058-2.698,16.556,4.368,21.204l99.749,76.9 c2.842,1.999,3.452,6.255,0.883,11.104C188.412,169.98,5.003,417.122,5.003,417.122c-7.298,8.254-6.52,20.86,1.734,28.165 c8.262,7.298,20.883,6.52,28.182-1.742l139.66-130.757c3.998-3.998,6.222-6.222,16.884,0.876l61.917,35.551l6.52,90.757 c0.056,9.924,8.157,17.913,18.072,17.84c9.924-0.064,17.913-8.149,17.856-18.065l5.716-100.143 c0.538-10.268-2.128-16.612-9.94-23.925l-58.377-55.311c0,0,38.024-39.276,44.616-44.961c3.019-2.625,5.813-7.33,10.735-5.684 l46.824,18.643c12.324,6.013,18.908-1.325,25.298-7.17l30.14-65.17l52.187,262.116l-40.577,36.803 c-2.449,2.232-2.633,6.03-0.409,8.471c1.18,1.309,2.81,1.975,4.456,1.975c1.429,0,2.874-0.514,4.014-1.557l40.714-36.932 l53.303,13.424c0.498,0.128,0.988,0.185,1.478,0.185c2.674,0,5.13-1.814,5.812-4.528 C512.622,432.762,510.678,429.502,507.467,428.7z"/> </g> </g>
                    
                </svg>
                <p id="texts1" style="color: #f2f2f2; font-size: 300%;">Authors</p>
            </label>
            <label for="s4" id="slide4">
                <svg fill="#000000" width="300px" height="300px" viewBox="0 0 24 24" id="music-folder-9" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color" style="margin-top:25%" onclick="window.location.href = '/#/playlist/list/all'">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <path id="secondary" d="M21,13H18v6" style="fill: none; stroke: #f2f2f2; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <circle id="secondary-2" data-name="secondary" cx="16" cy="19" r="2" style="fill: none; stroke: #f2f2f2; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <path id="primary" d="M10,19H4a1,1,0,0,1-1-1.29l2.4-8A1,1,0,0,1,6.4,9H20" style="fill: none; stroke: #f2f2f2; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    <path id="primary-2" data-name="primary" d="M3,17.71l2.4-8A1,1,0,0,1,6.4,9H18V6a1,1,0,0,0-1-1H9L7,3H4A1,1,0,0,0,3,4V18s0,0,0,0A.89.89,0,0,1,3,17.71Z" style="fill: none; stroke: #f2f2f2; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"/>
                    </g>
                </svg>
                <p id="texts1" style="color: #f2f2f2; font-size: 300%;">Playlists</p>
            </label> 
            
            <label for="s5" id="slide5">
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16" style="margin-top:25% ;"  onclick="window.location.href = '/#/users/list/all'">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                </svg>
                <p id="texts1" style="color: #f2f2f2; font-size: 300%;">Users</p>
            </label>
        </section>



    </div>
</template>

<script>
import BacktohomeModule from './BacktohomeModule.vue';
import authentication from '../../authentication';

export default {
    name: 'AdminPanel',
    components:{
        BacktohomeModule
    },

    methods: {
        logoutUser() {
            try{
                const response = authentication.logoutUser();
                if(response && response.logoutResult) {
                    this.$router.push('/authentication/login');
                }else{
                    alert('An error occured while logging out');
                }
            }catch(error){
                console.log(error);

            }
        },
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

.logout_container {
    display: flex;
    justify-content: flex-end;
    padding: 10%;
}

.logoutButton {
    background-color: #f2f2f2;
    border: none;
    color: black;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 20px;
}

h1 {
    font-size: 80px;
    color: white;
    text-align: center;
    animation: glow 2s ease-in-out infinite alternate;
    
}

*{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    font-family: sans-serif;
}

.search-container{
    margin-top: 150px;
    position: relative;
}

.search-container input{
    width: 350px;
    font-size: 18px;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
}

.search-container input:focus{
    width: 500px;
}

.search-container i {

    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(-50%);
    color: #555;

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