const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('filmId');

// Припустимо, що JSON-файли збережені в каталозі "films"
fetch(`films/film${filmId}.json`)
    .then(response => response.json())
    .then(film => {
        const filmDetailsDiv = document.getElementById('film-details');
        filmDetailsDiv.innerHTML = `
            <h2 class="title">${film.title}</h2>
            <img class="poster" src="images/${film.poster}.jpg" alt="${film.title}">
            <p class="detales">${film.description}</p>
            <div class="schedule">
            <h3 >Розклад:</h3>
            <ul>
                ${film.schedule.map(day => `
                    <li>${day.date}
                        <ul>
                            ${day.times.map(time => `
                                <li><a href="seats.html?filmId=${filmId}&date=${day.date}&time=${time}&hall=${filmId}">${time}</a></li>
                            `).join('')}
                        </ul>
                    </li>
                `).join('')}
            </ul>
            </div>
        `;
    })
    .catch(error => {
        console.error('Помилка завантаження даних фільму:', error);
    });
