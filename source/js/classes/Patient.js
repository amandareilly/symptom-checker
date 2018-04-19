'use strict';

class Patient {
    constructor() {
        this.handler = new NavHandler(this);
        this.renderer = new PageRenderer();
        this.interface = new InfermedicaHandler(this);
        this.interview = {
            'sex': null,
            'age': null,
            'evidence': []
        };
        this.presentEvidenceNames = [];
        this.absentEvidenceNames = [];
        this.searchResults = [];
        this.riskFactorInterview = ['female', 'behavior', 'med', 'injury', 'location', 'misc'];
        this.numCalls = 0;
        this.conditions = [];
    }

    initialize(name, age, gender) {
        this.name = name;
        this.interview.age = age;
        this.interview.sex = gender;
        this.processAge();
        this.processGender();
    }

    processAge() {
        if (this.interview.age < 18) {
            this.addSymptom('p_65', 'present', true);
        } else if (this.interview.age > 40) {
            this.addSymptom('p_3', 'present', true);

            if (this.interview.age >= 45 && this.interview.age <= 55) {
                this.addSymptom('p_4', 'present', true);
            } else if (this.interview.age > 60) {
                this.addSymptom('p_5', 'present', true);
            }
        }
    }

    processGender() {
        if (this.interview.sex === 'female') {
            this.addSymptom('p_1', 'present', true);
        } else {
            this.riskFactorInterview.shift();
            this.addSymptom('p_2', 'present', true);
        }
    }

    processSearchFinished() {
        console.log(this);
        if (this.searchResults !== undefined && this.searchResults.length != 0) {
            this.runSymptomMatcher();
        } else {
            console.log('no search results');
        }
    }

    runSymptomMatcher() {
        this.handler.startSymptomMatcher();
    }

    processMatchedSymptoms() {
        const checked = $('input:checked');
        const unchecked = $('input:not(:checked)');
        console.log(checked);
        console.log(unchecked);
        for (let symptom of checked) {
            this.addSymptom(symptom.id, 'present', true, symptom.name);
        }
        for (let symptom of unchecked) {
            this.addSymptom(symptom.id, 'absent', true, symptom.name);
        }

        if (this.searchResults !== undefined && this.searchResults.length != 0) {
            this.runSymptomMatcher();
        } else {
            this.runRiskFactorInterview();
        }
    }

    addSymptom(id, presence, isInitial, name = null) {
        if (name) {
            if (presence === 'present') {
                this.presentEvidenceNames.push(name);
            } else {
                this.absentEvidenceNames.push(name);
            }
        }
        this.interview.evidence.push({
            'id': id,
            'choice_id': presence,
            'initial': isInitial
        });
        this.renderer.run('aside', 'interview-sidebar', this);
    }

    runRiskFactorInterview() {
        this.handler.riskFactorStart();
    }

    processRiskFactors() {
        const selected = $('input:checked');
        for (const element of selected) {
            const info = element.id.split('-');
            const name = element.name;
            let presence = 'present';
            if (info[1] === 'no') {
                presence = 'absent';
            }
            this.addSymptom(info[0], presence, true, name);
        }
        if (this.riskFactorInterview !== undefined && this.riskFactorInterview.length != 0) {
            this.handler.runRiskFactor();
        } else {
            this.handler.runDiagnosis();
        }
    }

    processDiagnosisData(data) {
        this.numCalls++;
        if (data.should_stop || this.numCalls > 9 || !data.question) {
            const promises = [];
            data.conditions.forEach(condition => {
                promises.push(this.interface.conditions(condition.id, condition.probability));
            });
            $.when.apply($, promises).then(
                function() {
                    this.showDiagnoses();
                }.bind(this.handler),
                function() {
                    this.handler.catchError();
                }.bind(this.handler));
            console.log(data);
            console.log(JSON.stringify(data));
            console.log(this);
        } else {
            console.log(data);
            console.log('process diagnosis data else');
            this.currentQuestion = data.question;
            this.renderer.run('main', 'question-form-' + this.currentQuestion.type, this.currentQuestion);
        }
    }

    processQuestionAnswer() {
        this.renderer.run('main', 'loader');
        switch (this.currentQuestion.type) {
            case 'single':
                var checked = $('input:checked');
                this.addSymptom(this.currentQuestion.items[0].id, checked.id, false, this.currentQuestion.items[0].name);
                console.log(checked);
                console.log(this.currentQuestion.type);
                console.log('question type single');
                this.handler.runDiagnosis();
                break;
            case 'group_single':
                var checked = $('input:checked');
                if (checked.id !== 'none' && checked.id != 'unknown') {
                    this.addSymptom(checked.id, 'present', false, checked.data('name'));
                }
                console.log(this.currentQuestion.type);
                console.log('question type group_single');
                this.handler.runDiagnosis();
                break;
            case 'group_multiple':
                $('input').each(function() {
                    console.log(this);
                    if (this.id !== 'none') {
                        let presence = 'absent';
                        if (this.is(':checked')) {
                            presence = 'present';
                        }
                        this.addSymptom(this.id, presence, false, this.data('name'));
                    }
                });
                console.log(this.currentQuestion.type);
                console.log('question type group_multiple');
                this.handler.runDiagnosis();
                break;
        }
    }
}