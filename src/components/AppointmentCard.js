import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/theme';

export default function AppointmentCard({ item, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateDay}>{item.data?.slice(8, 10) || '--'}</Text>
        <Text style={styles.dateMonth}>{item.data?.slice(5, 7) || '--'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.meta}>◷  {item.hora}  ·  {item.data}</Text>
        {!!item.descricao && <Text style={styles.description} numberOfLines={3}>{item.descricao}</Text>}
        <View style={styles.actions}>
          <Pressable onPress={onEdit} style={styles.editButton} accessibilityRole="button">
            <Text style={styles.editText}>Editar</Text>
          </Pressable>
          <Pressable onPress={onDelete} style={styles.deleteButton} accessibilityRole="button">
            <Text style={styles.deleteText}>Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', gap: 14, backgroundColor: COLORS.surface, borderRadius: 20, padding: 16, marginBottom: 12, marginHorizontal: 22, borderWidth: 1, borderColor: COLORS.border },
  dateBadge: { width: 54, height: 62, borderRadius: 16, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  dateDay: { color: COLORS.primaryDark, fontSize: 21, fontWeight: '800' },
  dateMonth: { color: COLORS.primaryDark, fontSize: 11, fontWeight: '700', marginTop: 1 },
  content: { flex: 1 },
  title: { color: COLORS.text, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  meta: { color: COLORS.primary, fontSize: 12, fontWeight: '700', marginTop: 6 },
  description: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 7 },
  actions: { flexDirection: 'row', gap: 10, marginTop: 13 },
  editButton: { backgroundColor: '#F0F1F7', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  editText: { color: COLORS.text, fontWeight: '700', fontSize: 12 },
  deleteButton: { backgroundColor: COLORS.dangerSoft, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  deleteText: { color: COLORS.danger, fontWeight: '700', fontSize: 12 },
});
