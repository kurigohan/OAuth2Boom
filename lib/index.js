'use strict';

const Boom = require('boom');
const QueryString = require('qs');

const internals = {
  // https://developer.yahoo.com/oauth2/guide/errors/
  ERROR_CODES: {
    // 400 Errors
    invalid_client: {
      status: 400,
      message: 'An invalid client_id was provided.'
    },
    invalid_request: {
      status: 400,
      message: 'An invalid request parameter was provided.'
    },
    invalid_param: {
      status: 400,
      message: 'A provided request parameter is invalid.'
    },
    invalid_redirect_uri: {
      status: 400,
      message: 'The provided redirect_uri does not match the one provided with the' +
        'original authorization request.'
    },
    unsupported_over_http: {
      status: 400,
      message: 'OAuth 2.0 only supports calls over HTTPS.'
    },
    unsupported_response_type: {
      status: 400,
      message: 'The provided response_type is not supported for this request.'
    },
    unsupported_grant_type: {
      status: 400,
      message: 'The provided grant_type is not supported.'
    },
    unsupported_redirect_uri: {
      status: 400,
      message: 'The provided redirect_uri is not supported for this request type.'
    },
    version_rejected: {
      status: 400,
      message: 'An unsupported version of OAuth was supplied.'
    },
    // 401 Errors
    invalid_token: {
      status: 401,
      message: 'The provided token is invalid.'
    },
    invalid_callback: {
      status: 401,
      message: 'The redirect_uri provided with this request uses an unsupported port ' +
        'or does not match the Client ID (Consumer Key).'
    },
    invalid_client_secret: {
      status: 401,
      message: 'An invalid client_secret was provided.'
    },
    invalid_grant: {
      status: 401,
      message: 'An invalid or expired token was provided.'
    },
    token_expired: {
      status: 401,
      message: 'The provided token has expired.'
    },
    unauthorized_client: {
      status: 401,
      message: 'The client application is not allowed to use this grant_type.'
    }
  }
};

internals.toURIFrag = function (excludeHash) {
  if (excludeHash){
    return QueryString.stringify(this.output.payload);
  }
  return '#' + QueryString.stringify(this.output.payload);
};

exports.create = function (errorCode, message, data) {
  if (!errorCode || errorCode === 500) {
    return Boom.badImplementation(message, data);
  }

  const errInfo = internals.ERROR_CODES[errorCode];

  if (!errInfo) {
    return Boom.badImplementation(message, data);
  }

  const err = Boom.create(errInfo.status, errInfo.message, data);

  err.output.payload.error = errorCode;
  err.toURIFrag = internals.toURIFrag.bind(err);

  return err;
};

exports.createNew = function (errorCode, statusCode, message, data) {
  if (!errorCode || errorCode === 500) {
    return Boom.badImplementation(message, data);
  }

  const err = Boom.create(statusCode, message, data);

  err.output.payload.error = errorCode;
  err.toURIFrag = internals.toURIFrag.bind(err);

  return err;[[]]
};

exports.wrap = function (error, errorCode, statusCode, message) {
  const err = Boom.wrap(error, statusCode, message);

  err.toURIFrag = internals.toURIFrag.bind(err);
  if (errorCode) {
    err.output.payload.error = errorCode;
  }

  return err;
};

exports.invalidClient = (message, data) => exports.create('invalid_client', message, data);
exports.invalidRequest = (message, data) => exports.create('invalid_request', message, data);
exports.invalidParam = (message, data) => exports.create('invalid_param', message, data);
exports.invalidRedirectURI = (message, data) => exports.create('invalid_redirect_uri', message, data);
exports.unsupportedOverHTTP = (message, data) => exports.create('unsupported_over_http', message, data);
exports.unsupportedResponseType = (message, data) => exports.create('unsupported_response_type', message, data);
exports.unsupportedGrantType = (message, data) => exports.create('unsupported_grant_type', message, data);
exports.unsupportedRedirectURI = (message, data) => exports.create('unsupported_redirect_uri', message, data);
exports.versionRejected = (message, data) => exports.create('version_rejected', message, data);

exports.invalidToken = (message, data) => exports.create('invalid_token', message, data);
exports.invalidCallback = (message, data) => exports.create('invalid_callback', message, data);
exports.invalidClientSecret = (message, data) => exports.create('invalid_client_secret', message, data);
exports.invalidGrant = (message, data) => exports.create('invalid_grant', message, data);
exports.tokenExpired = (message, data) => exports.create('token_expired', message, data);
exports.unauthorizedClient = (message, data) => exports.create('unauthorized_client', message, data);
