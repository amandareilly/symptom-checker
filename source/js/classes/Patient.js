'use strict';

class Patient {
    constructor(app) {
        this.app = app;
        this.interview = {
            'sex': null,
            'age': null,
            'evidence': []
        };
        this.presentEvidenceNames = [];
        this.absentEvidenceNames = [];
        this.searchResults = [];
        this.numCalls = 0;
        this.conditions = [];
    }

    initialize(name, age, gender) {
        this.name = name;
        this.interview.age = age;
        this.interview.sex = gender;
        this.processAge();
        console.log(this.app.riskInterview);
        this.processGender();
        console.log(this.app.riskInterview);
    }

    processAge() {
        if (this.interview.age < 18) {
            this.addEvidence('p_65', 'present', true);
        } else if (this.interview.age > 40) {
            this.addEvidence('p_3', 'present', true);

            if (this.interview.age >= 45 && this.interview.age <= 55) {
                this.addEvidence('p_4', 'present', true);
            } else if (this.interview.age > 60) {
                this.addEvidence('p_5', 'present', true);
            }
        }
    }

    processGender() {
        if (this.interview.sex === 'female') {
            this.addEvidence('p_1', 'present', true);
        } else {
            this.app.riskInterview.markInterviewUnavailable('femaleInterview');
            this.addEvidence('p_2', 'present', true);
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
        this.app.nav.startSymptomMatcher();
    }

    processMatchedSymptoms() {
        const checked = $('input:checked');
        const unchecked = $('input:not(:checked)');
        console.log(checked);
        console.log(unchecked);
        for (let symptom of checked) {
            console.log(symptom);
            console.log($(symptom));
            this.addEvidence(symptom.id, 'present', true, $(symptom).data('name'));
        }
        for (let symptom of unchecked) {
            this.addEvidence(symptom.id, 'absent', true, $(symptom).data('name'));
        }

        if (this.searchResults !== undefined && this.searchResults.length != 0) {
            this.runSymptomMatcher();
        } else {
            this.runRiskFactorInterview();
        }
    }

    addEvidence(id, presence, isInitial, name = null) {
        console.log(id);
        console.log(presence);
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
        this.app.renderer.run('aside', 'interview-sidebar', this);
    }

    runRiskFactorInterview() {
        this.app.nav.riskFactorStart();
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
            this.addEvidence(info[0], presence, true, name);
        }
        if (this.riskFactorInterview !== undefined && this.riskFactorInterview.length != 0) {
            this.app.nav.runRiskFactor();
        } else {
            this.app.nav.runDiagnosis();
        }
    }

    processDiagnosisData(data) {
        this.numCalls++;
        if (data.should_stop || this.numCalls > 30 || !data.question) {
            const promises = [];
            data.conditions.forEach(condition => {
                promises.push(this.app.interface.conditions(condition.id, condition.probability));
            });
            $.when.apply($, promises).then(
                function() {
                    this.showDiagnoses();
                }.bind(this.app.nav),
                function() {
                    this.app.nav.catchError();
                }.bind(this.app.nav));
            console.log(data);
            console.log(JSON.stringify(data));
            console.log(this);
        } else {
            console.log(data);
            console.log('process diagnosis data else');
            this.currentQuestion = data.question;
            this.app.renderer.run('main', 'question-form-' + this.currentQuestion.type, this.currentQuestion);
        }
    }

    processQuestionAnswer() {
        const selected = $(':checked');
        const inputs = $('input');
        const self = this;
        console.log(selected);
        this.app.renderer.run('main', 'loader');
        switch (this.currentQuestion.type) {
            case 'single':
                console.log('hit single');
                console.log(selected);
                this.addEvidence(this.currentQuestion.items[0].id, selected[0].id, false, this.currentQuestion.items[0].name);
                console.log(this.currentQuestion.type);
                console.log('question type single');
                this.app.nav.runDiagnosis();
                break;
            case 'group_single':
                console.log('hit group single');
                if (selected[0].id !== 'none' && selected[0].id != 'unknown') {
                    console.log(selected[0].id);
                    this.addEvidence(selected[0].id, 'present', false, selected[0].dataset.name);
                }
                console.log(this.currentQuestion.type);
                console.log('question type group_single');
                this.app.nav.runDiagnosis();
                break;
            case 'group_multiple':
                console.log('hit group multiple');
                inputs.each(function() {
                    console.log(this);
                    if (this.id !== 'none') {
                        let presence = 'absent';
                        if (this.checked) {
                            presence = 'present';
                        }
                        console.log(this.id);
                        self.addEvidence(this.id, presence, false, this.dataset.name);
                    }
                });
                console.log(this.currentQuestion.type);
                console.log('question type group_multiple');
                this.app.nav.runDiagnosis();
                break;
        }
    }
}