'use strict';

class App {
    constructor() {
        this.patient = new Patient(this);
        this.interface = new InfermedicaHandler(this);
        this.nav = new NavHandler(this);
        this.renderer = new PageRenderer(this);
        this.riskInterview = new RiskFactorInterviewHandler(this);
    }
}