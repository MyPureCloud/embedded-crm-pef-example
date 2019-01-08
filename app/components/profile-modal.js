import Component from '@ember/component';
import layout from '../templates/components/profile-modal';

export default Component.extend({
    expose: function() {
        var app_controller = this.get('targetObject');
        var exposedName = "comp-" + this.get('id');
        app_controller.set(exposedName, this);
    }.on('init'),
    actions: {
        toggleModal: function() {
            this.toggleProperty('enabled');
        }
    },
    layout: layout
});
