'use strict';

class NavHandler {
    constructor() {
        this.renderer = new PageRenderer();
        this.interface = new InfermedicaHandler();
    }

    run(e, patient) {
        // e.PreventDefault();
        console.log(patient);
        let id = e.originalEvent.path[0].id
            .replace(/(-.)/g, function(match) { return match[1].toUpperCase(); });
        this[id](patient);
    }

    diagnoseMe(patient) {
        this.renderer.run('main', 'disclaimer');
    }

    findDoc(patient) {
        console.log('Find a doctor was clicked');
        // TODO: implement.  Found on home page and in header of symptom Checker.
    }

    acceptDisclaimer(patient) {
        this.renderer.run('header', 'header-symptomChecker');
        this.renderer.run('main', 'interview-start');
        // TODO: implement disclaimer text
    }

    symCheckStartOver(patient) {
        console.log('symptom checker start over link clicked');
        //TODO: implement.  found in header of symptom checker
    }

    submitInterviewStart(patient) {
        patient.initialize(
            $('input[name=first-name]').val(),
            $('input[name=age]').val(),
            $('input[name=gender]:checked').val()
        );
        $('aside').removeClass('hidden');
        this.renderer.run('aside', 'interview-sidebar', patient);
        this.renderer.run('main', 'symptom-interview', patient);
        // TODO: implement function and error handling
    }

    submitSymptoms(patient) {
        const symptoms = $('textarea').val();
        this.renderer.run('main', 'loader', patient);
        this.interface.call('parse', { 'token': symptoms, 'patient': patient });
        console.log('called parse symptoms');
        //TODO: implement and re-code for new setup
    }

    renderSymptomMatcher() {
        console.log('symptom matcher running');
        this.renderer.run('main', 'symptom-matcher');
    }
}