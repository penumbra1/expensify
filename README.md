This is a study project for Andrew Mead's [React course](https://www.udemy.com/react-2nd-edition) (definitely recommended!).
Andrew's source code is [here](https://github.com/andrewjmead/react-course-2-expensify-app), and he is the original author of this project. However, I wrote all of the code in this repo from scratch as I progressed in the course, with a few tweaks.

### Code

Changed `mapDispatchToProps` to object syntax instead of function (except where ownProps are passed). This binds action creators automatically.

Used React 16 and rendered adjacent JSX tags in arrays <3.

### Testing

Added a few tests to improve code coverage.

---

Rewrote some tests in selectors/expenses.test.js to use sort and filter instead of hard-coding filtered and sorted expense data. Thus if test data changes, test will still use it. However, this makes tests very similar in implementation to the method they are testing, which might not be a good practice. However, as filter and sort are built-in and their use here is very straightforward, I opted to trust them and allow for test data mutability.

---

According to the [docs](http://airbnb.io/enzyme/docs/guides/jest.html), looks like this is not needed in jest config anymore:

`"setupFiles": ["raf/polyfill", "<rootDir>/src/tests/setupTests.js"]`

### Build

Switched to npm

---

Used the latest version of webpack and broke the config into 3 files. Thanks to the new automatic _DefinePlugin_, production sourcemap got much lighter (2.12Mb vs. 4.71Mb).
