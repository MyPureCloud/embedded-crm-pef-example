import Component from '@ember/component';

export default Component.extend({
    click(){
        if (this.phoneNumber){
            document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                type: 'clickToDial',
                data: { number: this.phoneNumber, autoPlace: true }
            }), "*");
        }
    }
});
