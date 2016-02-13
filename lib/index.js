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
      message: 'The provided redirect_URI does not match the one provided with the' +
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
      message: 'The provided redirect_URI is not supported for this request type.'
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
      message: 'The provided refresh token has expired.'
    },
    unauthorized_client: {
      status: 401,
      message: 'The client application is not allowed to use this grant_type'
    }
  }
};

exports.create = function (errCode, message) {
  if (!errCode || errCode === 500) {
    return Boom.badImplementation(message);
  }

  const errInfo = internals.ERROR_CODES[errCode];

  if (!errInfo) {
    return Boom.badImplementation(message);
  }

  const err = Boom.create(errInfo.status, errInfo.message);

  err.output.payload.error = errCode;
  err.toURIFrag = internals.toURIFrag.bind(err);

  return err;
};

exports.createNew = function (errCode, message, statusCode) {
  if (!errCode || errCode === 500) {
    return Boom.badImplementation(message);
  }

  const err = Boom.create(statusCode, message);

  err.output.payload.error = errCode;
  err.toURIFrag = internals.toURIFrag.bind(err);

  return err;
};

internals.toURIFrag = function (excludeHash) {
  if (excludeHash){
    return QueryString.stringify(this.output.payload);
  }
  return '#' + QueryString.stringify(this.output.payload);
};

exports.invalidClient = (message) => exports.create('invalid_client', message);
exports.invalidRequest = (message) => exports.create('invalid_request', message);
exports.invalidParam = (message) => exports.create('invalid_param', message);
exports.invalidRedirectURI = (message) => exports.create('invalid_redirect_uri', message);
exports.unsupportedOverHTTP = (message) => exports.create('unsupported_over_http', message);
exports.unsupportedResponseType = (message) => exports.create('unsupported_response_type', message);
exports.unsupportedGrantType = (message) => exports.create('unsupported_grant_type', message);
exports.unsupportedRedirectURI = (message) => exports.create('unsupported_redirect_uri', message);
exports.versionRejected = (message) => exports.create('version_rejected', message);

exports.invalidToken = (message) => exports.create('invalid_token', message);
exports.invalidCallback = (message) => exports.create('invalid_callback', message);
exports.invalidClientSecret = (message) => exports.create('invalid_client_secret', message);
exports.invalidGrant = (message) => exports.create('invalid_grant', message);
exports.tokenExpired = (message) => exports.create('token_expired', message);
exports.unauthorizedClient = (message) => exports.create('unauthorized_client', message);
