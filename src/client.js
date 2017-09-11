import 'es6-object-assign/auto';
import 'es6-promise/auto';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors';
import authentication from 'feathers-authentication-client';
import rest from 'feathers-rest/client';
import socketio from 'feathers-socketio/client';
import primus from 'feathers-primus/client';

Object.assign(feathers, {
  socketio,
  primus,
  rest,
  hooks,
  authentication,
  errors
});

export default feathers;