async function load(html) {
    document.currentScript.insertAdjacentHTML('afterend', await (await fetch('/social-counts/assets/partials/' + html + '.html')).text());
}

window.Head = { load: () => load('head') };
window.Search_Top = { load: () => load('search.top') };
window.Sidebar = { load: () => load('sidebar') };
window.Footer = { load: () => load('footer') };