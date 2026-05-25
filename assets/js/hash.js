window.parseHash = function () {
  let raw = location.hash.split("!/")[1] || "";
  raw = raw.split("$$")[0];
  const q = raw.indexOf("?");
  if (q === -1) {
    return {
      id: raw,
      stat: null
    };
  }
  return {
    id: raw.slice(0, q),
    stat: new URLSearchParams(raw.slice(q)).get("stat")
  };
};

window.parseCompareHash = function () {
  let raw = location.hash.split("!/")[1] || "";
  const q = raw.indexOf("?");
  if (q !== -1) raw = raw.slice(0, q);
  const parts = raw.split("$$");
  return { a: parts[0] || "", b: parts[1] || "" };
};
