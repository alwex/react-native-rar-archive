import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { DocumentDirectoryPath, mkdir } from 'react-native-fs';
import { unrar } from 'react-native-rar-archive';

const sourcePath = `${DocumentDirectoryPath}/archive.rar`;
const targetPath = `${DocumentDirectoryPath}/unrar`;

export default function App() {
  const [result, setResult] = React.useState<string | undefined>();

  React.useEffect(() => {
    const handleUnrar = async () => {
      await mkdir(targetPath);

      const res = await unrar(sourcePath, targetPath);

      setResult(res);
    };
    handleUnrar();
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
