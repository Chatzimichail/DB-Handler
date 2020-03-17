protocolApp.controller('homeController',['$scope','protocolService','$http','$window',function($scope, protocolService, $http,$window ){

    $scope.theme = protocolService.theme;
    
    $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            });
    
    
    $scope.$watch('theme', function(){
        protocolService.theme = $scope.theme;
        
        
    })
        
    $scope.subject ='subj';
    $scope.sender = '';
    $scope.number = '   ';
    
    $scope.num = true;
    $scope.file = true;
    
    
    $scope.addRule = function(){
        
        $http.post('http://localhost:8080/api/new?subject='+$scope.subject+'&sender='+$scope.sender).then(function (response) {

            $scope.subject = "";
            $scope.sender = "";
            
            
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
     
     $scope.associate = function(){
         
         $http.post('http://localhost:8080/api/associate?').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            });
         
     }
     
     
//  drop down search
//        $http.get('https://picsum.photos/200/300').then(function(response) {
//            $scope.user.data = response.data;
//        });
    
}]);

protocolApp.controller('outgoingController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    

    
    $scope.num= '';
    $scope.outYear= '2020'  ;
    $scope.outDate='';
    $scope.subject='';
    $scope.receiver='';
    $scope.shared='';
    
    $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            });
    
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
    $scope.usage = 'service1';
    
    $scope.num = true;
    
     $scope.signIn = function(){
         $http.post('http://localhost:8080/api/sign?username='+$scope.username+'&password='+$scope.password+'&usageCode='+$scope.usage).then(function (response) {

             if(response.data == 1)  $location.url('home');
             else $window.alert("Incorect Username, Password, Usage!!");
            
             
            }, function (response) {
                        
                if(response.data == 1)  $location.url('home');
                else $window.alert("Incorect Username or Password, Usage!!");
                      
         })
         
         
     }
     
     
}]);


protocolApp.controller('oikothenController',['$scope','$http','$window','$location',function($scope,$http,$window,$location){
    
    
    
    $scope.numberOik= 'test num';
    $scope.subjectOik= 'test sub';
    $scope.receiverOik='';
    $scope.outDayOik='';
    
    $scope.numOik = true;
    $scope.fileOik = true;
    
     $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            }); 
    
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

protocolApp.controller('searchFileController',['$scope','$location','$http','$window',function($scope,$location,$http,$window){
    
    $scope.year= 2020;
    $scope.num=155;
    
    
    $scope.search = function(){
            
            $http.post('http://localhost:8080/api/filesearch?num='+$scope.num+'&year='+$scope.year).
            then(function (response) {
                    
                    //$scope.decodedFrame = atob($scope.jsonData.dataFormat);
                    //$scope.file = response.data.
                $scope.data = response.data;
            
                }, function (response) {
    
                    $window.alert("Error");

                
                }); 
            
        };
    
    $scope.findIdFile = function(fileId){
        
        $http.post('http://localhost:8080/api/fileIdSearch?id='+fileId).
            then(function (response) {
                    
                    
            
            if (typeof btoa !== 'function') {
              // Cannot decode Base64 values because the atob() function is not supported
              // Perhaps you want to use a polyfill or at least inform user about this
                $window.alert("Error with the base 64");
                
               

                }
            else{
                
                $scope.Base64 = response.data.data

        var contentType = headers["content-type"] || "application/octet-stream";
        var urlCreator = $window.URL || $window.webkitURL || $window.mozURL || $window.msURL;
        if (urlCreator) {
        var blob = new Blob([data], { type: contentType });
        var url = urlCreator.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "download.pdf"; //you may assign this value from header as well 
        a.click();
        window.URL.revokeObjectURL(url);

        }
             //   
            }
            
                        
            
                }, function (response) {
    
                    $window.alert("Error");

                
                }); 
        
    }
    
    
    
}]);

protocolApp.controller('updateController',['$scope','$http','$window',function($scope,$http,$window){
    
    $scope.subject ='';
    $scope.sender = '';
    $scope.number = '';
    var year=2020;
    
    $scope.submit = false;
    $scope.file = true;
    
    $http.post('http://localhost:8080/api/associate?usageCode=service1').
        then(function (response) {
  
            $scope.senders = response.data;
            
        
            }, function (response) {
                $window.alert("Error with the accosiates");

            });
    
    
    $http.post('http://localhost:8080/api/usagelist').
        then(function (response) {
  
            $scope.usages = response.data;
        
            }, function (response) {
                $window.alert("Error with the usagelist");

            });

    
    $scope.Update = function(){
        
        $http.post('http://localhost:8080/api/protNum?theProtocolNum='+$scope.number).then(
             function(response){
                 
                
                
            }), 
             function(response){
                $window.alert("To πρωτόκολο δεν ενημερώθηκε !!" );  

             
             
            }
        
        
        if ($scope.usage ==("ΑΠΟΡΡΙΨΗ"))
            $scope.usageStatus = "1007";
        if ($scope.usage==("ΕΓΚΡΙΣΗ"))
            $scope.usageStatus = "1001";    
        if ($scope.usage==("ΠΛΗΡΗΣ"))
            $scope.usageStatus = "1002";
        if ($scope.usage==("ΜΗ ΠΛΗΡΗΣ"))
            $scope.usageStatus = "1002";
        
        $http.post('http://localhost:8080/api/update?theProtocolNum='+$scope.number+'&year=2020&subject='+$scope.subject+'&sender='+$scope.sender+'&usage='+$scope.usageStatus).
        then(function (response) {

            $scope.subject ='';
            $scope.sender = '';
            $scope.number = '';
            $scope.usage = '';
            
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


protocolApp.controller('indexController',['$scope','$location','$window','$http',function($scope,$location,$window,$http){
    
    
    $scope.$on('$routeChangeStart', function($event, next, current) { 
        
        $scope.number = $location.path();
        
        if ( $scope.number == '/' ) {$scope.head = true}
        else {$scope.head = false}
    });
    
        $scope.signOut = function(){
            
            $http.post('http://localhost:8080/api/signout').
            then(function (response) {
                    
                    if(response.data == 1) {
                        $window.alert("Αποσυνδέθηκες επιτυχώς");
                    }
                    else{
                        $window.alert("Δεν αποσυνδέθηκες");
                    }
            
                }, function (response) {
                    $window.alert("Error with the signout"); 
    
                }); 
            
        }; 
        
    }]);


    


























