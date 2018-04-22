'use strict';

class NavHandler {
    constructor(app) {
        this.app = app;
    }

    run(e) {
        // e.PreventDefault();
        console.log(this.app.patient);
        const id = $(event.target).data('clickable');
        // let id = e.originalEvent.path[0].id
        //     .replace(/(-.)/g, function(match) { return match[1].toUpperCase(); });
        this[id]();
    }

    diagnoseMe() {
        this.app.renderer.run('header', 'header-disclaimer');
        this.app.renderer.run('main', 'disclaimer');
    }

    acceptDisclaimer() {
        this.app.renderer.run('header', 'header-symptomChecker');
        this.app.renderer.run('main', 'interview-start');
        this.app.renderer.run('footer', 'footer');
        $('footer').removeClass('hidden');
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
            this.app.patient.initialize(
                $('input[name=first-name]').val(),
                $('input[name=age]').val(),
                $('input[name=gender]:checked').val()
            );
            $('aside').removeClass('hidden');
            this.app.renderer.run('aside', 'interview-sidebar', this.app.patient);
            this.app.renderer.run('main', 'symptom-interview', this.app.patient);
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
            this.app.renderer.run('main', 'loader', this.app.patient);
            this.app.interface.call('parse', { 'phrase': symptoms, 'patient': this.app.patient });
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
            this.app.patient.processMatchedSymptoms();
        }
    }

    startSymptomMatcher() {
        console.log('symptom matcher running');
        console.log(this.app.patient);
        const results = this.app.patient.searchResults.shift();
        console.log(results);
        this.app.renderer.run('main', 'symptom-matcher', results);
        console.log(this.app.patient);
    }

    riskFactorStart() {
        this.app.renderer.run('main', 'risk-factor-intro', this.app.patient);
    }

    runRiskFactorInterview() {
        this.app.riskInterview.run();
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
            this.app.riskInterview.processInterviewAnswers();
        }
    }

    riskFactorInterviewComplete() {
        this.runDiagnosis();
    }

    runDiagnosis() {
        this.app.renderer.run('main', 'loader');
        this.app.interface.diagnosis();
    }

    showDiagnoses() {
        console.log('SHOW DIAGNOSES');
        console.log(this.app.patient.conditions);
        const wrapper = { 'conditions': this.app.patient.conditions };
        console.log(wrapper);
        this.app.renderer.run('main', 'show-conditions', wrapper);
    }

    submitQuestionAnswer() {
        console.log('question submission received');
        this.app.patient.processQuestionAnswer();
    }

    startOver() {
        location.reload(true);
    }

    catchError() {
        $('aside').addClass('hidden');
        this.app.renderer.run('main', 'error');
    }

    noSymptomsFound(phrase) {
        console.log("No Symptoms Found");
        this.app.renderer.run('main', 'symptom-interview', this.app.patient);
        $('#errors').removeAttr('style').html('<p class="error">No information found for: "' + phrase + '".  Please try again.');
    }

    symptomsTryAgain(phrase) {
        this.app.renderer.run('main', 'symptom-interview', this.app.patient);
    }
}