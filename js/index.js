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
  posts.forEach((post) => {
    const card = document.createElement("div");
    console.log(post);
    const {
      image,
      category,
      title,
      author,
      description,
      comment_count,
      view_count,
      posted_time,
    } = post;
    card.innerHTML = `
        <div class="flex  bg-[#797DFC1A] p-10 rounded-3xl  gap-6 ">
        <div>
            <img class="w-16 h-16 rounded-2xl" src="${image}" alt="">
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
                <div>
                    <img src="assets/images/message.svg" alt="">
                </div>
            </div>
        </div>
    </div>
        `;
    cardContainer.appendChild(card);
  });
};

loadAllPost();
