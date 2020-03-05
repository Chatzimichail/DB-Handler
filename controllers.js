protocolApp.controller('homeController',['$scope','protocolService','$http','$window',function($scope, protocolService, $http,$window ){

    $scope.theme = protocolService.theme;
    
    
    $scope.$watch('theme', function(){
        protocolService.theme = $scope.theme;
    })
        
    $scope.subject ='test';
    $scope.sender = 'test 2';
    $scope.number = 'test 2';
    
    $scope.num = true;
    $scope.file = true;
    
    
    $scope.addRule = function(){
        
        $http.post('http://localhost:8080/api/new?subject='+$scope.subject+'&sender='+$scope.sender).then(function (response) {

            $scope.subject = "";
            $scope.sender = '';
            
            $scope.number = response.data
            $scope.num = false;
            $scope.file = false;

            }, function (response) {

            $window.alert("Failed!");
            });
        
            

    }
    
     $scope.ProtNum = function(){
         
         $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.number).then(
             function(response){
                
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );  

             
            }
         
     }
    
    
    
}]);

protocolApp.controller('outgoingController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    

    
    $scope.num= '';
    $scope.outYear= '2020'  ;
    $scope.outDate='';
    $scope.subject='test subg';
    $scope.receiver='test receiv';
    $scope.shared='test shar';
    
    $scope.outgoing = function(){
        
        $http.post('http://localhost:8080/api/outgoing?theProtocolNum='+ $scope.num+'&year='+$scope.outYear+'&date='+$scope.outDate+'&subject='+$scope.subject+'&receiver='+$scope.receiver+'&shared='+$scope.shared).then(
            function (response) {

                $window.alert("Ενημερώθηκε με επιτυχία το εξερχόμενο αρχείο" );
                $location.url('home') ;

            
             
            }, function (response) {
                        
                $window.alert("Αποτυχία με το εξερχόμενο αρχείο" );
              
                      
         });
        
    }   
    
     
     
}]);


protocolApp.controller('signInController',['$scope','$location','$http','$window',function($scope,$location ,$http,$window){

    $scope.username ='admin';
    $scope.password = '0t$db@';
    
    $scope.num = true;
    
     $scope.signIn = function(){
         $http.post('http://localhost:8080/api/sign?username='+$scope.username+'&password='+$scope.password+'&usageCode=service1').then(function (response) {

             if(response.data == 1)  $location.url('home');
             else $window.alert("Incorect Username or Password!!");
            
             
            }, function (response) {
                        
                if(response.data == 1)  $location.url('home');
                else $window.alert("Incorect Username or Password!!");
                      
         })
         
         
     }
     
     
}]);


protocolApp.controller('oikothenController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    
    
    
    $scope.numberOik= 'test num';
    $scope.subjectOik= 'test sub';
    $scope.receiverOik='test rec';
    $scope.outDayOik='';
    
    $scope.numOik = true;
    $scope.fileOik = true;
    
    $scope.oikothen = function(){
        
        $http.post('http://localhost:8080/api/oikothen?subject='+$scope.subjectOik+'&receiver='+$scope.receiverOik+'&outDay='+$scope.outDayOik).then(
            function (response) {
                
                if(response.data== -1){
                    $window.alert("Αποτυχία με το οίκοθεν αρχείο" );
                }
                else if (response.data > 0) {
                    $window.alert("δημιουργήθηκε με επιτυχία το οίκοθεν αρχείο" );
                    $scope.outDayOik=$scope.outDayOik;
                    $scope.numOik = false;
                    $scope.fileOik = false;
                    $scope.numberOik=response.data;
                }
            
             
            }, function (response) {
                        
                $window.alert("Αποτυχία με το οίκοθεν αρχείο" );
              
                      
         });
        
    }
    

     
      $scope.ProtNum = function(){
         
         $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.numberOik).then(
             function(response){
                 
                 
             
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );

               
               
             
            }
         
     }
    
    
    
     
     
}]);



protocolApp.controller('FileController',['$scope','$http','$window','$location','$resource',function($scope,$http,$window,$location,$resource){
    
    

			var Files = $resource('/files/:id', { id: "@id" });

			angular.extend($scope, {

				model: { file: null },

				upload: function(model) {
					Files.prototype.$save.call(model.file, function(self, headers) {
						// Handle server response
					});
				}
			});
		

}]);

protocolApp.controller('doneUploadController',[function(){
    
    
    
    }]);

protocolApp.controller('updateController',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.subject ='test';
    $scope.sender = 'test 2';
    $scope.number = '';
    var year=2020;
    
    $scope.submit = false;
    $scope.file = true;

    
    $scope.Update = function(){
        
        $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.number).then(
             function(response){
                 
                
                
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );  

             
             
            }
        
        
        $http.post('http://localhost:8080/api/update?theProtocolNum='+$scope.number+'&year=2020&subject='+$scope.subject+'&sender='+$scope.sender).
        then(function (response) {

            $scope.subject ='';
            $scope.sender = '';
            $scope.number = '';
            
            if (response.data == 1)  $window.alert("Ενημερώθηκε με επιτυχία!");
            else if (response.data == -10) {}
            else $window.alert("Αποτυχία με την ενημέρωση!");


            

            }, function (response) {

            $window.alert("Failed!");
            });
        
        
        
    }
    
    $scope.ProtNum = function(){
         
         $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.number).then(
             function(response){
                 
                $scope.subject ='';
                $scope.sender = '';
                $scope.number = '';
                
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );  

                $scope.subject ='';
                $scope.sender = '';
                $scope.number = '';
             
            }
         
     }
     
    $scope.swapp = function(){
         
        $scope.submit =  $scope.file;
        $scope.file = !$scope.submit;
     }
    
    }]);