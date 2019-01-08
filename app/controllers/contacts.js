import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    queryParams: ['Account'],
    Account: null,

    contactList: computed('Account', function() {
        if (this.Account) {
            return this.contacts.filterBy('Account', this.Account);
        } else {
            return this.contacts;
        }
    })
});
