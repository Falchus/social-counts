async function load(url) {
    document.currentScript.insertAdjacentHTML('afterend', await (await fetch(url)).text());
}

window.Head = { load: () => load('/assets/partials/head.html') };
window.Footer = { load: () => load('/assets/partials/footer.html') };