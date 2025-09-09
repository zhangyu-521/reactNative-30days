import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function Day3Screen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Day 3: State and Lifecycle</ThemedText>
      <ThemedText style={styles.content}>
        State allows React components to change their output over time in
        response to user actions, network responses, and anything else.
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
