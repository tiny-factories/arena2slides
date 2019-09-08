/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

document.getElementById("submit").addEventListener("click", function(){
    
    let url = document.getElementById("arenaurl").value
    console.log(url)
    let channel = url.split("/")[4]
    console.log(channel)
    window.location = '/slide/' + channel;
});


  

// Change color of example squares
