# Symptom Checker: Internet Diagnosis Engine

Everyone has a moment where they feel a twinge, or feel like they are coming down with something, but are not sure if it warrants a call to the doctor, or a trip to the emergency room. This usually results in a trip down the internet "rabbit-hole" in search of answers. We then waste hours or days convincing ourselves that we're dying of some obscure tropical disease, when we really just have a common cold.

This application seeks to solve that problem. Using the Infermedica Medical Diagnosis API, we walk you through an intelligent interview process 
to provide you with the most likely possible diagnoses, and suggestions on next steps.

The live application is hosted at [http://amandareilly.me/symptom-checker](http://amandareilly.me/symptom-checker).

Screenshots at bottom of this page.

## Using Locally

If you would like to run this app on your local development server, you must install NPM and Gulp to build the "public" folder.

Once you have NPM and Gulp installed, cd into the project directory, and run 'npm install' (or 'sudo npm install' depending on your environment settings) and then 'npm build' to build the proper file structure.  The project root is the /public folder.

## Technology Used

* HTML5
* CSS3
* JavaScript (Primarily ES6)
* jQuery

## Frameworks and Plugins

* [jQuery Validation Plugin](https://jqueryvalidation.org/) - jQuery Form Validation
* [Handlebars](https://handlebarsjs.com/) - JavaScript Templating Engine
* [Materialize CSS](http://materializecss.com/) - CSS Framework (with JS Helpers) based on Google's Material Design

### Build Tools

* [NPM](https://www.npmjs.com/) - Package Manager
* [Gulp.js](https://gulpjs.com/) - Workflow Automation
* [SASS](https://sass-lang.com/) - CSS Pre-Processor

## Author

* **Amanda Reilly** - [amandareilly](https://github.com/amandareilly)

## License

This project is licensed under the MIT License.

## Screenshots

![homepage screenshot](https://github.com/amandareilly/symptom-checker/blob/master/info/symptom-checker-screenshots/home.PNG)

![start interview screenshot](https://github.com/amandareilly/symptom-checker/blob/master/info/symptom-checker-screenshots/start-interview.PNG)

![start symptom interview screenshot](https://github.com/amandareilly/symptom-checker/blob/master/info/symptom-checker-screenshots/start-symptom-interview.PNG)

![risk factor interview screenshot](https://github.com/amandareilly/symptom-checker/blob/master/info/symptom-checker-screenshots/risk-factor-interview.PNG)

![possible conditions page screenshot](https://github.com/amandareilly/symptom-checker/blob/master/info/symptom-checker-screenshots/possible-conditions.PNG)
