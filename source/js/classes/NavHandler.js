'use strict';

class NavHandler {
    constructor(app) {
        this.app = app;
    }

    run(e) {
        const id = $(event.target).data('clickable');;
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
        $('footer').removeClass('hide');
        $('.footer').removeClass('hide');
    }

    submitInterviewStart() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            errorElement: 'li',
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
            this.app.renderer.run('aside', 'interview-sidebar', this.app.patient);
            this.app.renderer.run('main', 'symptom-interview', this.app.patient);
        }
    }

    submitSymptoms() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            errorElement: 'li',
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
        }
    }

    submitSymptomMatcher() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            errorElement: 'li',
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
            this.app.patient.processMatchedSymptoms();
        }
    }

    startSymptomMatcher() {
        const results = this.app.patient.searchResults.shift();
        this.app.renderer.run('main', 'symptom-matcher', results);
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
            errorElement: 'li',
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
        const wrapper = { 'conditions': this.app.patient.conditions };
        this.app.renderer.run('main', 'show-conditions', wrapper);
    }

    submitQuestionAnswer() {
        const validator = $('form').validate({
            errorLabelContainer: '#errors',
            errorElement: 'li',
            rules: {
                'choice': {
                    require_from_group: [1, ".choice-group"]
                }
            },
            messages: {
                'choice': {
                    require_from_group: 'Please select an answer, or select "None" if none of the statements apply to you.'
                }
            }
        });
        if (validator.form()) {
            this.app.patient.processQuestionAnswer();
        }
    }

    startOver() {
        location.reload(true);
    }

    catchError() {
        $('aside').addClass('hide');
        this.app.renderer.run('main', 'error');
    }

    noSymptomsFound(phrase) {
        this.app.renderer.run('main', 'symptom-interview', this.app.patient);
        $('#errors').removeAttr('style').html('<p class="error">No information found for: "' + phrase + '".  Please try again.');
    }

    symptomsTryAgain(phrase) {
        this.app.renderer.run('main', 'symptom-interview', this.app.patient);
    }
}