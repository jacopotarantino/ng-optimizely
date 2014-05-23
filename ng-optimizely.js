angular.module('ng-optimizely', ['ng'])
.factory('optimizely', ['$rootScope', '$window', '$timeout'
, function($rootScope, $window, $timeout) {
    service = $window.optimizely = $window.optimizely || [];

    service.loadProject = function(key) {
      if (document.getElementById('optimizely-js') || key == void 0) {
        return;
      }

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'optimizely-js';
      script.async = true;
      script.src = 'https://cdn.optimizely.com/js/' + key + '.js';

      first = document.getElementsByTagName('script')[0];
      first.parentNode.insertBefore(script, first);
    };

    $rootScope.$on('$viewContentLoaded', function() {
      $timeout(function() {
        $window.optimizely.push(['activate']);
      });
    });

    return service;
}]);
