'use strict';

class NavHandler {
    constructor(patient) {
        this.renderer = new PageRenderer();
        this.interface = new InfermedicaHandler(patient);
        this.patient = patient;
        console.log('************');
        this.riskFactorInterview = new RiskFactorInterviewHandler(patient, this.renderer, 'NavHandler');
        console.log('risk factor interview initialized');
        console.log('************');
    }

    run(e) {
        // e.PreventDefault();
        console.log(this.patient);
        const id = $(event.target).data('clickable');
        // let id = e.originalEvent.path[0].id
        //     .replace(/(-.)/g, function(match) { return match[1].toUpperCase(); });
        this[id]();
    }

    diagnoseMe() {
        this.renderer.run('main', 'disclaimer');
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
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            messages: {
                'first-name': {
                    required: 'Please enter your name.',
                    minlength: 'Name must be at least 2 characters.'
                },
                'age': {
                    required: 'Please enter your age.'
                },
                'gender': {
                    required: 'Please select your sex.'
                }
            }
        });
        if (validator.form()) {
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
    }

    submitSymptoms() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            messages: {
                'enter-symptoms': {
                    required: 'Please tell me about your symptoms.'
                }
            }
        });
        if (validator.form()) {
            const symptoms = $('textarea').val();
            this.renderer.run('main', 'loader', this.patient);
            this.interface.call('parse', { 'phrase': symptoms, 'patient': this.patient });
            console.log('called parse symptoms');
            //TODO: implement and re-code for new setup
        }
    }

    submitSymptomMatcher() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            rules: {
                'symptom': {
                    require_from_group: [1, ".symptom-group"]
                }
            },
            messages: {
                'symptom': {
                    require_from_group: 'Please select one or more of the following symptoms.'
                }
            }
        });
        if (validator.form()) {
            console.log('symptom matcher submitted');
            this.patient.processMatchedSymptoms();
        }
    }

    startSymptomMatcher() {
        console.log('symptom matcher running');
        console.log(this.patient);
        const results = this.patient.searchResults.shift();
        console.log(results);
        this.renderer.run('main', 'symptom-matcher', results);
        console.log(this.patient);
    }

    riskFactorStart() {
        this.renderer.run('main', 'risk-factor-intro', this.patient);
    }

    runRiskFactorInterview() {
        this.riskFactorInterview.run();
    }

    submitRiskFactors() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            rules: {
                'choice': {
                    require_from_group: [1, ".risk-factor-group"]
                }
            },
            messages: {
                'choice': {
                    require_from_group: 'If none of the statements apply to you, please select "None".'
                }
            }
        });
        if (validator.form()) {
            this.riskFactorInterview.processInterviewAnswers();
        }
    }

    riskFactorInterviewComplete() {
        this.runDiagnosis();
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