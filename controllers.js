protocolApp.controller('homeController',['$scope','protocolService','$http','$window',function($scope, protocolService, $http,$window ){

    $scope.theme = protocolService.theme;
    
    
    $scope.$watch('theme', function(){
        protocolService.theme = $scope.theme;
    })
        
    $scope.subject ='test';
    $scope.sender = 'test 2';
    $scope.number = 'test 2';
    
    $scope.num = true;
    
    $scope.addRule = function(){
        
        $http.post('http://localhost:8080/api/new?subject='+$scope.subject+'&sender='+$scope.sender).then(function (response) {

            $scope.subject = "";
            $scope.sender = '';
            
            $scope.number = response.data
            $scope.num = false;

            }, function (response) {

            $window.alert("Failed!");
            });
        
            

    }
    
     $scope.ProtNum = function(){
         
         $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.number).then(
             function(response){
                 
                  $window.alert("To πρωτόκολο με αριθμό "+$scope.number+" ενημερώθηκε με επιτυχία !!" );
                 $location.url('sign') ;
             
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );

               
               
             
            }
         
     }
    
    
    
}]);



protocolApp.controller('signInController',['$scope','$location','$http','$window',function($scope,$location ,$http,$window){

    $scope.username ='admin';
    $scope.password = '0t$db@';
    
    $scope.num = true;
    
     $scope.signIn = function(){
         $http.post('http://localhost:8080/api/sign?username='+$scope.username+'&password='+$scope.password+'&usageCode=service1').then(function (response) {

             if(response.data == 1)  $location.url('sign') ;
             else $window.alert("Incorect Username or Password!!");
            
             
            }, function (response) {
                        
                if(response.data == 1)  $location.url('sign') ;
                else $window.alert("Incorect Username or Password!!");
                      
         })
         
         
     }
     
     
}]);



















