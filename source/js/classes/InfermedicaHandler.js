'use strict';

class InfermedicaHandler {
    constructor(patient) {
        this.patient = patient;
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
                this.patient.handler.catchError();
            }.bind(this)
        };

        console.log(this.patient);
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
        console.log(this.patient);
        this.patient.searchResults.push({ data, params });
        if (params.last) {
            this.patient.processSearchFinished();
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

    diagnosis() {
        const url = this.url + 'diagnosis';
        const settings = Object.assign(this.settings);
        settings.data = JSON.stringify(this.patient.interview);
        settings.method = 'POST';
        settings.success = function(data) {
            this.patient.processDiagnosisData(data);
        }.bind(this);
        $.ajax(url, settings);
        console.log(JSON.stringify(this.patient.interview));
        console.log(this.patient.interview);
    }

    conditions(id, probability) {
        const url = this.url + 'conditions/' + id;
        const settings = Object.assign(this.settings);
        settings.method = 'GET';
        settings.success = function(data) {
            data.probability = probability;
            this.patient.conditions.push(data);
        }.bind(this);
        return $.ajax(url, settings);
    }
}