
LibraryApp.controller("authorController", function($scope, $http,
		libraryService, libConstants, $window, $location) {

	// function(){
	// 	console.log($location.path() === '/addauthor');
	// }
	$scope.goToAddAuthor=function(){

		$window.location("/addauthor");
	initAuthor();
	getAllBooks();


	}

	if ($location.path() === '/addauthor') {
		libraryService.initAuthor(
				libConstants.ADMIN_RS_HOST + libConstants.INIT_AUTHOR).then( function(result) {
					console.log("inside");
					$scope.author = result;
				});
		
		libraryService.getAllBooks(
				libConstants.ADMIN_RS_HOST + libConstants.READ_ALL_BOOKS).then(
				function(result) {
					$scope.books = result;
				});
		
    $scope.$watch('selected', function(nowSelected){
	        
	        if( ! nowSelected ){
			    // if not selected then return
	            return;
	        }
	        angular.forEach(nowSelected, function(val){
	            $scope.selectedBooks.push( val );
	        });
	        	
	    });
	    
	} else {
		libraryService.getAll(
				libConstants.ADMIN_RS_HOST + libConstants.READ_AUTHORS).then(
				function(result) {
					$scope.authors = result;
				});
	}
 

	$scope.saveAuthor = function() {
		// if($scope.selectedBooks!=null&&$scope.author.books==null){
		// 	console.log($scope.author.books);
		// 	console.log($scope.selectedBooks);
		// 	$scope.author.books=$scope.selectedBooks;
		// }
		libraryService.postObj(
				libConstants.ADMIN_RS_HOST + libConstants.AUTHOR_CRUD,
				$scope.author).then(function(result) {
			$scope.authors = result;
			$window.location = "#/authorsCRUD"
		});
    };
    
    

	$scope.deleteAuthor = function(authorId) {
		var authorToDelete = {
			"authorId" : authorId
		};
		libraryService.postObj(
				libConstants.ADMIN_RS_HOST + libConstants.AUTHOR_CRUD,
				authorToDelete).then(function(result) {
			$scope.authors = result;
		});
	}
	
	

});































// LibraryApp.controller("authorController", function($scope, $http,
// 		libraryService, libConstants, $window, $location) {

// 	if ($location.path() === '/addauthor') {
// 		$scope.goToAddAuthor = function() {
// 			$window.location = "#/addauthor";
// 			console.log($location.path() === '/authorsCRUD');
// 			console.log($location.path());
// 		}
// 	}

// 	libraryService.initAuthor(
// 			libConstants.ADMIN_RS_HOST + libConstants.INIT_AUTHOR).then(
// 	function(result) {
// 		console.log("initAuthor");
// 		$scope.author = result;
// 	});

// 	libraryService.getAllBooks(
// 			libConstants.ADMIN_RS_HOST + libConstants.READ_ALL_BOOKS).then(
// 			function(result) {
// 				console.log("getAllBooks");
// 				$scope.books = result;
// 			});

// 	$scope.$watch('selected', function(nowSelected) {
// 		if (!nowSelected) {
// 			// if not selected then return
// 			return;
// 		}
// 		angular.forEach(nowSelected, function(val) {
// 			$scope.selectedBooks.push(val);
// 		});

// 	});

// 	libraryService.getAll(
// 			libConstants.ADMIN_RS_HOST + libConstants.READ_AUTHORS).then(
// 			function(result) {
// 				console.log("getAll");
// 				$scope.authors = result;
// 			});

// 	$scope.saveAuthor = function() {
// 		if ($scope.selectedBooks != null && $scope.author.books == null) {
// 			console.log($scope.author.books);
// 			console.log($scope.selectedBooks);
// 			$scope.author.books = $scope.selectedBooks;
// 		}
// 		console.log("HERNYA!!!!!!!!!!!!!!!!!!!!!!!!!!");

// 		libraryService.postObj(
// 				libConstants.ADMIN_RS_HOST + libConstants.AUTHOR_CRUD,
// 				$scope.author).then(function(result) {
// 			$scope.authors = result;
// 			$window.location = "#/authorsCRUD"
// 		});
// 	};

// 	$scope.deleteAuthor = function(authorId) {
// 		var authorToDelete = {
// 			"authorId" : authorId
// 		};
// 		libraryService.postObj(
// 				libConstants.ADMIN_RS_HOST + libConstants.AUTHOR_CRUD,
// 				authorToDelete).then(function(result) {
// 					console.log("deleteAuthor");
// 			$scope.authors = result;
// 		});
// 	}
// })