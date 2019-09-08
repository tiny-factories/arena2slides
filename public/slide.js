let url = window.location.href;
let channel = url.split("/")[4]


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

const nextTag = document.querySelector("img.next");
const prevTag = document.querySelector("img.prev");
const randomTag = document.querySelector("img.random");


nextTag.addEventListener("click",function(){
    next();
});

prevTag.addEventListener("click",function(){
    previous();
});

randomTag.addEventListener("click",function(){
    randomChange();
});


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

       for (var i = 0 ; i < arenaJSON.length ; i++){
            arenaTitle.unshift(arenaJSON[i].title);
            arenaDescription.unshift(arenaJSON[i].description);

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
                arenaUrl.unshift("https://cdn.pixabay.com/photo/2018/04/20/17/18/cat-3336579__340.jpg");
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


    //Change the size of the text depending on the length of the text

    /*
    if(arenaTitle[slideNumber].length > 200){
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
    */

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

const randomChange = () => {
    slideNumber = Math.floor(Math.random() * arenaJSON.length);
    updateSection();
}


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


