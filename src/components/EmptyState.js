import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/theme';

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}><Text style={styles.icon}>✦</Text></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 22, borderWidth: 1, borderColor: COLORS.border, padding: 26, alignItems: 'center', marginTop: 12 },
  iconCircle: { width: 54, height: 54, borderRadius: 18, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  icon: { color: COLORS.primary, fontSize: 28 },
  title: { color: COLORS.text, fontWeight: '800', fontSize: 17, textAlign: 'center' },
  message: { color: COLORS.muted, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 8 },
});
