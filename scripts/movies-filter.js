export function filterMovies({
  users,
  movies,
  userId,
  fromDate,
  toDate,
  rate,
}) {
  const filteredMovies = [];

  for (const movie of movies) {
    const isUserIdMatch =
      !userId || parseInt(movie.userId) === parseInt(userId);
    const isFromDateMatch =
      !fromDate || new Date(movie.watched) >= new Date(fromDate);
    const isToDateMatch =
      !toDate || new Date(movie.watched) <= new Date(toDate);
    const isRateMatch = !rate || parseFloat(movie.rate) >= parseFloat(rate);

    if (isUserIdMatch && isFromDateMatch && isToDateMatch && isRateMatch) {
      const user = users.find((user) => user.id === movie.userId);
      const fullAddress = `${user.address.street} - ${user.address.city}`;

      filteredMovies.push({
        id: user.id,
        username: user.username,
        email: user.email,
        fullAddress: fullAddress,
        company: user.company.name,
        movie: movie.title,
        rate: movie.rate,
      });
    }
  }

  return filteredMovies;
}
