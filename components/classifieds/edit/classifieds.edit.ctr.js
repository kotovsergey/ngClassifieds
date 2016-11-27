(function () {
    "use strict";

    angular.module('ngClassifieds')
        .controller('editClassifiedsCtrl', function ($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory, $mdComponentRegistry) {
            var vm = this;
            vm.classifieds = classifiedsFactory.ref;
            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
            vm.classified = vm.classifieds.$getRecord($state.params.id);

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

            function saveEdit() {
                vm.classifieds.$save(vm.classified).then(function() {
                    $scope.$emit('editSaved', 'Edit saved!');
                    vm.sidenavOpen = false;
                });
            }
        })
})();