import Route from '@ember/routing/route';
import { inject as service }from '@ember/service';

export default Route.extend({
    contactsService: service('contacts-service'),

    model(params){
        let results = this.contactsService.chatLogs.filter((log) => {
            console.log(log.id);
            console.log(params.interaction_id);
            return log.id.localeCompare(params.interaction_id) == 0;
        });
        console.log(results);
        let transcript = null;
        if(results.length > 0) transcript = results[0].transcript;

        console.log(transcript);
        if(!transcript) return;

        let model = {
            'messages': JSON.parse(transcript).messages
        };

        console.log("transcript acquired");
        console.log(model);
        return model;
    }
});
