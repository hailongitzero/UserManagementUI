'use strict';

angular.module("myapp", [])
    .controller("UserController", function($scope, $http) {
        var apiUrl = "https://localhost:5001/api/user";
        $scope.error = "";
        $scope.errorBg = "background-color-danger";
        $scope.isShow = "hidden";
        //get User list
        $http.get(apiUrl).then( function(response) {
            $scope.users = response.data;
         }, function(response){
 
         });

        // get User by Id
        $scope.selectUser = function(userId){
            $scope.isShow = "";
            $scope.error = ""
            $scope.errorBg = "";
            $http.get(apiUrl+"/"+userId).then( function(response) {
                $scope.user = response.data;
                $scope.users.forEach(element => {
                    if (element.id == response.data.id){
                        element.isActive = "active";
                    } else {
                        element.isActive = "";
                    }
                });
             });
        };

        // update user
        $scope.updateUser = function(){
            if ( $scope.user == null ) {
                $scope.isShow = "";
                $scope.error = "Vui lòng chọn nhân viên."
                $scope.errorBg = "background-color-danger";
            } else {
                $http.put(apiUrl+"/"+$scope.user.id, {
                    id: $scope.user.id,
                    username: $scope.user.username,
                    fullname: $scope.user.fullname,
                    address: $scope.user.address,
                    department: $scope.user.department,
                }).then( function(response){
                    $scope.isShow = "";
                    $scope.error = "Cập nhật thành công."
                    $scope.errorBg = "background-color-default";
                }, function($respose){
                    $scope.isShow = "";
                    $scope.error = "Cập nhật không thành công."
                    $scope.errorBg = "background-color-danger";
                } );
            }
        }

        // delete user
        $scope.deleteUser = function(){
            if ( $scope.user == null ) {
                $scope.isShow = "";
                $scope.error = "Vui lòng chọn nhân viên."
                $scope.errorBg = "background-color-danger";
            } else {
                $http.get(apiUrl+"/"+userId).then( function(response) {
                    $scope.isShow = "";
                    $scope.error = "Xóa nhân viên thành công."
                    $scope.errorBg = "background-color-default";
                 }, function($respose){
                    $scope.isShow = "";
                    $scope.error = "Xóa nhân viên thành công."
                    $scope.errorBg = "background-color-danger";
                });
            }
        }
    })
    .controller("addUserController", function($scope, $http){
        $scope.error = "";
        $scope.errorBg = "background-color-danger";
        $scope.isShow = "hidden";
        $scope.reset = function(){
            $scope.username = "";
            $scope.fullname = "";
            $scope.address = "";
            $scope.department = "";
            $scope.error = "";
            $scope.isShow = "hidden";
        }
        $scope.addUser = function() {
            var apiUrl = "https://localhost:5001/api/user";

            $http.post(apiUrl, {
                username: $scope.username,
                fullname: $scope.fullname,
                address: $scope.address,
                department: $scope.department,
            }).then( function(response){
                $scope.isShow = "";
                $scope.error = "Thêm mới thành công."
                $scope.errorBg = "background-color-default";
            }, function($respose){
                $scope.isShow = "";
                $scope.error = "Thêm mới không thành công."
                $scope.errorBg = "background-color-danger";
            } );
        }
    });