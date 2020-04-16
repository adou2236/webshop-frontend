import axios from 'axios';

var testLocal = localStorage.getItem("test");
var $http = axios.create({
  headers: {'userInfoCode': testLocal}
});
export default $http
