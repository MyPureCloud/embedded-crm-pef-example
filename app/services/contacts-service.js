import Service from '@ember/service';

// TODO: Move contacts into initializer or stubbing library. 
export default Service.extend({
    processCallLog: null,
    callLogs: null,
    chatLogs: null,
    contactsService: null,
    init(){
        this._super(...arguments);
        this.set('processCallLog', []);
        this.set('callLogs', []);
        this.set('chatLogs', []);

        this.contacts = [
            {
                "id": "1",
                "FirstName": "Agnes",
                "LastName": "Corpuz",
                "Account": "Genesys",
                "Phone": "+6328406444",
                "Email": "testuser1@testdomain.com",
                "Priority": "Gold"
            },
            {
                "id": "2",
                "FirstName": "Prince",
                "LastName": "Merluza",
                "Account": "Genesys",
                "Phone": "+13179576842",
                "Email": "testuser2@testdomain.com",
                "Priority": "Gold"
            },
            {
                "id": "3",
                "FirstName": "Larry",
                "LastName": "Page",
                "Account": "Google",
                "Phone": "+13172222222",
                "Email": "testuser3@testdomain.com",
                "Priority": "Platinum"
            },
            {
                "id": "4",
                "FirstName": "Mark",
                "LastName": "Zuckerberg",
                "Account": "Facebook",
                "Phone": "+13172222222",
                "Email": "testuser4@testdomain.com",
                "Priority": "Silver"
            }
        ];
    },

    getContact(contactId){
        let contact = this.contacts.filter((contact) => 
                            contact.id === contactId);
        if(contact.length <= 0) throw Error("Contact does not exist");
        return contact[0];
    },

    searchContact(queryString){
        console.log(queryString);
        let qs = decodeURIComponent(queryString).toLowerCase();
        console.log(qs);
        console.log(this.contacts);

        let results = this.contacts.filter((contact) => (
                contact.FirstName.toLowerCase().includes(qs) ||
                contact.LastName.toLowerCase().includes(qs)||
                contact.Account.toLowerCase().includes(qs) ||
                contact.Phone.toLowerCase().includes(qs) ||
                contact.Email.toLowerCase().includes(qs)
            )
        );
        console.log('==============================');
        console.log(results);
        return results;
    }
});
