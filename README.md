This is a study project for Andrew Mead's [React course](https://www.udemy.com/react-2nd-edition) (definitely recommended!). Live demo [here](https://expensify-by-penumbra1.herokuapp.com/).

Andrew's source code is [here](https://github.com/andrewjmead/react-course-2-expensify-app), and he is the original author of this project. However, I wrote all of the code in this repo from scratch as I progressed in the course, with quite a few changes.

## Code

Changed `mapDispatchToProps` to [object syntax](https://daveceddia.com/redux-mapdispatchtoprops-object-form/) (except where ownProps are passed) to bind action creators automatically.

Used React Fragments to render multiple JSX elements.

Extracted hardcoded path names into reusable constants.

Added NavBar, Loader, HelpPage, and Social components.

Added error handling and user messages for network and database errors.

\+ Lots of little performance and readability tweaks.

## Testing

Added a few tests to improve code coverage (near 100% now thanks to testing mapStateToProps, although it may not be necessary).

Rewrote some tests to DRY them up and avoid passing around unnecessary data.

Removed `"setupFiles": ["raf/polyfill"]` from Jest config: Jest [now ships with raf polyfill](https://github.com/BuckyMaler/channels/pull/79).

## Build

Switched to npm.

Separated config into 3 files merged with _webpack-merge_.

Used the latest version of webpack to automatically define process.env.NODE_ENV === 'production' and [drop production bundle size](https://webpack.js.org/guides/production/#specify-the-mode). Production sourcemap also got much lighter (2.12Mb vs. 4.71Mb).

Used [env-cmd](https://www.npmjs.com/package/env-cmd) instead of [cross-env](https://www.npmjs.com/package/cross-env) + [dotenv](https://www.npmjs.com/package/dotenv) for loading environment variables.

Switched to newer _mini-css-extract-plugin_: see [issue](https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/749). Separated CSS into _styles.css_ in production but kept it in _bundle.js_ in development for hot reloading.

Added [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) to remove comments and duplicate CSS.

## TODO:

- offline firbase: actions and updates are sent when user reconnects. Add an "online" indicator and sync upon reconnect.
- check if manual render check on firebase login state change is necessary
- add cancel functionality
- add social media icons, spinner, error pic
- fix: going to edit/{inexistentId} throws an error - gotta redirect to 404 if firebase returns nothing
- fix: going to inexistent route -> 404 -> back is slow - why?
- styles - Grommet?
- stats visualized with Grommet?
- switch to Babel 7
- refactor to React.PureComponent where possible
- switch to React 16.6 to use memo in sfc
- refactor promises to async/await
- check for fragment <> syntax support in Jest
- refactor ExpenseForm to pass only the updated fields in "updates" instead of rewritingthe entire expense - diff the form state against its props.expense and send up only the difference
- review test coverage (e.g. status, social, router)
- firebase files are not tested - check out [firebase-mock](https://github.com/soumak77/firebase-mock/blob/HEAD/tutorials/client/auth/authentication.md))
- make store observe external changes in firebase (e.g. if another instance of the app is changing the same DB) - currently the store loads data from the DB only on starup
- add reload/refresh button next to the error message for when expenses fail to load
- add tag functionality (search by tag, tag cloud)
