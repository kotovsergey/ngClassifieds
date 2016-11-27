(function () {
    "use strict";

    angular.module('ngClassifieds').controller('newClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory, $mdComponentRegistry) {
        var vm = this;
        vm.closeSidebar = closeSidebar;
        vm.saveClassified = saveClassified;

        $timeout(function () {
            $mdComponentRegistry.when('left').then(function () {
                $mdSidenav('left').open();
            });

        });

        $scope.$watch('vm.sidenavOpen', function (sidenav) {
            if (sidenav === false) {
                $mdComponentRegistry.when('left').then(function () {
                    $mdSidenav('left').close().then(function () {
                        $state.go('classifieds');
                    });
                });
            }
        });

        function closeSidebar() {
            vm.sidenavOpen = false;
        }

        function saveClassified(classified) {
            if(classified) {

                classified.contact = {
                    name: "Will",
                    phone: "07738392938",
                    email: "will@will.com"
                };
                
                $scope.$emit('newClassified', classified);
                vm.sidenavOpen = false;
            }
        }
    })
})();