/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

fetch("/exampleSlides")
.then(function(response){
    return response.json();
})
.then(function(data){
    let examples = ["exampleOne","exampleTwo","exampleThree"]

    console.log(data);
    for (let i in examples){
        let example = document.getElementById(examples[i])
        let exampleH3 = example.querySelector("h3")
        let exampleA1 = example.getElementsByClassName("firstLink")
        let exampleA2 = example.getElementsByClassName("secondLink")

        exampleH3.innerHTML = data[i].title
        console.log(exampleA1[0])
        exampleA1[0].src = "https://www.are.na/" + data[i].user.slug + "/" + data[i].slug
        exampleA2[0].src = "/slide/" + data[i].slug
    }


})
.catch(function(err){
    console.log(err)
})


document.getElementById("submit").addEventListener("click", function(){
    // Get the URL submitted by the user
    let url = document.getElementById("arenaurl").value
    console.log(url)

    // Ex Channel Title: https://api.are.na/v2/channels/arena-influences/contents
    // Get the channel title
    let urlParts = url.split("/")
    console.log(urlParts)
    window.location = '/slide/' + urlParts[4];
});


  

// Change color of example squares
