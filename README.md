# Embedded CRM Genesys Cloud Embedded Framework

This is a sample project using Genesys Cloud Embeddable Framework. This project is written in Javascript using Ember Framework.

Different methods of the Genesys Cloud Embeddable Framework are used in this project such as Click to Dial, Screen Pop Up, Process Call Logs and Contact Search.

## Integration Points

### Dynamic Configuration

This sample contains dynamic setting of the framework.js configuration items.

* `/public/framework.js` Contains modified framework.js file from [Genesys Cloud Embeddable Framework example](https://developer.genesys.cloud/api/embeddable-framework/purecloud-embeddable-framework-example.html). This file will get dynamic values from URL parameters.
* `/app/templates/application.hbs` HTML template for the web app. Includes the embedded iframe for the softphone. The 'src' attribute is dynamically generated from data stored in the localStorage. This value could also be generated server side or by any means where the iframe's property can be modified.
* `/app/components/framework-config.js` Contains the actions for events when the user changes any settings in the configuration page. This calls the service framework-config which handles the actual logic of storing and updating the values to the browser's localStorage.
* `/app/services/framework-config.js` Contains the logic behind saving/loading the configuration values to and from the localStorage. In production, this is recommended to be put into a proper backend storage/database.

### screenPop

When there is an incoming interaction, the PEF_SearchValue and PEF_URLPop attributes would determine which page the user will be redirected to.

* `/public/framework.js` screenPop method should be included in this file.
* `/app/components/windows-event-listener.js` This file contains the implementation of the screenPop method.

### addCustomAttributes

* `/public/framework.js` addCustomAttributes method should be included in the window.addEventListener of this file.
* `/app/components/contact/contact-details.js` This file contains the implementation of the addCustomAttributes method.

### addAssociation

* `/public/framework.js` addAssociation method should be included in the window.addEventListener of this file.
* `/app/components/contact/contact-details.js` This file contains the implementation of the addAssociation method.

### clickToDial

* `/public/framework.js` clickToDial method should be included in the window.addEventListener of this file.
* `/app/components/phone-number.js` This file contains the implementation of the clickToDial method.

### contactSearch

* `/public/framework.js` contactSearch method should be included in this file.
* `/app/components/windows-event-listener.js` This file contains the implementation of the contactSearch method. As an example, Weather Line is added as an external contact for this application.

### addTransferContext

* `/public/framework.js` addTransferContext method should be included in the window.addEventListener of this file.
* `/app/components/windows-event-listener.js` This file contains the implementation of the addTransferContext method.

### processCallLog

* `/public/framework.js` processCallLog method should be included in this file.
* `/app/components/windows-event-listener.js` This file contains the implementation of the processCallLog method.

### updateStatus

* `/public/framework.js` updateStatus method should be included in the window.addEventListener of this file.
* ` /app/controllers/application.js` This file contains the implementation of the updateStatus method.

### getTranscript

* `/public/framework.js` getTranscript method should be included in the window.addEventListener of this file.
* `/app/components/windows-event-listener.js` This file contains the implementation of the getTranscript method.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd pef`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [https://localhost](http://localhost).
* Visit your tests at [https://localhost/tests](http://localhost/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
