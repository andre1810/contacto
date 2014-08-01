var contactoApp = angular.module('contactoApp', [
  'ngRoute',
  'ngResource',
  'ui.utils',
  'ui.bootstrap',
  'underscore'
  ]);

contactoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/overview.html',
        controller: 'OverviewCtrl'
      }).
      when('/customers', {
        templateUrl: 'partials/customers.html',
        controller: 'CustomersCtrl'
      }).
      when('/customers/search/:keyword', {
        templateUrl: 'partials/search.html',
        controller: 'SearchCtrl'
      }).
      when('/customers/:startingWith', {
        templateUrl: 'partials/customers.html',
        controller: 'CustomersCtrl'
      }).
      when('/customer/new', {
        templateUrl: 'partials/new_customer.html',
        controller: 'NewCustomerCtrl'
      }).
      when('/customer/:customerId', {
        templateUrl: 'partials/customer.html',
        controller: 'CustomerCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }
]);