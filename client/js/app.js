var tabApp = angular.module('TabApp',['ngMaterial', 'ngMessages', 'lbServices', 'ngDragDrop']);

// next/prev/submit button
tabApp.controller('tabsController', function($scope, $log) {
  $scope.max = 5;
  $scope.min = 0;
  $scope.selectedIndex = 0;
  $scope.summary = {submitted: 'no'};//all answers will possiablly store here
  $scope.nextTab = function() {
    var index = ($scope.selectedIndex == $scope.max) ? $scope.max : $scope.selectedIndex + 1;
    $scope.selectedIndex = index;
  };
  $scope.prevTab = function() {
    var index = ($scope.selectedIndex == $scope.min) ? 0 : $scope.selectedIndex - 1;
    $scope.selectedIndex = index;
  };
  $scope.submit = function() {
    //sunmit all data from the form to server?
  };
});

// country auto complete 
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

tabApp.controller('actionDropController', function($scope) {
  $scope.listA = [{'title': 'Architecture and Urban Design'}, {'title': 'Children and Youth'}, {'title': 'Civic Engagement and Cultural Vitality'}];
  $scope.listB = [{'title': 'Disaster and Emergency'}, {'title': 'Economic Development'}, {'title': 'Environmental Management'},
                  {'title': 'Gender Equality and Social Inclusion'}, {'title': 'Housing'}, {'title': 'Infrastructure, Communication, Transportation'},
                  {'title': 'Land Use Management'}, {'title': 'Poverty Reduction'}, {'title': 'Production and Consumption Patterns'},
                  {'title': 'Resilient Communities'}, {'title': 'Social Services'}, {'title': 'Technical and International Cooperation'},
                  {'title': 'Technology, Tools and Methods'}, {'title': 'Urban and Regional Planning'}, {'title': 'Urban Governance'},
                  {'title': 'Use of Information in Decision Making'}, {'title': 'Water and Sanitation'}, {'title': 'Buildings'},
                  {'title': 'Energy'}, {'title': 'Renewables'}, {'title': 'Waste Management'}, {'title': 'Education'},
                  {'title': 'Health'}, {'title': 'Saftely and Security'}, {'title': 'Tourism'}, {'title': 'Workforce Development'}, {'title': 'Climate Change'},];
});

tabApp.controller('methodDropController', function($scope) {
  $scope.listA = [{'title': 'Information and communication technologies'}, {'title': 'Mass information campaigns and promotion of rights'}, {'title': 'Creating and strengthening networking'}];
  $scope.listB = [{'title': 'Institutional reform and strengthening'}, {'title': 'Capital formation and entrepreneurship'},
                  {'title': 'Investment development'}, {'title': 'Job creation'}, {'title': 'Public policy'}, {'title': 'By-laws and standards'},
                  {'title': 'Education'}, {'title': 'Monitoring, evaluation, and auditing'}, {'title': 'Provision of shelter/right to adequate housing'},
                  {'title': 'Grants (economical support)'}, {'title': 'Justice system reform'}, {'title': 'Waste management and treatment'},
                  {'title': 'Research and development'}, {'title': 'Urban greening'}, {'title': 'Incentives'}, {'title': 'Drainage and eco-sanitation'},
                  {'title': 'Provision of social services by micro-enterprises'}, {'title': 'Public/Private/Community parterships'},
                  {'title': 'Indicators and statistics'}, {'title': 'Urban/suburban renewal'}, {'title': 'Urban planning regulations'},
                  {'title': 'Health care and welfare services'}, {'title': 'Foster care'}, {'title': 'Organic farms'}, {'title': 'Knowledge sharing'},
                  {'title': 'Access to housing finance'}, {'title': 'Education loans/scholarships'}, {'title': 'Access to credit'},
                  {'title': 'Water supply and demand management'}, {'title': 'Self-built homes construction'}, {'title': 'Prevention of forced eviction'},
                  {'title': 'Environmentally sound technologies'}, {'title': 'Environmental government plans'}, {'title': 'Enforcement of protected areas'},
                  {'title': 'Efficient resource management and conversation'}, {'title': 'Relocation of inhabitants living in slums'},
                  {'title': 'Childrens participatory planning'}, {'title': 'Renewal/clean energy generation'}, {'title': 'Eco-reparation of land'},
                  {'title': 'Energy use efficiency'}, {'title': 'Eco-tourism'}, {'title': 'Building civic awareness'}, {'title': 'Transportation and mobility'},
                  {'title': 'Cultural heritage conservation'}, {'title': 'Exposure to best practices'}, {'title': 'Land use planning'},
                  {'title': 'Community support programmes'}, {'title': 'Transperancy and accountability'}, {'title': 'Environmental programmes with a youth focus'},
                  {'title': 'Abuse prevention of disadvantaged groups'}, {'title': 'Government decentralization'}, {'title': 'Removing barriers to equity'},
                  {'title': 'Participatory budgeting and decision-making development'}, {'title': 'Legal counseling'},
                  {'title': 'Urban management and administration'}, {'title': 'Sustainable agriculture practices'},
                  {'title': 'Post-disaster rehabilitation/reconstruction'}, {'title': 'Master city plan'}, {'title': 'Regional planning'},
                  {'title': 'Urban/Rural networking'}, {'title': 'Geographical information systems (GIS)'}, {'title': 'Risk management'},
                  {'title': 'Climate change adaption'}, {'title': 'Climate change mitigation'}, {'title': 'Sustainable construction'},
                  {'title': 'Fundraising'}, {'title': 'Women empowerment'}, {'title': 'Technology transfer'}, {'title': 'Vocational training and capacity building'},
                  {'title': 'Community participation'}, {'title': 'Recreatioin and entertainment'}, {'title': 'Form of expression/animation'}, {'title': 'Sports'},];
});

tabApp.controller('outcomeDropController', function($scope) {
  $scope.listA = [{'title': 'Social inclusion of vulnerable groups'}, {'title': 'Crime reduction and prevention'}, {'title': 'Equal access to social services'}];
  $scope.listB = [{'title': 'Equal access to health and welfare services'}, {'title': 'Social and cultural vitality'},
                  {'title': 'Industrial and enterprise development'}, {'title': 'Income generation activities'},
                  {'title': 'Food and nutrition security'}, {'title': 'Children found'}, {'title': 'Foster care'},
                  {'title': 'Legislation changes'}, {'title': 'Institutional reform'}, {'title': 'Education quality improvement'},
                  {'title': 'Reduction of desertion school rates'}, {'title': 'Less referrals of children to psychologist'},
                  {'title': 'Equal access to jobs'}, {'title': 'Cultural development'}, {'title': 'Increased civic awareness and engagement'},
                  {'title': 'Air pollution reduction'}, {'title': 'Technology transfer'}, {'title': 'City-to-city cooperation'},
                  {'title': 'Knowledge transfer'}, {'title': 'Eco-tourism'}, {'title': 'Water supply and demand services'},
                  {'title': 'Water use efficiency'}, {'title': 'Economic development'}, {'title': 'Provision of public space'},
                  {'title': 'Improvement of living environment'}, {'title': 'Upgrading of informal settlements'},
                  {'title': 'Poverty reduction'}, {'title': 'Security of tenure'}, {'title': 'Equal access to housing'},
                  {'title': 'Adequate housing'}, {'title': 'Hygiene and sanitation'}, {'title': 'Climate change mitigation'},
                  {'title': 'Climate change adaption'}, {'title': 'Renewable/clean energy generation'}, {'title': 'Work safety'},
                  {'title': 'Energy use efficiency'}, {'title': 'Waste dumping reduction'}, {'title': 'Rural community development'},
                  {'title': 'Enhanced mobility networks (transportation)'}, {'title': 'Efficient public transportation'},
                  {'title': 'Reduction of motorized modes of transportation'}, {'title': 'Urban renovation/rehabilitation'},
                  {'title': 'Cultural heritage conservation'}, {'title': 'Social empowerment'},
                  {'title': 'Transperant, participative and decentralized administration'}, {'title': 'Green urban areas'},
                  {'title': 'Environmental health'}, {'title': 'Enhanced institutional coordination'}, {'title': 'Master city plan'},
                  {'title': 'Increments in agricultural production'}, {'title': 'Sustainable land use'}, {'title': 'Green building'},
                  {'title': 'Increment of tourism affluence'}, {'title': 'Vulnerability mitigation'}, {'title': 'Preventation of immigrants/migrants abuse'},];
});

tabApp.controller('indicatorDropController', function($scope) {
  $scope.listA = [{'title': 'Population growth'}, {'title': 'Planned settlements'}, {'title': 'Proportion of total water resources used'}];
  $scope.listB = [{'title': 'Water use intensity by economic activity'}, {'title': 'Presence of faecal coliforms in freshwater'}, 
                  {'title': 'Biochemical oxygen demand in water bodies'}, {'title': 'Percentage of city population served by wastewater collection'},
                  {'title': 'Percentage of wastewater receiving no/primary/secondary/tertiary treatment'}, {'title': 'Number of times the limit values for selected air pollutants are exceended'},
                  {'title': 'Existence and level of implementation of air quality management plan'}, {'title': 'Emissions of greenhouse gases'},
                  {'title': 'Consumption of ozone depleting substances'}, {'title': 'Share of population exposed to long-term high level of environmental noise'},
                  {'title': 'Noise levels in selected areas'}, {'title': 'Existence and level of implementation of a noise action plan'},
                  {'title': 'Artificial surfaces as a percentage of the total municipal area'}, {'title': 'Extent of derelict and contaminated land'},
                  {'title': 'Number of inhabitants per Km2'}, {'title': 'Quota of new edification taking place on virgin area and quota taking place on derelict and contaminated land in % per year'},
                  {'title': 'Restoration of urban land (Renovation, conversion of derelict buildings/Redevelopment of derelict land for new urban uses/Cleancing of contaminated land)'},
                  {'title': 'Protected areas as a percentage of total municipal area'}, {'title': 'Land affected by desertification'},
                  {'title': 'Area under organic farming'}, {'title': 'Proportion of land area covered by forests'}, {'title': 'Percentage of city population with regular solid waste collection'},
                  {'title': 'Percentage of solid waste disposed to sanitary landfill/incinerated and burned openly/disposed to open dump/recycled/other'},
                  {'title': 'Total solid waste generation per capita'}, {'title': 'Generation of hazardous waste'}, {'title': 'Waste treatment and disposal'},
                  {'title': 'Management of radioactive waste'}, {'title': 'Travel time'}, {'title': 'Transport modes'}, {'title': 'Energy intensity of transport'},
                  {'title': 'Local environment plans'}, {'title': 'Latest approval date of Master Plan'}, {'title': 'Proportion of terrestrial area protected'},
                  {'title': 'Management effectiveness of protected areas'}, {'title': 'Area of selected key ecosystems'}, {'title': 'Fragmentation of habitats'},
                  {'title': 'Change in threat status of species'}, {'title': 'Abundance of selected key species'}, {'title': 'Abundance of invasive alien species'},
                  {'title': 'Material consumption'}, {'title': 'Material intensity of the economy'}, {'title': 'Domestic material consumption'},
                  {'title': 'Annual energy consumption, total and by main category'}, {'title': 'Share of renewable energy sources in total energy use'},
                  {'title': 'Intensity of energy use, total and by economic activity'}, {'title': 'Macroeconomic performance (Gross domestic product(GDP) per capita/Gross saving/Investment share in GDP/Adjusted net savings as percentage of gross national income(GNI)/Inflation rate)'},
                  {'title': 'Employment (Employment-population ratio/Vulnerable employment/Labor productivity and unit labor costs/Share of women in wage employment in the non-agricultural sector)'},
                  {'title': 'Information and communication technologies (Internet users per 100 population/Fixed telephone lines per 100 population/Mobile cellular telephone subscribers per 100 population)'},
                  {'title': 'Research and development (Gross domestic expenditure on Research and Development as a percent of GDP)'},
                  {'title': 'Tourism (Tourism contribution to GDP)'}, {'title': 'Debt service ratio'}, {'title': 'Tax collected as percentage of tax billed'},
                  {'title': 'Own-source revenue as a percent of total revenues'}, {'title': 'Capital spending as percentage of total expenditure'},
                  {'title': 'Price of water'}, {'title': 'Domestic water consumption per capita'}, {'title': 'Informal employment'},
                  {'title': 'Percentage of city population with authorized electrical service'}, {'title': 'Total electrical use per capita'},
                  {'title': 'Number and duration of electrical interruptions per year per customer'}, {'title': 'Percentage of city population with potable water supply service'},
                  {'title': 'Number of interruptions in water service'}, {'title': 'Percentage of children completing primary and secondary education'},
                  {'title': 'Percentage of school age children enrolled in schools (by gender)'}, {'title': 'Student/teacher ratio'},
                  {'title': 'Mortality (Under-five/Mortality rate/Life expectancy at birth/Healthy life expectancy at birth'},
                  {'title': 'Health care delivery (Percent of population with access to primary health care facilites/Contraceptive prevalence rate/Immunization against childhood diseases'},
                  {'title': 'Nutritional status (Nutritional status of children)'}, {'title': 'Health status and risks (Morbidity of major diseases such as HIV/AIDS, malaria and tuberculosis/Prevalence of tobacco use/Suicide rate)'},
                  {'title': 'Number of homicides per 100,000 population'}, {'title': 'Number of sworn police officers per 100,000 population'},
                  {'title': 'Violent crime rate per 100,000 population'}, {'title': 'Number of firefighters per 100,000 population'},
                  {'title': 'Number of fire related deaths per 100,000 population'}, {'title': 'Response time for fire department from initial call'},
                  {'title': 'Income poverty (Proportion of population living below national poverty line/Proportion of population below $1 a day)'},
                  {'title': 'Income inequality (Ratio of share in national income of highest to lowest quintile)'}, {'title': 'Km of transportation system per 100,000 population'},
                  {'title': 'Annual number of public transit trips per capita'}, {'title': 'Commercial air connectivity'},
                  {'title': 'Average travel speed on primary thoroughfares during peak hours'}, {'title': 'Transportation fatalities per 100,000 population'},
                  {'title': 'Number of daily trips and time taken per capita by type of trip and by mode of transport'}, {'title': 'Total average daily distance covered per capita by type of trip and by mode of transport'},
                  {'title': 'Mode of transportation used by children to travel between home and school'}, {'title': 'Percentage of population living in hazard prone areas'},
                  {'title': 'Human and economic loss due to natural disasters'}, {'title': 'Disaster prevention and mitigation instruments'},
                  {'title': 'Durable structures'}, {'title': 'Overcrowding'}, {'title': 'Right to adequate housing'}, {'title': 'Housing prices and rent-to-income'},
                  {'title': 'Percentage of city population living in slums'}, {'title': 'Areal size of informal settlements as a percent of city area and population'},
                  {'title': 'Secure tenure'}, {'title': 'Authorised housing'}, {'title': 'Evictions'}, {'title': 'Housing finance'},
                  {'title': 'Land price-to-income'}, {'title': 'Poor households'}, {'title': 'Number of cultural establishments per 100,000 population'},
                  {'title': 'City expenditures on culture as a percentage of overall city budget'}, {'title': 'Square meters of public recreation facility space per capita'},
                  {'title': 'City expenditures on public recreation as a percentage of overall budget'}, {'title': 'Citizens access to nearby public green areas and basic services'},
                  {'title': 'Citizens participation'}, {'title': 'Voters participation'}, {'title': 'Civic associations'}, {'title': 'Transparency and accountability'},
                  {'title': 'Corruption'}, {'title': 'Percentage of population having paid bribes'}, {'title': 'Share of public and private organizations adopting and using environmental and social management procedures'},];
});
 
// connecting to the db, we may need this
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

// dynamic adding form, we may need this
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



