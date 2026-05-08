async function load(html) {
    document.currentScript.insertAdjacentHTML('afterend', await (await fetch('/youtube-realtime/assets/partials/' + html + '.html')).text());
}

window.Head = { load: () => load('head') };
window.Footer = { load: () => load('footer') };