(function () {
  var el = document.createElement("link");
  el.type = "text/css";
  el.rel = "stylesheet";
  el.href = "//assets.zendesk.com/external/zenbox/v2.5/zenbox.css";
  document.getElementsByTagName("head")[0].appendChild(el);
})();

(function () {
  var CHECK_FOR_ZENBOX_AFTER = 500,
    FAIL_AFTER_ATTEMPTS = 10,
    currentAttempt = 0;

  var checkForZenbox = function () {
    if (typeof (Zenbox) !== "undefined") {
  Zenbox.init({
    dropboxID:   "20193753",
    url:         "http://daleedgarbrand.zendesk.com",
    tabID:       "Support",
    tabColor:    "#78A300",
    tabPosition: "Left"
  });

    } else if (++currentAttempt < FAIL_AFTER_ATTEMPTS) {
      setTimeout(checkForZenbox, CHECK_FOR_ZENBOX_AFTER);
    }
  };
  setTimeout(checkForZenbox, CHECK_FOR_ZENBOX_AFTER);
})();
