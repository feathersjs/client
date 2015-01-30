!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.Feathers||(f.Feathers={})).client=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

module.exports = function(path, socket) {
	return new Service(path, socket);
};

module.exports.Service = Service;

},{}]},{},[1])(1)
});