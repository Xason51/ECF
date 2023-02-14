const filmTable = document.querySelector("#filmTable");
const formContainer = document.querySelector("#formContainer");
const filmForm = document.querySelector("#filmForm");
const addBtn = document.querySelector("#addBtn");
const saveBtn = document.querySelector("#saveBtn");
const toggleButton = document.querySelector("#toggleButton");
const navLinks = document.querySelector("#navLinks");
const filterSelect = document.querySelector("#filterSelect");

toggleButton.addEventListener("click", function () {
    navLinks.style.display = navLinks.style.display === "block" ? "none" : "block";
});
filterSelect.addEventListener("change", function() {
    insertDataIntoTable(films);
  });


var films = [
    { title: "Deadpool", year: 2016, director: "Tim Miller" },
    { title: "Spiderman", year: 2002, director: "Sam Raimi" },
    { title: "Scream", year: 1996, director: "Wes Craven" },
    { title: "It: chapter 1", year: 2019, director: "Andy Muschietti" }
];
function addFilm(film) {
    films.push(film);
    filterFilms(films);
  }

function filterFilms(films) {
    const filterBy = document.querySelector("#filterSelect").value;
    let filteredFilms = films;
    if (filterBy === "title") {
      filteredFilms = films.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (filterBy === "year") {
      filteredFilms = films.sort((b, a) => {
        return b.year - a.year;
      });
    }

    while (filmTable.rows.length > 1) {
        filmTable.deleteRow(-1);
    }
    for (const film of filteredFilms) {
        const newRow = filmTable.insertRow(-1);
        const titleCell = newRow.insertCell(0);
        const yearCell = newRow.insertCell(1);
        const directorCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        titleCell.innerHTML = film.title;
        yearCell.innerHTML = film.year;
        directorCell.innerHTML = film.director;
        deleteCell.innerHTML = '<button class="deleteBtn">Supprimer</button>';
    }
    attachDeleteBtnsEventListeners();
}

function attachDeleteBtnsEventListeners() {
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", function () {
      if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        const rowToDelete = deleteBtn.parentNode.parentNode;
        filmTable.deleteRow(rowToDelete.rowIndex);
      }
    });
  });
}


addBtn.addEventListener("click", function () {
    formContainer.style.display = "block";
});

filmForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const year = document.querySelector("#year").value;
    const director = document.querySelector("#director").value;

    if (title.length < 2) {
          alert('Le Titre doit comporter au moins 2 lettres');
          return;
    }
  
    if (year.length !== 4 || year < 1900 || year > new Date().getFullYear()) {
          alert('Lannée doit comporter 4 chiffres et être inférieur ou égale à l année actuelle');
          return;
    }

      if (director.length < 5) {
        alert("Le nom du réalisateur doit comporter au moins 5 lettres");
        return;
    }


     const newRow = filmTable.insertRow(-1);
    const titleCell = newRow.insertCell(0);
    const yearCell = newRow.insertCell(1);
    const directorCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    titleCell.innerHTML = title.charAt(0).toUpperCase() + title.slice(1);
    yearCell.innerHTML = year;
    directorCell.innerHTML = director.charAt(0).toUpperCase() + director.slice(1);
    deleteCell.innerHTML = '<button class="deleteBtn">Supprimer</button>';

    formContainer.style.display = "none";
    filmForm.reset();

    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(function (deleteBtn) {
        deleteBtn.addEventListener("click", function () {
            const rowToDelete = deleteBtn.parentNode.parentNode;
            filmTable.deleteRow(rowToDelete.rowIndex);
        });
    });
});


insertDataIntoTable(films);
window.addEventListener("load", function () {
    insertDataIntoTable(filmTable);
});


function insertDataIntoTable(films) {
    films.forEach(function (film) {
        const newRow = filmTable.insertRow(-1);
        const titleCell = newRow.insertCell(0);
        const yearCell = newRow.insertCell(1);
        const directorCell = newRow.insertCell(2);
        const deleteCell = newRow.insertCell(3);

        titleCell.innerHTML = film.title;
        yearCell.innerHTML = film.year;
        directorCell.innerHTML = film.director;
        deleteCell.innerHTML = '<button class="deleteBtn">Supprimer</button>';
    });

    const deleteBtns = document.querySelectorAll(".deleteBtn");
    deleteBtns.forEach(function (deleteBtn) {
        deleteBtn.addEventListener("click", function () {
            const rowToDelete = deleteBtn.parentNode.parentNode;
            filmTable.deleteRow(rowToDelete.rowIndex);
        });
    });
}
