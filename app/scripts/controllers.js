'use strict';
    function NewPostCtrl($scope, postsBaseService, $location) {
        $scope.closePopup = function(){
            this.post = {};
            this.postForm.$setPristine();
            angular.element('#modal').modal('hide');
        };
        $scope.showNewPostForm = function(){
            initNewForm();
            this.post = {};
            angular.element('#modal').modal('show');
        };

        function initNewForm(){
            $scope.title = 'New post';
            $scope.action = 'Add post';
            $scope.submit = submitFunction;
            $scope.panelTitle = 'Add new post';
        }
        function submitFunction(){
            $scope.post.date = new Date();
            postsBaseService.addPost($scope.post);
            $scope.closePopup();
        }
    }
    function EditPostCtrl($scope, postsBaseService) {
        function submitFunction(){
            postsBaseService.savePost($scope.post);
            $scope.closePopup();
        }
        function initEditForm(postForEdit){
            $scope.title = 'Edit post';
            $scope.action = 'Save post';
            $scope.submit = submitFunction;
            $scope.panelTitle = 'Edit new post';
            $scope.post = {_id: postForEdit._id,
                            data:  postForEdit.data,
                            author:  postForEdit.author,
                            body: postForEdit.body,
                            title:  postForEdit.title,
                            image:  postForEdit.image};
        }
        $scope.closePopup = function(){
            this.post = {};
            this.postForm.$setPristine();
            angular.element('#modal').modal('hide');
        };
        postsBaseService.showEditPostForm = function(postForEdit){
            initEditForm(postForEdit);
            angular.element('#modal').modal('show');
        };
    }
