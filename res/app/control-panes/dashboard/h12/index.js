require('./h12.css')

module.exports = angular.module('stf.h12', [
  require('stf/common-ui').name,
  require('gettext').name
])
  .run(["$templateCache", function ($templateCache) {
    $templateCache.put('control-panes/dashboard/h12/h12.jade',
      require('./h12.jade')
    )
  }])
  .controller('H12Ctrl', require('./h12-controller'))
