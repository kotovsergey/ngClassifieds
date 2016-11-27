(function () {
    "use strict";

    angular.module("ngClassifieds")
        .controller("classifiedsCtrl", function ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $state) {

            var vm = this;
            vm.categories;
            vm.classified;
            vm.classifieds;
            vm.closeSidebar = closeSidebar;
           // vm.deleteClassified = deleteClassified;
            vm.editing;
          //  vm.editClassified = editClassified;
            vm.openSidebar = openSidebar;
            vm.saveClassified = saveClassified;
            vm.classifieds = classifiedsFactory.ref;
            vm.classifieds.$loaded().then(function (classifieds) {
                vm.categories = getCategories(classifieds);
            });
            vm.saveEdit = saveEdit;

            // classifiedsFactory.getClassifieds().then(function (classifieds) {
            //     vm.classifieds = classifieds.data;
            //     vm.categories = getCategories(vm.classifieds);
            // });

            $scope.$on('newClassified', function (event, classified) {
                vm.classifieds.$add(classified);
                showToast('Classified Saved');

            });

            $scope.$on('editSaved', function (event, message) {
                showToast(message);
            });

            var contact = {
                name: "Will",
                phone: "07738392938",
                email: "will@will.com"
            };

            function openSidebar() {
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast("Classified saved!");
                }
            }

            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar("Edit saved!");
            }

            function showToast(message) {
                $mdToast.show($mdToast.simple().content(message).position("top, right").hideDelay(3000))
            }

            function getCategories(classifieds) {
                var categories = [];

                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
          
        });
})();
