import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function Day2Screen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Day 2: Components and Props</ThemedText>
      <ThemedText style={styles.content}>
        Components let you split the UI into independent, reusable pieces, and
        think about each piece in isolation.
      </ThemedText>
      <ThemedText style={styles.content}>
        Props are inputs to components. They are passed from parent to child and
        are read-only.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
});
