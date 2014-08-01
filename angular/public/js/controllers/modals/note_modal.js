'use strict';

var NoteModalInstanceCtrl = function ($scope, $modalInstance, customerId, noteId, Note) {

  $scope.note = null;

  if (noteId != null) {
    $scope.note = Note.get({ id: noteId });
  }
  else {
    $scope.note = new Note({ _id: null, customer: customerId});
  }

  $scope.save = function () {
    if ($scope.note._id === null) {
      $scope.note.$save();
    }
    else {
      Note.update($scope.note);
    }
    
    $modalInstance.close($scope.note);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};