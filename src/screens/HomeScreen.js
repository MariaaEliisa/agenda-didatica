import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { COLORS } from '../utils/theme';

const features = [
  { number: '01', title: 'Organize', text: 'Guarde suas atividades em uma agenda simples.' },
  { number: '02', title: 'Acompanhe', text: 'Consulte e filtre os compromissos cadastrados.' },
  { number: '03', title: 'Atualize', text: 'Edite ou exclua uma atividade quando precisar.' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <View style={styles.logo}><Text style={styles.logoText}>A</Text></View>
          <View>
            <Text style={styles.brand}>AGENDA DIDÁTICA</Text>
            <Text style={styles.brandSub}>SEU ESPAÇO DE ORGANIZAÇÃO</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.pill}><View style={styles.pillDot} /><Text style={styles.pillText}>SIMPLES • PRÁTICA • SUA</Text></View>
          <Text style={styles.heroTitle}>Tire seus planos{ '\n' }do papel.</Text>
          <Text style={styles.heroText}>Organize estudos, tarefas e atividades em um só lugar. Comece adicionando o que você precisa fazer.</Text>
          <View style={styles.heroButtons}>
            <PrimaryButton title="＋  Nova atividade" onPress={() => navigation.navigate('Form')} />
            <PrimaryButton title="Ver minha agenda  →" variant="secondary" onPress={() => navigation.navigate('List')} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Feita para o dia a dia</Text>
          <Text style={styles.sectionCaption}>Tudo o que você precisa para começar.</Text>
        </View>
        {features.map((feature) => (
          <View style={styles.feature} key={feature.number}>
            <View style={styles.featureNumber}><Text style={styles.featureNumberText}>{feature.number}</Text></View>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.text}</Text>
            </View>
            <Text style={styles.featureArrow}>↗</Text>
          </View>
        ))}
        <Text style={styles.footer}>Projeto acadêmico • React Native + Expo</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 28 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 25 },
  logo: { width: 45, height: 45, borderRadius: 15, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  brand: { color: COLORS.text, fontSize: 13, fontWeight: '900', letterSpacing: 1 },
  brandSub: { color: COLORS.muted, fontSize: 9, letterSpacing: 1.1, marginTop: 4 },
  hero: { overflow: 'hidden', backgroundColor: '#20214E', borderRadius: 28, padding: 23, paddingTop: 25, position: 'relative', marginBottom: 30 },
  pill: { alignSelf: 'flex-start', borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.12)', paddingVertical: 8, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 7 },
  pillDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#A5F3D6' },
  pillText: { color: '#E4E5FF', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#FFFFFF', fontSize: 36, lineHeight: 41, fontWeight: '900', letterSpacing: -1, marginTop: 24 },
  heroText: { color: '#D0D2EE', fontSize: 14, lineHeight: 22, marginTop: 13, maxWidth: 290 },
  heroButtons: { gap: 10, marginTop: 23 },
  sectionHeader: { marginBottom: 15 },
  sectionTitle: { color: COLORS.text, fontSize: 20, fontWeight: '900', letterSpacing: -0.3 },
  sectionCaption: { color: COLORS.muted, fontSize: 13, marginTop: 5 },
  feature: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 14, backgroundColor: COLORS.surface, borderRadius: 17, borderColor: COLORS.border, borderWidth: 1, marginBottom: 10 },
  featureNumber: { width: 38, height: 38, borderRadius: 12, backgroundColor: COLORS.primarySoft, alignItems: 'center', justifyContent: 'center' },
  featureNumberText: { fontSize: 12, fontWeight: '900', color: COLORS.primary },
  featureTextWrap: { flex: 1, marginLeft: 12 },
  featureTitle: { color: COLORS.text, fontWeight: '800', fontSize: 14 },
  featureDescription: { color: COLORS.muted, fontSize: 12, marginTop: 4, lineHeight: 17 },
  featureArrow: { fontSize: 18, color: COLORS.muted, marginLeft: 8 },
  footer: { color: '#989CB0', fontSize: 11, textAlign: 'center', marginTop: 20 },
});
