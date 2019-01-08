import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    contactsService: service('contacts-service'),

    init(){
        this._super(...arguments);
        let contacts = this.contactsService.contacts;

        var account = new URLSearchParams(window.location.search).get('Account');

        if (account) {
            this.contactList = contacts.filterBy('Account', account);
        } else {
            this.contactList = contacts;
        }
    },
    actions: {
        
    }
});
