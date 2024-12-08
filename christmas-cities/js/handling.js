document.addEventListener("DOMContentLoaded", () => {

  loadComments();

  document.getElementById("show-offers-btn").addEventListener("click", toggleOffersVisibility);
  document.getElementById("form-questionnaire").addEventListener("submit", validateForm);
  document.getElementById("cancel-edit").addEventListener("click", cancelEdit);
});

// function to validate de form
function validateForm(event) {
  event.preventDefault();

  const EMAIL = document.getElementById("email").value;
  const YEAR = document.getElementById("year").value;
  const CITY = document.getElementById("city").value;
  const OPINION = document.getElementById("opinion").value;

  let valid = true;

  // validation obligatory camps
  if (!EMAIL || !YEAR || !CITY || !OPINION) {
      valid = false;
      if (!EMAIL) document.getElementById("error-email").style.visibility = "visible";
      if (!YEAR) document.getElementById("error-year").style.visibility = "visible";
      if (!CITY) document.getElementById("error-city").style.visibility = "visible";
      if (!OPINION) document.getElementById("error-opinion").style.visibility = "visible";
  } else {
      document.getElementById("error-email").style.visibility = "hidden";
      document.getElementById("error-year").style.visibility = "hidden";
      document.getElementById("error-city").style.visibility = "hidden";
      document.getElementById("error-opinion").style.visibility = "hidden";
  }

  if (valid) {
      
      saveDataToLocalStorage(EMAIL, YEAR, CITY, OPINION);
      document.getElementById("form-questionnaire").reset();
      loadComments();
  }
}


function saveDataToLocalStorage(email, year, city, opinion) {

  const STOREDCOMMENTS = JSON.parse(localStorage.getItem("comments")) || [];
  const NEWCOMMENT = { email, year, city, opinion };

  STOREDCOMMENTS.push(NEWCOMMENT);

  localStorage.setItem("comments", JSON.stringify(STOREDCOMMENTS));
}

function loadComments() {
  const COMMENTS = JSON.parse(localStorage.getItem("comments")) || [];
  const COMMENTSLIST = document.getElementById("comments-list");
  COMMENTSLIST.innerHTML = ''; 

  COMMENTS.forEach((comment, index) => {
      const COMMENTDIV = document.createElement("div");
      COMMENTDIV.classList.add("comment-item");

      COMMENTDIV.innerHTML = `
          <p><strong>Correo: </strong>${comment.email}</p>
          <p><strong>Año: </strong>${comment.year}</p>
          <p><strong>Ciudad: </strong>${comment.city}</p>
          <p><strong>Opinión: </strong>${comment.opinion}</p>
          <button class="edit" data-index="${index}">Editar</button>
          <button class="delete" data-index="${index}">Eliminar</button>
      `;

      COMMENTSLIST.appendChild(COMMENTDIV);
  });


  document.querySelectorAll(".edit").forEach(button => {
      button.addEventListener("click", editComment);
  });

  document.querySelectorAll(".delete").forEach(button => {
      button.addEventListener("click", deleteComment);
  });
}

function toggleOffersVisibility() {
  const OFFERSLIST = document.getElementById("offers-list");
  if (OFFERSLIST.style.display === "none" || OFFERSLIST.style.display === "") {
      OFFERSLIST.style.display = "block";
  } else {
      OFFERSLIST.style.display = "none";
  }
}

function editComment(event) {
  const INDEX = event.target.getAttribute("data-index");
  const COMMENTS = JSON.parse(localStorage.getItem("comments")) || [];
  const COMMENT = COMMENTS[INDEX];


  document.getElementById("edit-email").value = COMMENT.email;
  document.getElementById("edit-year").value = COMMENT.year;
  document.getElementById("edit-city").value = COMMENT.city;
  document.getElementById("edit-opinion").value = COMMENT.opinion;


  document.getElementById("edit-comment-container").style.display = "block";
  document.getElementById("offers-list").style.display = "none";


  document.getElementById("edit-offer-form").onsubmit = function(event) {
      event.preventDefault();
      saveEditChanges(INDEX);
  };
}


function saveEditChanges(index) {
  const UPDATEDEMAIL = document.getElementById("edit-email").value;
  const UPDATEDYEAR = document.getElementById("edit-year").value;
  const UPDATEDCITY = document.getElementById("edit-city").value;
  const UPDATEDOPINION = document.getElementById("edit-opinion").value;

  const COMMENTS = JSON.parse(localStorage.getItem("comments")) || [];

  COMMENTS[index] = {
      email: UPDATEDEMAIL,
      year: UPDATEDYEAR,
      city: UPDATEDCITY,
      opinion: UPDATEDOPINION
  };


  localStorage.setItem("comments", JSON.stringify(comments));


  loadComments();


  cancelEdit();
}


function cancelEdit() {
  document.getElementById("edit-comment-container").style.display = "none";
  document.getElementById("offers-list").style.display = "block";
}

function deleteComment(event) {
  const INDEX = event.target.getAttribute("data-index");
  const COMMENTS = JSON.parse(localStorage.getItem("comments")) || [];
  COMMENTS.splice(INDEX, 1);
  localStorage.setItem("comments", JSON.stringify(COMMENTS));
  loadComments();
}
