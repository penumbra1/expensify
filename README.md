This is a study project for Andrew Mead's [React course](https://www.udemy.com/react-2nd-edition) (definitely recommended!). Live demo [here](https://expensify-by-penumbra1.herokuapp.com/).

Andrew's source code is [here](https://github.com/andrewjmead/react-course-2-expensify-app), and he is the original author of this project. However, I wrote all of the code in this repo from scratch as I progressed in the course, with a few tweaks.

### Code

Changed `mapDispatchToProps` to object syntax instead of function (except where ownProps are passed) to bind action creators automatically.

Used React Fragments to render multiple JSX elements.

### Testing

Added a few tests to improve code coverage (near 100% now thanks to testing mapStateToProps, although it may not be necessary).

---

Removed `"setupFiles": ["raf/polyfill"]` from Jest config: Jest [now ships with raf polyfill](https://github.com/BuckyMaler/channels/pull/79).

### Build

Switched to npm

---

Used the latest version of webpack to make use of automatic _DefinePlugin_ in production and drop bundle size. Production sourcemap also got much lighter (2.12Mb vs. 4.71Mb).

Separated config into 3 files merged with _webpack-merge_.

---

Switched to newer _mini-css-extract-plugin_: see [issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/749). Separated CSS into _styles.css_ in production but kept it in _bundle.js_ in development for hot reloading.

---

Added [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) to remove comments and duplicate CSS.
