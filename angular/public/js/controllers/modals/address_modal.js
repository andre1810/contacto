'use strict';

var AddressModalInstanceCtrl = function ($scope, $modalInstance, customerId, addressId, Address) {

  $scope.address = null;

  if (addressId != null) {
    $scope.address = Address.get({ id: addressId });
  }
  else {
    $scope.address = new Address({ _id: null, customer: customerId});
  }

  $scope.save = function () {
    if ($scope.address._id === null) {
      $scope.address.$save();
    }
    else {
      Address.update($scope.address);
    }
    
    $modalInstance.close($scope.address);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};