var app = angular.module('directives', [])
    .directive('blogPost', ['postsBaseService', function(postsBaseService) {
        return {
            link: function (scope, element, attrs) {
                postsBaseService.getPosts(function (data){
                    scope.posts = data;
                });

                scope.deletePost = function(post){
                    postsBaseService.deletePost(post, function(){
                        scope.posts.forEach(function (p, index) {
                            if (p._id == post._id) {
                                scope.posts.splice(index, 1);
                            }
                        });
                    });
                };

                scope.editPost = function(post){
                    postsBaseService.editPost(post);
                };
            },
            restrict: 'E',
            templateUrl: 'views/posts-body.html',
            replace: true,
            transclude: true
        }
    }])
    .directive('newPost', ['postsBaseService', function(postsBaseService) {
        return {
            restrict: 'E',
            templateUrl: 'views/new_post.html',
            replace: true,
            transclude: true,
            controller: NewPostCtrl
        }
    }])
    .directive('editPost', ['postsBaseService', function(postsBaseService) {
        return {
            restrict: 'E',
            templateUrl: 'views/new_post.html',
            replace: true,
            transclude: true,
            controller: EditPostCtrl
        }
    }]);