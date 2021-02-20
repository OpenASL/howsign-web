const colors = require("tailwindcss/colors");

export default class YouGlishWidget {
  constructor(id) {
    this.id = id;
    this.isReady = false;
  }
  ready() {
    return new Promise((resolve) => {
      if (this.isReady) {
        resolve(this.getWidget());
      } else {
        const youGlishTag = document.createElement("script");
        youGlishTag.src = "https://youglish.com/public/emb/widget.js";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(youGlishTag, firstScriptTag);
        // Called upon loading the youglish widget script
        function onYouglishAPIReady() {
          this.isReady = true;
          resolve(this.getWidget());
        }
        window.onYouglishAPIReady = onYouglishAPIReady.bind(this);
      }
    });
  }
  // NOTE: The YG.Widget needs to be re-instantiated after each search.
  //   Otherwise, the language gets reset.
  getWidget() {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return new YG.Widget(this.id, {
      components: 92, // controls+caption+speed+title
      autoStart: 0,
      backgroundColor: isDarkMode ? colors.coolGray[800] : colors.white,
      textColor: isDarkMode ? colors.coolGray[400] : colors.coolGray[500],
      captionColor: isDarkMode ? colors.coolGray[200] : colors.coolGray[500],
      markerColor: isDarkMode ? colors.amber[700] : colors.amber[200],
      linkColor: isDarkMode ? colors.indigo[300] : colors.indigo[600],
      keywordColor: colors.amber[500],
      queryColor: colors.amber[500],
    });
  }
  destroy() {
    document.getElementById(this.id).innerHTML = "";
  }
}
