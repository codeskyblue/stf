module.exports = function H12Ctrl($scope) {
  $scope.result = null

  $scope.run = function(command) {
    if (command === 'clear') {
      $scope.clear()
      return
    }

    $scope.command = ''

    return $scope.control.shell(command)
      .progressed(function(result) {
        $scope.result = result
        $scope.data = result.data.join('')
        $scope.$digest()
      })
      .then(function(result) {
        $scope.result = result
        $scope.data = result.data.join('')
        $scope.$digest()
      })
  }

  var shell = function(command, callback) {
    var promise = $scope.control.shell(command + '|| echo -n FFF');
    promise
      .then(function(result){
        var body = result.data.join('');
        var success = true;
        if (body.substr(-3) == 'FFF'){
          success = false;
          body = body.substr(0, body.length-3);
        }
        $scope.$apply(function(){
          callback({data: body, success: success});
        })
      })
  }

  $scope.pkgName = "com.netease.txx"

  $scope.updatePkgName = function(){
    shell("dumpsys activity top", function(res){
      var m = res.data.match(/\s*ACTIVITY ([A-Za-z0-9_.]+)\/([A-Za-z0-9_.]+) \w+ pid=(\d+)/)
      console.log(m[1]);
      $scope.pkgName = m[1];
    })
  }

  var notify = function(msg){
    $scope.message = msg;
  }

  var flagFile = '/files/netease/txx/Documents/super_solenoid_engine';
  var flagPrefix = '/sdcard/Android/data/'
  $scope.createF1 = function(pkgName){
    var filepath = flagPrefix + pkgName + flagFile;
    shell('echo > ' + filepath, function(res){
    // shell('echo > /sdcard/hello', function(res){
      notify("Set test: " + filepath + " " + (res.success ? "Success": "Failure"));
    })
  }

  $scope.createF2 = function(pkgName){
    var filepath = flagPrefix + pkgName + flagFile;
    shell('echo EVA-01 > ' + filepath, function(res){
      notify("Write data 'EVA-01' to " + filepath + " " + (res.success ? "Success": "Failure"));
    })
  }

  $scope.removeFlag = function(pkgName){
    var filepath = flagPrefix + pkgName + flagFile;
    shell('rm ' + filepath, function(res){
      notify("Remove " + filepath + " " + (res.success ? "Success": "Failure"));
    })
  }

  $scope.clear = function () {
    $scope.command = ''
    $scope.data = ''
    $scope.result = null
  }
}
