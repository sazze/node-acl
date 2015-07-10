# ACL
Access Control Library

## Usage

```js
var acl = require('@sazze/acl')(config);

var levels = acl.LEVELS;
```

## API

### acl.is[LevelName](level: Integer): Boolean
Checks if the given level is >= the value corresponding to the LevelName

### acl.eq[LevelName](level: Integer): Boolean
Checks if the given level is == the value corresponding to the LevelName

### acl.isAtLeast(levelYouHave: Integer, levelYouWant: Integer): Boolean
Checks if the levelYouHave >= the levelYouWant it to be

### acl.getAvailableLevels(levelYouHave: Integer): Array
Returns and array of all levels this user has access to