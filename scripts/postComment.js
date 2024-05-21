document.addEventListener("DOMContentLoaded", () => {
  fetch("https://dummyjson.com/users")
    .then((res) => res.json())
    .then((data) => {
      const users = data.users || [];
      fetch("https://dummyjson.com/posts")
        .then((res) => res.json())
        .then((data) => {
          const posts = data.posts || [];

          fetch("https://dummyjson.com/comments")
            .then((res) => res.json())
            .then((data) => {
              const comments = data.comments || [];
              displayPosts(posts, users, comments);
            });
        });
    })
    .catch((err) => console.error("Error fetching data:", err));

  function displayPosts(posts, users, comments) {
    const feedContainer = document.getElementById("feed-container");
    if (!feedContainer) {
      console.error("Feed container element not found.");
      return;
    }

    if (!Array.isArray(users) || !Array.isArray(posts)) {
      console.error("Data is not in the expected format.");
      return;
    }

    posts.forEach((post) => {
      const user = users.find((user) => user.id === post.id);

      if (!user) {
        console.warn(`User with id ${post.userId} not found.`);
        return;
      }

      const postComments = comments.filter((comment) => comment.id === post.id);

      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `
        <div class="profile-info">
          <img src="${user.image}" alt="${user.firstName}" class="profile-pic">
          <div class="profile-details">
            <span class="profile-name">${user.firstName} ${user.lastName}</span>
          </div>
        </div>
        <div class="post-content">
          <p> <b>Tittle:</b> ${post.title}</p>
          <img src="./assets/pf-logo.png" alt="Post Image" style="border:none; border-radius:5%;">
          <p> <b>Description:</b> ${post.body}</p>
        </div>
        <div class="post-comments">
          <span><i class="fa-solid fa-comments"></i></span>
          ${postComments
            .map(
              (comment) => `
            <div class="comment" data-comment-id="${comment.id}">
              <p><strong>${comment.user.username}:</strong> ${comment.body}</p>
              <span><i class="fa-regular fa-pen-to-square edit"></i></span>
              <span><i class="fa-solid fa-trash delete"></i></span>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="add-comment">
          <input type="text" placeholder="Add a comment..." class="new-comment-input">
          <button class="add-comment-button"><i class="fa-regular fa-paper-plane"></i></button>
        </div>
      `;
      feedContainer.appendChild(postDiv);
    });

    addEventListeners();
  }

  function addEventListeners() {
    document.querySelectorAll(".edit").forEach((editIcon) => {
      editIcon.addEventListener("click", handleEditComment);
    });

    document.querySelectorAll(".delete").forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", handleDeleteComment);
    });

    document.querySelectorAll(".add-comment-button").forEach((button) => {
      button.addEventListener("click", handleAddComment);
    });
  }

  function handleEditComment(event) {
    const target = event.target;
    let commentDiv = target.closest(".comment");
    if (commentDiv) {
      const commentText = commentDiv
        .querySelector("p")
        .innerText.split(": ")[1];
      const newCommentText = prompt("Programmer Force:", commentText);
      if (newCommentText !== null) {
        commentDiv.querySelector("p").innerHTML = `<strong>${
          commentDiv.querySelector("strong").innerText
        }:</strong> ${newCommentText}`;
      }
    }
  }

  function handleDeleteComment(event) {
    const target = event.target;
    let commentDiv = target.closest(".comment");
    if (
      commentDiv &&
      confirm("Are you sure you want to delete this comment?")
    ) {
      commentDiv.remove();
    }
  }

  function handleAddComment(event) {
    const target = event.target;
    const postDiv = target.closest(".post");
    const newCommentInput = postDiv.querySelector(".new-comment-input");
    const newCommentText = newCommentInput.value.trim();

    if (newCommentText !== "") {
      const userRecord = JSON.parse(localStorage.getItem("users")) || [];
      const signedInEmail = userRecord[0].email;

      const signedInUser = userRecord.find(
        (user) => user.email === signedInEmail
      );
      if (signedInUser) {
        const newComment = {
          id: Date.now(),
          body: newCommentText,
          user: {
            username: `${signedInUser.fname} ${signedInUser.lname}`,
          },
        };

        const newCommentDiv = document.createElement("div");
        newCommentDiv.classList.add("comment");
        newCommentDiv.innerHTML = `
          <p><strong>${newComment.user.username}:</strong> ${newComment.body}</p>
          <span><i class="fa-regular fa-pen-to-square edit"></i></span>
          <span><i class="fa-solid fa-trash delete"></i></span>
        `;

        postDiv.querySelector(".post-comments").appendChild(newCommentDiv);
        newCommentInput.value = "";
        newCommentDiv
          .querySelector(".edit")
          .addEventListener("click", handleEditComment);
        newCommentDiv
          .querySelector(".delete")
          .addEventListener("click", handleDeleteComment);
      } else {
        alert("User not found in local storage.");
      }
    } else {
      alert("Comment cannot be empty.");
    }
  }
});
