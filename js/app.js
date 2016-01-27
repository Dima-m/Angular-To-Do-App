	var todoApp = angular.module('todoApp',['ui.date']);

	todoApp.controller('todoController', ['$scope', function($scope) {
		$scope.myTodos = localStorage.getItem('myTodos') === null ? [] : JSON.parse(localStorage.getItem('myTodos'));

		$scope.addTodo = function() {
			if ($scope.todo) {
				$scope.myTodos.push({
					text: $scope.todo,
					date: Date.parse($scope.myDate),
					completed: false
				});
				$scope.saveTodo();
				$scope.myDate = '';
				$scope.todo = null;
				$scope.todoIsEmpty = false;
			}
			else {
				$scope.todoIsEmpty = true;

			}
		};

		$scope.deleteTodo = function(index) {
			$scope.myTodos.splice(index, 1);
			$scope.saveTodo();
		};

		$scope.saveTodo = function() {
			localStorage.setItem('myTodos', JSON.stringify($scope.myTodos));
		}

		$scope.getRemaining = function() {
			var remaining = 0;
			angular.forEach($scope.myTodos, function(todo) {
				if(!todo.completed)
					remaining += 1;
			});
			return remaining;
		}

		$scope.clearSelected = function() {
			var clearedArray = []
			$scope.myTodos = angular.forEach($scope.myTodos, function(todo, i) {
				if(!$scope.myTodos[i].completed == true)
					clearedArray.push(todo);
			});
			$scope.myTodos = clearedArray;
			$scope.saveTodo();
		}

	}]);

