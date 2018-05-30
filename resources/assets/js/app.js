
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    data:{
    	adminRoles : { admin : [false,false,false],
    				   dean : [true,false,false],
    				   hod : [true,true,false],
    				   lecturer : [true,true,true]
    				 },
    	selectorEntries : [false,false,false],
        selectorEntriesUpdate: [false,false,false]
    },
    methods:{
    	toggleAdminLevel: function (event,selectorEntries) {
    		/* body... */
    		var count = 0;
            for (entry of selectorEntries) {
                Vue.set(selectorEntries, count, this.adminRoles[event.target.value][count]);  
                count++;
            }
    	}
    }
});
