# Stylie McStyleface

Tagged template strings for SASS. Uses `node-sass` so not useful for client-side code.

The intended use-case is for rendering static sites with JS and React, but keeping
the styles in the same files as the code. I was previously using [free-style](https://github.com/blakeembrey/free-style) but struggled with its lexicographic approach to rule ordering (bad news for @media queries). It also fails silently way too often and has some bugginess around deeply-nested things. All this led me to a comparatively simple approach.

```js
import style from 'stylie-mcstyleface';

// include global rules
style.rules `
  body {
    font-size: 12pt;
  }

  @media (min-width: 90000px) {
    font-size: 500pt;
  }
`;

// or define anonymous classes
const className = style.register `
  color: #777;
  &:hover {
    color: #222;
  }
`;

className // => 'mc1igb8ty'

// and use them in JSX or wherever
const elem = <div className={className}>some content</div>;
```

Accumulated styles can be retrieved with the `.getCSS` method.


```js
style.getCSS();
// body {
//   font-size: 12pt; }
//
// @media (min-width: 90000px) {
//   font-size: 500pt; }
// .mc1igb8ty {
//   color: #777; }
//   .mc1igb8ty:hover {
//     color: #222; }
```
