'use strict';

class PageRenderer {
    run(selector, name, data = {}) {
        const template = Handlebars.partials[name];
        $(selector).html(template(data));
    }
}