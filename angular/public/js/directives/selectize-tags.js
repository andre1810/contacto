angular.module('contactoApp').directive('selectizeTags', function($timeout, _) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {

      // use timeout to user $apply
      $timeout(function() {
        var $selectize = element.selectize({
          persist: false,
          create: function(input) {
            return {
              value: input,
              text: input
            }
          }
        }).on('change', function(event) {
          scope.$apply(applyChange);
        });

        // set model value
        // ngModel.$setViewValue is not working here
        function applyChange() {
          scope.$parent.$parent.tags = element.context.value;
        }
      }, 0);

    }
  };
});