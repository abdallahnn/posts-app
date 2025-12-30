let allPosts = [];
let allTags = new Set();

fetch(" https://dummyjson.com/posts")
  .then(res => res.json())
  .then(data => {
    allPosts = data.posts;
    showPosts(allPosts);
    collectTags(allPosts);
  });

function showPosts(posts) {
  const postsDiv = document.getElementById("posts");
  postsDiv.innerHTML = "";

  posts.forEach(post => {
    postsDiv.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;
  });
}

function collectTags(posts) {
  posts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });

  const tagsDiv = document.getElementById("tags");
  tagsDiv.innerHTML = "";

  allTags.forEach(tag => {
    const tagDiv = document.createElement("div");
    tagDiv.className = "tag";
    tagDiv.textContent = `#${tag}`;

    tagDiv.addEventListener("click", () => {
      document.querySelectorAll(".tag").forEach(t =>
        t.classList.remove("active")
      );

      tagDiv.classList.add("active");

      const filtered = allPosts.filter(post =>
        post.tags.includes(tag)
      );

      showPosts(filtered);
    });

    tagsDiv.appendChild(tagDiv);
  });
}


document.getElementById("search").addEventListener("input", function () {
  let value = this.value.toLowerCase();

  let filtered = allPosts.filter(post =>
    post.title.toLowerCase().includes(value) ||
    post.body.toLowerCase().includes(value)
  );

  showPosts(filtered);
});