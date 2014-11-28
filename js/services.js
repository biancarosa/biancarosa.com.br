'use strict';

/* Services */

var services =  angular.module('services', []);

services.service('graphService', function () {
	this.addEdge = function (graph, u, v) {
		//check undefined
		if (typeof graph[v] === 'undefined') graph[v] = []
		if (typeof graph[u] === 'undefined') graph[u] = []

		//if not in array
		if ($.inArray(v, graph[u]) == -1) graph[u][graph[u].length] = v

		if ($.inArray(u, graph[v]) == -1) graph[v][graph[v].length] = u

		return graph
	}

	var findVertices = function(graph) {
		var vertices = []
		for (var v in graph) {
			vertices[vertices.length] = v
		}	
		return vertices
	}

	var find = function(p, uptree) {
		if (uptree[p] != p) {
			uptree[p] = find(uptree[p],uptree);
		}
		return uptree[p];
	}
	var union = function(p, q, uptree) {
		find(p,uptree); find(q,uptree);
		if (uptree[p] > uptree[q]) {
			uptree[uptree[p]] = uptree[q];
		} else {
			uptree[uptree[q]] = uptree[p];
		}
	}
	this.findConnectedComponents = function(graph) {
		var vertices = findVertices(graph);

		var uptree = []
		
		for(var i = 0; i < vertices.length; ++i) {
			uptree[vertices[i]] = vertices[i];
		}
		for(var i = 0; i < vertices.length; ++i) {
			for (var v in graph[vertices[i]]) {
				union(vertices[i], graph[vertices[i]][v], uptree);
			}
		}

		var component = {}
		
		Object.keys(uptree).forEach(function (key) {
			if (typeof component[uptree[key]] === 'undefined') component[uptree[key]] = []

		 	component[uptree[key]][component[uptree[key]].length] = key;
		});

		return component
	}
})

