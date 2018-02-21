angular.module('app', [])
.controller('mainController', ['$http', function($http) {

	var self = this;
	this.names = [];
	this.totalVal = 0;
	
	var NameRecord = function(name) {
		this.name = name.toUpperCase();
		this.val = this.getCharactersValue(name);
		this.multipliedVal = 0;
	}
	//Inherited Methods
	NameRecord.prototype.getCharactersValue = function() {
		let val = 0;
		for(let i = 0; i < this.name.length; i++) {
			val+= this.name.charCodeAt(i)-64;
		}
		return val;
	}
	
	//Static Methods
	NameRecord.updateTotalValues = function() {
		self.totalVal =  self.names.reduce((cur,el,id)=> {
			
			el.multipliedVal = el.val * (id+1);
			return cur+=el.multipliedVal;
			
		},0);
		self.totalVal = self.commanate(self.totalVal);
	}
	NameRecord.sortNames = function(a,b) {
		if(a.name <= b.name) 
			return -1;
		else
			return 1;
	}
	NameRecord.add = function(name) {
		let newName = new NameRecord(name);
		self.names.push(newName);
	}
	
	//Functions Called by Form Submissions
	this.addNameFromInput = function() {
		if(!self.newName)
			return;
		NameRecord.add(self.newName);
		self.names.sort(NameRecord.sortNames);
		NameRecord.updateTotalValues();
		self.newName = "";
    };
	this.addNamesFromJSON = function() {
		$http.get('names.json').success(function(json){
			for(let i = 0; i < json.length; i++) {
				let name = json[i];
				NameRecord.add(name);
			}
			self.names.sort(NameRecord.sortNames);
			NameRecord.updateTotalValues();
		}).error(function(err){
			alert("JSON Failed");
		});
	}
	
	//General Functions (that could go into Services if App was bigger)
	this.commanate = function(val) {
		return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}])


