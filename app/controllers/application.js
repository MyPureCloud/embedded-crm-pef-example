import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    frameworkConfig: service('framework-config'),
    contactsService: service('contacts-service'),
    selectedStatus: null,

    actions: {
        openModal: function(target) {
            var modal = this.get('comp-' + target);
            modal.send('toggleModal');
        },
        setStatus: function(selected) {
            this.set("selectedStatus", selected);
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'updateUserStatus',
                data: { id: this.get('selectedStatus') }
            }), "*");
        },
        search(queryString){
            let results = this.contactsService.searchContact(queryString);
            if(results.length == 1){
                console.log("JUST 1!");
                this.transitionToRoute('contacts.contact', results[0].id);
            }else{
                this.transitionToRoute('search', {
                    queryParams: {
                        query: this.queryString
                    }   
                });
            }
        }
    },

    init(){
        this._super(...arguments);

        // For searching
        this.queryString = null;

        // Dynamically build the URL for the Embedded Softphone
        this.frameWorkURL = 
        `https://apps.${this.frameworkConfig.pureCloudRegion}/crm/index.html?` +
        `crm=framework-local-secure` +
        `&crm_domain=${encodeURIComponent('https://localhost')}` +

        // Embedded softphone settings
        `&embedWebRTCByDefault=${this.frameworkConfig.embedWebRTCByDefault}` +
        `&enableCallLogs=${this.frameworkConfig.enableCallLogs}` +
        `&dedicatedLoginWindow=${this.frameworkConfig.dedicatedLoginWindow}` +

        // Softphone language
        `&userLanguage=${this.frameworkConfig.userLanguage.lang}` +

        // Custom Attributes
        `&customAttributes=${this.frameworkConfig.customAttributes.join(",")}` + 

        // Theme
        `&primarycolor=${encodeURIComponent(this.frameworkConfig.theme.primary)}` +
        `&textcolor=${encodeURIComponent(this.frameworkConfig.theme.text)}`;        
    }
});
