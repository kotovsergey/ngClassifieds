(function () {
    "use strict";

    angular
        .module("ngClassifieds")
        .factory("classifiedsFactory", function ($http, $firebaseArray) {

            var ref = new Firebase('https://backngclassified.firebaseio.com/');

            return {
                ref: $firebaseArray(ref)
            }
        });
})();
