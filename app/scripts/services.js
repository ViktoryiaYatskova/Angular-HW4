/**
 * Created by Viktoryia_Yatskova on 8/13/2014.
 */
'use strict';

var app = angular.module('services', [ 'ngResource', 'ngRoute'])
    .factory('postsBaseService', ['$resource', '$location', function($resource, $location){
        var posts, postsFileAddr = 'http://54.72.3.96:3000/posts',
            PostBase, postForEdit;

        function initPostResource(){
            PostBase  = $resource(postsFileAddr+'/:id', null,
            {
                'update': { method:'PUT' }
            });
        }
        function sendPostToBase(post) {
            if(!PostBase) initPostResource();
            PostBase.save(post);
        }

        return {
            getPosts: function (callback) {
                if(!PostBase) initPostResource();
                PostBase.query(function(data){
                    if (data instanceof Array) {
                        posts = data;
                        if(callback) {
                            callback(posts);
                        }
                    }
                });
            },
            changeFileUrl: function (url){
                postsFileAddr = url;
            },
            addPost: function (newPost){
                if(posts) {
                    posts.push(newPost);
                    sendPostToBase(newPost)
                }
            },
            deletePost: function(post, afterFunction){
                if(!PostBase) initPostResource();
                PostBase.delete({id: post._id }, afterFunction);
            },
            editPost: function(postForChange){
                if(!PostBase) initPostResource();

                var factory = this;
                PostBase.get({id:postForChange._id}, function(){
                    postForEdit = postForChange;
                    factory.showEditPostForm(postForEdit);
                });
            },
            getPostForEdit: function(){
                return postForEdit;
            },
            savePost: function(changedPost){
                PostBase.update({id: changedPost._id}, changedPost, function(){
                    posts.forEach(function (p, index) {
                        if (p._id == changedPost._id) {
                            posts[index] = changedPost;
                        }
                    });
                });
                postForEdit = {};
            }
        }
    }]);