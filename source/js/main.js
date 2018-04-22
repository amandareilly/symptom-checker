function mainController() {
    const app = new App();
    //render the home page
    app.renderer.run('header', 'header-home');
    app.renderer.run('main', 'home');
    //listen for clicks 
    $('#main-container').on('click', '[data-clickable]', function(e) {
        e.preventDefault();
        app.nav.run(e);
    });
}
$(mainController);