import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    contactsService: service('contacts-service'),
    init(){
        this._super(...arguments);

        let model = this.get('model');
        document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
            type: 'addAssociation',
            data: {"type":"contact", "id":model.id, "text":model.FirstName + " " + model.LastName, "select": true}
        }), "*");

        if(this.contactsService.interactionId != undefined && this.contactsService.interactionId != null) {
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'addAttribute',
                data: {"interactionId": this.contactsService.interactionId,"attributes": {"PEF_Priority": model.Priority}}
            }), "*");
        }
        
    }
});
