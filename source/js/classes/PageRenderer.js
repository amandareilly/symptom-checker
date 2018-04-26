'use strict';

class PageRenderer {
    run(selector, name, data = {}) {
        const template = Handlebars.partials[name];
        $(selector).html(template(data)).attr('class', 'container').addClass(name);
        //initialize Materialize JS features
        M.AutoInit();
    }
}