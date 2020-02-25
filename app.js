var protocolApp = angular.module("protocolApp",["ngRoute", "ngResource"]);

//routes

protocolApp.config(function($routeProvider){

    $routeProvider
    .when('/sign',{
        templateUrl:'pages/home.html',
        controller: 'homeController',
         
    })
    .when('/',{
        templateUrl:'pages/signIn.html',
        controller: 'signInController',
        
    })
    
    
});

























