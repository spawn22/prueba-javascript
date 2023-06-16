/*  Este código realiza lo siguiente:

Importa la función filterMovies desde el archivo "./scripts/movies-filter.js", así como las variables movies y users desde los archivos correspondientes.
Define una función llamada applyFilters() que se ejecutará cuando el usuario haga clic en un botón específico.
Dentro de la función, obtiene los valores de los campos "userId", "fromDate", "toDate" y "rate" del formulario HTML donde se encuentra el botón haciendo uso del método getElementById().
Luego, llama a la función filterMovies() pasándole como argumentos un objeto con las opciones para filtrar películas:
La lista completa de películas (movies)
La lista completa de usuarios (users)
El ID del usuario (convertido a entero mediante parseInt) si hay uno especificado o undefined si no lo hay
La fecha mínima hasta la cual se han visto las películas (en formato Date)
La fecha máxima hasta la cual se han visto las películas (en formato Date)
La calificación mínima para las películas (convertida a flotante mediante parseFloat) si hay una especificada o undefined si no lo hay
Finalmente, llama a otra función llamada displayResults() pasando como argumento la lista filtrada de películas devuelta por filterMovies(). Esta última función genera elementos HTML en base al resultado obtenido y actualiza el contenido de otro elemento HTML dentro del documento.
Además, este código también añade un event listener al botón para que llame a applyFilters() cuando sea presionado e invoca esta misma función al cargar inicialmente la página web mediante applyFilters(). 
*/

import { filterMovies } from "./scripts/movies-filter.js";
import { movies } from "./scripts/movies.js";
import { users } from "./scripts/users.js";

function applyFilters() {
  let userId = document.getElementById("userId").value;
  let fromDate = document.getElementById("fromDate").value;
  let toDate = document.getElementById("toDate").value;
  let rate = document.getElementById("rate").value;

  const filteredMovies = filterMovies({
    movies,
    users,
    userId: isNaN(parseInt(userId)) ? undefined : parseInt(userId),
    fromDate,
    toDate,
    rate: isNaN(parseFloat(rate)) ? undefined : parseFloat(rate),
  });

  displayResults(filteredMovies);
}

function displayResults(movies) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  for (const movie of movies) {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    const image = document.createElement("img");
    image.src = movie.image;
    movieDiv.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = movie.movie;

    const userInfo = document.createElement("p");
    userInfo.textContent = `User: ${movie.username} (${movie.email})`;

    const address = document.createElement("p");
    address.textContent = `Address: ${movie.fullAddress}`;

    const company = document.createElement("p");
    company.textContent = `Company: ${movie.company}`;

    const rate = document.createElement("p");
    rate.textContent = `Rate: ${movie.rate}`;

    movieDiv.appendChild(title);
    movieDiv.appendChild(userInfo);
    movieDiv.appendChild(address);
    movieDiv.appendChild(company);
    movieDiv.appendChild(rate);

    results.appendChild(movieDiv);
  }
}

function resetFilters() {
  document.getElementById("userId").value = "";
  document.getElementById("fromDate").value = "";
  document.getElementById("toDate").value = "";
  document.getElementById("rate").value = "";

  displayResults(movies)
}

document.querySelector("#filterButton").addEventListener("click", applyFilters);
document.querySelector("#resetButton").addEventListener("click", resetFilters);

applyFilters();
