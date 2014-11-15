'use strict';

/* Controllers */
var  controllers = angular.module('controllers', [])

controllers.controller('HomeController', function ($scope) {
});


controllers.controller('GraphController', function ($scope, graphService) {
	$scope.graph = {}
	
	$scope.addEdge = function() {
		$scope.graph = graphService.addEdge($scope.graph, $scope.u, $scope.v)
		//add only if it doesnt exists
		if (typeof $scope.graphcanvas.graph.nodes($scope.u) === 'undefined') {
			$scope.graphcanvas.graph.addNode({
		      id: $scope.u,
		      label: $scope.u,
		      x: Math.random(),
		      y:  Math.random(),
		      color: "#ccc",
		      size: 0.5
		    })
		}
		if (typeof $scope.graphcanvas.graph.nodes($scope.v) === 'undefined') {
		   	$scope.graphcanvas.graph.addNode({
		      id: $scope.v,
		      label: $scope.v,
		      x: Math.random(),
		      y: Math.random(),
		      color: "#ccc",
		      size: 0.5
		    })
	    }

	    var edgeId = $scope.u+$scope.v;
	    if (typeof $scope.graphcanvas.graph.edges(edgeId) === 'undefined') {
		    $scope.graphcanvas.graph.addEdge({
		      id: edgeId,
		      source: $scope.u,
		      target: $scope.v,
		      color: "#ccc",
		      size: 1
		    });
		}

	    // Finally, let's ask our sigma instance to refresh:
	    $scope.graphcanvas.refresh();
	}

	$scope.findConnectedComponents = function() {
		//$scope.components = graphService.findConnectedComponents($scope.graph)
	}
    
	$scope.graphcanvas = new sigma('graphcanvas')
	
	$scope.hasNodes = function() {
		return Object.keys($scope.graph).length
	}
});