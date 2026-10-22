import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AppointmentCard from '../components/AppointmentCard';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { deleteAppointment, getAppointments } from '../services/appointmentsApi';
import { COLORS } from '../utils/theme';

export default function ListScreen({ navigation }) {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadAppointments = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError('');
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Não foi possível carregar a agenda. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [loadAppointments]));

  const confirmDelete = (item) => {
    Alert.alert('Excluir atividade?', `“${item.titulo}” será removida da agenda.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive', onPress: async () => {
          try {
            await deleteAppointment(item.id);
            setAppointments((current) => current.filter((appointment) => appointment.id !== item.id));
          } catch (err) {
            Alert.alert('Não foi possível excluir', 'Tente novamente em instantes.');
          }
        },
      },
    ]);
  };

  const filteredAppointments = appointments.filter((item) =>
    (item.titulo || '').toLowerCase().includes(search.trim().toLowerCase())
  );

  const listHeader = (
    <>
      <ScreenHeader title="Minha agenda" subtitle="Suas atividades em um só lugar" onBack={() => navigation.goBack()} />
      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryLabel}>ATIVIDADES CADASTRADAS</Text>
          <Text style={styles.summaryCount}>{appointments.length} <Text style={styles.summarySuffix}>{appointments.length === 1 ? 'atividade' : 'atividades'}</Text></Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Form')} style={styles.addButton} accessibilityRole="button">
          <Text style={styles.addButtonText}>＋ Nova</Text>
        </Pressable>
      </View>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar pelo título..."
        placeholderTextColor="#969AAF"
        style={styles.search}
        accessibilityLabel="Buscar atividades pelo título"
        returnKeyType="search"
      />
      {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text><PrimaryButton title="Tentar novamente" onPress={() => loadAppointments()} variant="secondary" style={styles.retry} /></View>}
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingWrap}><ScreenHeader title="Minha agenda" subtitle="Suas atividades em um só lugar" onBack={() => navigation.goBack()} /><Text style={styles.loading}>Carregando agenda...</Text></View>
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={({ item }) => (
            <AppointmentCard
              item={item}
              onEdit={() => navigation.navigate('Form', { appointment: item })}
              onDelete={() => confirmDelete(item)}
            />
          )}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={!error ? (
            <EmptyState
              title={search ? 'Nada encontrado' : 'Sua agenda está vazia'}
              message={search ? 'Tente pesquisar usando outra palavra.' : 'Adicione a primeira atividade para começar a organizar sua rotina.'}
            />
          ) : null}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadAppointments(true)} tintColor={COLORS.primary} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  listContent: { paddingBottom: 35, flexGrow: 1 },
  loadingWrap: { flex: 1 },
  loading: { textAlign: 'center', color: COLORS.muted, padding: 30 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 22, marginTop: 2, marginBottom: 16 },
  summaryLabel: { color: COLORS.muted, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  summaryCount: { color: COLORS.text, fontSize: 25, fontWeight: '900', marginTop: 4 },
  summarySuffix: { color: COLORS.muted, fontSize: 13, fontWeight: '600' },
  addButton: { backgroundColor: COLORS.primary, paddingVertical: 12, paddingHorizontal: 15, borderRadius: 13 },
  addButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  search: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.surface, marginHorizontal: 22, marginBottom: 17, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 14, color: COLORS.text },
  errorBox: { backgroundColor: '#FFF4F4', borderColor: '#F6D5D8', borderWidth: 1, borderRadius: 16, padding: 14, marginHorizontal: 22, marginBottom: 16 },
  errorText: { color: COLORS.danger, fontSize: 13, lineHeight: 19 },
  retry: { marginTop: 12 },
});
