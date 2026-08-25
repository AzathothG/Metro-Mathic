const windowContainer = new Object();

function musicAutoplay() {
        music.muted = false;
        music.play();

        document.removeEventListener("click", musicAutoplay);
        document.removeEventListener("keydown", musicAutoplay);
};

function windowInitialize(windowIdentifier, windowContentInitialize) {
    let window = windowContainer[windowIdentifier];

    window = document.createElement("div");
    window.id = windowIdentifier + "-container";
    window.classList.add("window");

    window.backgroundTransition = document.createElement("div");
    window.backgroundTransition.classList.add("window-background-transition");
    window.backgroundTransition.appendChild(document.createElement("div"));
    window.appendChild(window.backgroundTransition);

    window.backgroundGradient = document.createElement("div");
    window.backgroundGradient.classList.add("window-background-gradient");
    window.appendChild(window.backgroundGradient);

    window.content = document.createElement("div");
    window.content.classList.add("window-content");

    if (typeof windowContentInitialize === "function") {
        window.content = windowContentInitialize(window.content);
    };

    window.appendChild(window.content);

    windowContainer[windowIdentifier] = window;

    return window;
};

function windowSwitch(windowIdentifier) {
    let window = windowContainer[windowIdentifier];
    let currentWindow = document.querySelector(".window");

    function windowLoad() {
        window.classList.add("window-fade-in");
        document.body.appendChild(window);

        setTimeout(() => {
            window.classList.remove("window-fade-in");
        }, 1000);
    };

    if (currentWindow) {
        currentWindow.classList.add("window-fade-out");

        setTimeout(() => {
            currentWindow.remove();
            currentWindow.classList.remove("window-fade-out");

            windowLoad();
        }, 1000);
    } else {
        windowLoad();
    };

    return window;
};

windowInitialize("menu", (content) => {
    content.logo = document.createElement("h1");
    content.logo.id = "menu-logo";
    content.logo.innerHTML = "<div>Metro</div><div>Mathic</div>";
    content.appendChild(content.logo);

    content.buttonPlay = document.createElement("button");
    content.buttonPlay.id = "menu-button-play";
    content.buttonPlay.innerHTML = "<span>Start</span>";
    content.buttonPlay.addEventListener("click", () => windowSwitch("play"));
    content.appendChild(content.buttonPlay);

    return content;
});

windowInitialize("play", (content) => {
    content.navigationContainer = document.createElement("div");
    content.navigationContainer.id = "play-navigation-container";

    content.navigationContainer.buttonBack = document.createElement("button");
    content.navigationContainer.buttonBack.id = "play-navigation-button-back";
    content.navigationContainer.buttonBack.innerHTML = "<img src=\"./assets/button-icon-back.svg\" width=\"30px\" height=\"30px\">";
    content.navigationContainer.buttonBack.addEventListener("click", () => windowSwitch("menu"));
    content.navigationContainer.appendChild(content.navigationContainer.buttonBack);

    content.navigationContainer.windowTitle = document.createElement("h1");
    content.navigationContainer.windowTitle.id = "play-navigation-window-title";
    content.navigationContainer.windowTitle.innerHTML = "Choose Difficulty";
    content.navigationContainer.appendChild(content.navigationContainer.windowTitle);

    content.appendChild(content.navigationContainer);

    content.buttonEasy = document.createElement("button");
    content.buttonEasy.id = "play-button-easy";
    content.buttonEasy.innerHTML = "<span>Easy</span>";
    content.buttonEasy.addEventListener("click", () => windowSwitch("game"));
    content.appendChild(content.buttonEasy);

    return content;
});

windowInitialize("game", (content) => {
    content.navigationContainer = document.createElement("div");
    content.navigationContainer = "game-navigation-container";

    content.navigationContainer.buttonBack = document.createElement("button");
    content.navigationContainer.buttonBack.id = "game-navigation-button-back";
    content.navigationContainer.buttonBack.innerHTML = "<img src=\"./assets/button-icon-back.svg\" width=\"30px\" height=\"30px\">";
    content.navigationContainer.buttonBack.addEventListener("click", () => windowSwitch("play"));
    content.navigationContainer.appendChild(content.navigationContainer.buttonBack);

    content.navigationContainer.windowTitle = document.createElement("h1");
    content.navigationContainer.windowTitle.id = "game-navigation-window-title";
    content.navigationContainer.windowTitle.innerHTML = "Playing Easy Mode";
    content.navigationContainer.appendChild(content.navigationContainer.windowTitle);

    content.appendChild(content.navigationContainer);
});

const music = new Audio("./assets/music.mp3");

music.muted = true;
music.loop = true;

document.addEventListener("click", musicAutoplay);
document.addEventListener("keydown", musicAutoplay);

document.addEventListener("DOMContentLoaded", () => {
    windowSwitch("menu");
});