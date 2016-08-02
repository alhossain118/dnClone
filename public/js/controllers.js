'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, User, $state) {
  console.log('mainCtrl!');

  $scope.logout = () => {
    User.logout();
  };
});

app.controller('profileCtrl', function($scope,CurrentUser) {
  console.log('profileCtrl!');
  console.log('CurrentUser:', CurrentUser);
  $scope.user = CurrentUser.data;
})

app.controller('loginRegisterCtrl', function($scope, $state, User) {

  $scope.currentState = $state.current.name;

  $scope.submit = () => {
    console.log('$scope.user:', $scope.user);

    if($scope.currentState === 'login') {
      // login stuff
      User.login($scope.user)
        .then(res => {
          $state.go('home');
        })
        .catch(err => {
          console.log('err:', err);
          alert('Register failed. Error in console.');
        });
    } else {
      // register stuff

      if($scope.user.password !== $scope.user.password2) {
        // passwords don't match
        $scope.user.password = null;
        $scope.user.password2 = null;
        alert('Passwords must match.  Try again.');
      } else {
        // passwords are good
        User.register($scope.user)
          .then(res => {
            $state.go('login');
          })
          .catch(err => {
            console.log('err:', err);
            alert('Register failed. Error in console.');
          });
      }
    }
  };

});



// app.controller('loginCtrl', function($scope, $state, User) {
//   console.log('loginCtrl!');

//   console.log('$state:', $state);

//   $scope.login = () => {

//   };

// });

// app.controller('registerCtrl', function() {
//   console.log('registerCtrl!');
// });
