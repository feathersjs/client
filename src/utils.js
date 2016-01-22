import { EventEmitter } from 'events';
import getArguments from 'feathers-commons/lib/arguments';

export function stripSlashes(name) {
  return name.replace(/^\/|\/$/g, '');
}

export const methods = [
  'find',
  'get',
  'create',
  'update',
  'patch',
  'remove'
];

export const eventMappings = {
  create: 'created',
  update: 'updated',
  patch: 'patched',
  remove: 'removed'
};

export const events = Object.keys(eventMappings).map(method => eventMappings[method]);

export function makeEmitting(target) {
  Object.assign(target, EventEmitter.prototype);
  Object.keys(eventMappings).forEach(method => {
    const old = target[method];
    const eventName = eventMappings[method];

    if(typeof old === 'function') {
      target[method] = function(... args) {
        let result = old.apply(this, args);
        return result.then(data => {
          this.emit(eventName, data);
          return data;
        });
      };
    }
  });
}

export function normalize(target) {
  methods.forEach(method => {
    let old = target[method];
    if(typeof old === 'function') {
      target[method] = function(... args) {
        return old.apply(this, getArguments(method, args));
      };
    }
  });
}

export function flattenParams(params){

  var newParams = {};

  Object.keys(params).forEach(key => {

    var value  = params[key];

    if(typeof value === "object"){

      Object.keys(value).forEach(innerKey => {

        var newKey = key + "[" + innerKey + "]";
        var newValue = value[innerKey];

        newParams[newKey] = newValue;
        
      });


    } else {

      newParams[key] = value;

    }

  });

  return newParams
}
