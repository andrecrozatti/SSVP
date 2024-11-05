const RequestContext = {
    user: null
  };
  
  function setUser(user) {
    RequestContext.user = user;
  }
  
  function getUser() {
    return RequestContext.user;
  }
  
  module.exports = { setUser, getUser };