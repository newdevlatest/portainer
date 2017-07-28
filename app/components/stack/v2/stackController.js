angular.module('stackv2', [])
.controller('StackV2Controller', ['$q', '$scope', '$state', '$stateParams', 'StackService', 'Notifications',
function ($q, $scope, $state, $stateParams, StackService, Notifications) {

  $scope.up = function() {
    $('#loadingViewSpinner').show();
    var stackId = $stateParams.id;

    StackService.stackOperationUp(stackId)
    .then(function success(data) {
      Notifications.success('Success', 'Up operation successfully executed');
      $state.reload();
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to execute up operation');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  };

  $scope.down = function() {
    $('#loadingViewSpinner').show();
    var stackId = $stateParams.id;

    StackService.stackOperationDown(stackId)
    .then(function success(data) {
      Notifications.success('Success', 'Down operation successfully executed');
      $state.reload();
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to execute down operation');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  };

  $scope.remove = function() {
    $('#loadingViewSpinner').show();
    var stackId = $stateParams.id;

    StackService.stackOperationDown(stackId)
    .finally(function success(data) {
      StackService.deleteStack(stackId)
      .then(function success(data) {
        Notifications.success('Success', 'Stack successfully removed');
        $state.go('stacks');
      })
      .catch(function error(err) {
        Notifications.error('Failure', err, 'Unable to remove stack');
      })
      .finally(function final() {
        $('#loadingViewSpinner').hide();
      });
    });
  };

  function initView() {
    $('#loadingViewSpinner').show();
    var stackId = $stateParams.id;

    StackService.stack(stackId)
    .then(function success(data) {
      var stack = data;
      $scope.stack = stack;
      return StackService.getStackV2ServicesAndContainers(stack.Name);
    })
    .then(function success(data) {
      $scope.services = data.services;
      $scope.containers = data.containers;
    })
    .catch(function error(err) {
      Notifications.error('Failure', err, 'Unable to retrieve stack details');
    })
    .finally(function final() {
      $('#loadingViewSpinner').hide();
    });
  }

  initView();
}]);
