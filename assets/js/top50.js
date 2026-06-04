$(function () {
  let lastIds;

  function load() {
    const grid = document.getElementById("secondary");
    $.getJSON(API + "youtube/user/top/50")
      .done(ids => {
        if (!grid || !Array.isArray(ids)) return;

        if (lastIds?.length === ids.length && ids.every((id, i) => id === lastIds[i])) return;
        lastIds = ids;

        ids.forEach((id, i) => {
          let card = grid.querySelector('[data-id="' + id + '"]');
          if (!card) {
            card = document.createElement("div");
            card.className = "card m-b-0 position-relative";
            card.dataset.id = id;
            const iframe = document.createElement("iframe");
            iframe.src = "/social-counts/embed/?id=" + encodeURIComponent(id);
            iframe.loading = "lazy";
            card.appendChild(iframe);
          }
          if (grid.children[i] !== card) {
            grid.insertBefore(card, grid.children[i]);
          }
        });

        grid.querySelectorAll(".card[data-id]").forEach(card => {
          if (ids.indexOf(card.dataset.id) === -1) {
            card.remove();
          }
        });
      }).fail(() => {
        if (grid && !grid.children.length) {
          grid.innerHTML = '<div class="card-block text-center text-muted">Failed to load.</div>';
        }
      });
  }
  load();
  setInterval(load, 300000);
});
