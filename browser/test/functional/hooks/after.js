module.exports = function(done) {
    this.browser.end().then(done.bind({}, null))
};
