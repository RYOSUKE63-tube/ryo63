/* =====================================
            ENTRANCE
===================================== */

const doorWrap = document.getElementById("doorWrap");
const entrance = document.getElementById("entrance");
const mainSite = document.getElementById("mainSite");

doorWrap.addEventListener("click", () => {

    document.body.classList.add("opening");

    setTimeout(() => {

        entrance.classList.add("hide");
        mainSite.classList.add("show");

    },1000);

});


/* =====================================
          SONG DATA
===================================== */

const neonSongs = [

{
number:"STORY 09",
title:"Tsukihime",
theme:"かぐや姫",
image:"image/tsukihime.png",
link:"tukihime.html"
},

{
number:"STORY 10",
title:"潮風の誓い",
theme:"オズの魔法使い",
image:"image/ozu.png",
link:"ozu.html"
},

{
number:"STORY 11",
title:"VS",
theme:"桃太郎",
image:"image/momotaro.png",
link:"momotaro.html"
},

{
number:"STORY 12",
title:"LOST ALICE",
theme:"不思議の国のアリス",
image:"image/lost.png",
link:"lost.html"
},

{
number:"STORY 13",
title:"WHO IS THE WOLF",
theme:"赤ずきん",
image:"image/wolf.png",
link:"wolf.html"
},

{
number:"STORY 14",
title:"シンデレラ",
theme:"シンデレラ",
image:"image/sindelera.png",
link:"sindelera.html"
}

];



const oneSongs = [

{
number:"STORY 03",
title:"Sweet Trap",
theme:"白雪姫",
image:"image/sirayuki.png",
link:"sweet-trap.html"
},

{
number:"STORY 04",
title:"ひみつの竜宮城",
theme:"浦島太郎",
image:"image/himitu.png",
link:"himitu.html"
},

{
number:"STORY 05",
title:"揺れる光の先",
theme:"人魚姫",
image:"image/yureru.png",
link:"yureru.html"
},

{
number:"STORY 06",
title:"波まかせの午後",
theme:"浦島太郎",
image:"image/nami.png",
link:"nami.html"
},

{
number:"STORY 07",
title:"眠りの森の私",
theme:"眠れる森の美女",
image:"image/nemuri.png",
link:"nemuri.html"
},

{
number:"STORY 08",
title:"波音パレット",
theme:"人魚姫",
image:"image/paretto.png",
link:"paretto.html"
}

];


/* =====================================
      DOM
===================================== */

const neonSlide = document.getElementById("neonSlide");
const neonNumber = document.getElementById("neonNumber");
const neonTitle = document.getElementById("neonTitle");
const neonTheme = document.getElementById("neonMotif");
const neonLink = document.getElementById("neonLink");

const oneSlide = document.getElementById("oneforSlide");
const oneNumber = document.getElementById("oneforNumber");
const oneTitle = document.getElementById("oneforTitle");
const oneTheme = document.getElementById("oneforMotif");
const oneLink = document.getElementById("oneforLink");


let neonIndex = 0;
let oneIndex = 0;


/* =====================================
        CHANGE
===================================== */

function changeNeon(){

    neonSlide.style.opacity = 0;

    setTimeout(()=>{

        neonIndex++;

        if(neonIndex >= neonSongs.length){

            neonIndex = 0;

        }

        const song = neonSongs[neonIndex];

        neonSlide.src = song.image;
        neonNumber.textContent = song.number;
        neonTitle.textContent = song.title;
        neonTheme.textContent = song.theme;
        neonLink.href = song.link;

        neonSlide.style.opacity = 1;

    },400);

}



function changeOne(){

    oneSlide.style.opacity = 0;

    setTimeout(()=>{

        oneIndex++;

        if(oneIndex >= oneSongs.length){

            oneIndex = 0;

        }

        const song = oneSongs[oneIndex];

        oneSlide.src = song.image;
        oneNumber.textContent = song.number;
        oneTitle.textContent = song.title;
        oneTheme.textContent = song.theme;
        oneLink.href = song.link;

        oneSlide.style.opacity = 1;

    },400);

}


/* =====================================
          START
===================================== */

setInterval(changeNeon,5000);

setInterval(changeOne,5000);