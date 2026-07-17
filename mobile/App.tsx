import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  type ImageSourcePropType,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Tab = 'home' | 'catalogue' | 'favorites' | 'appointment' | 'profile';
type Category = 'Tous' | 'Vue' | 'Soleil' | 'Femme' | 'Homme';

type Product = {
  id: number;
  name: string;
  brand: string;
  category: 'Vue' | 'Soleil';
  audience: ('Homme' | 'Femme')[];
  reference: string;
  image: ImageSourcePropType;
  accent: string;
};

const COLORS = {
  petrol: '#103943',
  deep: '#071D22',
  gold: '#D6BD82',
  goldDark: '#A27D38',
  ivory: '#F6F1E7',
  white: '#FFFDFC',
  sage: '#6C7D7B',
  ink: '#102F36',
  muted: '#667B7E',
  line: '#DED8CB',
};

const products: Product[] = [
  {
    id: 1,
    name: 'Alpine Signature',
    brand: 'COLLECTION SIGNATURE',
    category: 'Soleil',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-001',
    image: require('./assets/products/persol-alpine-sun.webp'),
    accent: '#E8D4B3',
  },
  {
    id: 2,
    name: 'Noir Carré',
    brand: 'NOUVEAU',
    category: 'Soleil',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-002',
    image: require('./assets/products/persol-black-square.webp'),
    accent: '#CDD5D3',
  },
  {
    id: 3,
    name: 'Ida Dorée',
    brand: 'LOZA OPTIQUE',
    category: 'Soleil',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-003',
    image: require('./assets/products/persol-gold-sun.webp'),
    accent: '#E6CFA7',
  },
  {
    id: 4,
    name: 'Indigo Optical',
    brand: 'LOZA OPTIQUE',
    category: 'Vue',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-004',
    image: require('./assets/products/persol-blue-optical.webp'),
    accent: '#D8E1DE',
  },
  {
    id: 5,
    name: 'Sauge Optical',
    brand: 'LOZA OPTIQUE',
    category: 'Vue',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-005',
    image: require('./assets/products/persol-green-optical.webp'),
    accent: '#DDE4D8',
  },
  {
    id: 6,
    name: 'Havane Solaire',
    brand: 'LOZA OPTIQUE',
    category: 'Soleil',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-006',
    image: require('./assets/products/persol-tortoise-sun.webp'),
    accent: '#E8DAC5',
  },
  {
    id: 7,
    name: 'Polar Noir',
    brand: 'POLARISÉ',
    category: 'Soleil',
    audience: ['Homme'],
    reference: 'DÉMO-007',
    image: require('./assets/products/persol-black-sun.webp'),
    accent: '#D6D9D7',
  },
  {
    id: 8,
    name: 'Noir Dégradé',
    brand: 'LOZA OPTIQUE',
    category: 'Soleil',
    audience: ['Homme', 'Femme'],
    reference: 'DÉMO-008',
    image: require('./assets/products/persol-black-gradient.webp'),
    accent: '#D4D5D2',
  },
];

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'home', label: 'Accueil', icon: '⌂' },
  { key: 'catalogue', label: 'Catalogue', icon: '▦' },
  { key: 'favorites', label: 'Favoris', icon: '♡' },
  { key: 'appointment', label: 'RDV', icon: '◷' },
  { key: 'profile', label: 'Profil', icon: '○' },
];

const categories: Category[] = ['Tous', 'Vue', 'Soleil', 'Femme', 'Homme'];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <View>
      <Text style={[styles.brand, light && { color: COLORS.ivory }]}>LOZA</Text>
      <View style={styles.brandRow}>
        <View style={styles.brandLine} />
        <Text style={[styles.brandSub, light && { color: COLORS.gold }]}>OPTIQUE</Text>
        <View style={styles.brandLine} />
      </View>
    </View>
  );
}

function ProductCard({
  product,
  favorite,
  onFavorite,
}: {
  product: Product;
  favorite: boolean;
  onFavorite: () => void;
}) {
  return (
    <View style={styles.productCard}>
      <View style={[styles.productImageWrap, { backgroundColor: product.accent }]}>
        <Image source={product.image} style={styles.productImage} />
        <Pressable onPress={onFavorite} style={styles.heartButton} hitSlop={10}>
          <Text style={[styles.heart, favorite && styles.heartActive]}>{favorite ? '♥' : '♡'}</Text>
        </Pressable>
      </View>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.productFoot}>
        <Text style={styles.productPrice}>{product.reference}</Text>
        <Text style={styles.arrow}>↗</Text>
      </View>
    </View>
  );
}

function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) {
  return (
    <View style={styles.sectionHeading}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [category, setCategory] = useState<Category>('Tous');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [selectedDay, setSelectedDay] = useState('18');
  const [selectedTime, setSelectedTime] = useState('16:00');
  const [confirmed, setConfirmed] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === 'Tous' || product.category === category || product.audience.includes(category as 'Homme' | 'Femme');
      const queryMatch = `${product.name} ${product.brand}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

  const toggleFavorite = (id: number) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const catalogue = (items: Product[], emptyMessage?: string) => (
    <View style={styles.grid}>
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          favorite={favorites.includes(product.id)}
          onFavorite={() => toggleFavorite(product.id)}
        />
      ))}
      {!items.length ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>◇</Text>
          <Text style={styles.emptyTitle}>{emptyMessage ?? 'Aucun résultat'}</Text>
          <Text style={styles.emptyText}>Explorez le catalogue et ajoutez vos montures préférées.</Text>
        </View>
      ) : null}
    </View>
  );

  const Home = () => (
    <>
      <View style={styles.hero}>
        <View style={styles.heroGlow} />
        <Text style={styles.heroKicker}>OPTICIEN À CASABLANCA</Text>
        <Text style={styles.heroTitle}>La vision{`\n`}autrement.</Text>
        <Text style={styles.heroText}>Des montures sélectionnées avec précision, un conseil humain et un savoir-faire dédié au confort de chaque regard.</Text>
        <View style={styles.heroActions}>
          <Pressable style={styles.primaryButton} onPress={() => setActiveTab('catalogue')}>
            <Text style={styles.primaryButtonText}>DÉCOUVRIR</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={() => setActiveTab('appointment')}>
            <Text style={styles.outlineButtonText}>PRENDRE RDV</Text>
          </Pressable>
        </View>
        <View style={styles.glassesArt}>
          <View style={styles.lens} />
          <View style={styles.bridge} />
          <View style={styles.lens} />
        </View>
      </View>

      <View style={styles.contentSection}>
        <SectionTitle eyebrow="EXPLOREZ" title="Nos catégories" action="Voir tout  →" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryCards}>
          {[
            ['◉', 'Lunettes de vue'],
            ['◌', 'Solaires'],
            ['✦', 'Nouveautés'],
            ['◇', 'Accessoires'],
          ].map(([icon, label]) => (
            <Pressable key={label} style={styles.categoryCard} onPress={() => setActiveTab('catalogue')}>
              <Text style={styles.categoryIcon}>{icon}</Text>
              <Text style={styles.categoryLabel}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentSection}>
        <SectionTitle eyebrow="SÉLECTION LOZA" title="Coups de cœur" action="Catalogue  →" />
        {catalogue(products.slice(0, 2))}
      </View>

      <View style={styles.serviceBanner}>
        <Text style={styles.serviceNumber}>01</Text>
        <View style={styles.serviceCopy}>
          <Text style={styles.serviceTitle}>Un conseil vraiment personnalisé</Text>
          <Text style={styles.serviceText}>Votre confort avant tout. Nous prenons le temps de trouver la monture qui vous ressemble.</Text>
        </View>
      </View>
    </>
  );

  const Catalogue = () => (
    <View style={styles.contentSection}>
      <SectionTitle eyebrow="COLLECTION 2026" title="Le catalogue" />
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Rechercher une monture"
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.filter, category === item && styles.filterActive]}
          >
            <Text style={[styles.filterText, category === item && styles.filterTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.results}>{filtered.length} MONTURES</Text>
      {catalogue(filtered)}
    </View>
  );

  const Appointment = () => {
    const days = ['15', '16', '17', '18', '19', '20', '21'];
    const times = ['10:00', '11:30', '14:00', '16:00', '17:30'];
    return (
      <View style={styles.contentSection}>
        <SectionTitle eyebrow="À VOTRE SERVICE" title="Prendre rendez-vous" />
        <Text style={styles.pageLead}>Choisissez le moment qui vous convient. Notre équipe vous accueillera pour un conseil personnalisé.</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.monthRow}>
            <Text style={styles.monthArrow}>‹</Text>
            <Text style={styles.month}>JUILLET 2026</Text>
            <Text style={styles.monthArrow}>›</Text>
          </View>
          <View style={styles.daysRow}>
            {days.map((day, index) => (
              <Pressable key={day} onPress={() => setSelectedDay(day)} style={[styles.day, selectedDay === day && styles.dayActive]}>
                <Text style={[styles.dayName, selectedDay === day && styles.dayTextActive]}>{['M', 'J', 'V', 'S', 'D', 'L', 'M'][index]}</Text>
                <Text style={[styles.dayNumber, selectedDay === day && styles.dayTextActive]}>{day}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.fieldLabel}>HEURE DISPONIBLE</Text>
          <View style={styles.timeGrid}>
            {times.map((time) => (
              <Pressable key={time} onPress={() => setSelectedTime(time)} style={[styles.time, selectedTime === time && styles.timeActive]}>
                <Text style={[styles.timeText, selectedTime === time && styles.timeTextActive]}>{time}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.confirmButton} onPress={() => setConfirmed(true)}>
            <Text style={styles.confirmButtonText}>CONFIRMER LE RENDEZ-VOUS</Text>
          </Pressable>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>⌖</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Loza Optique — Casablanca</Text>
            <Text style={styles.infoText}>132, Souk Korea, Bloc EF · Lun–Sam, 09:30–19:00</Text>
          </View>
        </View>
      </View>
    );
  };

  const Profile = () => (
    <View style={styles.contentSection}>
      <SectionTitle eyebrow="MON ESPACE" title="Bienvenue chez Loza" />
      <View style={styles.profileHero}>
        <View style={styles.profileMark}><Text style={styles.profileMarkText}>L</Text></View>
        <Text style={styles.profileTitle}>Votre vision, bien accompagnée.</Text>
        <Text style={styles.profileText}>Connectez-vous prochainement pour suivre vos commandes, ordonnances et rendez-vous.</Text>
        <Pressable style={styles.primaryWide}><Text style={styles.primaryWideText}>CRÉER MON COMPTE</Text></Pressable>
      </View>
      {[
        ['◷', 'Mes rendez-vous'],
        ['▢', 'Mes ordonnances'],
        ['◎', 'Contacter la boutique'],
        ['?', 'Aide et informations'],
      ].map(([icon, label]) => (
        <Pressable key={label} style={styles.menuRow}>
          <Text style={styles.menuIcon}>{icon}</Text>
          <Text style={styles.menuLabel}>{label}</Text>
          <Text style={styles.menuArrow}>›</Text>
        </Pressable>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={activeTab === 'home' ? 'light' : 'dark'} />
      <View style={[styles.header, activeTab === 'home' && styles.headerDark]}>
        <Brand light={activeTab === 'home'} />
        <Pressable style={styles.headerAction}>
          <Text style={[styles.headerActionText, activeTab === 'home' && { color: COLORS.ivory }]}>FR  ·  ♡</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.screen} showsVerticalScrollIndicator={false} contentContainerStyle={styles.screenContent}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'catalogue' && <Catalogue />}
        {activeTab === 'favorites' && (
          <View style={styles.contentSection}>
            <SectionTitle eyebrow="VOTRE SÉLECTION" title="Mes favoris" />
            {catalogue(products.filter((product) => favorites.includes(product.id)), 'Aucun favori pour le moment')}
          </View>
        )}
        {activeTab === 'appointment' && <Appointment />}
        {activeTab === 'profile' && <Profile />}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <Pressable key={tab.key} style={styles.tab} onPress={() => setActiveTab(tab.key)}>
              <Text style={[styles.tabIcon, active && styles.tabActive]}>{active && tab.icon === '♡' ? '♥' : tab.icon}</Text>
              <Text style={[styles.tabLabel, active && styles.tabActive]}>{tab.label}</Text>
              {active ? <View style={styles.tabDot} /> : null}
            </Pressable>
          );
        })}
      </View>

      <Modal visible={confirmed} transparent animationType="fade" onRequestClose={() => setConfirmed(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.successMark}><Text style={styles.successMarkText}>✓</Text></View>
            <Text style={styles.modalEyebrow}>DEMANDE ENREGISTRÉE</Text>
            <Text style={styles.modalTitle}>Rendez-vous demandé</Text>
            <Text style={styles.modalText}>Le {selectedDay} juillet à {selectedTime}. La boutique vous contactera pour confirmer.</Text>
            <Pressable style={styles.confirmButton} onPress={() => setConfirmed(false)}>
              <Text style={styles.confirmButtonText}>TERMINER</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.white },
  screen: { flex: 1 },
  screenContent: { paddingBottom: 36 },
  header: { height: 76, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.line },
  headerDark: { backgroundColor: COLORS.deep, borderBottomColor: '#1A4148' },
  headerAction: { padding: 8 },
  headerActionText: { color: COLORS.ink, fontSize: 13, letterSpacing: 1 },
  brand: { fontSize: 25, lineHeight: 26, letterSpacing: 8, color: COLORS.petrol, fontWeight: '600' },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  brandSub: { fontSize: 7, letterSpacing: 4, color: COLORS.goldDark },
  brandLine: { width: 18, height: 1, backgroundColor: COLORS.gold },
  hero: { minHeight: 510, backgroundColor: COLORS.deep, paddingHorizontal: 24, paddingTop: 58, overflow: 'hidden' },
  heroGlow: { position: 'absolute', width: 340, height: 340, borderRadius: 170, backgroundColor: '#154A54', opacity: 0.55, right: -150, bottom: -40 },
  heroKicker: { color: COLORS.gold, fontSize: 11, letterSpacing: 4, marginBottom: 16 },
  heroTitle: { color: COLORS.ivory, fontSize: 43, lineHeight: 50, fontWeight: '300', letterSpacing: -1.2, maxWidth: 330 },
  heroText: { color: '#BFCBC9', fontSize: 15, lineHeight: 23, maxWidth: 310, marginTop: 18 },
  heroActions: { flexDirection: 'row', gap: 10, marginTop: 28 },
  primaryButton: { backgroundColor: COLORS.gold, paddingVertical: 15, paddingHorizontal: 22 },
  primaryButtonText: { color: COLORS.deep, fontSize: 11, fontWeight: '700', letterSpacing: 1.8 },
  outlineButton: { borderWidth: 1, borderColor: '#577178', paddingVertical: 14, paddingHorizontal: 18 },
  outlineButtonText: { color: COLORS.ivory, fontSize: 11, fontWeight: '600', letterSpacing: 1.5 },
  glassesArt: { position: 'absolute', right: 16, bottom: 40, flexDirection: 'row', alignItems: 'center', opacity: 0.28 },
  lens: { width: 92, height: 65, borderWidth: 3, borderColor: COLORS.gold, borderRadius: 20 },
  bridge: { width: 25, height: 12, borderTopWidth: 3, borderColor: COLORS.gold, marginHorizontal: -2 },
  contentSection: { paddingHorizontal: 20, paddingTop: 30 },
  sectionHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20 },
  eyebrow: { color: COLORS.goldDark, fontSize: 10, letterSpacing: 2.7, fontWeight: '700', marginBottom: 7 },
  sectionTitle: { color: COLORS.ink, fontSize: 29, fontWeight: '400', letterSpacing: -0.7 },
  sectionAction: { color: COLORS.petrol, fontSize: 12, fontWeight: '600', paddingBottom: 5 },
  categoryCards: { gap: 11, paddingRight: 20 },
  categoryCard: { width: 126, height: 126, backgroundColor: COLORS.ivory, padding: 16, justifyContent: 'space-between', borderWidth: 1, borderColor: '#ECE6DA' },
  categoryIcon: { fontSize: 30, color: COLORS.goldDark },
  categoryLabel: { color: COLORS.ink, fontSize: 14, fontWeight: '600', lineHeight: 19 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  productCard: { width: '48%', marginBottom: 12 },
  productImageWrap: { aspectRatio: 0.92, overflow: 'hidden', marginBottom: 12 },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heartButton: { position: 'absolute', top: 9, right: 9, width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,.9)', alignItems: 'center', justifyContent: 'center' },
  heart: { color: COLORS.petrol, fontSize: 19 },
  heartActive: { color: COLORS.goldDark },
  productBrand: { color: COLORS.goldDark, fontSize: 8, letterSpacing: 1.4, fontWeight: '700' },
  productName: { color: COLORS.ink, fontSize: 16, fontWeight: '600', marginTop: 4 },
  productFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  productPrice: { color: COLORS.muted, fontSize: 13 },
  arrow: { color: COLORS.petrol, fontSize: 18 },
  serviceBanner: { margin: 20, marginTop: 36, backgroundColor: COLORS.petrol, padding: 24, flexDirection: 'row', gap: 18 },
  serviceNumber: { color: COLORS.gold, fontSize: 12, letterSpacing: 2 },
  serviceCopy: { flex: 1 },
  serviceTitle: { color: COLORS.ivory, fontSize: 21, lineHeight: 28, marginBottom: 10 },
  serviceText: { color: '#C5D0CE', fontSize: 13, lineHeight: 21 },
  searchBox: { height: 52, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.ivory, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 15, marginBottom: 15 },
  searchIcon: { fontSize: 23, color: COLORS.petrol, marginRight: 10 },
  searchInput: { flex: 1, color: COLORS.ink, fontSize: 15 },
  filters: { gap: 8, paddingBottom: 20 },
  filter: { paddingVertical: 10, paddingHorizontal: 17, borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.white },
  filterActive: { backgroundColor: COLORS.petrol, borderColor: COLORS.petrol },
  filterText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  filterTextActive: { color: COLORS.ivory },
  results: { color: COLORS.muted, fontSize: 9, letterSpacing: 2, marginBottom: 13 },
  emptyState: { width: '100%', alignItems: 'center', paddingVertical: 64, paddingHorizontal: 30, backgroundColor: COLORS.ivory },
  emptyIcon: { color: COLORS.goldDark, fontSize: 38, marginBottom: 10 },
  emptyTitle: { color: COLORS.ink, fontSize: 20, fontWeight: '600' },
  emptyText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  pageLead: { color: COLORS.muted, fontSize: 14, lineHeight: 22, marginTop: -8, marginBottom: 22 },
  appointmentCard: { backgroundColor: COLORS.ivory, borderWidth: 1, borderColor: COLORS.line, padding: 18 },
  monthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  month: { color: COLORS.ink, fontSize: 13, letterSpacing: 2, fontWeight: '700' },
  monthArrow: { color: COLORS.goldDark, fontSize: 26 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  day: { width: 39, height: 62, alignItems: 'center', justifyContent: 'center', gap: 7 },
  dayActive: { backgroundColor: COLORS.petrol },
  dayName: { color: COLORS.muted, fontSize: 9, fontWeight: '700' },
  dayNumber: { color: COLORS.ink, fontSize: 15, fontWeight: '600' },
  dayTextActive: { color: COLORS.ivory },
  fieldLabel: { color: COLORS.goldDark, fontSize: 9, letterSpacing: 2, fontWeight: '700', marginBottom: 12 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  time: { width: '30.8%', paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.line, backgroundColor: COLORS.white },
  timeActive: { backgroundColor: COLORS.gold, borderColor: COLORS.gold },
  timeText: { color: COLORS.ink, fontSize: 12, fontWeight: '600' },
  timeTextActive: { color: COLORS.deep },
  confirmButton: { backgroundColor: COLORS.petrol, paddingVertical: 17, alignItems: 'center' },
  confirmButtonText: { color: COLORS.ivory, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  infoCard: { marginTop: 14, padding: 17, borderWidth: 1, borderColor: COLORS.line, flexDirection: 'row', alignItems: 'center', gap: 13 },
  infoIcon: { color: COLORS.goldDark, fontSize: 25 },
  infoTitle: { color: COLORS.ink, fontSize: 14, fontWeight: '600' },
  infoText: { color: COLORS.muted, fontSize: 11, lineHeight: 17, marginTop: 4 },
  profileHero: { backgroundColor: COLORS.deep, padding: 28, alignItems: 'center', marginBottom: 16 },
  profileMark: { width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: COLORS.gold, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  profileMarkText: { color: COLORS.gold, fontSize: 31, fontWeight: '300' },
  profileTitle: { color: COLORS.ivory, fontSize: 22, textAlign: 'center' },
  profileText: { color: '#BFCBC9', textAlign: 'center', fontSize: 13, lineHeight: 20, marginTop: 10, marginBottom: 20 },
  primaryWide: { width: '100%', backgroundColor: COLORS.gold, paddingVertical: 15, alignItems: 'center' },
  primaryWideText: { color: COLORS.deep, fontSize: 10, fontWeight: '700', letterSpacing: 1.5 },
  menuRow: { minHeight: 62, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: COLORS.line, flexDirection: 'row', alignItems: 'center' },
  menuIcon: { width: 38, color: COLORS.goldDark, fontSize: 18 },
  menuLabel: { flex: 1, color: COLORS.ink, fontSize: 14, fontWeight: '500' },
  menuArrow: { color: COLORS.sage, fontSize: 23 },
  tabBar: { height: Platform.OS === 'ios' ? 86 : 72, paddingBottom: Platform.OS === 'ios' ? 16 : 5, flexDirection: 'row', backgroundColor: COLORS.white, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.line, paddingHorizontal: 5 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  tabIcon: { color: COLORS.sage, fontSize: 20, lineHeight: 22 },
  tabLabel: { color: COLORS.sage, fontSize: 9, fontWeight: '600' },
  tabActive: { color: COLORS.petrol },
  tabDot: { position: 'absolute', bottom: 2, width: 14, height: 2, backgroundColor: COLORS.gold },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(7,29,34,.76)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  modalCard: { width: '100%', maxWidth: 380, backgroundColor: COLORS.white, padding: 28, alignItems: 'center' },
  successMark: { width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.petrol, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  successMarkText: { color: COLORS.gold, fontSize: 28 },
  modalEyebrow: { color: COLORS.goldDark, fontSize: 9, letterSpacing: 2, fontWeight: '700' },
  modalTitle: { color: COLORS.ink, fontSize: 26, marginTop: 8 },
  modalText: { color: COLORS.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginVertical: 16 },
});
