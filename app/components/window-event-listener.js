import Component from '@ember/component';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';

const Log = EmberObject.extend({});

export default Component.extend({
    frameworkService: service('framework-config'),
    contactsService: service('contacts-service'),
    router: service('router'),

    didInsertElement(){
        
        window.addEventListener("message", (event) => {
            var message = JSON.parse(event.data);
            
            if(message){
                // Screenpop Configuration
                if(message.type == "screenPop"){
                    console.log('====================================');
                    console.log(message);

                    this.contactsService.interactionId = message.data.interactionId.id;

                    let attributes = message.data.interactionId.attributes;
                    let _urlpop, _searchvalue;
                    if (attributes){                     
                        _urlpop = attributes[this.frameworkService.URLPopAttribute];
                        _searchvalue = attributes[this.frameworkService.SearchValueAttribute];
                    }

                    if(this.frameworkService.enablePEFUrlPop && _urlpop){
                        if(attributes.pef_urlpop){
                            let urlpop = decodeURIComponent(attributes.pef_urlpop);

                            console.log('================================');
                            console.log('PEF URLPOP VALUE DETECTED ' + urlpop);
                            
                            // Child route cases
                            let urlNest = urlpop.split("/");
                            if (urlNest.length > 1){
                                switch(urlNest[0].toLocaleLowerCase()){
                                    case "contacts":
                                        this.get('router').transitionTo(urlNest[0] + ".contact", urlNest[1]);
                                        break;
                                    case "transcript":
                                        this.get('router').transitionTo(urlNest[0] + ".id",  urlNest[1]);
                                        break;
                                }
                            }

                            this.get('router').transitionTo(urlpop);
                        }
                    }else if(this.frameworkService.enablePEFSearchValue && _searchvalue){
                        let searchVal = attributes.pef_searchvalue ? 
                                            attributes.pef_searchvalue : 
                                            "";

                        // Check if E.164 ANI is used for searching and strip the 'tel:'
                        if(searchVal.substring(0,4).toLowerCase().localeCompare("tel:") === 0){
                            searchVal = searchVal.substring(4);
                        }
                        
                        searchVal = encodeURIComponent(searchVal);
                        
                        console.log('================================');
                        console.log('PEF SEARCHVALUE DETECTED ' + searchVal);
                        
                        let results = this.contactsService.searchContact(searchVal);
                        if(results.length == 1){
                            console.log("JUST 1!");
                            this.get('router').transitionTo('contacts.contact', results[0].id);
                        }else{
                            this.get('router').transitionTo('search', {
                                queryParams: {
                                    query: searchVal
                                }   
                            });
                        }
                    }else{
                        // TODO: Default behavior for screen pop
                    }
                } 

                // Logs for Chat Interactions
                else if ((message.type == "processCallLog") &&
                        (message.data.interactionId.isChat)) {
                    console.log("IT's a chat!!!!!!!!!!!!!!!!!!!!");

                    let data = message.data;
                    let interaction = data.interactionId;
                    
                    // Get entry from chatLogs in Contacts Service
                    // If does not exist, create one and store reference
                    let entryRef = null;
                    let existing = this.contactsService.chatLogs.filter((log) => 
                        log.id.localeCompare(interaction.id) == 0
                    );
                    if(existing.length > 0){
                        entryRef = existing[0];
                    } else {
                        entryRef = Log.create();
                        this.contactsService.chatLogs.pushObject(entryRef);
                    } 

                    // Assign values to properties
                    entryRef.set('id', interaction.id);
                    entryRef.set('name', interaction.name);
                    entryRef.set('notes', (() => {
                            if(data.callLog.notes){
                                return data.callLog.notes;
                            }else{
                                if(!entryRef.get('notes')) return "";
                                else return entryRef.get('notes');
                            }
                    })()); 
                    entryRef.set('priority', (() => {
                        if(data.callLog.attributes && data.callLog.attributes.pef_priority){
                            return data.callLog.attributes.pef_priority;
                        }else{
                            if(!entryRef.get('priority')) return "-";
                            else return entryRef.get('priority');
                        }
                    })());
                    entryRef.set('association', (() => {
                        if(data.callLog.selectedContact){
                            return data.callLog.selectedContact.text;
                        }else{
                            if(!entryRef.get('association')) return "-";
                            else return entryRef.get('association');
                        }
                    })());

                    // Call the Framework to request the transcript
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'getTranscript',
                        data: {
                            'interactionId': interaction.id
                        }
                    }), "*");
                    
                    console.log('======================');
                    console.log(entryRef);
                    console.log(this.contactsService.chatLogs);
                
                
                } else if(message.type == "chatTranscript"){
                    let entryRef = this.contactsService.chatLogs.filter((log) => 
                        log.id.localeCompare(message.interactionId) == 0
                    )[0];

                    entryRef.set('transcript', JSON.stringify(message.data));

                // Event handler for contact search
                }  else if(message.type == "contactSearch") {

                    // Add external contact
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'sendContactSearch',
                        data: [{"type": "external", "name": "Weather Line", "phone":[{ "number":"(317) 222-2222", "label":"Cell"}]}]
                    }), "*");

                    // Add transfer context
                    document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                        type: 'addTransferContext',
                        data: {"name": "Case: 1234 - Broken Phone","attributes": {"PEF_TransferContext": "Sample Transfer Context 1234"}}
                    }), "*");

                // Event handler for messages from user action subscription
                } else if(message.type == "userActionSubscription"){
                    if(message.data.category == "status") {
                        toastr.info("User Status: " + message.data.data.status);
                    }

                // Event handler for process call logs
                }  else if((message.type == "processCallLog") && !message.data.interactionId.isChat){

                    // Push message into procesCallLog object property
                    this.contactsService.processCallLog.pushObject(message);

                    // Create new array to contain only specific properties needed from processCallLog
                    var arrayBuilder = {};
                    var logs = this.get('contactsService.callLogs');

                    arrayBuilder.interactionId = message.data.interactionId.id;
                    arrayBuilder.ani = message.data.interactionId.ani;

                    if(message.data.callLog.hasOwnProperty('notes')) {
                        arrayBuilder.notes = message.data.callLog.notes;
                    } else {
                        arrayBuilder.notes = "";
                    }

                    if(message.data.callLog.hasOwnProperty('attributes')) {
                        if(message.data.callLog.attributes.hasOwnProperty('pef_priority')) { 
                            arrayBuilder.attr = message.data.callLog.attributes.pef_priority;
                        }  else {
                            arrayBuilder.attr = "";
                        }
                    } else {
                        arrayBuilder.attr = "";
                    }

                    if(message.data.callLog.hasOwnProperty('selectedContact')) {
                        arrayBuilder.assoc = message.data.callLog.selectedContact.text;
                    } else {
                        arrayBuilder.assoc = "";
                    }
                    
                    this.contactsService.callLogs.pushObject(arrayBuilder);

                    // Make sure the array builder is pushed in logs array
                    if(logs.length > 0) {
                        for (var i = 0, len = logs.length; i < len; i++) {

                            // Update array if interaction ID already exists
                            if(logs[i].interactionId == this.contactsService.interactionId) {
                                if(logs[i].notes == "") {
                                    if(message.data.callLog.hasOwnProperty('notes')) {
                                        arrayBuilder.notes = message.data.callLog.notes;
                                    } else {
                                        arrayBuilder.notes = "";
                                    }
                                } else {
                                    arrayBuilder.notes = logs[i].notes;
                                }

                                if(logs[i].attr == "") { 
                                    if(message.data.callLog.hasOwnProperty('attributes')) {
                                        if(message.data.callLog.attributes.hasOwnProperty('pef_priority')) {
                                            arrayBuilder.attr = message.data.callLog.attributes.pef_priority;
                                        } else {
                                            arrayBuilder.attr = "";
                                        }
                                    } else {
                                        arrayBuilder.attr = "";
                                    }
                                } else {
                                    arrayBuilder.attr = logs[i].attr;
                                }

                                if(logs[i].assoc == "") {
                                    if(message.data.callLog.hasOwnProperty('selectedContact')) {
                                        arrayBuilder.assoc = message.data.callLog.selectedContact.text;
                                    } else {
                                        arrayBuilder.assoc = "";
                                    }
                                } else {
                                    arrayBuilder.assoc = logs[i].assoc;
                                }

                                this.contactsService.callLogs.removeObject(logs.objectAt(i));
                                this.contactsService.callLogs.pushObject(arrayBuilder);
                            }
                        }
                    }
                }
            }
        });
    }
});
