angular.module('ng-optimizely', ['ng'])
.factory('optimizely', ['$rootScope', '$window', '$timeout', '$q'
, function($rootScope, $window, $timeout, $q) {
    var service = $window.optimizely = $window.optimizely || [];

    service.loadProject = function(key, activationEventName) {
      var deferred = $q.defer();

      if (document.getElementById('optimizely-js')) {
        deferred.reject(new Error({message: 'Optimizely already activated'}));
      } else if (key == void 0) {
        deferred.reject(new Error({message: 'Key not provided'}));
      }

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'optimizely-js';
      script.async = true;
      script.src = 'https://cdn.optimizely.com/js/' + key + '.js';
      script.onload = script.onreadystatechange = function () {
        deferred.resolve($window.optimizely);
      };
      script.onerror = script.onreadystatechange = function (error) {
        deferred.reject(error);
      };

      first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);

      deferred.promise.then(function() {
        $rootScope.$on(activationEventName || '$viewContentLoaded', function() {
          $timeout(function() {
            $window.optimizely.push(['activate']);
          });
        });
      });

      return deferred.promise;
    };

    return service;
}]);
