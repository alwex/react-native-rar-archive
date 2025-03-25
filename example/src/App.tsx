import { keepLocalCopy, pick } from '@react-native-documents/picker';
import { Button, StyleSheet, View } from 'react-native';
import RNFS from 'react-native-fs';
import { unrar } from 'react-native-rar-archive';

const target = RNFS.DocumentDirectoryPath;

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="open file"
        onPress={async () => {
          try {
            const [{ name, uri }] = await pick({});
            console.log({ name, uri });

            const [copyResult] = await keepLocalCopy({
              files: [
                {
                  uri,
                  fileName: name ?? 'fallback-name',
                },
              ],
              destination: 'documentDirectory',
            });

            if (copyResult.status === 'success') {
              // do something with the local copy:
              console.log(copyResult.localUri);
              console.log({ target });
              const unrarResult = await unrar(copyResult.localUri, target);

              console.log({ unrarResult });
            }
          } catch (err) {
            console.error(err);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
