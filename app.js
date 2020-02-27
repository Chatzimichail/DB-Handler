var protocolApp = angular.module("protocolApp",["ngRoute", "ngResource"]);

//routes

protocolApp.config(function($routeProvider){

    $routeProvider
    .when('/home',{
        templateUrl:'pages/home.html',
        controller: 'homeController',
         
    })
    .when('/',{
        templateUrl:'pages/signIn.html',
        controller: 'signInController',
        
    })
    .when('/outgoing',{
        templateUrl:'pages/outgoing.html',
        controller: 'outgoingController',
        
    })
    .when('/oikothen',{
        templateUrl:'pages/oikothen.html',
        controller: 'oikothenController',
    })
    
});

























