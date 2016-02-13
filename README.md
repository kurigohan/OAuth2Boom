# OAuth2Boom

OAuth2.0 Errors using Boom

[![Build Status]](http://travis-ci.org/kurigohan/oauth2boom)
[![Current Version]](https://www.npmjs.com/package/oauth2boom)

Lead Maintainer: [Andy Nguyen](https://github.com/kurigohan)

<!-- toc -->

- [OAuth2Boom](#oauth2boom)
  - [Helper Methods](#helper-methods)
    - [`wrap(error, [errorCode], [statusCode], [message])`](#wraperror-errorcode-statuscode-message)
    - [`create(errorCode, [message], [data])`](#createerrorcode-message-data)
    - [`createNew(errorCode, [message], [data])`](#createnewerrorcode-message-data)
  - [HTTP 400 Errors](#http-400-errors)
    - [`OAuth2Boom.invalidClient([message], [data])`](#oauth2boominvalidclientmessage-data)
    - [`OAuth2Boom.invalidRequest([message], [data])`](#oauth2boominvalidrequestmessage-data)
    - [`OAuth2Boom.invalidParam([message], [data])`](#oauth2boominvalidparammessage-data)

<!-- tocstop -->

# OAuth2Boom

**oauth2boom** provides a set of utilities for returning OAuth 2.0 errors through Boom. Each utility returns a `Boom` error response
In addition to the Boom properties, the following property is added: 
- `toURIFrag` - function to transform the error into a URI fragment string.

## Helper Methods

### `wrap(error, [statusCode], [message])`

Decorates an error with the **boom** properties and also a toURIFrag method where:
- `error` - the error object to wrap. If `error` is already a **boom** object, returns back the same object.
- `errorCode` - optional error code that will override the error name set by Boom.
- `statusCode` - optional HTTP status code. Defaults to `500`.
- `message` - optional message string. If the error already has a message, it adds the message as a prefix.
  Defaults to no message.

```js
var error = new Error('Unexpected input');
OAuth2Boom.wrap(error, 'invalid_input');
```

### `create(errorCode, [message], [data])`

Generates an `Error` object with the **boom** decorations where:
- `errorCode` - an HTTP error code number. Must be greater or equal 400.
- `message` - optional message string that will override the preset message.
- `data` - additional error data set to `error.data` property.

```js
var error = OAuth2Boom.create('invalid_client', 'Bad request', { timestamp: Date.now() });
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
    "error": "invalid_redirectURI",
    "message": "The provided redirect_URI does not match the one provided with the original authorization request."
}
```
