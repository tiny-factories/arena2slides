/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

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
