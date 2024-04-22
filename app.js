const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    speak("Initializing LEXIE..");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
}

// Update event listener to handle both click and touch events
btn.addEventListener('click', startRecognition);
btn.addEventListener('touchstart', startRecognition);

function startRecognition() {
    content.textContent = "Listening....";
    recognition.start();
}

function takeCommand(message) {
    if (message.includes('hi Lexie') || message.includes('hello Lexie')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com", "_blank");
    } else if (message.includes("open youtube")) {
        speak("Opening Youtube...");
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com", "_blank");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = encodeURIComponent(message.replace(" ", "+"));
        const finalURL = `https://www.google.com/search?q=${query}`;
        window.open(finalURL, "_blank");
        speak("Searching Google for " + message);
    } else if (message.includes('wikipedia')) {
        const topic = message.replace("wikipedia", "").trim();
        const finalURL = `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`;
        window.open(finalURL, "_blank");
        speak("Searching Wikipedia for " + topic);
    } else if (message.includes('what is the time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date for today')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('open calculator')) {
        speak("Opening Calculator...");
        window.open('Calculator:///');
    } else {
        const query = encodeURIComponent(message.replace(" ", "+"));
        const finalURL = `https://www.google.com/search?q=${query}`;
        window.open(finalURL, "_blank");
        speak("I found some information on Google for " + message);
    }
}
