angular.module('ng-optimizely', ['ng'])
.factory('optimizely', ['$rootScope', '$window', '$timeout'
, ($rootScope, $window, $timeout) ->
    service = $window.optimizely = $window.optimizely || []

    service.loadProject = (key) ->
      if document.getElementById('optimizely-js') or key is undefined
        return

      script = document.createElement 'script'
      script.type = 'text/javascript'
      script.id = 'optimizely-js'
      script.async = true
      script.src = "https://cdn.optimizely.com/js/#{key}.js"

      first = document.getElementsByTagName('script')[0]
      first.parentNode.insertBefore(script, first)

    $rootScope.$on '$viewContentLoaded', ->
      $timeout ->
        $window.optimizely.push ['activate']

    return service
])

