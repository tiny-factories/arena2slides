let url = window.location.href;
let channel = url.split("/")[4]
let wwwURL;


//Getting the arena JSON data into front end————————————————————————


//Stores all the arena JSON data
let arenaJSON = [];
let arenaTitle  = []; //Title
let arenaDescription = [];  //Description
let arenaImg  = [];   //Url of image - display size
let arenaUrl  = [];  //Source URL

let slideNumber = 0;


// Getting HTML elements————————

const titleTag = document.getElementById("mainTitle");
const descriptionTag = document.getElementById("mainDescription");
const imageTag = document.getElementById("mainImage");
const linkTag = document.getElementById("mainLink");
const pagenumTag = document.getElementById("pagenum");
const sourceTag = document.getElementById("sourceLink");

const nextTag = document.querySelector("img.next");
const prevTag = document.querySelector("img.prev");
//const randomTag = document.querySelector("img.random");

const leftTag = document.querySelector('#left');
const rightTag = document.querySelector('#right');
const topTag = document.querySelector('#top');
const bottomTag = document.querySelector('#bottom');


nextTag.addEventListener("click",function(){
    next();
});

prevTag.addEventListener("click",function(){
    previous();
});

/*
randomTag.addEventListener("click",function(){
    randomChange();
});
*/


// Getting JSON Data----------


fetch("/data/" + channel)
    .then(function(response){
        console.log("Getting response from are.na JSON...");
        return response.json();
    })
    .then(function(data){

        arenaJSON = data.channelContents.contents;
        console.log(arenaJSON);
        console.log("Length of JSON file is : " + arenaJSON.length);

        wwwURL = "https://www.are.na/" + arenaJSON[1].user.slug + "/" + channel;

        //https://www.are.na/tuna-jedi/about-smart-city

       for (var i = 0 ; i < arenaJSON.length ; i++){

            //If there is no title

            arenaDescription.unshift(arenaJSON[i].description);

            if (arenaJSON[i].title == "" && arenaJSON[i].content !== ""){
                console.log("No Title but found a content");
                arenaTitle.unshift(arenaJSON[i].content);

            } else if (arenaJSON[i].title == "" && arenaJSON[i].content == "") {
                console.log("Did Not Find Title and Content");
                arenaTitle.unshift("#");

            } else if (arenaJSON[i].title !== "" && arenaJSON[i].content !== "") {
                console.log("Found both the Title and Content");
                arenaTitle.unshift(arenaJSON[i].content);
            }else{
                console.log("Just the good old title!");
                arenaTitle.unshift(arenaJSON[i].title);
            }


            //If there is no source.url section...
            if (arenaJSON[i].source != null){
                arenaUrl.unshift(arenaJSON[i].source.url);
            } else {
                arenaUrl.unshift("https://www.are.na/");
            }

            //If there is no image section...
            if (arenaJSON[i].image != null){
                arenaImg.unshift(arenaJSON[i].image.display.url);
            } else {
                arenaImg.unshift("https://pbs.twimg.com/profile_images/859809004079509505/ytma801M_400x400.jpg");
            }
        }
        console.log("JSON file is now loaded in array and ready!")

        //Trigger for update
        updateSection();
        console.log("Triggering updateSection()")

    }).catch(function(){
        console.log("Can't load the Arena Json file!");
    })


//Make sure to update everything here.
const updateSection= () => {

    //Updating the innerHTML elements
    pagenumTag.innerHTML = slideNumber + "/" + (arenaJSON.length - 1);
    titleTag.innerHTML = arenaTitle[slideNumber];
    descriptionTag.innerHTML =  arenaDescription[slideNumber];
    imageTag.src = arenaImg[slideNumber] ;
    linkTag.href= arenaUrl[slideNumber] ;
    sourceTag.href = wwwURL;


    //--------- Randomizing border color -------//
    color_random = Math.random()*360;

     border_color = `hsl(${color_random},50%,60%)`;

     leftTag.style.backgroundColor = border_color;
     rightTag.style.backgroundColor = border_color;
     topTag.style.backgroundColor = border_color;
     bottomTag.style.backgroundColor = border_color;


    //Change the size of the text depending on the length of the text


    if(arenaTitle[slideNumber].length > 150){
        console.log("The text is long so I changed the text sise :" + arenaTitle[slideNumber].length);
        titleTag.classList.add("long");
        titleTag.classList.remove("short");

    }
    else if(arenaTitle[slideNumber].length < 30){
        console.log("The text is short so I changed the text sise :" + arenaTitle[slideNumber].length);
        titleTag.classList.add("short");
        titleTag.classList.remove("long");
    }
    else{
        titleTag.classList.remove("long");
        titleTag.classList.remove("short");
    }


}


//——————— Change Slide Script —————————//


const next = () => {
    slideNumber = slideNumber + 1;

    if(slideNumber > arenaJSON.length - 1 ){
        slideNumber = 0;
       }

    updateSection();
}

const previous = () => {
    slideNumber = slideNumber - 1;

    if(slideNumber < 1){
        slideNumber = 0;
    }
    updateSection();
}

/*
const randomChange = () => {
    slideNumber = Math.floor(Math.random() * arenaJSON.length);
    updateSection();
}
*/


//——————— Key Change Script —————————//


document.addEventListener("keyup",function(keyis){
console.log(keyis);


if(keyis.key == "ArrowRight"){
    next();
}

if(keyis.key == "ArrowLeft"){
    previous();
}

})
