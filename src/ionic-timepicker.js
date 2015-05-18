//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

angular.module('ionic-timepicker', ['ionic', 'ionic-timepicker.templates'])

// Defining `ionicTimepicker` directive
  .directive('ionicTimepicker', ['$ionicPopup', function ($ionicPopup) {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        date: '=',     		//epoch time getting from a template
        format: '=',      		//format getting from a template
        step: '=',          	//step getting from a template
        title: '@',   	      	// title of the popup
		setText: '@',			// Set button text
		closeText: '@',			// Close button text
      },
      link: function (scope, element, attrs) {

        element.on("click", function () {

          var obj = { step: scope.step, format: scope.format, title: scope.title, setText: scope.setText, closeText: scope.closeText };

          scope.time = {hours: 0, minutes: 0, meridian: ""};

          var objDate = new Date(scope.date.valueOf());

          scope.increaseHours = function () {
            scope.time.hours = Number(scope.time.hours);
            if (obj.format == 12) {
              if (scope.time.hours != 12) {
                scope.time.hours += 1;
              } else {
                scope.time.hours = 1;
              }
            }
            if (obj.format == 24) {
              if (scope.time.hours != 23) {
                scope.time.hours += 1;
              } else {
                scope.time.hours = 0;
              }
            }
            scope.time.hours = (scope.time.hours < 10) ? ('0' + scope.time.hours) : scope.time.hours;
          };

          scope.decreaseHours = function () {
            scope.time.hours = Number(scope.time.hours);
            if (obj.format == 12) {
              if (scope.time.hours > 1) {
                scope.time.hours -= 1;
              } else {
                scope.time.hours = 12;
              }
            }
            if (obj.format == 24) {
              if (scope.time.hours > 0) {
                scope.time.hours -= 1;
              } else {
                scope.time.hours = 23;
              }
            }
            scope.time.hours = (scope.time.hours < 10) ? ('0' + scope.time.hours) : scope.time.hours;
          };

          scope.increaseMinutes = function () {
            scope.time.minutes = Number(scope.time.minutes);

            if (scope.time.minutes != (60 - obj.step)) {
              scope.time.minutes += obj.step;
            } else {
              scope.time.minutes = 0;
            }
            scope.time.minutes = (scope.time.minutes < 10) ? ('0' + scope.time.minutes) : scope.time.minutes;
          };

          scope.decreaseMinutes = function () {
            scope.time.minutes = Number(scope.time.minutes);
            if (scope.time.minutes != 0) {
              scope.time.minutes -= obj.step;
            } else {
              scope.time.minutes = 60 - obj.step;
            }
            scope.time.minutes = (scope.time.minutes < 10) ? ('0' + scope.time.minutes) : scope.time.minutes;
          };

          if (obj.format == 12) {

            scope.time.meridian = (objDate.getUTCHours() >= 12) ? "PM" : "AM";
            scope.time.hours = (objDate.getUTCHours() > 12) ? ((objDate.getUTCHours() - 12)) : (objDate.getUTCHours());
            scope.time.minutes = (objDate.getUTCMinutes());

            if (scope.time.hours == 0 && scope.time.meridian == "AM") {
              scope.time.hours = 12;
            }

            scope.changeMeridian = function () {
              scope.time.meridian = (scope.time.meridian === "AM") ? "PM" : "AM";
            };

            $ionicPopup.show({
              templateUrl: 'time-picker-12-hour.html',
              title: '<strong>' + obj.title + '</strong>',
              subTitle: '',
              scope: scope,
              buttons: [
                {text: obj.closeText},
                {
                  text: obj.setText,
                  type: 'button-positive',
                  onTap: function (e) {

                    scope.loadingContent = true;
					
					scope.date.setUTCHours(scope.time.hours);
					scope.date.setUTCMinutes(scope.time.minutes);
                  }
                }
              ]
            })

          }

          if (obj.format == 24) {

            scope.time.hours = (objDate.getUTCHours());
			scope.time.hours = (scope.time.hours < 10) ? ('0' + scope.time.hours) : scope.time.hours;
            scope.time.minutes = (objDate.getUTCMinutes());
			scope.time.minutes = (scope.time.minutes < 10) ? ('0' + scope.time.minutes) : scope.time.minutes;

            $ionicPopup.show({
              templateUrl: 'time-picker-24-hour.html',
              title: '<strong>' + obj.title + '</strong>',
              subTitle: '',
              scope: scope,
              buttons: [
                {text: obj.closeText},
                {
                  text: obj.setText,
                  type: 'button-positive',
                  onTap: function (e) {

                    scope.loadingContent = true;

                    scope.date.setUTCHours(scope.time.hours);
					scope.date.setUTCMinutes(scope.time.minutes);
                  }
                }
              ]
            })

          }

        });

      }
    };
  }]);
