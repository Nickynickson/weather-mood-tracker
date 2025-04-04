const moodForm = document.getElementById('moodForm');
const weatherDiv = document.getElementById('weather');
const moodHistoryDiv = document.getElementById('moodHistory');

// Fetch weather data
async function fetchWeather() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await response.json();
        displayWeather(data.current_weather);
    });
}

// Display weather data
function displayWeather(weather) {
    weatherDiv.innerHTML = `<h2>Current Weather</h2>
                            <p>Temperature: ${weather.temperature}°C</p>
                            <p>Condition: ${weather.weathercode}</p>`;
}

// Log mood
moodForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mood = document.getElementById('mood').value;
    const notes = document.getElementById('notes').value;
    const currentWeather = weatherDiv.querySelector('p:nth-child(2)').textContent.split(': ')[1];
    const weatherCondition = weatherDiv.querySelector('p:nth-child(3)').textContent.split(': ')[1];

    const response = await fetch('http://localhost:5000/api/moods', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: 'user123',
            mood,
            notes,
            weather: {
                temperature: currentWeather,
                condition: weatherCondition
            }
        })
    });

    if (response.ok) {
        alert('Mood logged successfully!');
        loadMoodHistory();
    } else {
        alert('Error logging mood.');
    }
});

// Load mood history
async function loadMoodHistory() {
    const response = await fetch('http://localhost:5000/api/moods/user123');
    if (response.ok) {
        const moods = await response.json();
        moodHistoryDiv.innerHTML = `<h2>Mood History</h2>` + moods.map(mood => `
            <p>
                ${new Date(mood.createdAt).toLocaleString()}: ${mood.mood} - ${mood.notes}
                <button onclick="deleteMood('${mood._id}')">Delete</button>
            </p>
        `).join('');
    } else {
        moodHistoryDiv.innerHTML = `<h2>Mood History</h2><p>Error loading mood history.</p>`;
    }
}

// Delete mood
async function deleteMood(moodId) {
    const response = await fetch(`http://localhost:5000/api/moods/${moodId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        alert('Mood deleted successfully!');
        loadMoodHistory(); // Refresh mood history
    } else {
        alert('Error deleting mood.');
    }
}

// Initialize app
fetchWeather();
loadMoodHistory();
