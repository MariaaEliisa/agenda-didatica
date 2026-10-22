import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import { createAppointment, updateAppointment } from '../services/appointmentsApi';
import { todayISO, validateAppointment } from '../utils/validators';
import { COLORS } from '../utils/theme';

const emptyForm = () => ({ titulo: '', descricao: '', data: todayISO(), hora: '09:00' });

function Field({ label, hint, ...inputProps }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor="#A0A3B5"
        style={[styles.input, inputProps.multiline && styles.multiline]}
        {...inputProps}
      />
      {!!hint && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}

export default function FormScreen({ navigation, route }) {
  const appointment = route.params?.appointment;
  const isEditing = Boolean(appointment?.id);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (appointment) {
      setForm({
        titulo: appointment.titulo || '',
        descricao: appointment.descricao || '',
        data: appointment.data || todayISO(),
        hora: appointment.hora || '09:00',
      });
    } else {
      setForm(emptyForm());
    }
    setError('');
  }, [appointment]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
  };

  const handleSave = async () => {
    const validationMessage = validateAppointment(form);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    setSaving(true);
    setError('');
    const payload = {
      titulo: form.titulo.trim(),
      descricao: form.descricao.trim(),
      data: form.data.trim(),
      hora: form.hora.trim(),
    };
    try {
      if (isEditing) await updateAppointment(appointment.id, payload);
      else await createAppointment(payload);
      Alert.alert('Tudo certo!', isEditing ? 'A atividade foi atualizada.' : 'A atividade foi adicionada à agenda.', [
        { text: 'Continuar', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      setError('Não foi possível salvar. Verifique sua conexão e confirme se o recurso /dados aceita esses campos na MockAPI.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <ScreenHeader
            title={isEditing ? 'Editar atividade' : 'Nova atividade'}
            subtitle={isEditing ? 'Atualize os detalhes abaixo' : 'Planeje seu próximo passo'}
            onBack={() => navigation.goBack()}
          />
          <View style={styles.formCard}>
            <View style={styles.introIcon}><Text style={styles.introIconText}>{isEditing ? '✎' : '＋'}</Text></View>
            <Text style={styles.formTitle}>{isEditing ? 'Ajuste sua atividade' : 'O que você vai fazer?'}</Text>
            <Text style={styles.formDescription}>Preencha os dados principais. Os campos com * são obrigatórios.</Text>

            <Field
              label="Título *"
              value={form.titulo}
              onChangeText={(value) => updateField('titulo', value)}
              placeholder="Ex.: Estudar banco de dados"
              maxLength={80}
              returnKeyType="next"
            />
            <Field
              label="Descrição"
              value={form.descricao}
              onChangeText={(value) => updateField('descricao', value)}
              placeholder="Anote o que precisa lembrar..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={300}
              hint={`${form.descricao.length}/300 caracteres`}
            />
            <View style={styles.twoColumns}>
              <View style={styles.half}>
                <Field
                  label="Data *"
                  value={form.data}
                  onChangeText={(value) => updateField('data', value)}
                  placeholder="AAAA-MM-DD"
                  maxLength={10}
                  autoCapitalize="none"
                  hint="Ano-mês-dia"
                />
              </View>
              <View style={styles.half}>
                <Field
                  label="Horário *"
                  value={form.hora}
                  onChangeText={(value) => updateField('hora', value)}
                  placeholder="HH:MM"
                  maxLength={5}
                  hint="24 horas"
                />
              </View>
            </View>

            {!!error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}
            <PrimaryButton title={isEditing ? 'Salvar alterações' : 'Salvar atividade'} onPress={handleSave} loading={saving} />
            <PrimaryButton title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} disabled={saving} style={styles.cancelButton} />
          </View>
          <Text style={styles.privacyNote}>Dica: não informe dados pessoais ou sensíveis. Este projeto usa uma API pública compartilhada.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  scrollContent: { paddingBottom: 28 },
  formCard: { marginHorizontal: 22, backgroundColor: COLORS.surface, borderRadius: 24, borderWidth: 1, borderColor: COLORS.border, padding: 20 },
  introIcon: { width: 48, height: 48, borderRadius: 15, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  introIconText: { color: COLORS.primary, fontSize: 25, fontWeight: '800' },
  formTitle: { color: COLORS.text, fontSize: 21, fontWeight: '900', letterSpacing: -0.4 },
  formDescription: { color: COLORS.muted, fontSize: 13, lineHeight: 19, marginTop: 7, marginBottom: 22 },
  field: { marginBottom: 17 },
  label: { color: COLORS.text, fontSize: 13, fontWeight: '800', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#FCFCFE', borderRadius: 13, minHeight: 50, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.text, fontSize: 14 },
  multiline: { minHeight: 100, paddingTop: 13 },
  hint: { color: COLORS.muted, fontSize: 11, marginTop: 6 },
  twoColumns: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
  errorBox: { borderColor: '#F1C8CD', borderWidth: 1, backgroundColor: COLORS.dangerSoft, borderRadius: 12, padding: 12, marginBottom: 15 },
  errorText: { color: COLORS.danger, fontSize: 13, lineHeight: 18 },
  cancelButton: { marginTop: 10 },
  privacyNote: { color: COLORS.muted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginHorizontal: 30, marginTop: 17 },
});
