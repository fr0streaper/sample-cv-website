let popupContainer = document.querySelector(".contacts-popup").parentElement;

function showContactsPopup() {
    popupContainer.classList.remove("hidden");
}

function hideContactsPopup() {
    popupContainer.classList.add("hidden");
}

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