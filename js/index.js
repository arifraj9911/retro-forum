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
  const cardMark = document.getElementById("card-marked");
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
    if (isActive) {
      card.innerHTML = `
        <div class="flex  bg-[#797DFC1A] p-10 rounded-3xl  gap-6 ">
        <div class = "relative">
            <img class="absolute right-[-6px] top-[-12px]" src="assets/images/dot_green.svg" >
            <img class="w-16 h-16 rounded-xl" src="${image}" alt="">
        </div>
        <div>
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
    } else {
      card.innerHTML = `
        <div class="flex  bg-[#797DFC1A] p-10 rounded-3xl  gap-6 ">
        <div class = "relative">
            <img class="absolute right-[-6px] top-[-12px]" src="assets/images/dot_red.svg" >
            <img class="w-16 h-16 rounded-xl" src="${image}" alt="">
        </div>
        <div>
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
    }

    cardContainer.appendChild(card);
  });
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
};

loadAllPost();
