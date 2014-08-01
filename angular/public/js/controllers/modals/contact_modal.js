'use strict';

var ContactModalInstanceCtrl = function ($scope, $modalInstance, customerId, contactId, Contact) {

  $scope.contact = null;

  if (contactId != null) {
    $scope.contact = Contact.get({ id: contactId });
  }
  else {
    $scope.contact = new Contact({ _id: null, customer: customerId});
  }

  $scope.save = function () {
    if ($scope.contact._id === null) {
      $scope.contact.$save();
    }
    else {
      Contact.update($scope.contact);
    }
    
    $modalInstance.close($scope.contact);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};