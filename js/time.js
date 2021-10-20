var time_block,
  clock_elem,
  date_elem,
  avail_height,
  dayofweek = ["日)", "月)", "火)", "水)", "木)", "金)", "土)"],
  usTime = !1,
  showTime = !0,
  use24HourClock = !0,
  font = "KosugiMaru-Regular",
  font_weight = "-Regular",
  sunrise = 365,
  sunset = 1155,
  sunrise_duration = 10,
  currentMinute = 0;
function rescaleWindow() {
  (avail_height = screen.availHeight),
    (time_block.style.bottom =
      Math.max(screen.height - avail_height + 10, 0.02 * screen.height) + "px");
}
function load() {
  (time_block = document.getElementById("time")),
    (clock_elem = document.getElementById("clock")),
    (date_elem = document.getElementById("date")),
    rescaleWindow(),
    update(),
    dayCheck(),
    setInterval(update, 1e3);
}
function formatHours(e) {
  var t = "";
  return (
    use24HourClock
      ? (t += ("0" + e).slice(-2))
      : ((hour = 0 == e ? 12 : e > 12 ? e - 12 : e),
        (t += ("0" + hour).slice(-2))),
    t
  );
}
function update() {
  var e = new Date();
  e.getMinutes() != currentMinute &&
    ((currentMinute = e.getMinutes()), dayCheck()),
    showTime &&
      (screen.availHeight != avail_height && rescaleWindow(),
      (clock_elem.innerHTML =
        formatHours(e.getHours()) + ":" + ("0" + e.getMinutes()).slice(-2)),
      (date_elem.innerHTML = usTime
        ? e.getMonth() +
          1 +
          "/" +
          e.getDate() +
          "/" +
          e.getFullYear() +
          " " +
          dayofweek[e.getDay()]
        : e.getFullYear() +
          "年" +
          (e.getMonth() + 1) +
          "月" +
          e.getDate() +
          "日 (" +
          dayofweek[e.getDay()]));
}
function dayCheck() {
  let e = new Date(),
    t = 60 * e.getHours() + e.getMinutes();
  var i;
  (i =
    t < sunrise
      ? "url(./media/night01.jpg)"
      : sunrise <= t && t < sunset && t < sunrise + sunrise_duration
      ? "url(./media/sunset01.jpg)"
      : t < sunset
      ? "url(./media/day01.jpg)"
      : sunset <= t && t < sunset + sunrise_duration
      ? "url(./media/sunset01.jpg)"
      : "url(./media/night01.jpg)"),
    (document.body.style.backgroundImage = i);
}
window.wallpaperPropertyListener = {
  applyUserProperties: function (e) {
    if (
      (e.showTime &&
        ((showTime = e.showTime.value),
        (time_block.style.visibility = showTime ? "visible" : "collapse")),
      e.sunrise)
    ) {
      let t = e.sunrise.value.split(":"),
        i = 60 * (parseInt(t[0]) % 24) + (parseInt(t[1]) % 60);
      i > 0 && ((sunrise = i), (currentMinute = -1));
    }
    if (e.sunset) {
      let t = e.sunset.value.split(":"),
        i = 60 * (parseInt(t[0]) % 24) + (parseInt(t[1]) % 60);
      i > 0 && i > sunrise && ((sunset = i), (currentMinute = -1));
    }
    if (e.sunriseTime) {
      let t = parseInt(e.sunriseTime.value) % 241;
      (sunrise_duration = t > 0 ? t : 10), (currentMinute = -1);
    }
    if (e.customTime) {
      let t = e.customTime.value;
      use24HourClock = t;
    }
    if (e.dateFormat) {
      let t = e.dateFormat.value;
      1 == t
        ? ((usTime = !1),
          (date_elem.style.fontSize = ".5em"),
          (dayofweek = ["日)", "月)", "火)", "水)", "木)", "金)", "土)"]))
        : 2 == t
        ? ((usTime = !1),
          (date_elem.style.fontSize = ".5em"),
          (dayofweek = ["日)", "一)", "二)", "三)", "四)", "五)", "六)"]))
        : ((usTime = !0),
          (date_elem.style.fontSize = ".45em"),
          (dayofweek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ]));
    }
    if (e.clockSize) {
      let t = e.clockSize.value + "em";
      time_block.style.fontSize = t;
    }
    if (e.fontType) {
      let t = e.fontType.value;
      1 == t
        ? ((font = "KosugiMaru-Regular"),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"))
        : 2 == t
        ? ((font = "Kosugi-Regular"),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"))
        : 3 == t
        ? ((font = "SawarabiMincho"),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"))
        : 4 == t
        ? ((font = "MPLUS1p" + font_weight),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "1.8em"))
        : 5 == t
        ? ((font = "MPLUSRounded1c" + font_weight),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "1.8em"))
        : 6 == t
        ? ((font = "NotoSansJP" + font_weight),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"))
        : 7 == t
        ? ((font = "NotoSerifJP" + font_weight),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"))
        : ((font = "KosugiMaru-Regular"),
          (time_block.style.fontFamily = font),
          (clock_elem.style.fontSize = "2em"));
    }
    if (e.fontWeight) {
      let t = e.fontWeight.value;
      (font_weight = t),
        (font = font.split("-")[0] + t),
        (time_block.style.fontFamily = font);
    }
  },
};


