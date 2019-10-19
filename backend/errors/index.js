const util = require('util');

const Kind = {
  fmtError: 'Invalid format',
  notFound: 'Entity not found',
  exists: 'Entity already exists',
  permission: 'Permission denied',
  notAuthorised: 'Permission denied',
  external: 'Could not connect to external system',
  unexpected: 'Unexpected error',
  unimplemented: 'Unimplemented',
  _blank: null,
};

function Errable(message, kind, op, err, details) {
  this.message = message;
  this.parent = err;
  this.op = op;
  this.kind = kind;
  this.details = details;
}

Errable.prototype = new Error();

Errable.Kinds = Kind;

Errable.E = function(msg, kind, op, parent, details) {
  if (msg === undefined) {
    throw new Errable('call to Errable.E with no message');
  }

  if (kind === Kind._blank && parent) {
    kind = parent.kind;
  }

  if (parent === undefined) {
    parent = new Error(msg);
  }

  return new Errable(msg, kind, op, parent, details);
};

Errable.prototype.code = function() {
  switch (this.kind) {
    case Kind.fmtError:
      return 422;
    case Kind.notFound:
      return 404;
    case Kind.exists:
      return 409;
    case Kind.permission:
      return 401;
    case Kind.notAuthorised:
      return 403;
    case Kind.external:
      return 502;
    case Kind.unimplemented:
      return 501;
    case Kind.unexpected:
      return 400;
  }
};

Errable.prototype[
  util.inspect.custom
] = Errable.prototype.toString = function() {
  let p = this.parent;
  let s = '';
  while (p) {
    if (!(p instanceof Errable)) {
      s += `\n\t${p.message}`;
      p = null;
    } else {
      s += `\n\t${p.op}: ${p.message}`;
      p = p.parent;
    }
  }

  return `Error in ${this.op}: ${this.message}${s}`;
};

Errable.prototype.root = function() {
  let p = this;

  while (p instanceof Errable) {
    p = p.parent;
  }

  return p;
};

module.exports = Errable;
