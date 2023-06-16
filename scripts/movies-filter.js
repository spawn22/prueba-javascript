/**
 * La función filterMovies toma un objeto como argumento con las siguientes propiedades:

  users: Un array de objetos usuario.
  movies: Un array de objetos película.
  userId (opcional): Una cadena que representa el ID del usuario cuyas películas se deben listar.
  fromDate (opcional): Una cadena o un objeto Date que representa la fecha mínima hasta la cual se han visto las películas.
  toDate (opcional): Una cadena o un objeto Date que representa la fecha máxima hasta la cual se han visto las películas.
  rate (opcional): Un número o una representación en forma de cadena del valor mínimo para la calificación de una película.

  La función inicializa un array vacío llamado 'filteredMovies'.

  Luego, recorre cada elemento en 'movies'.

  Para cada elemento, verifica si esta película cumple con todos los criterios de filtrado. Lo hace comprobando si:

  No hay userId especificado O si hay uno y coincide con el asociado a esta película específica.

  No hay fromDate especificada O si hay una y esta película específica fue vista en esa fecha o después.

  No hay toDate especificada O si hay una y esta película específica fue vista antes o en esa fecha.

  No hay rate especificada O si lo hubiera, entonces tiene que ser menor al rating otorgado a dicha pelicula
  Si todas las condiciones anteriores son verdaderas, podemos afirmar que hemos encontrado un registro coincidente para nuestro filtro.

  La función luego busca cualquier usuario correspondiente para estos registros coincidentes utilizando sus IDs respectivos desde cada registro combinado. También construye una propiedad de dirección completa concatenando los valores de calle y ciudad desde la información de dirección proporcionada en la lista de usuarios.
  A continuación, crea un objeto que contiene varios detalles tanto sobre el usuario que vio la película como sobre la película misma: id, nombre del usuario, correo electrónico, dirección completa,nombre de compañía,título,rating e imagen URL para esa película. Este objeto se agrega al array filteredMovies.
  Finalmente, una vez que se han procesado todas las películas, la función devuelve un array con los objetos filtrados según los criterios especificados.
  
 * Filtra películas en función de los criterios proporcionados y devuelve las películas filtradas.
 *
 * @param {Object} opciones - Un objeto que contiene los siguientes parámetros:
 *   - {Array} usuarios: Un array de objetos de usuario que contiene información del usuario.
 *   - {Array} películas: Un array de objetos de película que contiene información de la película.
 *   - {string} userId: ID de usuario utilizado para filtrar películas.
 *   - {string} fromDate: Filtra las películas a partir de esta fecha (inclusive).
 *   - {string} toDate: Filtra las películas hasta esta fecha (inclusive).
 *   - {number} rate: Filtra las películas con una calificación mínima.
 *
 * @return {Array} Un array de objetos de película que contiene la siguiente información:
 *   - {number} id: ID de usuario del usuario que vio la película.
 *   - {string} username: Nombre de usuario del usuario que vio la película.
 *   - {string} email: Correo electrónico del usuario que vio la película.
 *   - {string} fullAddress: Dirección completa del usuario que vio la película.
 *   - {string} company: Nombre de la empresa para la que trabaja el usuario que vio la película.
 *   - {string} movie: Título de la película.
 *   - {number} rate: Calificación de la película.
 *   - {string} image: URL de la imagen de la película.
 */

  
  

export function filterMovies({ users, movies, userId, fromDate, toDate, rate }) {
  const filteredMovies = [];

  for (const movie of movies) {
    const isMatchingUserId = !userId || parseInt(movie.userId) === parseInt(userId);
    const isMatchingFromDate = !fromDate || new Date(movie.watched) >= new Date(fromDate);
    const isMatchingToDate = !toDate || new Date(movie.watched) <= new Date(toDate);
    const isMatchingRate = !rate || parseFloat(movie.rate) >= parseFloat(rate);

    if (isMatchingUserId && isMatchingFromDate && isMatchingToDate && isMatchingRate) {
      const findUser = users.find((user) => user.id === movie.userId);
      const fullAddress = `${findUser.address.street} - ${findUser.address.city}`;

      filteredMovies.push({
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        fullAddress,
        company: findUser.company.name,
        movie: movie.title,
        rate: movie.rate,
        image: movie.image,
      });
    }
  }

  return filteredMovies;
}