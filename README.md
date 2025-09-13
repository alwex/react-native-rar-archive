# react-native-rar-archive

unrar for react native

## Installation

```sh
npm install react-native-rar-archive
```

## Usage

```js
import { unrar } from 'react-native-rar-archive';
import { DocumentDirectoryPath } from 'react-native-fs';

// ...

const sourcePath = `${DocumentDirectoryPath}/archive.rar`;
const targetPath = `${DocumentDirectoryPath}/unrar`;

const result = await unrar(sourcePath, targetPath);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Native libraries used

- UnrarKit (ios) https://github.com/abbeycode/UnrarKit
<<<<<<< HEAD
- 7-Zip-JBinding-4Android (android) https://github.com/omicronapps/7-Zip-JBinding-4Android
=======
- 7zip (android) https://github.com/omicronapps/7-Zip-JBinding-4Android
>>>>>>> origin/release-1.4.0

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
