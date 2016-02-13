'use strict';

// Load modules
const Code = require('code');
const Lab = require('lab');
const Boom = require('boom');
const QueryString = require('qs');
const OAuth2Boom = require('../lib');

// Test shortcuts
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('create', () => {

  it('returns a Boom error object with a toURIFrag method', (done) => {

    const error = OAuth2Boom.create('invalid_client');

    expect(error.isBoom).to.equal(true);
    expect(error.toURIFrag).to.not.equal(null);
    done(); 
  });

  it('returns a 500 Boom error when no error code parameter is provided', (done) => {

    const error = OAuth2Boom.create();

    expect(error.output.statusCode).to.equal(500);
    done();
  });

  it('returns a 500 Boom error when an unknown error code parameter is provided', (done) => {

    const error = OAuth2Boom.create('not_a_real_code');

    expect(error.output.statusCode).to.equal(500);
    done();
  });
});

describe('createNew', () => {

  it('returns a Boom error object with a toURIFrag method', (done) => {

    const error = OAuth2Boom.createNew('test_code', 400, 'hello');

    expect(error.isBoom).to.equal(true);
    expect(error.toURIFrag).to.not.equal(undefined);
    done(); 
  });

  it('returns an error with the provided error code, message, and status code', (done) => {

    const errorCode = 'new_error_code';
    const message = 'This is a new code.';
    const statusCode = 400;
    const error = OAuth2Boom.createNew(errorCode, statusCode, message);

    expect(error.output.statusCode).to.equal(statusCode);
    expect(error.output.payload.error).to.equal(errorCode);
    expect(error.output.payload.message).to.equal(message);
    done();
  });

  it('returns a 500 Boom error when no error code parameter is provided', (done) => {

    const error = OAuth2Boom.createNew();

    expect(error.output.statusCode).to.equal(500);
    done();
  });
});

describe('wrap', () => {
  it('returns the same object when already boom', (done) => {

    const error = OAuth2Boom.create('invalid_client');
    const wrapped = OAuth2Boom.wrap(error);
    
    expect(error).to.equal(wrapped);
    done();
  });

  it('adds the toURIFrag method', (done) => {

    const error = Boom.badRequest();
    expect(error.toURIFrag).to.equal(undefined);
   
    const wrapped = OAuth2Boom.wrap(error);
    expect(wrapped.toURIFrag).to.not.equal(undefined);
    done();
  });

  it('replaces the output payload error if the error code parameter is provided', (done) => {

    const error = Boom.unauthorized();
    expect(error.output.payload.error).to.equal('Unauthorized');

    const wrapped = OAuth2Boom.wrap(error, 'test');
    expect(wrapped.output.payload.error).to.equal('test');
    done();
  });
});



describe('toURIFrag', () => {

  it('transforms the error into a URI fragment', (done) => {

    const error = OAuth2Boom.create('invalid_client');
    const expectedURIFrag = '#' + QueryString.stringify(error.output.payload);

    expect(error.toURIFrag()).to.equal(expectedURIFrag);
    done();
  });

  it('excludes the hash from URI fragment when exclude hash parameter is true', (done) => {

    const error = OAuth2Boom.create('invalid_client');
    const expectedURIFrag = QueryString.stringify(error.output.payload);

    expect(error.toURIFrag(true)).to.equal(expectedURIFrag);
    done();
  })
});

describe('invalidClient', () => {

  it('returns an invalid_client error with 400 status code', (done) => {
    
    const error = OAuth2Boom.invalidClient();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('invalid_client');
    done();
  });
});

describe('invalidRequest', () => {

  it('returns an invalid_request error with 400 status code', (done) => {
    
    const error = OAuth2Boom.invalidRequest();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('invalid_request');
    done();
  });
});

describe('invalidParam', () => {

  it('returns an invalid_param error with 400 status code', (done) => {
    
    const error = OAuth2Boom.invalidParam();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('invalid_param');
    done();
  });
});

describe('invalidRedirectURI', () => {

  it('returns an invalid_redirect_uri error with 400 status code', (done) => {
    
    const error = OAuth2Boom.invalidRedirectURI();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('invalid_redirect_uri');
    done();
  });
});

describe('unsupportedOverHTTP', () => {

  it('returns an unsupported_over_http error with 400 status code', (done) => {
    
    const error = OAuth2Boom.unsupportedOverHTTP();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('unsupported_over_http');
    done();
  });
});

describe('unsupportedResponseType', () => {

  it('returns an unsupported_response_type error with 400 status code', (done) => {
    
    const error = OAuth2Boom.unsupportedResponseType();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('unsupported_response_type');
    done();
  });
});

describe('unsupportedGrantType', () => {

  it('returns an unsupported_grant_type error with 400 status code', (done) => {
    
    const error = OAuth2Boom.unsupportedGrantType();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('unsupported_grant_type');
    done();
  });
});

describe('unsupportedRedirectURI', () => {

  it('returns an unsupported_redirect_uri error with 400 status code', (done) => {
    
    const error = OAuth2Boom.unsupportedRedirectURI();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('unsupported_redirect_uri');
    done();
  });
});

describe('versionRejected', () => {

  it('returns a version_rejected error with 400 status code', (done) => {
    
    const error = OAuth2Boom.versionRejected();

    expect(error.output.statusCode).to.equal(400);
    expect(error.output.payload.error).to.equal('version_rejected');
    done();
  });
});

describe('invalidToken', () => {

  it('returns an invalid_token error with 401 status code', (done) => {
    
    const error = OAuth2Boom.invalidToken();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('invalid_token');
    done();
  });
});

describe('invalidCallback', () => {

  it('returns an invalid_callback error with 401 status code', (done) => {
    
    const error = OAuth2Boom.invalidCallback();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('invalid_callback');
    done();
  });
});

describe('invalidClientSecret', () => {

  it('returns an invalid_client_secret error with 401 status code', (done) => {
    
    const error = OAuth2Boom.invalidClientSecret();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('invalid_client_secret');
    done();
  });
});

describe('invalidGrant', () => {

  it('returns an invalid_grant error with 401 status code', (done) => {
    
    const error = OAuth2Boom.invalidGrant();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('invalid_grant');
    done();
  });
});

describe('tokenExpired', () => {

  it('returns an token_expired error with 401 status code', (done) => {
    
    const error = OAuth2Boom.tokenExpired();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('token_expired');
    done();
  });
});

describe('unauthorizedClient', () => {

  it('returns an unauthorized_client error with 401 status code', (done) => {
    
    const error = OAuth2Boom.unauthorizedClient();

    expect(error.output.statusCode).to.equal(401);
    expect(error.output.payload.error).to.equal('unauthorized_client');
    done();
  });
});


