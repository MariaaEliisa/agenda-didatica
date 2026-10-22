import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/theme';

export default function ScreenHeader({ title, subtitle, onBack, right }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Voltar" style={styles.back}>
          <Text style={styles.backText}>‹</Text>
        </Pressable>
        <View style={styles.titleArea}>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {right || <View style={styles.spacer} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { width: 42, height: 42, borderRadius: 14, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  backText: { marginTop: -5, color: COLORS.text, fontSize: 34, lineHeight: 40 },
  titleArea: { flex: 1 },
  title: { color: COLORS.text, fontSize: 25, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 3 },
  spacer: { width: 42 },
});
