'use strict';

class Patient {
    constructor() {
        this.handler = new NavHandler(this);
        this.renderer = new PageRenderer();
        this.interface = new InfermedicaHandler(this);
        this.interview = {};
        this.interview.evidence = [];
        this.presentEvidenceNames = [];
        this.absentEvidenceNames = [];
        this.searchResults = [];
        this.riskFactorInterview = ['female', 'behavior', 'med', 'injury', 'location', 'misc'];
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

        this.renderer.run('aside', 'interview-sidebar', this);

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
            'present': presence,
            'initial': isInitial
        });
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
            console.log('risk factor done')
        }
    }
}