'use strict';

class NavHandler {
    constructor(patient) {
        this.renderer = new PageRenderer();
        this.interface = new InfermedicaHandler(patient);
        this.patient = patient;
    }

    run(e) {
        // e.PreventDefault();
        console.log(this.patient);
        let id = e.originalEvent.path[0].id
            .replace(/(-.)/g, function(match) { return match[1].toUpperCase(); });
        this[id]();
    }

    diagnoseMe() {
        this.renderer.run('main', 'disclaimer');
    }

    findDoc() {
        console.log('Find a doctor was clicked');
        // TODO: implement.  Found on home page and in header of symptom Checker.
    }

    acceptDisclaimer() {
        $('aside').addClass('hidden');
        this.renderer.run('header', 'header-symptomChecker');
        this.renderer.run('main', 'interview-start');
        // TODO: implement disclaimer text
    }

    symCheckStartOver() {
        console.log('symptom checker start over link clicked');
        acceptDisclaimer();
    }

    submitInterviewStart() {
        this.patient.initialize(
            $('input[name=first-name]').val(),
            $('input[name=age]').val(),
            $('input[name=gender]:checked').val()
        );
        $('aside').removeClass('hidden');
        this.renderer.run('aside', 'interview-sidebar', this.patient);
        this.renderer.run('main', 'symptom-interview', this.patient);
        // TODO: implement function and error handling
    }

    submitSymptoms() {
        const symptoms = $('textarea').val();
        this.renderer.run('main', 'loader', this.patient);
        this.interface.call('parse', { 'phrase': symptoms, 'patient': this.patient });
        console.log('called parse symptoms');
        //TODO: implement and re-code for new setup
    }

    submitSymptomMatcher() {
        console.log('symptom matcher submitted');
        this.patient.processMatchedSymptoms();
    }

    startSymptomMatcher() {
        console.log('symptom matcher running');
        this.renderer.run('main', 'symptom-matcher', this.patient.searchResults.shift());
        console.log(this.patient);
    }

    riskFactorStart() {
        this.renderer.run('main', 'risk-factor-intro', this.patient);
    }

    runRiskFactor() {
        const interview = this.patient.riskFactorInterview.shift();
        const datastore = new DataStore();
        this.renderer.run('main', 'risk-factor-interview', datastore.get(interview));
    }

    submitRiskFactors() {
        this.patient.processRiskFactors();
    }

    runDiagnosis() {
        this.renderer.run('main', 'loader');
        // this.interface.diagnosis();
        //uncomment line above and remove lines below for production code
        if (this.patient.numCalls === 0) {
            this.patient.processDiagnosisData(response1);
        } else if (this.patient.numCalls === 1) {
            this.patient.processDiagnosisData(response2);
        } else if (this.patient.numCalls === 2) {
            this.patient.processDiagnosisData(response3);
        } else {
            this.patient.processDiagnosisData(response4);
        }
    }

    showDiagnoses() {
        console.log('SHOW DIAGNOSES');
        console.log(this.patient.conditions);
        const wrapper = { 'conditions': this.patient.conditions };
        console.log(wrapper);
        this.renderer.run('main', 'show-conditions', wrapper);
    }

    submitQuestionAnswer() {
        console.log('question submission received');
        this.patient.processQuestionAnswer();
    }

    startOver() {
        location.reload(true);
    }

    catchError() {
        $('aside').toggleClass('hidden');
        this.renderer.run('main', 'error');
    }
}