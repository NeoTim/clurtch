(function() {
  var ItemsCtrl = function($scope, $ionicModal, MenuItem, Menu, ImagesService, $q, BackgroundGeo, findDistance, makeStars, ItemMapService) {

    var vm,map,service,infowindow;

    vm = this

    BackgroundGeo.current()
      .then(function(data){
        // vm.pyrmont = new google.maps.LatLng(data.latitude,data.longitude);
        // initialize(data.latitude, data.longitude)
        vm.lat = data.latitude
        vm.long = data.longitude
      })
      getMenuItems(null)
        // MenuItem.get()
        .then(function(data) {
          console.log(data);
          vm.items = data;
          _.each(vm.items, function ( item, index ){
            item.dist = BackgroundGeo.distance(item.menu.latitude, item.menu.longitude)
          });

        });


    vm.locate = window.currLocation.coords
    vm.images = ImagesService.get();
    vm.querySearch = querySearch;
    vm.closeModal = closeModal;
    vm.openModal = openModal;
    vm.storeItemForMap = storeItemForMap

    vm.locationData = {lat: vm.locate.latitude, lng: vm.locate.longitude };


    $ionicModal.fromTemplateUrl("js/modules/tabs/items/modals/filterModal.html", {
      scope: $scope,
      animation: "slide-in-up"
    })
    .then(function($ionicModal) {
      vm.filterModal = $ionicModal;
    });

    //////////////////


    function getMenuItems(filter){

      // return MenuItem.getByLocation(vm.locationData, null);
      return MenuItem.get()

    }

    function querySearch(itemsFilter){

      itemsFilter = itemsFilter || "empty";

      getMenuItems(itemsFilter)

        .then(function(data) {

          vm.items = newData;

        });
    }

    function openModal(){

      vm.filterModal.show();

    }
    function closeModal(){

      vm.filterModal.hide();

    }
    function storeItemForMap(item){
      ItemMapService.set(item._id, item)
    }
  };
  ItemsCtrl
    .$inject = ["$scope", "$ionicModal", "MenuItem", "Menu", "ImagesService", "$q", "BackgroundGeo", "findDistance", "makeStars", "ItemMapService"];
  angular
    .module("app")
    .controller("ItemsCtrl", ItemsCtrl);
})();
//
//
// function initialize(lat, lng) {
//   // var pyrmont = new google.maps.LatLng(lat,lng);
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//       center: vm.pyrmont,
//       zoom: 15
//     });
//
//   var request = {
//     query: "burgers",
//     location: vm.pyrmont,
//     radius: '500',
//     types: ['food']
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
//
//   // querySearch(request)
// }
//
// function callback(results, status) {
//   console.log(results, status);
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     $scope.$apply(function(){
//       vm.items = results;
//       for (var i = 0; i < vm.items.length; i++) {
//
//         vm.items[i].dist = BackgroundGeo.distance( vm.items[i].geometry.location.k, vm.items[i].geometry.location.B )
//         vm.items[i].stars = makeStars.get(vm.items[i].rating)
//         // createMarker(results[i]);
//         // console.log(place);
//       }
//     })
//   }
// }
// function querySearch(query){
//   var request = {
//     query: query,
//     location: vm.pyrmont,
//     radius: '500',
//     types: ['food']
//   };
//   // initialize(vm.lat, vm.long, query)
//   // service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
