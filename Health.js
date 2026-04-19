// Load saved posts when page opens
window.onload = function() {
  var saved = JSON.parse(localStorage.getItem("healthPosts") || "[]");
  for (var i = 0; i < saved.length; i++) {
    addCard(saved[i].title, saved[i].desc, saved[i].imgSrc, i);
  }
};

function openForm() {
  document.getElementById("formBox").style.display = "block";
}

function closeForm() {
  document.getElementById("formBox").style.display = "none";
}

function submitPost() {
  var title   = document.getElementById("postTitle").value;
  var desc    = document.getElementById("postDesc").value;
  var imgFile = document.getElementById("postImage").files[0];

  if (title == "" || desc == "") {
    alert("Please fill topic name and description!");
    return;
  }

  if (imgFile) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.src = e.target.result;
      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width  = 400;
        canvas.height = 250;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 400, 250);
        var compressed = canvas.toDataURL("image/jpeg", 0.4);
        saveAndAdd(title, desc, compressed);
      };
    };
    reader.readAsDataURL(imgFile);
  } else {
    saveAndAdd(title, desc, null);
  }

  document.getElementById("postTitle").value = "";
  document.getElementById("postDesc").value  = "";
  document.getElementById("postImage").value = "";
  closeForm();
}

function saveAndAdd(title, desc, imgSrc) {
  try {
    var saved = JSON.parse(localStorage.getItem("healthPosts") || "[]");
    saved.unshift({ title: title, desc: desc, imgSrc: imgSrc });
    localStorage.setItem("healthPosts", JSON.stringify(saved));
    // reload all cards to keep indexes correct
    reloadCards();
  } catch(e) {
    alert("Storage full! Clearing old posts.");
    localStorage.removeItem("healthPosts");
  }
}

function reloadCards() {
  var grid = document.getElementById("postsGrid");
  grid.innerHTML = "";
  var saved = JSON.parse(localStorage.getItem("healthPosts") || "[]");
  if (saved.length == 0) {
    document.getElementById("noPostMsg").style.display = "block";
  } else {
    document.getElementById("noPostMsg").style.display = "none";
    for (var i = 0; i < saved.length; i++) {
      addCard(saved[i].title, saved[i].desc, saved[i].imgSrc, i);
    }
  }
}

function addCard(title, desc, imgSrc, index) {
  document.getElementById("noPostMsg").style.display = "none";

  var card = document.createElement("div");
  card.className = "post-card";

  var imgHtml = imgSrc
    ? "<img src='" + imgSrc + "' alt='post image'>"
    : "";

  card.innerHTML =
    imgHtml +
    "<div class='post-card-body'>" +
      "<h3>" + title + "</h3>" +
      "<p>"  + desc  + "</p>" +
      "<div class='card-btns'>" +
        "<button class='edit-btn' onclick='editPost(" + index + ")'>✏️ Edit</button>" +
        "<button class='delete-btn' onclick='deletePost(" + index + ")'>🗑️ Delete</button>" +
      "</div>" +
    "</div>";

  // click card body to open fullscreen
  card.querySelector("img") && card.querySelector("img").addEventListener("click", function() {
    openFullScreen(title, desc, imgSrc);
  });
  card.querySelector("h3").onclick = function() {
    openFullScreen(title, desc, imgSrc);
  };

  document.getElementById("postsGrid").appendChild(card);
}

// Delete post
function deletePost(index) {
  var confirm = window.confirm("Are you sure you want to delete this post?");
  if (!confirm) return;
  var saved = JSON.parse(localStorage.getItem("healthPosts") || "[]");
  saved.splice(index, 1);
  localStorage.setItem("healthPosts", JSON.stringify(saved));
  reloadCards();
}

// Edit post
function editPost(index) {
  var saved = JSON.parse(localStorage.getItem("healthPosts") || "[]");
  var post  = saved[index];

  var newTitle = window.prompt("Edit Title:", post.title);
  if (newTitle == null) return;

  var newDesc = window.prompt("Edit Description:", post.desc);
  if (newDesc == null) return;

  saved[index].title = newTitle;
  saved[index].desc  = newDesc;
  localStorage.setItem("healthPosts", JSON.stringify(saved));
  reloadCards();
}

function openFullScreen(title, desc, imgSrc) {
  document.getElementById("fullTitle").textContent = title;
  document.getElementById("fullDesc").textContent  = desc;

  var fullImg = document.getElementById("fullImg");
  if (imgSrc) {
    fullImg.src = imgSrc;
    fullImg.style.display = "block";
  } else {
    fullImg.style.display = "none";
  }

  document.getElementById("fullScreen").style.display = "block";
}

function closeFullScreen() {
  document.getElementById("fullScreen").style.display = "none";
}