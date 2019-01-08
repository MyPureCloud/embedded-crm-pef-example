import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    contactService: service('contacts-service'),
    queryParams: ['query'],
    query: null,
    searchResults: computed('query', function(){
        let query = this.query;
        if(query){
            return this.contactService.searchContact(query);
        } else {
            return [];
        }
    })
});
