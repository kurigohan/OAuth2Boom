# OAuth2Boom

OAuth2.0 Errors using Boom

[![Build Status](https://travis-ci.org/kurigohan/OAuth2Boom.svg?branch=master)](https://travis-ci.org/kurigohan/OAuth2Boom)
[![Current Version](https://badge.fury.io/js/oauth2boom.svg)](https://www.npmjs.com/package/oauth2boom)

Lead Maintainer: [Andy Nguyen](https://github.com/kurigohan)

- [OAuth2Boom](#oauth2boom)
  - [Helper Methods](#helper-methods)
    - [`wrap(error, [errorCode], [statusCode], [message])`](#wraperror-errorcode-statuscode-message)
    - [`create(errorCode, [message], [data])`](#createerrorcode-message-data)
    - [`createNew(errorCode, [message], [data])`](#createnewerrorcode-statuscode-message-data)
  - [HTTP 400 Errors](#http-400-errors)
    - [`OAuth2Boom.invalidClient([message], [data])`](#oauth2boominvalidclientmessage-data)
    - [`OAuth2Boom.invalidRequest([message], [data])`](#oauth2boominvalidrequestmessage-data)
    - [`OAuth2Boom.invalidParam([message], [data])`](#oauth2boominvalidparammessage-data)
    - [`OAuth2Boom.invalidRedirectURI([message], [data])`](#oauth2boominvalidredirecturimessage-data)
    - [`OAuth2Boom.unsupportedOverHTTP([message], [data])`](#oauth2boomunsupportedoverhttpmessage-data)
    - [`OAuth2Boom.unsupportedResponseType([message], [data])`](#oauth2boomunsupportedresponsetypemessage-data)
    - [`OAuth2Boom.unsupportedGrantType([message], [data])`](#oauth2boomunsupportedgranttypemessage-data)
    - [`OAuth2Boom.unsupportedRedirectURI([message], [data])`](#oauth2boomunsupportedredirecturimessage-data)
    - [`OAuth2Boom.versionRejected([message], [data])`](#oauth2boomversionrejectedmessage-data)
  - [HTTP 401 Errors](#http-401-errors)
    - [`OAuth2Boom.invalidToken([message], [data])`](#oauth2boominvalidtokenmessage-data)
    - [`OAuth2Boom.invalidCallback([message], [data])`](#oauth2boominvalidcallbackmessage-data)
    - [`OAuth2Boom.invalidClientSecret([message], [data])`](#oauth2boominvalidclientsecretmessage-data)
    - [`OAuth2Boom.invalidGrant([message], [data])`](#oauth2boominvalidgrantmessage-data)
    - [`OAuth2Boom.tokenExpired([message], [data])`](#oauth2boomtokenExpiredmessage-data)
    - [`OAuth2Boom.unauthorizedClient([message], [data])`](#oauth2boomunauthorizedclientmessage-data)

# Description

**oauth2boom** provides a set of utilities for returning OAuth 2.0 errors through Boom. Each utility returns a `Boom` error response.
In addition to the Boom properties, the following property is added to the error response: 
- `toURIFrag` - function to transform the error into a URI fragment string.

The OAuth 2.0 errors are based off of the [Yahoo OAuth 2.0 guide](https://developer.yahoo.com/oauth2/guide/errors/).
## Helper Methods

### `create(errorCode, [message], [data])`

Generates an `Error` object with the **boom** decorations where:
- `errorCode` - an OAuth 2.0 error code.
- `message` - optional message string that will override the preset message.
- `data` - additional error data set to `error.data` property.

```js
var error = OAuth2Boom.create('invalid_client', 'Bad request', { timestamp: Date.now() });
```

### `createNew(errorCode, [statusCode], [message], [data])`

Generates an `Error` object with the **boom** decorations where:
- `errorCode` - an OAuth 2.0 error code.
- `statusCode` - an HTTP error code number. Must be greater or equal 400.
- `message` - optional message string that will override the preset message.
- `data` - additional error data set to `error.data` property.

```js
var error = OAuth2Boom.createNew('oauth_error', 400, 'Bad request', { timestamp: Date.now() });
```

### `wrap(error, [errorCode], [statusCode], [message])`

Decorates an error with the **boom** properties and a toURIFrag method where:
- `error` - the error object to wrap. If `error` is already a **boom** object, returns back the same object.
- `errorCode` - optional error code that will override the error name set by Boom.
- `statusCode` - optional HTTP status code. Defaults to `500`.
- `message` - optional message string. If the error already has a message, it adds the message as a prefix.
  Defaults to no message.

```js
var error = new Error('Unexpected input');
OAuth2Boom.wrap(error, 'invalid_input');
```

## HTTP 400 Errors

### `OAuth2Boom.invalidClient([message], [data])`

Returns an invalid_client error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidClient();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "invalid_client",
    "message": "An invalid client_id was provided."
}
```

### `OAuth2Boom.invalidRequest([message], [data])`

Returns an invalid_request error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidRequest();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "invalid_request",
    "message": "An invalid request parameter was provided."
}
```

### `OAuth2Boom.invalidParam([message], [data])`

Returns an invalid_param error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidParam();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "invalid_param",
    "message": "A provided request parameter is invalid."
}
```

### `OAuth2Boom.invalidRedirectURI([message], [data])`

Returns an invalid_redirect_uri error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidRedirectURI();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "invalid_redirect_uri",
    "message": "The provided redirect_uri does not match the one provided with the original authorization request."
}
```

### `OAuth2Boom.unsupportedOverHTTP([message], [data])`

Returns an unsupported_over_http error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.unsupportedOverHTTP();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "unsupported_over_http",
    "message": "OAuth 2.0 only supports calls over HTTPS."
}
```

### `OAuth2Boom.unsupportedResponseType([message], [data])`

Returns an unsupported_response_type error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.unsupportedResponseType();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "unsupported_response_type",
    "message": "The provided response_type is not supported for this request."
}
```

### `OAuth2Boom.unsupportedGrantType([message], [data])`

Returns an unsupported_grant_type error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.unsupportedGrantType();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "unsupported_grant_type",
    "message": "The provided grant_type is not supported."
}
```

### `OAuth2Boom.unsupportedRedirectURI([message], [data])`

Returns an unsupported_redirect_uri error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.unsupportedRedirectURI();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "unsupported_redirect_urie",
    "message": "The provided redirect_uri is not supported for this request type."
}
```

### `OAuth2Boom.versionRejected([message], [data])`

Returns an version_rejected error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.versionRejected();
```

Generates the following response payload:

```json
{
    "statusCode": 400,
    "error": "version_rejected",
    "message": "An unsupported version of OAuth was supplied."
}
```
## HTTP 401 Errors

### `OAuth2Boom.invalidToken([message], [data])`

Returns an invalid_token error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidToken();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "invalid_token",
    "message": "The provided token is invalid."
}
```

### `OAuth2Boom.invalidCallback([message], [data])`

Returns an invalid_callback error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidCallback();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "invalid_callback",
    "message": "The redirect_uri provided with this request uses an unsupported port or does not match the Client ID (Consumer Key)."
}
```

### `OAuth2Boom.invalidClientSecret([message], [data])`

Returns an invalid_client_secret error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidClientSecret();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "invalid_client_secret",
    "message": "An invalid client_secret was provided."
}
```

### `OAuth2Boom.invalidGrant([message], [data])`

Returns an invalid_grant error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.invalidGrant();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "invalid_grant",
    "message": "An invalid or expired token was provided."
}
```

### `OAuth2Boom.tokenExpired([message], [data])`

Returns a token_expired error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.tokenExpired();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "token_expired",
    "message": "The provided token has expired."
}
```

### `OAuth2Boom.unauthorizedClient([message], [data])`

Returns an unauthorized_client error where:
- `message` - optional message string that will override the preset message.
- `data` - optional additional error data.

```js
OAuth2Boom.unauthorizedClient();
```

Generates the following response payload:

```json
{
    "statusCode": 401,
    "error": "unauthorized_client",
    "message": "The client application is not allowed to use this grant_type."
}
```

