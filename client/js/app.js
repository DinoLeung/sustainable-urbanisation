var tapApp = angular.module('TabApp',['ngMaterial', 'ngMessages', 'lbServices']);
 
tapApp.controller('noteController', function($scope, $http, Note) {
 
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

tapApp.controller('dynamicFormController', function($scope) {

  $scope.forms = [{
    title: '',
    content: ''
  }];
  $scope.addNew = function() {

    $scope.forms.push({
      title: '',
      content: ''
    })
  }
  $scope.delete = function($index){
    $scope.forms.splice($index, 1);
  }

});