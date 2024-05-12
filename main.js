let usersUl = document.querySelector(".users");
let postsList = document.querySelector(".posts");

//Get users From API and Add to Page
let requestUsers = new XMLHttpRequest();
requestUsers.open("GET", "https://jsonplaceholder.typicode.com/users");
requestUsers.responseType = "json";
requestUsers.send();
requestUsers.onload = function () {
  let users = requestUsers.response;
  //adding users
  for (let user of users) {
    let userLi = document.createElement("li");
    userLi.classList.add("data-userId");
    userLi.dataset.userId = user.id;
    //add active to firs user
    if (userLi.dataset.userId === "1") {
      userLi.classList.add("clicked");
    }
    userLi.classList.add("user");
    let userName = document.createElement("p");
    userName.textContent = user.name;
    let userMail = document.createElement("p");
    userMail.textContent = user.email;
    userLi.appendChild(userName);
    userLi.appendChild(userMail);
    usersUl.appendChild(userLi);
  }
  //Get Posts From API and add posts to page
  let requestPosts = new XMLHttpRequest();
  requestPosts.open(
    "GET",
    "https://jsonplaceholder.typicode.com/posts?userId=1"
  );
  requestPosts.responseType = "json";
  requestPosts.send();
  requestPosts.onload = function () {
    let posts = requestPosts.response;
    addingPosts(posts);

    //clicked user
    let usersList = document.querySelectorAll(".users li");
    usersList.forEach((user) => {
      user.addEventListener("click", (el) => {
        usersList.forEach((user) => {
          user.classList.remove("clicked");
        });
        el.target.classList.add("clicked");
        //posts API
        let requestPosts = new XMLHttpRequest();
        requestPosts.open(
          "GET",
          `https://jsonplaceholder.typicode.com/posts?userId=${el.target.dataset.userId}`
        );
        requestPosts.responseType = "json";
        requestPosts.send();
        requestPosts.onload = function () {
          let posts = requestPosts.response;
          deletePosts();
          addingPosts(posts);
        };
      });
    });
  };
  function addingPosts(posts) {
    for (let post of posts) {
      let postElement = document.createElement("li");
      postElement.className = "post";
      let postElementTitle = document.createElement("p");
      postElementTitle.textContent = post.title;
      let postElementBody = document.createElement("p");
      postElementBody.textContent = post.body;
      postElement.appendChild(postElementTitle);
      postElement.appendChild(postElementBody);
      postsList.appendChild(postElement);
    }
  }
};
function deletePosts() {
  let posts = document.querySelectorAll(".posts li");
  for (let post of posts) post.remove();
}
