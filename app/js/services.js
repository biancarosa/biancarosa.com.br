'use strict';

/* Services */

/*var eventAlertServices = angular.module('eventAlertServices', ['ngResource']);

eventAlertServices.factory('Person', ['$resource',	
  function($resource){
    return $resource('http://dev.emturne.com.br:8080/EventAlert/person/:personId',
    	 {personId:'@id'});
  }]);*/

var services =  angular.module('services', []);

services.service('graphService', function () {
	this.addEdge = function (graph, u, v) {
		//check undefined
		if (typeof graph[v] === 'undefined') graph[v] = []
		if (typeof graph[u] === 'undefined') graph[u] = []

		//if not in array
		if ($.inArray(v, graph[u]) == -1) graph[u][graph[u].length] = v

		if ($.inArray(u, graph[v]) == -1) graph[v][graph[v].length] = u


		//console.log(graph)
		return graph
	}
})