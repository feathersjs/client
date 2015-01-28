/* jshint unused: false */
/* global define */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.FeathersClient = factory();
  }
}(this, function () {

  var stripSlashes = function (name) {
    return name.replace(/^\/|\/$/g, '');
  };

  var methods = [ 'find', 'get', 'create', 'update', 'patch', 'remove' ];

  var Service = function(path, socket) {
    this.path = stripSlashes(path);
    this.socket = socket;
  };

  var initMethod = function(name) {
    Service.prototype[name] = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      var method = typeof this.socket.emit === 'function' ? 'emit' : 'send';

      args.unshift(this.path + '::' + name);
      this.socket[method].apply(this.socket, args);
    };
  };

  Service.prototype.on = function(name, callback) {
    this.socket.on(this.path + ' ' + name, callback);
  };

  Service.prototype.off = function(name, callback) {
    this.socket.off(this.path + ' ' + name, callback);
  };

  for(var i = 0; i < methods.length; i++) {
    initMethod(methods[i]);
  }

  return function(path, socket) {
    return new Service(path, socket);
  };
}));