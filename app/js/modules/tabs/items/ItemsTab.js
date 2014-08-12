(function() {
  angular.module('app.modules.tabs.items', []).config(function($stateProvider, $urlRouterProvider) {
    return $stateProvider.state("tab.items", {
      url: "/items",
      views: {
        "tab-items": {
          templateUrl: "js/modules/tabs/items/views/items.html",
          controller: "ItemsCtrl as vm"
        }
      }
    }).state("tab.items-map", {
      url: "/items/map",
      views: {
        "tab-items": {
          templateUrl: "js/modules/states/map/views/map.html",
          controller: "MapCtrl as vm"
        }
      }
    }).state("tab.items-item", {
      url: '/items/item/:itemId',
      views: {
        "tab-items": {
          templateUrl: "js/modules/states/item/item.html",
          controller: "ItemCtrl as vm"
        }
      }
    }).state("tab.items-menu", {
      url: '/items/menu/:menu_id',
      views: {
        "tab-items": {
          templateUrl: "js/modules/states/menu/menu.html",
          controller: "MenuCtrl as vm"
        }
      }
    }).state("tab.item-map", {
      url: '/items/map/:item_id',
      views: {
        "tab-items": {
          templateUrl: "js/modules/states/map/views/menusMap.html",
          controller: "ItemMapCtrl as vm"
        }
      }
    });
  });

}).call(this);
