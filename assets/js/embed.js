(function () {
  const API = "https://socialcounts-api.falchus.com/";

  const params = new URLSearchParams(location.search);
  const hashData = parseHash();
  const type = params.get("type") || "user";
  let platformKey = PlatformRegistry.normalizeKey(params.get("platform") || PlatformRegistry.DEFAULT_KEY);
  if (platformKey === "yt" && type === "video") platformKey = "yt-video";

  const config = PLATFORMS[platformKey];
  const profile = document.getElementById("profile");
  const nameEl = document.getElementById("name");
  const statEl = document.querySelector("#root .counter h1");
  const id = params.get("id") || hashData.id || "";
  const statParam = params.get("stat") || hashData.stat;

  if (!config || !statEl) return;

  document.body.style.cursor = "pointer";

  const stat = statParam && config.layout.stats[statParam] ? statParam : config.layout.default;
  statEl.id = stat;

  const odometer = new Odometer({
    el: statEl,
    value: 0,
    format: "(,ddd)",
    theme: "minimal"
  });

  let nextPoll = config.poll;

  function counterUrl() {
    let url = PlatformRegistry.pagePath(platformKey);
    if (!id) return url;
    url += "#!/" + id;
    if (stat !== config.layout.default) {
      url += "?stat=" + encodeURIComponent(stat);
    }
    return url;
  }

  function applyMeta(data) {
    if (!data) return;
    if (data.picture) {
      profile.src = data.picture;
      profile.hidden = false;
    }
    if (data.name) {
      if (config.nameHtml) {
        nameEl.innerHTML = data.name;
      } else {
        nameEl.textContent = data.name;
      }
      nameEl.hidden = false;
    }
  }

  function poll() {
    if (!id) return;
    $.getJSON(API + config.api + "/" + encodeURIComponent(id))
      .done(function (data) {
        if (!data) {
          nextPoll = config.poll;
          setTimeout(poll, nextPoll);
          return;
        }
        applyMeta(data);
        if (data.statistics && data.statistics[stat] != null) {
          odometer.update(data.statistics[stat]);
        }
        nextPoll = (data.update && data.update.next) || config.poll;
        setTimeout(poll, nextPoll);
      }).fail(function () {
        nextPoll = config.poll;
        setTimeout(poll, nextPoll);
      });
  }

  document.body.onclick = function () {
    location.href = counterUrl();
  };

  poll();
})();
