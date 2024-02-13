import page from "page";
import YouGlishWidget from "./youglish-widget";

page.configure({ window: window });
const $ = document.querySelector.bind(document);
const title = "howsign ❘ search multiple ASL dictionaries and videos";
const youGlishWidget = new YouGlishWidget("youglish-widget");

window.addEventListener("DOMContentLoaded", () => {
  const aslSignbank = $("#aslSignbank");
  const handspeak = $("#handspeak");
  const lifeprint = $("#lifeprint");
  const signingSavvy = $("#signingSavvy");
  const spreadTheSign = $("#spreadTheSign");
  const stemDictionary = $("#stemDictionary");
  const youglish = $("#youglish");
  const input = $("#search input");
  const ALL = [
    aslSignbank,
    handspeak,
    lifeprint,
    signingSavvy,
    spreadTheSign,
    youglish,
  ];
  page("*", (ctx) => {
    const params = new URLSearchParams(ctx.querystring);
    const term = params.get("s");
    if (term) {
      const termUpperCased = term.toUpperCase();
      input.value = termUpperCased;
      const encodedTerm = encodeURIComponent(term);
      const dasherized = term.replace(/\s+/g, "-");
      const encodedDasherizedTerm = encodeURIComponent(dasherized);
      aslCore.innerText = `🍃 ASLCORE - ${termUpperCased} ↗`;
      aslCore.href = `https://aslcore.org/search/?query=${termUpperCased}&architecture=1&art=1&biology=1&computerscience=1&engineering=1&literature=1&organicchemistry=1&philosophy=1&physics=1&sustainability=1`;
      aslSignbank.innerText = `📜 ASL Signbank - ${termUpperCased} ↗`;
      aslSignbank.href = `https://aslsignbank.haskins.yale.edu/signs/search/?keyword=${encodedTerm}`;
      handspeak.innerText = "🤲 Handspeak - Search results ↗";
      handspeak.href = `https://www.google.com/search?&q=site%3Ahandspeak.com+${encodedTerm}`;
      lifeprint.innerText = "🧬 Lifeprint - Search results ↗";
      lifeprint.href = `https://www.google.com/search?&q=site%3Alifeprint.com+${encodedTerm}`;
      signingSavvy.innerText = `🤝 SigningSavvy - Sign for ${termUpperCased} ↗`;
      signingSavvy.href = `https://www.signingsavvy.com/search/${encodedTerm}`;
      spreadTheSign.innerText = `🌐 Spread The Sign - ${termUpperCased} ↗`;
      spreadTheSign.href = `https://www.spreadthesign.com/en.us/search/?q=${encodedTerm}`;
      stemDictionary.innerText = `🔬 STEM Dictionary - ${termUpperCased} ↗`;
      stemDictionary.href = `https://deaftec.org/stem-dictionary/dictionary_term/${encodedDasherizedTerm}/`;
      youglish.innerText = `📹 YouGlish - ASL videos with ${termUpperCased} ↗`;
      youglish.href = `https://youglish.com/pronounce/${encodedTerm}/signlanguage/us`;

      youGlishWidget.ready().then((widget) => {
        widget.fetch(termUpperCased, "signlanguage", "us");
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
