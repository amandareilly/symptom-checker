'use strict';

class InfermedicaHandler {
    constructor(app) {
        this.app = app;
        this.url = 'https://api.infermedica.com/v2/';
        this.settings = {
            'beforeSend': function(xhr) {
                xhr.setRequestHeader('App-Id', '1717e9ee');
                xhr.setRequestHeader('App-Key', 'ee323adeefe3ea79f136069988aed75a');
                xhr.setRequestHeader('Dev-Mode', true);
            },
            'contentType': 'application/json',
            'error': function(XMLHttpRequest) {
                console.log(XMLHttpRequest);
                this.app.nav.catchError();
            }.bind(this)
        };

        console.log(this.app.patient);
    }

    call(endpoint, params) {
        this[endpoint](params);
    }

    search(params) {
        console.log(params);
        const url = this.url + 'search';
        const settings = Object.assign(this.settings);
        settings.data = {
            'phrase': params.phrase,
        };
        settings.method = 'GET';
        settings.success = function(data) {
            this.processSearch(data, params);
        }.bind(this);
        $.ajax(url, settings);
    }

    processSearch(data, params) {
        console.log(this.app.patient);
        this.app.patient.searchResults.push({ data, params });
        if (params.last) {
            this.app.patient.processSearchFinished();
        }
    }

    parse(params) {
        console.log(params);
        const url = this.url + 'parse';
        const settings = Object.assign(this.settings);
        settings.data = JSON.stringify({
            'text': params.phrase
        });
        settings.method = 'POST';
        settings.success = function(data) {
            this.processParse(data, params);
        }.bind(this);
        $.ajax(url, settings);
    }

    processParse(data, params) {
        console.log(params);
        console.log(data);
        const found = data.mentions;
        console.log(found);
        if (found.length === 0) {
            console.log(this.app.nav);
            this.app.nav.noSymptomsFound(params.phrase);
        } else {
            for (let i = 0; i < found.length; i++) {
                let newParams = {
                    'phrase': found[i]['common_name'],
                    'parseData': found[i]
                };
                if (i === found.length - 1) {
                    newParams.last = true;
                }
                this.call('search', newParams);
            }
        }
    }

    diagnosis() {
        const url = this.url + 'diagnosis';
        const settings = Object.assign(this.settings);
        settings.data = JSON.stringify(this.app.patient.interview);
        settings.method = 'POST';
        settings.success = function(data) {
            this.app.patient.processDiagnosisData(data);
        }.bind(this);
        $.ajax(url, settings);
        console.log(JSON.stringify(this.app.patient.interview));
        console.log(this.app.patient.interview);
    }

    conditions(id, probability) {
        const url = this.url + 'conditions/' + id;
        const settings = Object.assign(this.settings);
        settings.method = 'GET';
        settings.success = function(data) {
            data.probability = probability;
            this.app.patient.conditions.push(data);
        }.bind(this);
        return $.ajax(url, settings);
    }
}