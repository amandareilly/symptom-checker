'use strict';

class DataStore {
    constructor() {
        this.behavior = behaviorRiskFactors;
        this.behavior.hasQuestions = true;
        this.female = femaleRiskFactors;
        this.female.hasQuestions = true;
        this.injury = injuryRiskFactors;
        this.injury.hasQuestions = false;
        this.injury.prompt = 'Have you recently experienced any of the following injuries?'
        this.med = medRiskFactors;
        this.med.hasQuestions = true;
        this.misc = miscRiskFactors;
        this.misc.hasQuestions = true;
        this.location = locationRiskFactors;
        this.location.hasQuestions = false;
        this.location.prompt = 'Do you live in, or have you recently spent time in, any of the following locations?'
        console.log(this);
    }

    get(type) {
        console.log(type);
        console.log(this[type]);
        return this[type];
    }
}