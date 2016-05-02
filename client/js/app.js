'use strict';
 
angular
 .module('app', [
 	'lbServices',
    'ui.router'
 ])
 .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
     $urlRouterProvider) {
   $stateProvider
     .state('note', {
       url: '',
       templateUrl: 'js/note/templates/note.html',
       controller: 'TodoCtrl'
     });
   $urlRouterProvider.otherwise('note');
 }]);