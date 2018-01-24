angular.module('node-website').controller('ContactController', ContactController);

function ContactController($http) {
    var vm = this;
    vm.title = 'Contact me'

    vm.sendMessage = function () {
        var mail = {
            email: vm.email,
            message: vm.message,
            firstname: vm.firstname,
            lastname: vm.lastname
        };

        if (!vm.email || !vm.message) {
            vm.error = 'Please fill all the fields.';
        } else {
            $http.post('/api/users/message', mail).then(function (result) {
                vm.messageAlert = 'Message Sent Successfully!';
              
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}
