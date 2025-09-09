import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function Day4Screen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Day 4: Handling Events</ThemedText>
      <ThemedText style={styles.content}>
        Handling events with React elements is very similar to handling events
        on DOM elements.
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
