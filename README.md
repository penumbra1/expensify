This is a study project for Andrew Mead's [React course](https://www.udemy.com/react-2nd-edition) (definitely recommended!). Live demo [here](https://expensify-by-penumbra1.herokuapp.com/).

Andrew's source code is [here](https://github.com/andrewjmead/react-course-2-expensify-app), and he is the original author of this project. However, I wrote all of the code in this repo from scratch as I progressed in the course, with quite a few changes.

## Code

Changed `mapDispatchToProps` to [object syntax](https://daveceddia.com/redux-mapdispatchtoprops-object-form/) (except where ownProps are passed) to bind action creators automatically.

Used React Fragments to render multiple JSX elements.

Extracted hardcoded path names into reusable constants.

Used [shortid](https://www.npmjs.com/package/shortid) for keys and temporary ids in optimistic UI updates.

Added NavBar, Loader, HelpPage, Social, OnlineIndicator components.

Added error handling and display.

Implemented optimistic UI updates via Thunk and Promise.race.

\+ Lots of little performance and readability tweaks.

## Testing

Added tests for old and new components to improve code coverage.

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

- Firebase limitation: server can't push updates to slient unless there is an value listener. However, a value listener will cause a roundtrip:
  -- 1) client state updates
  -- 2) client sends update to firebase
  -- 3) firebase updates 4) value listener causes client to update again
  There is no way to see whether a change came from the current client or another app instance, so if I want to sync between different app instances, the roundtrip is inevitable. I can only avoid reloading the entire list on every single change by adding more specific child listeners.

- Normalize the store: add a byId object to use for syncing and keep only the ids in the array to use for sorting/filtering

- refactor ExpenseForm to pass only the updated fields in "updates" instead of rewritingthe entire expense - diff the form state against its props.expense and send up only the difference

- Persist state to localstorage and boot from there when offline

- add social media icons, spinner, error pic
- styles - Grommet?
- stats page visualized with Grommet?
-
- switch to Babel 7
- refactor to React.PureComponent where possible
- switch to React 16.6 to use memo in sfc: see https://twitter.com/dan_abramov/status/1055689046117105664

- fix: going to inexistent route -> 404 -> back is slow - why?

- check for fragment <> syntax support in Jest and remove \<Fragment\> everywhere

- review test coverage (e.g. status, social, router)
- firebase files are not tested - check out [firebase-mock](https://github.com/soumak77/firebase-mock/blob/HEAD/tutorials/client/auth/authentication.md))
- add tag functionality (search by tag, tag cloud)
