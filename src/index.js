import page from "page";
import YouGlishWidget from "./youglish-widget";

page.configure({ window: window });
const $ = document.querySelector.bind(document);
const title = "howsign ❘ search multiple ASL dictionaries and videos";
const youGlishWidget = new YouGlishWidget("youglish-widget");

window.addEventListener("DOMContentLoaded", () => {
  const handspeak = $("#handspeak");
  const lifeprint = $("#lifeprint");
  const signingSavvy = $("#signingSavvy");
  const spreadTheSign = $("#spreadTheSign");
  const aslSignbank = $("#aslSignbank");
  const youglish = $("#youglish");
  const input = $("#search input");
  const ALL = [
    handspeak,
    lifeprint,
    signingSavvy,
    spreadTheSign,
    aslSignbank,
    youglish,
  ];
  page("*", (ctx) => {
    const params = new URLSearchParams(ctx.querystring);
    const term = params.get("s");
    if (term) {
      const termUpperCased = term.toUpperCase();
      input.value = termUpperCased;
      const encodedTerm = encodeURIComponent(term);
      handspeak.innerText = "🤲 Handspeak - Search results ↗";
      handspeak.href = `https://www.google.com/search?&q=site%3Ahandspeak.com+${encodedTerm}`;
      lifeprint.innerText = "🧬 Lifeprint - Search results ↗";
      lifeprint.href = `https://www.google.com/search?&q=site%3Alifeprint.com+${encodedTerm}`;
      signingSavvy.innerText = `🤝 SigningSavvy - Sign for ${termUpperCased} ↗`;
      signingSavvy.href = `https://www.signingsavvy.com/search/${encodedTerm}`;
      spreadTheSign.innerText = `🌐 Spread The Sign - ${termUpperCased} ↗`;
      spreadTheSign.href = `https://www.spreadthesign.com/en.us/search/?q=${encodedTerm}`;
      aslSignbank.innerText = `📜 ASL Signbank - ${termUpperCased} ↗`;
      aslSignbank.href = `https://aslsignbank.haskins.yale.edu/signs/search/?keyword=${encodedTerm}`;
      youglish.innerText = `📹 YouGlish - ASL videos with ${termUpperCased} ↗`;
      youglish.href = `https://youglish.com/pronounce/${encodedTerm}/signlanguage/asl`;

      youGlishWidget.ready().then((widget) => {
        widget.fetch(termUpperCased, "signlanguages", "asl");
      });

      document.title = `${termUpperCased} | howsign`;
    } else {
      ALL.forEach((elem) => {
        elem.innerText = "";
        elem.href = "#";
      });
      input.value = "";

      youGlishWidget.destroy();

      document.title = title;
    }
  });
  page();

  $("#search").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const term = formData.get("term").trim();
    term ? page(`/?s=${encodeURIComponent(term)}`) : page("/");
  });
});
