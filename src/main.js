const wordCloud = new WordCloud({
    el: document.getElementById('container'),
    initWords: data
});
wordCloud.render();