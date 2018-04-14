'use strict';

class Patient {

    initialize(name, age, gender) {
        this.name = name;
        this.interview = {};
        this.interview.age = age;
        this.interview.sex = gender;
        this.interview.evidence = [];
        this.evidenceNames = [];
        this.searchResults = [];
        this.processAge();
        this.processGender();
    }

    processAge() {
        if (this.interview.age < 18) {
            this.interview.evidence.push({
                'id': 'p_65',
                'choice_id': 'present',
                'initial': true
            });
        } else if (this.interview.age > 40) {
            this.interview.evidence.push({
                'id': 'p_3',
                'choice_id': 'present',
                'initial': true
            });

            if (this.interview.age >= 45 && this.interview.age <= 55) {
                this.interview.evidence.push({
                    'id': 'p_4',
                    'choice_id': 'present',
                    'initial': true
                });
            } else if (this.interview.age > 60) {
                this.interview.evidence.push({
                    'id': 'p_5',
                    'choice_id': 'present',
                    'initial': true
                });
            }
        }
    }

    processGender() {
        if (this.interview.sex === 'female') {
            this.interview.evidence.push({
                'id': 'p_1',
                'choice_id': 'present',
                'initial': true
            });
        } else {
            this.interview.evidence.push({
                'id': 'p_2',
                'choice_id': 'present',
                'initial': true
            });
        }
    }

    processBMI() {
        // TODO: implement height/weight/bmi calcs
        const bmi = 35;
        if (bmi < 19) {
            this.interview.evidence.push({
                'id': 'p_6',
                'choice_id': 'present',
                'initial': true
            });
        } else if (bmi > 30) {
            this.interview.evidence.push({
                'id': 'p_7',
                'choice_id': 'present',
                'initial': true
            });
        }
    }
}