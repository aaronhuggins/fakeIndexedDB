# 4.0.0 (beta)

- #23 - TypeScript support! As of version 4, fake-indexeddb includes TypeScript types. As you can see in types.d.ts, it's just using TypeScript's built-in IndexedDB types, rather than generating types from the fake-indexeddb code base. The reason I did this is for compatibility with your application code that may already be using TypeScript's IndexedDB types, so if I used something different for fake-indexeddb, it could lead to spurious type errors. In theory this could lead to other errors if there are differences between Typescript's IndexedDB types and fake-indexeddb's API, but currently I'm not aware of any difference.

- Switched from CommonJS to ECMAScript modules. That means you need to `import` it, not `require` it. If that's a problem for you, stick to version 3 of fake-indexeddb, which supports `require("fake-indexeddb")`. Version 3 has basically all the same functionality as version 4, and I'll try to make any important bug fixes in both versions.

- Since we're now using ES modules, I made all the IndexedDB objects into named exports. So you can do this:

   ```js
   import { indexedDB, IDBKeyRange } from "fake-indexeddb";
   ```

   rather than this:

   ```js
   import indexeddb from "fake-indexeddb";
   import IDBKeyRange from "fake-indexeddb/lib/FDBKeyrange";
   ```

   The latter syntax still works for backwards compatibility purposes, but it's not as nice.

- Also related to the ES modules change, support for old versions of Node.js is dropped. Specifically, the supported versions of Node.js are now `^12.20.0 || ^14.13.1 || >=16.0.0`, based on [this recommendation](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

- #66 - Removed `Array` properties (like `includes`, `sort`, etc.) from the internal `FakeDOMStringList` class, which is used for parts of IndexedDB that return a `DOMStringList` which is a weird old thing that is kind of like an array but has many fewer properties. As described in #66, leaving that extra `Array` stuff led to the possibility your tests would pass but your application would crash. If you were relying on these non-standard properties in your tests but carefully not using them in your application code, this is a breaking change. This likely affects very few people.

- For environments with a built-in `structuredClone` function (such as Node.js 17+), that is used rather than the `realistic-structured-clone` NPM module. There are some differences between the two implementations of the structured cloning algorithm, but probably nothing noticable, and probably all is in the direction of better spec compliance such as [this](https://github.com/dumbmatter/realistic-structured-clone/issues/8) or [this](https://github.com/dumbmatter/realistic-structured-clone/issues/10#issuecomment-966629946). There is also a minor performance increase with the built-in function - the test suite of fake-indexeddb runs about 5% faster.

# 3.1.7 (2021-10-19)

- #71 - Fixed an error when used with jest/jsdom introduced in version 3.1.6.

# 3.1.6 (2021-10-19)

- #70 - Fixed performance regression in the previous version. Thank you @joshkel for figuring this out!

# 3.1.4 (2021-10-11)

- #67 - Fixed compatibility with jsdom by replacing all uses of `setImmedaite` with `setTimeout`.

# 3.1.3 (2021-06-19)

- #65 - Got rid of constructor.name usage, since minifying can break it.

# 3.1.2 (2020-07-21)

- #54 - Fixed a bug where multiple transactions started at the same time could result in a transaction never resolving, if one of the transactions had no database operations inside it. Thank you @medmunds for both finding and fixing this bug!

# 3.1.1 (2020-07-15)

- #53 - Fixed a bug introduced in v3.1.0 where `FDBObjectStore.delete` resulted in an error when given a key range. Possibly a couple other situations with key ranges produced similar errors too.

# 3.1.0 (2020-07-02)

- #52 - Significant performance improvement. 5.5x faster on a real use case. Thank you @nolanlawson for this speed up!

# 3.0.2 (2020-06-10)

- #45 - Fix synchronous event firing in a transaction, which led to a stack overflow when used with Dexie's waitFor function.

# 3.0.1 (2020-05-25)

- #41 - Correctly roll back a record added to a store when an index constraint error occurs.

# 3.0.0 (2019-11-15)

- Stopped importing core-js by default. This means that, for people using fake-indexeddb in really old environments like PhantomJS, they will now need to import core-js like `require("core-js/stable");` (or something similar) before importing fake-indexeddb.

# 2.1.1 (2019-06-05)

- #30 - Fixed typo in the name of the `Event.timeStamp` property.

# 2.1.0 (2019-03-18)

- Added the ability to include `fake-indexeddb/auto` and have it populate all the global variables.
- Added support for `IDBTransaction.commit()` and `IDBFactory.databases()`.
- Fixed a couple minor edge cases to improve performance on the web platform tests from 85% to 87%.

# 2.0.6 (2019-03-14)

- Fixed issue #26, where event handlers were inappropriately not being called if they added or removed other handlers to the invoking listener in their callbacks.

# 2.0.5 (2019-02-07)

- Fixed issue #25 by importing core-js/shim rather than all of core-js.

# 2.0.4 (2018-02-22)

- Improved structured cloning, which fixes bugs when used with strange objects like https://github.com/dumbmatter/realistic-structured-clone/issues/5

# 2.0.3 (2017-05-09)

- Fixed issue #20 related to iterating over cursors with non-unique keys

# 2.0.2 (2017-05-01)

- Include core-js by default to make it work more easily in old environments like PhantomJS

# 2.0.1 (2017-04-29)

- Minor updates to README

# 2.0.0 (2017-04-29)

- Fully implements the [IndexedDB 2.0 API](https://hacks.mozilla.org/2016/10/whats-new-in-indexeddb-2-0/) (which technically still is a draft, but is probably not going to substantially change).
- Ported to TypeScript, which hopefully means less bugs.
- Dynamically runs [the W3C web-platform-tests](https://github.com/w3c/web-platform-tests/tree/master/IndexedDB) rather than using manually ported tests. This means it's easy to run new tests, and the tests written since the original release of fake-indexeddb turned up several minor bugs which have now been fixed. See `npm run test-w3c`.
