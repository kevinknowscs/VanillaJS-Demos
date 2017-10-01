// Register Polyfill Methods

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchStr, Position) {
      // This works much better than >= because
      // it compensates for NaN:
      if (!(Position < this.length))
        Position = this.length;
      else
        Position |= 0; // round position
      return this.substr(Position - searchStr.length,
                         searchStr.length) === searchStr;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this === null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count !== count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count === Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length === 0 || count === 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (var i = 0; i < count; i++) {
      rpt += str;
    }
    return rpt;
  }
}

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      return this.substr(position || 0, searchString.length) === searchString;
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if (typeof Number.isFinite !== 'function') {
  // noinspection JSPrimitiveTypeWrapperUsage
  Number.isFinite = function isFinite(value) {
    // 1. If Type(number) is not Number, return false.
    if (typeof value !== 'number') {
      return false;
    }
    // 2. If number is NaN, +∞, or −∞, return false.
    if (value !== value || value === Infinity || value === -Infinity) {
      return false;
    }
    // 3. Otherwise, return true.
    return true;
  };
}

if (!Number.isInteger) {
  // noinspection JSPrimitiveTypeWrapperUsage
  Number.isInteger = function(value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value;
  }
}

if (!Number.isNaN) {
  // noinspection JSPrimitiveTypeWrapperUsage
  Number.isNaN = function(value) {
    return value !== value;
  }
}

if (!Number.isSafeInteger) {
  // noinspection JSPrimitiveTypeWrapperUsage
  Number.isSafeInteger = function (value) {
    // noinspection Annotator
    return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
  }
}
