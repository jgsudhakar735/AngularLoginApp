var angularApp = angular.module('AppCtrl',['ngRoute','ngMaterial']);

angularApp.config(function($routeProvider,$mdThemingProvider){
    $routeProvider.when('/',{
        templateUrl:'views/login.html'
    })
    .when('/login',{
        resolve:{
          "check":function($location,$rootScope){
              if(!$rootScope.isLoggedIn){
                 $location.path('/'); 
              }                              
          }  
        },
        templateUrl:"views/dashboard.html"        
    })
    .otherwise({
        redirectTo:"/"
    });
    $mdThemingProvider.theme('blue');
});

angularApp.controller('loginCtrl',function($scope,$location,$rootScope,$http){
    $scope.submit = function(){
        var username = $scope.username;
        var pwd = $scope.userpwd;
        var isSuccess = false;
        $http.get("./json/users.json").success(function(usersList){            
            for(var i=0;i < usersList.Users.length;i++){
            var userName = usersList.Users[i].username;
            var password = usersList.Users[i].password;
                if(userName == username && password == pwd){
                    $rootScope.isLoggedIn = true;
                    $location.path('login');
                }
            }
            })          
        
    };
});

angularApp.controller('loadPersons',function($scope,$http){
    $http.get("./json/data.json")
    .success(function(response){
    $scope.persons = response.records;    
    })
});

angularApp.controller('languages',function($scope){    
   $scope.myfavLanguage = 'None' ;
    
    $scope.java=function(){
        $scope.myfavLanguage = 'JAVA' ;
    };
    
    $scope.js=function(){
        $scope.myfavLanguage = 'JAVA SCRIPT' ;
    };
    
    $scope.jq=function(){
        $scope.myfavLanguage = 'JQuery' ;
    };
});