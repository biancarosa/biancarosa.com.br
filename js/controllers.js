'use strict';

/* Controllers */
var  controllers = angular.module('controllers', [])

controllers.controller('HomeController', function ($scope) {
});


controllers.controller('SierpinskiController', function ($scope) {

 
	$scope.draw = function() {
		var c = document.getElementById("sierpinskiCanvas");
		var ctx = c.getContext("2d");
		// ctx.moveTo(0,0);
		// ctx.lineTo(500,100);
		// ctx.lineTo(0,300);
		// ctx.stroke();
		// int dist0 = 100;
		// int level = 3;
  //       int dist = dist0;
  //       for (int i = level; i > 0; i--)
  //           dist /= 2;
  //       ctx.moveTo(2 * dist, dist);
  //       sierpA(level, ctx); 
	}
});


controllers.controller('GraphController', function ($scope, graphService) {
	$scope.graph = {}
	$scope.boxshow = 'list'

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

	$scope.show = function(boxshow) {
		$scope.boxshow = boxshow
	}

	$scope.findConnectedComponents = function() {
		$scope.show('conexcomp')
		$scope.components = graphService.findConnectedComponents($scope.graph)
	}
    
	$scope.graphcanvas = new sigma('graphcanvas')
	

	$scope.mustHide = function(boxshow) {
		return $scope.boxshow != boxshow
	}
});