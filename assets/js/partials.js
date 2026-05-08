async function load(url) {
    document.currentScript.insertAdjacentHTML('afterend', await (await fetch(url)).text());
}

window.Head = { load: () => load('/youtube-realtime/assets/partials/head.html') };
window.Footer = { load: () => load('/youtube-realtime/assets/partials/footer.html') };