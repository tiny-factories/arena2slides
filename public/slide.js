let url = window.location.href;
console.log(url)
let channel = url.split("/")[4]
console.log(channel)

console.log("/data/" + channel);

fetch("/data/" + channel)
.then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
}).catch(function(err){
    console.log(err)
})