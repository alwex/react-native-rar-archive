import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { unrar } from 'react-native-rar-archive';
import { MainBundlePath, DocumentDirectoryPath } from 'react-native-fs';

const sourcePath = `${DocumentDirectoryPath}/archive.cbr`;
const targetPath = `${MainBundlePath}/unrar`;

console.log(sourcePath);
console.log(targetPath);

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    unrar(sourcePath, targetPath).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
