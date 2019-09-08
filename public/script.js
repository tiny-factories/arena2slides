/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

document.getElementById("submit").addEventListener("click", function(){
    let url = document.getElementById("arenaurl").value
    console.log(url)
    let channel = url.split("/")[4]
    console.log(channel)
    fetch("/data/" + channel)
    .then(function(response){
        return response.json()
    }).then(function(data){
        console.log(data)
    }).catch(function(err){
        console.log(err)
    })
    
});


  

// Change color of example squares
