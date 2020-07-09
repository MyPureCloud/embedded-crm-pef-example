import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    init(){
        this._super(...arguments);
        this.languages = [
            {
            "language": "German",
            "code": "de"
            },
            {
            "language": "American English",
            "code": "en-US"
            },
            {
            "language": "Spanish",
            "code": "es"
            },
            {
            "language": "French",
            "code": "fr"
            },
            {
            "language": "Italian",
            "code": "it"
            },
            {
            "language": "Japanese",
            "code": "jp"
            },
            {
            "language": "Dutch",
            "code": "nl"
            },
            {
            "language": "Norwegian",
            "code": "no"
            },
            {
            "language": "Polish",
            "code": "pl"
            },
            {
            "language": "Brazilian Portugese",
            "code": "pt-BR"
            },
            {
            "language": "Swedish",
            "code": "sv"
            },
            {
            "language": "Turkish",
            "code": "tr"
            },
            {
            "language": "Chinese",
            "code": "zh-CH"
            },
            {
            "language": "Taiwanese",
            "code": "zh-TW"
            }
        ];

        this.themes = [
            {
                "name": "Default Grey",
                "primary": "#666",
                "text": "#fff"
            },
            {
                "name": "Genesys Cloud Blue",
                "primary": "#41A7CA",
                "text": "#fff"
            },
            {
                "name": "Grapes",
                "primary": "#102E4A",
                "text": "#CFBCFF"
            },
            {
                "name": "Ancient Style",
                "primary": "#691e06",
                "text": "#fbba72"
            },
            {
                "name": "Monochrome (Light)",
                "primary": "#fff",
                "text": "#000"
            },
            {
                "name": "Monochrome (Dark)",
                "primary": "#000",
                "text": "#fff"
            },
            {
                "name": "I Hate My Eyes",
                "primary": "#FF80FF",
                "text":  "#00ff00"
            },
            {
                "name": "Something Sweet",
                "primary": "#912F56",
                "text":  "#EAF2EF"
            },
            {
                "name": "Dooby Dap",
                "primary": "#333",
                "text": "#FF9F6F"
            },
            {
                "name": "Banana Ear",
                "primary": "#FFFF93",
                "text": "#000"
            }
        ];
    
        this.regions = [
            'mypurecloud.com',
            'mypurecloud.com.au',
            'mypurecloud.ie',
            'mypurecloud.jp',
            'mypurecloud.de'
        ];
    },

    frameworkConfig: service('framework-config'),

    actions: {
        saveConfig(){
            this.frameworkConfig.saveConfiguration();
            window.location.reload(true);
        },
        setLanguage: function(lang){
            let displayName = this.languages.filter((l) =>
                l.code.localeCompare(lang) == 0
            )[0].language;

            this.set('frameworkConfig.userLanguage.lang', lang);
            this.set('frameworkConfig.userLanguage.display', displayName);
        },
        setTheme: function(themeName){
            let themeInfo = this.themes.filter((t) => t.name === themeName)[0];

            this.set('frameworkConfig.theme.primary', themeInfo.primary);
            this.set('frameworkConfig.theme.text', themeInfo.text);
            this.set('frameworkConfig.theme.display', themeName);
        },
        setRegion: function(region){
            this.set('frameworkConfig.genesysCloudRegion', region);
        }
    }
});
