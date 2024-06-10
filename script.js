// const API_KEY = "AIzaSyCIyJAXOc5SKiKKkdh66YP42H18It0qITQ";
// const BASE_URL = "https://www.googleapis.com/youtube/v3";




// // let channelHttp = "https://www.googleapis.com/youtube/v3/channels?";
// // * --------------------GETTING VIDEOS---------------------------------------

// function getVideos(searchValue) {
//   let url;
//   url = `${BASE_URL}/search?key=${API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=10`;
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       const videosContainer = document.getElementById("video-container");
//       videosContainer.innerHTML = "";
//       data.items.forEach((item) => {
//         getChannelIcon(item);
//       });
//     });
// }

// // *---------------- GEttting channel ICON ---------  --------

// const getChannelIcon = (video) => {
//   fetch(
//     `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
//   )
//     .then((res) => res.json())
//     .then((data) => {
//       video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
//       display(video);
//     });
// };

// // *---------------- Displaying videos-----------------
// function display(videos) {
//   const videosContainer = document.getElementById("video-container");

//   videosContainer.innerHTML += `
//         <div class="video" id="video-container">
//         <a href="/video.html?videoId=${videos.id.videoId}">
//         <img src="${videos.snippet.thumbnails.high.url}" class="thumbnail" alt="">
//         <div class="content"> 
//         <img src="${videos.channelThumbnail}" class="channel-icon" alt="">
//               <div class="info">
//               <h4 class="title">${videos.snippet.title}</h4>
//               <p class="channel-name">${videos.snippet.channelTitle}</p>
//               </div>
//               </div>
//               </a>
//               </div>
//               `;
// }

// //  * -----------calling function nd searching---------------------------

// setTimeout(() => {
//   getVideos("");
// }, 700);


// // Event listener for nav buttons
// const buttons = document.querySelectorAll(".nav-btn");

// buttons.forEach((button) => {
//     button.addEventListener("click", () => {
//         document.getElementById("video-container").innerHTML = `<h1 class="loader">Loading...</h1>`;
//         setTimeout(() => {
//             getVideos(button.innerHTML);
//         }, 300);
//         button.classList.toggle("green");
//     });
// });


// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.getElementById("search-logo");
//   const searchInput = document.getElementById("search-data");
//   const videoContainer = document.getElementById("video-container");

//   searchButton.addEventListener("click", () => {
//       performSearch();
//   });

//   searchInput.addEventListener("keypress", (event) => {
//       if (event.key === "Enter") {
//           performSearch();
//       }
//   });

//   async function performSearch() {
//       const query = searchInput.value.trim();
//       if (query) {
//           console.log(`Searching for: ${query}`);
//           const results = await fetchSearchResults(query);
//           displaySearchResults(results);
//       }
//   }

//   async function fetchSearchResults(query) {
//       const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API key
//       const maxResults = 10;
//       const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${apiKey}&maxResults=${maxResults}`;

//       try {
//           const response = await fetch(url);
//           if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           const data = await response.json();
//           return data.items;
//       } catch (error) {
//           console.error('Error fetching search results:', error);
//           return [];
//       }
//   }

//   function displaySearchResults(results) {
//       videoContainer.innerHTML = '';

//       if (results.length === 0) {
//           videoContainer.innerHTML = '<p>No results found.</p>';
//           return;
//       }

//       results.forEach(item => {
//           const videoId = item.id.videoId;
//           const title = item.snippet.title;
//           const description = item.snippet.description;
//           const thumbnail = item.snippet.thumbnails.medium.url;

//           const videoElement = document.createElement('div');
//           videoElement.classList.add('video-item');
//           videoElement.innerHTML = `
//               <img src="${thumbnail}" alt="${title}">
//               <h3>${title}</h3>
//               <p>${description}</p>
//           `;
//           videoContainer.appendChild(videoElement);
//       });
//   }
// });






const API_KEY = "AIzaSyCIyJAXOc5SKiKKkdh66YP42H18It0qITQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// * --------------------GETTING VIDEOS---------------------------------------
function getVideos(searchValue) {
  const url = `${BASE_URL}/search?key=${API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=10`;
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
  fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`)
    .then((res) => res.json())
    .then((data) => {
      video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      display(video);
    });
};

// *---------------- Displaying videos-----------------
function display(video) {
  const videosContainer = document.getElementById("video-container");

  videosContainer.innerHTML += `
    <div class="video">
      <a href="/video.html?videoId=${video.id.videoId}">
        <img src="${video.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
          <img src="${video.channelThumbnail}" class="channel-icon" alt="">
          <div class="info">
            <h4 class="title">${video.snippet.title}</h4>
            <p class="channel-name">${video.snippet.channelTitle}</p>
          </div>
        </div>
      </a>
    </div>
  `;
}

// Event listener for nav buttons
const buttons = document.querySelectorAll(".nav-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById("video-container").innerHTML = `<h1 class="loader">Loading...</h1>`;
    setTimeout(() => {
      getVideos(button.innerHTML);
    }, 300);
    button.classList.toggle("green");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-logo");
  const searchInput = document.getElementById("search-data");
  const videoContainer = document.getElementById("video-container");

  searchButton.addEventListener("click", () => {
    performSearch();
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  async function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      console.log(`Searching for: ${query}`);
      const results = await fetchSearchResults(query);
      displaySearchResults(results);
    }
  }

  async function fetchSearchResults(query) {
    const url = `${BASE_URL}/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY}&maxResults=10`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.items;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  }

  function displaySearchResults(results) {
    videoContainer.innerHTML = '';

    if (results.length === 0) {
      videoContainer.innerHTML = '<p>No results found.</p>';
      return;
    }

    results.forEach(item => {
      const videoId = item.id.videoId;
      const title = item.snippet.title;
      const description = item.snippet.description;
      const thumbnail = item.snippet.thumbnails.medium.url;

      const videoElement = document.createElement('div');
      videoElement.classList.add('video-item');
      videoElement.innerHTML = `
        <a href="/video.html?videoId=${videoId}">
          <img src="${thumbnail}" alt="${title}">
          <h3>${title}</h3>
          <p>${description}</p>
        </a>
      `;
      videoContainer.appendChild(videoElement);
    });
  }
});

// Initial video load
setTimeout(() => {
  getVideos("");
}, 700);
