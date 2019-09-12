/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// use thumbnail
function createGIF(content, element, index) {
  console.log(content)
  let image = element.querySelector("img");
  if (content[index].image != undefined) {

    //Get the square version of the image
    image.src = content[index].image.square.url
  } 
  // else if (content[index + 1].image != undefined) {
  //   console.log("could not find inital image block, looking for next one..")
  //   //If the initial block does not have image look for the next one.
  //   image.src = content[index + 1].image.square.url
  // } 
  else {
    image.src = "/assets/white.jpg"
  }
  // if (index < content.length) {
  //   setTimeout(createGIF(content,element,index+1),1000);
  // } 
  // else {
  //   setTimeout(createGIF(content,element,0),1000);
  // }

  // NOTE: Alternative code. Attempting to use timeouts
  // to loop through and modify image shown.

  // let currIndex = index;
  // function updateImage(){
  //     let image = element.querySelector("img");
  //     if (content[currIndex].image != undefined){
  //         image.src = content[currIndex].image.thumb.url
  //     } else{
  //         image.src = "/assets/white.jpg"
  //     }
  //     console.log(currIndex)
  //     if (currIndex == content.length){
  //         currIndex = 0
  //     } else {
  //         currIndex += 1;
  //     }
  //     setTimeout(updateImage(), 1000);
  // }
  // setTimeout(updateImage(), 1000);
}


fetch("/exampleSlides")
  .then(function(response) {
    return response.json();
  })
  .then(function(d) {
    let examples = ["exampleOne", "exampleTwo", "exampleThree"]

    for (let i in examples) {
      let example = document.getElementById(examples[i])
      let exampleH3 = example.querySelector("h3")
      let exampleA1 = example.getElementsByClassName("firstLink")
      let exampleA2 = example.getElementsByClassName("secondLink")

      let data = d[i].channelDetails
      exampleH3.innerHTML = data.title
      console.log(exampleA1[0])
      exampleA1[0].href = "https://www.are.na/" + data.user.slug + "/" + data.slug
      exampleA2[0].href = "/slide/" + data.slug

      let contents = d[i].channelContents.contents;

      createGIF(contents, example, 0)
    }
  })
  .catch(function(err) {
    console.log(err)
  })


document.getElementById("submit").addEventListener("click", function() {
  // Get the URL submitted by the user
  let url = document.getElementById("arenaurl").value
  console.log(url)

  // Ex Channel Title: https://api.are.na/v2/channels/arena-influences/contents
  // Get the channel title
  let urlParts = url.split("/")
  console.log(urlParts)
  window.location = '/slide/' + urlParts[4];
});
