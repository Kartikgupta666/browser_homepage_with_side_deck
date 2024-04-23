async function success(pos) {
    const crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    // Call getCityName with the current latitude and longitude
    getCityName(crd.latitude, crd.longitude);
    const url = 'https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=26.229925&lon=78.153946&timezone=Asia%2FKolkata&language=en&units=auto';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6091cdd5ccmshedf307cba480572p1c1371jsn9473975e5f0a',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        document.querySelector("#temp").innerHTML = result.current.temperature;


    } catch (error) {
        console.error(error);
    }
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function getCityName(latitude, longitude) {
    const apiKey = 'e296f5c07e174cc396cae5a29dc53401'; // Replace with your OpenCage API key
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const city = data.results[0].components.city || data.results[0].components.town;
                console.log(`City Name: ${city}`);
                document.querySelector('#location').innerHTML = `${city}`;
            } else {
                console.error('Could not determine the city name.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

navigator.geolocation.getCurrentPosition(success);



// date shown function

let date = new Date();
let current_time = date.getHours() + ":" + date.getMinutes();
document.getElementById("time").innerHTML = current_time;

let current_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

document.getElementById("date").innerHTML = current_date;

if (date.getHours() > 24 || date.getHours() < 12) {
    wish = "Good morning";
    console.log("good morning")
}
else if (date.getHours() >= 24 || date.getHours() <= 3) {
    wish = "Good after-noon";
    console.log("good after-noon")
}

else {
    wish = "Good evening";
    console.log("good evening")
}

const text = `${wish} , Welcome Back to system... All functionalities are done`;
const typingSpeed = 50; // Adjust typing speed (milliseconds per character)

let charIndex = 0;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');

    if (charIndex < text.length) {
        typingElement.innerHTML += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        cursorElement.style.display = 'none'; // Hide cursor when typing finishes
    }
}


typeText();
function speak() {
    let textToSpeak = text;
    let speechSynthesis = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(textToSpeak);
    speechSynthesis.speak(utterance);
}
speak();