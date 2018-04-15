'use strict';

class InfermedicaHandler {
    constructor(patient) {
        this.url = 'https://api.infermedica.com/v2/';
        this.settings = {
            'beforeSend': function(xhr) {
                xhr.setRequestHeader('App-Id', '1717e9ee');
                xhr.setRequestHeader('App-Key', 'ee323adeefe3ea79f136069988aed75a');
            },
            'contentType': 'application/json'
        };
        this.patient = patient;
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
            'phrase': params.token,
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
            'text': params.token
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
                'token': found[i]['common_name'],
                'parseData': found[i]
            };
            if (i === found.length - 1) {
                newParams.last = true;
            }
            this.call('search', newParams);
        }
    }
}