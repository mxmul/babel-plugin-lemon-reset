# babel-plugin-lemon-reset

[![npm](https://img.shields.io/npm/v/babel-plugin-lemon-reset.svg)](https://www.npmjs.com/package/babel-plugin-lemon-reset)

Fully remove the [Lemon Reset](https://github.com/Yelp/lemon-reset) runtime with Babel.

## Example

**Input**
```js
import React from "react";
import {A, Div} from "lemon-reset";

export function App() {
  return (
    <Div>
      Hello World!
      <A href="https://www.example.com">Link</A>
    </Div>
  );
}
```

**Output**
```js
import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";

export function App() {
  return (
    <div className={_lemonStyles["lemon--div"]}>
      Hello World!
      <a href="https://www.example.com" className={_lemonStyles["lemon--a"]}>
        Link
      </a>
    </div>
  );
}
```

## Installation

```
npm i babel-plugin-lemon-reset
```

## Usage

### Via .babelrc

__.babelrc__
```json
{
  "plugins": ["lemon-reset"]
}
```

### Via CLI
```
babel --plugins lemon-reset script.js
```

### Via Node API
```js
require("babel-core").transform("code", {
  plugins: ["lemon-reset"]
});
```

## License
MIT
