// --- contacts popup ---

let popupContainer = document.querySelector(".contacts-popup").parentElement;

function showContactsPopup() {
    popupContainer.classList.remove("hidden");
}

function hideContactsPopup() {
    popupContainer.classList.add("hidden");
}

// --- gallery ---

let galleryViewport = document.querySelector(".gallery-viewport");

function showLargeImagePreview(image) {
    let box = image.getBoundingClientRect();

    galleryViewport.style.display = "block";
    galleryViewport.src = image.src;

    let left = box.left + image.width + 10 + window.pageXOffset + "px";
    let top = box.top + (image.height / 2) - (galleryViewport.height / 2) + window.pageYOffset + "px";

    galleryViewport.style.top = top;
    galleryViewport.style.left = left;
}

function hideLargeImagePreview() {
    galleryViewport.style.display = "none";
}

function addImagePreviewListener(image) {
    image.addEventListener("mouseenter", () => {
        showLargeImagePreview(image);
    });
    image.addEventListener("mouseleave", () => {
        hideLargeImagePreview();
    });
}

let galleryItems = Array.from(document.querySelector(".gallery").children);
galleryItems.forEach(item => addImagePreviewListener(item.children[0]));

// --- chat popup ---

let chatWindow = document.querySelector(".chat-window");
let chatMessageContainer = chatWindow.children[1];
let chatInput = chatWindow.children[2].children[0];
let chatSendButton = chatWindow.children[2].children[1];

function showChatPopup() {
    chatWindow.parentElement.classList.remove("hidden");
    chatInput.focus();
    createMessage("hey you, you're finally awake", false);
}

function hideChatPopup() {
    chatWindow.parentElement.classList.add("hidden");
}

let messageTemplate = document.querySelector("#chat-message-row-template");

function createMessage(text, fromUser) {
    let messageRow = messageTemplate.content
        .cloneNode(true).querySelector(".chat-message-row");

    messageRow.children[0].textContent = text;

    if (fromUser) {
        messageRow.classList.add("user-message");
    }

    messageRow.addEventListener("mouseenter",
        () => messageRow.children[1].classList.toggle("hidden"));
    messageRow.addEventListener("mouseleave",
        () => messageRow.children[1].classList.toggle("hidden"));
    messageRow.children[1].addEventListener("click",
        () => messageRow.remove());

    chatMessageContainer.appendChild(messageRow);
}

function sendMessage() {
    if (chatInput.value == "") {
        return;
    }

    let response = "";

    if (chatInput.value.startsWith(">")) {
        let parsedExpression = parse(chatInput.value.substring(1));
        response = parsedExpression();
    }
    else {
        response = generateResponse();
    }

    createMessage(chatInput.value, true);
    chatInput.value = "";
    chatInput.focus();

    createMessage(response, false);

    chatMessageContainer.scrollTop = chatMessageContainer.scrollHeight;
}

chatInput.addEventListener("keydown", (evt) => {
    if (!evt) {
        var evt = window.event;
    }

    if (evt.keyCode === 13) {
        sendMessage();
    }
}, false);

let adjectives = ["funny", "french", "thin", "cool", "dead", "impressive", "violent", "bearded", "angry"];
let nouns = ["toast", "legend", "suit", "lettuce", "chief", "bro", "missile", "helicopter", "sound", "view"];
let verbs = ["flew away", "dissolved into air", "was set on fire", "commited not alive", "turned around", "fell down", "rushed B", "went for a walk"];

function generateResponse() {
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    let result = "";
    result += getRandomItem(adjectives);
    result += " " + getRandomItem(nouns);
    result += " " + getRandomItem(verbs);
    return result;
}