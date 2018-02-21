angular.module('app', [])
.controller('mainController', ['$http', function($http) {
    // TODO
	var self = this;
	this.names = [];
	function addName(name) {
		self.names.push(nameObj(name));
	}
	function NameObj(name) {
		this.name = name;
		this.val = getNameValue(name);
	}
	function getNameValue(name) {
		let val = 0;
		name = name.toUpperCase();
		for(let i = 0; i<name.length; i++) {
			val+=name.charCodeAt(i)-64; 
		}
		return val;
	}
	function sortNames(a,b) {
		return a.val - b.val;
	}
	this.addJSONNames = function() {
		$http.get('names.json').success(function(json){
			for(let i = 0; i < json.length; i++) {
				let name = json[i];
				add(name);
			}
			self.names.sort(sortNames);
			updateValues();
		}).error(function(){
			alert("error");
		});
	}
	function updateValues() {
		self.totalVal =  self.names.reduce((cur,el)=>cur+=el.val,0);
		self.totalVal = self.totalVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function add(name) {
		let newName = new NameObj(name);
		self.names.push(newName);
	}
	this.addName = function() {
	   add(self.newName);
	   self.names.sort(sortNames);
	   updateValues();
	   self.newName = "";
    };
	
}])


