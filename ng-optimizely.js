angular.module('ng-optimizely', ['ng'])
.factory('optimizely', ['$rootScope', '$window', '$timeout', '$q'
, function($rootScope, $window, $timeout, $q) {
    var service = $window.optimizely = $window.optimizely || [];

    service.loadProject = function(key) {
      if (document.getElementById('optimizely-js') || key == void 0) {
        return;
      }

      var deferred = $q.defer();

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'optimizely-js';
      script.async = true;
      script.src = 'https://cdn.optimizely.com/js/' + key + '.js';
      script.onload = script.onreadystatechange = function () {
        deferred.resolve($window.optimizely);
      };

      first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);

      return deferred.promise;
    };

    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        $window.optimizely.push(['activate']);
      });
    });

    return service;
}]);
