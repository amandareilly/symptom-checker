function mainController() {
    let patient = new Patient();
    const navHandler = new NavHandler(patient);
    console.log(patient);
    //render the home page
    navHandler.renderer.run('header', 'header-home');
    navHandler.renderer.run('main', 'home');
    //listen for clicks on homepage buttons
    $('#main-container').on('click', '[data-clickable]', function(e) {
        e.preventDefault();
        navHandler.run(e);
    });
}
$(mainController);