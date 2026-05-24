async function load(html) {
    document.currentScript.insertAdjacentHTML('afterend', await (await fetch('/social-counts/assets/partials/' + html + '.html')).text());
    document.dispatchEvent(new CustomEvent('partial-load', {
        detail: html
    }));
}

window.Head = { load: () => load("head") };
window.Navbar = { load: () => load("navbar") };
window.Sidebar = { load: () => load("sidebar") };
window.Chart = { load: () => load("chart") };
window.Footer = { load: () => load("footer") };