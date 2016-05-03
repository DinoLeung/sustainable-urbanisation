var app = angular.module('noteApp', ['lbServices']);
 
app.controller('noteController', function($scope, $http, Note) {
 
 	$scope.notes = Note.find();
 	$scope.note;
 	$scope.loading=false;
 
  	$scope.add = function(){
  		$scope.loading=true;
  		
  		Note.create({title: $scope.note.title,content: $scope.note.content }).$promise
 			 .then(function(note) { 
 			 		$scope.notes.push(note);
 			 		$scope.note.title='';
          $scope.note.content='';
 			 		$scope.loading=false;
 			  });;
  	};
 
  	$scope.delete = function($index){
  		
  		$scope.loading=true;
  		var note = $scope.notes[$index];
  		
  		Note.deleteById({ id: note.id}).$promise
  		    .then(function() {
				$scope.notes.splice($index,1);
				$scope.loading=false;
		     });
  	};
 
  	$scope.update = function(note){
  		note.$save();
  	};
	
});