const API_KEY = "AIzaSyCIyJAXOc5SKiKKkdh66YP42H18It0qITQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3";




// let channelHttp = "https://www.googleapis.com/youtube/v3/channels?";
// * --------------------GETTING VIDEOS---------------------------------------

function getVideos(searchValue) {
  let url;
  url = `${BASE_URL}/search?key=${API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=10`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const videosContainer = document.getElementById("video-container");
      videosContainer.innerHTML = "";
      data.items.forEach((item) => {
        getChannelIcon(item);
      });
    });
}

// *---------------- GEttting channel ICON ---------  --------

const getChannelIcon = (video) => {
  fetch(
    `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
  )
    .then((res) => res.json())
    .then((data) => {
      video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      display(video);
    });
};

// *---------------- Displaying videos-----------------
function display(videos) {
  const videosContainer = document.getElementById("video-container");

  videosContainer.innerHTML += `
        <div class="video" id="video-container">
        <a href="/video.html?videoId=${videos.id.videoId}">
        <img src="${videos.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content"> 
        <img src="${videos.channelThumbnail}" class="channel-icon" alt="">
              <div class="info">
              <h4 class="title">${videos.snippet.title}</h4>
              <p class="channel-name">${videos.snippet.channelTitle}</p>
              </div>
              </div>
              </a>
              </div>
              `;
}

//  * -----------calling function nd searching---------------------------

setTimeout(() => {
  getVideos("");
}, 700);

const videoContainer = document.querySelector(".video-container");

document.getElementById("search-btn").addEventListener("click", () => {
  // getVideos(document.getElementById("search-input").value);
  const searchInputValue = document.getElementById("search-input").value;

  videoContainer.innerHTML = `<h1 class="loader" style=""></h1>`

  setTimeout(() => {

    getVideos(searchInputValue);
    
  }, 300);
});

// todo --------------hovering on button--------------------------------
const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    console.log(button.innerHTML);
    videoContainer.innerHTML = `<h1 class="loader" style=""></h1>`

    setTimeout(() => {
      getVideos(button.innerHTML);   
    }, 300);

    button.classList.toggle("green");
  });
});








