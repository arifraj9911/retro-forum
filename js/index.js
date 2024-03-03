const loadAllPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  const posts = data.posts;
  displayAllPost(posts);
};

const displayAllPost = (posts) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  //   const cardMark = document.getElementById("card-marked");
  posts.forEach((post) => {
    const card = document.createElement("div");
    // console.log(post);
    const {
      id,
      image,
      category,
      title,
      author,
      description,
      comment_count,
      view_count,
      posted_time,
      isActive,
    } = post;
    card.innerHTML = `
        <div class="flex  bg-[#797DFC1A] p-10 rounded-3xl  gap-6">
        <div class = "relative">
            ${
              isActive
                ? `<img class="absolute right-[-6px] top-[-12px]" src="assets/images/dot_green.svg" >`
                : `<img class="absolute right-[-6px] top-[-12px]" src="assets/images/dot_red.svg" >`
            }
            
            <img class="w-16 h-16 rounded-xl" src="${image}" alt="">
        </div>
        <div class="flex-1">
            <div class="flex gap-8">
                <span>#${category}</span>
                <span>Author: ${author.name}</span>
            </div>
            <h3 class="text-xl font-bold mt-2 mb-4">${title}</h3>
            <p class="w-5/6">${description}</p>
            <hr class="my-5">
            <div class="flex justify-between">
                <div class="flex gap-7 items-center">
                    <div class="flex justify-center items-center gap-2">
                        <span><img src="assets/images/message2.svg" alt=""></span>
                        <span>${comment_count}</span>
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <span><img src="assets/images/tabler-icon-eye.svg" alt=""></span>
                        <span>${view_count}</span>
                    </div>
                    <div class="flex justify-center items-center gap-2">
                        <span><img src="assets/images/time.svg" alt=""></span>
                        <span>${posted_time}</span>
                    </div>
                </div>
                <div onclick="cardMark('${title.replace(
                  "'",
                  ""
                )}','${view_count}')">
                    <img src="assets/images/message.svg" alt="">
                </div>
            </div>
        </div>
    </div>
        `;
    cardContainer.appendChild(card);
  });
  loadingSpinner(false);
};

const cardMark = (title, view) => {
  const cardMarked = document.getElementById("card-marked");
  const titleDiv = document.createElement("div");
  const marksRead = document.getElementById("marks-read");
  titleDiv.innerHTML = `
    <div class="flex p-3 items-center justify-between  rounded-xl bg-white">
        <p class="text-sm">${title}</p>
        <div class="flex justify-center items-center gap-2">
            <span><img src="assets/images/tabler-icon-eye.svg" alt=""></span>
            <span>${view}</span>
        </div>
    </div>
    `;
  const marksReadValue = parseInt(marksRead.innerText);
  marksRead.innerText = marksReadValue + 1;
  cardMarked.appendChild(titleDiv);
  //   loadingSpinner(false);
};

const loadLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  displayLatestPost(data);
};

const displayLatestPost = (posts) => {
  const latestPostContainer = document.getElementById("latest-post-container");
  posts.forEach((post) => {
    console.log(post);
    const { cover_image, description, profile_image, title, author } = post;
    const latestPostDiv = document.createElement("div");
    latestPostDiv.innerHTML = `
        <div class="card w-96 h-[482px] bg-base-100  border-2">
        <figure class="px-6 pt-2">
          <img class="w-full rounded-xl h-5/6" src="${cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-start">
          <div class="flex gap-1 ">
            <span><img src="assets/images/date-ico.svg" alt=""></span>
            <span class="font-sm">${
              author.posted_date
                ? author.posted_date
                : `<span>No publish date</span>`
            }</span>
          </div>
          <h2 class="card-title text-lg font-extrabold">${title}</h2>
          <p class="text-sm font-normal">${description}</p>
          <div class="flex items-center gap-2 mt-4">
            <div><img class="w-12 rounded-full" src="${profile_image}" alt=""></div>
            <div class="flex flex-col">
              <span class="text-sm font-bold">${author.name}</span>
              <span class="font-xs font-normal">${
                author.designation ? author.designation : `<span>Unknown</span>`
              }</span>
            </div>
          </div>
        </div>
      </div>
        `;
    latestPostContainer.appendChild(latestPostDiv);
  });
  loadingSpinner(false);
};

const handleSearch = async () => {
  loadingSpinner(true);
  const searchInputField = document.getElementById("search-input");
  const searchValue = searchInputField.value;
  // console.log(searchValue);

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`
  );
  const data = await res.json();
  const posts = data.posts;
  // console.log(posts);
  displayAllPost(posts);
};

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadingSpinner(true);
loadAllPost();
loadLatestPost();
