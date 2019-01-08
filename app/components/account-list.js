import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    accountService: service('accounts-service'),
    init(){
        this._super(...arguments);

        this.accounts = this.accountService.accounts;

        var account = new URLSearchParams(window.location.search).get('Account');

        if (account) {
            var accounts = this.accounts;
            this.toggleProperty('enabled');
            this.set("selectedAccount", account);
            this.set("accountList", accounts.filterBy('Name', account));
        }
    },
    selectedAccount: null,
    accountList: null,
    actions: {
        toggle: function(name) {
            var accounts = this.accounts;
            this.toggleProperty('enabled');
            this.set("selectedAccount", name);
            this.set("accountList", accounts.filterBy('Name', name));
        }
    }
});
