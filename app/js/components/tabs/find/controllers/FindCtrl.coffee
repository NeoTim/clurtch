angular.module('clurtch.components.tabs.find.controllers', [])


.controller('FindCtrl', [
  '$scope'
  '$rootScope'
  '$ionicModal'
  'Yelp'
  'Geo'
  ($scope, $rootScope, $ionicModal, Yelp, Geo)->

    # Creating filters options for filter modal
    $rootScope.distanceOptions = [
      {id: 1, title: '2 blocks', active: false}
      {id: 2, title: '6 blocks', active: false}
      {id: 3, title: '1 mile', active: false}
      {id: 4, title: '5 miles', active: false}
    ]
    $rootScope.priceOptions = [
      {id: 1, title: '$', active: false}
      {id: 2, title: '$$', active: false}
      {id: 3, title: '$$$', active: false}
      {id: 4, title: '$$$$', active: false}
    ]

    # Grab data from Yelp then load numeric ratings as stars
    Yelp.get().success (data) ->
      $scope.items = data.businesses
      # Convert rating to stars in unicode
      for item in $scope.items
        tempRating = item.rating
        stars = ''
        while tempRating >= 1
          stars += '★'
          tempRating--
        if tempRating % 1 > 0
          stars += '½'
        item.stars = stars

    # Get the latitude and longitude of the user when app find tab loads
    Geo.getLocation().then(
      (position) ->
        lat = position.coords.latitude
        lng = position.coords.longitude
        console.log lat, lng
      (error) ->
        console.log 'Unable to get current location: ' + error
    )

])