console.log("index is connected");

const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-contaier").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-contaier").classList.remove("hidden");
};

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategory() {
  //   first kaj, datake fetch kora.
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //   2. convert promise to json
    .then((res) => res.json())
    // 3. send data to display...
    .then((data) => displayCategories(data.categories));
}

function loadVideo(searchtext = "") {
  showLoader();

  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

// category er upor bitti kore button er action newa.
const loadCategoryVideos = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  //   console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      // now active class on any btn now.

      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

const loadVideoDetails = (videoId) => {
  console.log(videoId);

  // fetch korbo.
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};
// video details gulu ke amra display video detail e pataiya ditechi.

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();

  const detailsContainer = document.getElementById("details_container");

  detailsContainer.innerHTML = `

  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p class="mb-3">Aouthor name: ${video.authors[0].profile_name}</p>
    <p class="text-xl">Description:</p>
    <p>${video.description}</p>
  </div>
</div>
  `;
};
function displayCategories(categories) {
  //   steps to show it pefectly on screen.
  // 1. get the container (by id)
  const categoryContainer = document.getElementById("category-container");

  // 2. loop operation.
  for (let cate of categories) {
    // console.log(cate);

    // 3. create Element.
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
  <button id="btn-${cate.category_id}" onClick="loadCategoryVideos(${cate.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cate.category}</button>
  `;
    // 4. Append the Element.
    categoryContainer.append(categoryDiv);
  }
}

// video er object

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// function for videos
const displayVideos = (videos) => {
  //   console.log(videos);

  const videoContainer = document.getElementById("video-contaier");

  //   category er video asar por jate,age load howa video gula gayeb hoye jay , de jonno. amra emty string kore dibo.
  videoContainer.innerHTML = "";
  //   instead of for of loop we will use forEach function since it is an array of object.

  if (videos.length == 0) {
    videoContainer.innerHTML = `
          <div
        class="py-28 col-span-full flex flex-col justify-center items-center"
      >
        <img src="assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;

    hideLoader();
    return;
  }

  videos.forEach((video) => {
    // console.log(video);
    // ei objecter datagulu diye amra ekta Element create kore felbo.

    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[200px] object-cover" src="${
            video.thumbnail
          }" alt="Nature" />
          <span
            class="absolute bottom-2 right-2 text-white text-sm bg-black p-1 rounded-md"
            >3hrs 56 min ago</span
          >
        </figure>

        <div class="flex gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}
</h2>

            <p class="text-sm text-gray-400 flex gap-1">
            ${video.authors[0].profile_name}
            ${
              video.authors[0].verified == true
                ? `<img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"
                alt=""
              />`
                : ``
            }
              
            </p>

            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
        </div>

        <button onclick="loadVideoDetails('${
          video.video_id
        }')" class="btn btn-block">Show details</button>

      </div>
    `;

    // append
    videoContainer.append(videoCard);

    hideLoader();
  });
};

// search er kaj kortechi.
document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideo(input);
});
loadCategory();

// etake button e onClick er maddome call korbo
// loadVideo();
