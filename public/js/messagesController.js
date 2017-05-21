angular
  .module("worldlyMessages")
  .controller("MessagesController", MessagesController);

MessagesController.$inject = ['$http'];
function MessagesController($http){
  const vm = this;
  vm.messages = [];
  activate();

  function activate() {
    console.log('messages controller activated');
    loadAllMessages();
  };

  function loadAllMessages() {
    return $http
    .get('/api/messages')
    .then(function resolve(res){
      console.log(res.data.messages)
      vm.messages = res.data.messages;
    })
  }
}
