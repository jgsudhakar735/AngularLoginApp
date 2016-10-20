var angularApp = angular.module('AppCtrl',['ngMaterial','ui.router']);

angularApp.config(function($mdThemingProvider,$stateProvider,$urlRouterProvider){
    
    $urlRouterProvider.otherwise("/login");
    
    $stateProvider
    .state('login', {
            url: '/login',
            views: {
                nav: {
                   templateUrl : 'views/header.html'
                },
                content: {
                      templateUrl: 'views/login.html' 
                },
                footer :{
                     templateUrl : 'views/footer.html'                       
                }                           
            }
        })
        .state('dashboard',{
        url : '/dashboard',
         resolve:{
          "check":function($location,$rootScope){
              if(!$rootScope.isLoggedIn){
                  $state.go('login') 
              }                              
          }  
        },
          views: {
                nav: {
                   templateUrl : 'views/header.html'
                },
                content: {
                      templateUrl: 'views/dashboard.html' 
                },
                footer :{
                     templateUrl : 'views/footer.html'                       
                }                           
            }
    });                                                                                        
    $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('orange');
//    $mdThemingProvider.theme('purple');
});

angularApp.controller('loginCtrl',function($scope,$state,$rootScope,$http){
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
                    $state.go('dashboard');
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