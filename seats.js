const urlParams = new URLSearchParams(window.location.search);
const filmId = urlParams.get('filmId');
const filmName = urlParams.get('filmName'); // Додаємо новий параметр
const date = urlParams.get('date');
const time = urlParams.get('time');
const hall = urlParams.get('hall');

// Генеруємо сітку місць для 7 рядів по 12 місць
const seatingChart = document.querySelector('.seating-chart');
for (let row = 1; row <= 7; row++) {
    for (let seatNum = 1; seatNum <= 12; seatNum++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.dataset.seat = row + String.fromCharCode(64 + seatNum); // Приклад: 1A, 1B, ..., 7L
        seat.textContent = seat.dataset.seat; // Додаємо назву місця як текстовий контент
        seatingChart.appendChild(seat);
    }
}

// Завантаження зарезервованих місць з локального сховища
const loadReservedSeats = () => {
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    reservedSeats.forEach(({ seat, name, email, filmId: fId, filmName: fName, date: d, time: t }) => {
        if (fId === filmId && d === date && t === time) {
            const seatElement = document.querySelector(`.seat[data-seat="${seat}"]`);
            if (seatElement) {
                seatElement.classList.add('reserved');
                seatElement.dataset.name = name;
                seatElement.dataset.email = email;
                seatElement.removeEventListener('click', toggleSeatSelection);
            }
        }
    });
};

// Обробник кліків на місцях
const toggleSeatSelection = (event) => {
    const seat = event.target;
    if (!seat.classList.contains('reserved')) {
        seat.classList.toggle('selected');
    }
};

document.querySelectorAll('.seat').forEach(seat => {
    seat.addEventListener('click', toggleSeatSelection);
});

// Обробник кліку на кнопці "Зарезервувати"
document.getElementById('reserve-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!name || !email) {
        alert('Будь ласка, введіть ім\'я та email');
        return;
    }
    const selectedSeats = [...document.querySelectorAll('.seat.selected')];
    if (selectedSeats.length === 0) {
        alert('Будь ласка, виберіть місця для бронювання');
        return;
    }
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    const userSeats = [];
    selectedSeats.forEach(seat => {
        seat.classList.remove('selected');
        seat.classList.add('reserved');
        seat.dataset.name = name;
        seat.dataset.email = email;
        seat.removeEventListener('click', toggleSeatSelection);
        reservedSeats.push({ seat: seat.dataset.seat, name, email, filmId, filmName, date, time });
        userSeats.push(seat.dataset.seat);
    });
    localStorage.setItem('reservedSeats', JSON.stringify(reservedSeats));
    alert('Місця зарезервовано: ' + userSeats.join(', '));
});

// Обробник кліку на кнопці "Info"
document.getElementById('info-btn').addEventListener('click', () => {
    const reservedSeats = JSON.parse(localStorage.getItem('reservedSeats')) || [];
    const userInfo = reservedSeats.map(({ name, email, seat, filmId: fId, filmName: fName, date: d, time: t }) =>
        `Ім'я: ${name}, Email: ${email}, Місце: ${seat}, Фільм: ${fName}, Дата: ${d}, Час: ${t}`
    ).join('\n');
    alert('Зарезервовані місця:\n' + userInfo);
});

// Обробник кліку на кнопці "Refresh"
document.getElementById('refresh-btn').addEventListener('click', () => {
    localStorage.removeItem('reservedSeats');
    document.querySelectorAll('.seat').forEach(seat => {
        seat.classList.remove('reserved');
        seat.classList.remove('selected');
        seat.dataset.name = '';
        seat.dataset.email = '';
        seat.addEventListener('click', toggleSeatSelection);
    });
    alert('Усі бронювання знято');
});

loadReservedSeats();
