var tabApp = angular.module('TabApp',['ngMaterial', 'ngMessages', 'lbServices']);
 
tabApp.controller('noteController', function($scope, $http, Note) {
 
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

tabApp.controller('dynamicFormController', function($scope) {

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

tabApp.controller('countryAutoComplete', function($timeout, $q, $log){
  var self = this;
  self.simulateQuery = false;
  self.isDisabled = false;
  // list of `state` value/display objects
  self.states = loadAll();
  self.querySearch = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange = searchTextChange;
  // self.newState = newState;
  //searching stuff
  function querySearch (query) {
    var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
        deferred;
    if (self.simulateQuery) {
      deferred = $q.defer();
      $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info('Text changed to ' + text);
  }
  function selectedItemChange(item) {
    $log.info('Item changed to ' + JSON.stringify(item));
  }
  //list of countries
  function loadAll() {
    var allStates = 'Abkhazia, Afghanistan, Akrotiri and Dhekelia, Aland, Albania, Algeria, American Samoa, Andorra, Angola, Anguilla, Antigua and Barbuda, Argentina, Armenia, Aruba, Ascension Island, Australia, Austria, Azerbaijan, Bahamas, The, Bahrain, Bangladesh, Barbados, Belarus, Belgium, Belize, Benin, Bermuda, Bhutan, Bolivia, Bosnia and Herzegovina, Botswana, Brazil, Brunei, Bulgaria, Burkina Faso, Burundi, Cambodia, Cameroon, Canada, Cape Verde, Cayman Islands, Central Africa Republic, Chad, Chile, China, Christmas Island, Cocos (Keeling) Islands, Colombia, Comoros, Congo, Cook Islands, Costa Rica, Cote d\'lvoire, Croatia, Cuba, Cyprus, Czech Republic, Denmark, Djibouti, Dominica, Dominican Republic, East Timor Ecuador, Egypt, El Salvador, Equatorial Guinea, Eritrea, Estonia, Ethiopia, Falkland Islands, Faroe Islands, Fiji, Finland, France, French Polynesia, Gabon, Cambia, The, Georgia, Germany, Ghana, Gibraltar, Greece, Greenland, Grenada, Guam, Guatemala, Guemsey, Guinea, Guinea-Bissau, Guyana, Haiti, Honduras, Hong Kong, Hungary, Iceland, India, Indonesia, Iran, Iraq, Ireland, Isle of Man, Israel, Italy, Jamaica, Japan, Jersey, Jordan, Kazakhstan, Kenya, Kiribati, Korea, N, Korea, S, Kosovo, Kuwait, Kyrgyzstan, Laos, Latvia, Lebanon, Lesotho, Liberia, Libya, Liechtenstein, Lithuania, Luxembourg, Macao, Macedonia, Madagascar, Malawi, Malaysia, Maldives, Mali, Malta, Marshall Islands, Mauritania, Mauritius, Mayotte, Mexico, Micronesia, Moldova, Monaco, Mongolia, Montenegro, Montserrat, Morocco, Mozambique, Myanmar, Nagorno-Karabakh, Namibia, Nauru, Nepal, Netherlands, Netherlands Antilles, New Caledonia, New Zealand, Nicaragua, Niger, Nigeria, Niue, Norfolk Island, Northern Cyprus, Northern Mariana Islands, Norway, Oman, Pakistan, Palau, Palestine, Panama, Papua New Guinea, Paraguay, Peru, Philippines, Pitcaim Islands, Poland, Portugal, Puerto Rico, Qatar, Romania, Russia, Rwanda, Sahrawi Arab Democratic Republic, Saint-Barthelemy, Saint Helena, Saint Kitts and Nevis, Saint Lucia, Saint Martin, Saint Pierre and Miquelon, Saint Vincent and Grenadines, Samos, San Marino, Sao Tome and Principe, Saudi Arabia, Senegal, Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, Solomon Islands, Somalia, Somaliland, South Africa, South Ossetia, Spain, Sri Lanka, Sudan, Suriname, Svalbard, Swaziland, Sweden, Switzerland, Syria, Tajikistan, Tanzania, Thailand, Togo, Tokelau, Tonga, Transnistria, Trinidad and Tobago, Tristan da Cunha, Tunisia, Turkey, Turkmenistan, Turks and Caicos Islands, Tuvalu, Uganda, Ukraine, United Arab Emirates, United Kingdom, United States, Uruguay, Uzbekistan, Vanuatu, Vatican City, Venezuela, Vietnam, Virgin Islands, British, Virgin Islands, U.S., Wallis and Futuna, Yemen, Zambia, Zimbabwe';
    return allStates.split(/, +/g).map( function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }
  //filtering
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
});

