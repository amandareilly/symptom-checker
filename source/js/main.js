function mainController() {
    let patient = new Patient();
    const navHandler = new NavHandler();
    console.log(patient);
    //render the home page
    navHandler.renderer.run('header', 'header-home');
    navHandler.renderer.run('main', 'home');
    //listen for clicks on homepage buttons
    $('#main-container').on('click', '.js-clickable', function(e) {
        // patient = clickHandler(e, patient);
        e.preventDefault();
        navHandler.run(e, patient);
    });
}
$(mainController);