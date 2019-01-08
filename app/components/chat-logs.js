import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    contactService: service('contacts-service'),

    init(){
        this._super(...arguments);
        this.set('chatLogs', this.contactService.chatLogs);
    }
});
