window.Platform = {
  init(nsName) {
    const ns = getNsObject(nsName);
    initLive(ns);
    initUpdateManager(ns);
    initUrlManager(ns);
    initQuery(ns);
    initMultisearch(ns);
  }
};
