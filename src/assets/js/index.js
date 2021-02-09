import page from "page";
import qs from "qs";

const handspeak = document.getElementById("handspeak");
const lifeprint = document.getElementById("lifeprint");
const signingSavvy = document.getElementById("signingSavvy");
const spreadTheSign = document.getElementById("spreadTheSign");
const youglish = document.getElementById("youglish");
const input = document.getElementById("input");
const ALL = [handspeak, lifeprint, signingSavvy, spreadTheSign, youglish];

page.configure({ window: window });

window.addEventListener("load", () => {
  page("*", (ctx) => {
    const term = qs.parse(ctx.querystring).s;
    if (term) {
      const termUpperCased = term.toUpperCase();
      input.value = term.toUpperCase();
      const encodedTerm = encodeURIComponent(term);
      handspeak.innerText = "🤲 Handspeak - Search results ↗";
      handspeak.href = `https://www.google.com/search?&q=site%3Ahandspeak.com+${encodedTerm}`;
      lifeprint.innerText = "🧬 Lifeprint - Search results ↗";
      lifeprint.href = `https://www.google.com/search?&q=site%3Alifeprint.com+${encodedTerm}`;
      signingSavvy.innerText = `🤝 SigningSavvy - Sign for ${termUpperCased} ↗`;
      signingSavvy.href = `https://www.signingsavvy.com/search/${encodedTerm}`;
      spreadTheSign.innerText = `🌐 Spread The Sign - ${termUpperCased} ↗`;
      spreadTheSign.href = `https://www.spreadthesign.com/en.us/search/?q=${encodedTerm}`;
      youglish.innerText = `📹 YouGlish - ASL videos with ${termUpperCased} ↗`;
      youglish.href = `https://youglish.com/pronounce/${encodedTerm}/signlanguage/asl`;
    } else {
      ALL.forEach((elem) => {
        elem.innerText = "";
        elem.href = "#";
      });
      input.value = "";
    }
  });
  page();

  document.getElementById("search").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const term = formData.get("term");
    const encodedTerm = encodeURIComponent(term);
    page(`/?s=${encodedTerm}`);
  });
});
