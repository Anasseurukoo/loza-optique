import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import TryOnScreen from './src/TryOnScreen';
import {
  accessories,
  catalogue,
  eyewear,
  lifestyle,
  type CatalogueItem,
  type Category,
} from './src/data';

type Tab = 'home' | 'catalogue' | 'favorites' | 'profile';
type BookingDay = { id: string; dayName: string; dayNumber: string; longLabel: string };

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  petrol: '#071D22',
  petrolSoft: '#103943',
  ivory: '#F6F1E7',
  paper: '#FFFDF8',
  gold: '#CDA65C',
  goldSoft: '#E8D4A5',
  ink: '#102F36',
  muted: '#6C7D7B',
  border: '#DED7C9',
  white: '#FFFFFF',
  danger: '#A94D45',
  success: '#2F7A60',
};

const tabs: Array<{
  key: Tab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}> = [
  { key: 'home', label: 'Accueil', icon: 'home-outline', activeIcon: 'home' },
  { key: 'catalogue', label: 'Collections', icon: 'glasses-outline', activeIcon: 'glasses' },
  { key: 'favorites', label: 'Favoris', icon: 'heart-outline', activeIcon: 'heart' },
  { key: 'profile', label: 'Profil', icon: 'person-outline', activeIcon: 'person' },
];

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'short',
  day: '2-digit',
  month: 'long',
});

function buildBookingDays(): BookingDay[] {
  const result: BookingDay[] = [];
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  for (let offset = 1; result.length < 6 && offset < 15; offset += 1) {
    const date = new Date(cursor);
    date.setDate(cursor.getDate() + offset);
    if (date.getDay() === 5) continue; // Vendredi fermé.

    result.push({
      id: date.toISOString().slice(0, 10),
      dayName: date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '').toUpperCase(),
      dayNumber: String(date.getDate()).padStart(2, '0'),
      longLabel: dateFormatter.format(date),
    });
  }

  return result;
}

function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <Image
      source={require('./assets/brand/logo-horizontal.png')}
      style={[styles.logo, compact && styles.logoCompact, light && styles.logoLight]}
      resizeMode="contain"
    />
  );
}

function Header({
  title,
  onBook,
}: {
  title?: string;
  onBook: () => void;
}) {
  return (
    <View style={styles.header}>
      <Logo compact />
      {title ? <Text style={styles.headerTitle}>{title}</Text> : null}
      <Pressable onPress={onBook} style={styles.headerAction}>
        <Ionicons name="calendar-outline" size={18} color={COLORS.gold} />
      </Pressable>
    </View>
  );
}

function SectionHeading({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <View style={styles.sectionHeading}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {action && onAction ? (
        <Pressable onPress={onAction}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function ProductCard({
  item,
  favorite,
  compact = false,
  onOpen,
  onFavorite,
}: {
  item: CatalogueItem;
  favorite: boolean;
  compact?: boolean;
  onOpen: () => void;
  onFavorite: () => void;
}) {
  return (
    <Pressable
      onPress={onOpen}
      style={({ pressed }) => [
        compact ? styles.productCardCompact : styles.productCard,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.productVisual, compact && styles.productVisualCompact, { backgroundColor: item.color }]}>
        <View style={styles.productHalo} />
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
          hitSlop={10}
          style={styles.favoriteButton}
        >
          <Ionicons
            name={favorite ? 'heart' : 'heart-outline'}
            size={19}
            color={favorite ? COLORS.danger : COLORS.petrol}
          />
        </Pressable>
        {item.tryOn ? (
          <View style={styles.arBadge}>
            <Ionicons name="scan-outline" size={12} color={COLORS.white} />
            <Text style={styles.arBadgeText}>AR</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.productBrand}>{item.brand.toUpperCase()} · {item.code}</Text>
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productMeta}>
        {item.category} · {item.measurements.lens}-{item.measurements.bridge} · {item.measurements.temple} mm
      </Text>
    </Pressable>
  );
}

function ContactAction({
  icon,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.contactAction} onPress={onPress}>
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={19} color={COLORS.gold} />
      </View>
      <Text style={styles.contactLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={17} color={COLORS.muted} />
    </Pressable>
  );
}

function AppContent() {
  const [tab, setTab] = useState<Tab>('home');
  const [category, setCategory] = useState<Category>('Tout');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [selected, setSelected] = useState<CatalogueItem | null>(null);
  const [tryOn, setTryOn] = useState<CatalogueItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const bookingDays = useMemo(buildBookingDays, []);
  const [bookingDay, setBookingDay] = useState(bookingDays[0]?.id ?? '');
  const [bookingTime, setBookingTime] = useState('15:30');
  const [prescriptionName, setPrescriptionName] = useState('');

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('@loza/favorites'),
      AsyncStorage.getItem('@loza/prescription-name'),
    ])
      .then(([storedFavorites, storedPrescription]) => {
        if (storedFavorites) setFavorites(JSON.parse(storedFavorites) as string[]);
        if (storedPrescription) setPrescriptionName(storedPrescription);
      })
      .catch(() => undefined)
      .finally(() => setStorageReady(true));
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    void AsyncStorage.setItem('@loza/favorites', JSON.stringify(favorites));
  }, [favorites, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    if (prescriptionName) {
      void AsyncStorage.setItem('@loza/prescription-name', prescriptionName);
    } else {
      void AsyncStorage.removeItem('@loza/prescription-name');
    }
  }, [prescriptionName, storageReady]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return catalogue.filter((item) => {
      const categoryMatch = category === 'Tout' || item.category === category;
      const searchMatch =
        !needle ||
        `${item.name} ${item.code} ${item.brand} ${item.category}`
          .toLowerCase()
          .includes(needle);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  };

  const pickPrescription = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets[0]) {
      setPrescriptionName(result.assets[0].name);
    }
  };

  const confirmBooking = async () => {
    const day = bookingDays.find((item) => item.id === bookingDay);
    const subject = encodeURIComponent('Demande de rendez-vous — Loza Optique');
    const body = encodeURIComponent(
      `Bonjour Loza Optique,\n\nJe souhaite demander un rendez-vous :\nDate : ${day?.longLabel ?? bookingDay}\nHeure : ${bookingTime}\nOrdonnance : ${prescriptionName || 'Non jointe'}\n\nMerci.`,
    );

    setBookingConfirmed(true);
    const emailUrl = `mailto:lozaoptique@gmail.com?subject=${subject}&body=${body}`;
    const canOpen = await Linking.canOpenURL(emailUrl);
    if (canOpen) void Linking.openURL(emailUrl);
  };

  const openProduct = (item: CatalogueItem) => setSelected(item);

  if (tryOn) {
    return <TryOnScreen initial={tryOn} onClose={() => setTryOn(null)} />;
  }

  const renderHome = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Header onBook={() => setBookingOpen(true)} />

      <ImageBackground
        source={lifestyle[1]?.image ?? lifestyle[0].image}
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <LinearGradient
          colors={['rgba(7,29,34,.10)', 'rgba(7,29,34,.82)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.heroTop}>
          <Text style={styles.heroEdition}>LOZA EDIT · CASABLANCA</Text>
          <View style={styles.heroPill}>
            <Text style={styles.heroPillText}>DEPUIS 1998</Text>
          </View>
        </View>
        <View>
          <Text style={styles.heroKicker}>NOUVELLE EXPÉRIENCE MOBILE</Text>
          <Text style={styles.heroTitle}>Votre regard,{'\n'}notre précision.</Text>
          <Text style={styles.heroCopy}>
            Collections premium, rendez-vous et essayage virtuel dans une seule application.
          </Text>
          <View style={styles.heroActions}>
            <Pressable onPress={() => setTab('catalogue')} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>DÉCOUVRIR</Text>
              <Ionicons name="arrow-forward" size={17} color={COLORS.petrol} />
            </Pressable>
            <Pressable onPress={() => setTryOn(eyewear[0])} style={styles.glassButton}>
              <Ionicons name="scan-outline" size={17} color={COLORS.white} />
              <Text style={styles.glassButtonText}>ESSAYER EN AR</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.quickRow}>
        <Pressable style={styles.quickCard} onPress={() => setBookingOpen(true)}>
          <Ionicons name="calendar-outline" size={23} color={COLORS.gold} />
          <Text style={styles.quickTitle}>Rendez-vous</Text>
          <Text style={styles.quickCopy}>Choisissez votre créneau.</Text>
        </Pressable>
        <Pressable style={styles.quickCard} onPress={() => setTryOn(eyewear[0])}>
          <Ionicons name="scan-outline" size={23} color={COLORS.gold} />
          <Text style={styles.quickTitle}>Virtual Mirror</Text>
          <Text style={styles.quickCopy}>Testez les montures.</Text>
        </Pressable>
      </View>

      <SectionHeading
        eyebrow="SÉLECTION LOZA"
        title="Persol en vedette"
        action="Tout voir"
        onAction={() => setTab('catalogue')}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalProducts}
      >
        {eyewear.slice(0, 7).map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            compact
            favorite={favorites.includes(item.id)}
            onFavorite={() => toggleFavorite(item.id)}
            onOpen={() => openProduct(item)}
          />
        ))}
      </ScrollView>

      <Pressable style={styles.arFeature} onPress={() => setTryOn(eyewear[3] ?? eyewear[0])}>
        <LinearGradient
          colors={[COLORS.petrolSoft, COLORS.petrol]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.arFeatureCopy}>
          <Text style={styles.arFeatureKicker}>ESSAYAGE VIRTUEL</Text>
          <Text style={styles.arFeatureTitle}>Trouvez la monture{'\n'}qui vous ressemble.</Text>
          <Text style={styles.arFeatureText}>
            Les mesures de chaque modèle sont intégrées pour une calibration plus fidèle.
          </Text>
          <View style={styles.arFeatureLink}>
            <Text style={styles.arFeatureLinkText}>OUVRIR LE MIROIR</Text>
            <Ionicons name="arrow-forward" size={17} color={COLORS.goldSoft} />
          </View>
        </View>
        <Image source={eyewear[3]?.image ?? eyewear[0].image} style={styles.arFeatureImage} />
      </Pressable>

      <SectionHeading eyebrow="SERVICES" title="En boutique" />
      <View style={styles.serviceCard}>
        <View style={styles.serviceBadge}>
          <Ionicons name="storefront-outline" size={22} color={COLORS.gold} />
        </View>
        <View style={styles.serviceCopy}>
          <Text style={styles.serviceTitle}>132 Souk Korea, Bloc EF</Text>
          <Text style={styles.serviceText}>Casablanca · Vendredi fermé</Text>
        </View>
        <Pressable
          style={styles.serviceArrow}
          onPress={() =>
            void Linking.openURL('https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca')
          }
        >
          <Ionicons name="navigate-outline" size={20} color={COLORS.petrol} />
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderCatalogue = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Header title="Collections" onBook={() => setBookingOpen(true)} />
      <Text style={styles.screenEyebrow}>CATALOGUE LOZA</Text>
      <Text style={styles.screenTitle}>Choisissez votre{'\n'}prochaine monture.</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={20} color={COLORS.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Modèle, code ou collection"
          placeholderTextColor={COLORS.muted}
          style={styles.searchInput}
        />
        {query ? (
          <Pressable onPress={() => setQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.muted} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
      >
        {(['Tout', 'Solaire', 'Vue', 'Accessoire'] as Category[]).map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.category, category === item && styles.categoryActive]}
          >
            <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.resultHeader}>
        <Text style={styles.resultCount}>{filtered.length} ARTICLES</Text>
        <Text style={styles.resultSort}>Sélection Loza</Text>
      </View>

      <View style={styles.productGrid}>
        {filtered.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            favorite={favorites.includes(item.id)}
            onFavorite={() => toggleFavorite(item.id)}
            onOpen={() => openProduct(item)}
          />
        ))}
      </View>
    </ScrollView>
  );

  const renderFavorites = () => {
    const favoriteItems = catalogue.filter((item) => favorites.includes(item.id));

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
        <Header title="Favoris" onBook={() => setBookingOpen(true)} />
        <Text style={styles.screenEyebrow}>VOTRE SÉLECTION</Text>
        <Text style={styles.screenTitle}>Les pièces que{'\n'}vous aimez.</Text>

        {favoriteItems.length ? (
          <View style={[styles.productGrid, styles.favoriteGrid]}>
            {favoriteItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                favorite
                onFavorite={() => toggleFavorite(item.id)}
                onOpen={() => openProduct(item)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="heart-outline" size={37} color={COLORS.gold} />
            </View>
            <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
            <Text style={styles.emptyText}>
              Ajoutez les montures qui vous plaisent pour les retrouver ici.
            </Text>
            <Pressable style={styles.darkButton} onPress={() => setTab('catalogue')}>
              <Text style={styles.darkButtonText}>EXPLORER LES COLLECTIONS</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    );
  };

  const renderProfile = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
      <Header title="Profil" onBook={() => setBookingOpen(true)} />

      <LinearGradient
        colors={[COLORS.petrolSoft, COLORS.petrol]}
        style={styles.profileHero}
      >
        <Logo light />
        <Text style={styles.profileHeroTitle}>Votre expérience optique,{'\n'}simplement.</Text>
        <Text style={styles.profileHeroText}>
          Favoris, ordonnance, rendez-vous et services Loza.
        </Text>
      </LinearGradient>

      <View style={styles.prescriptionCard}>
        <View style={styles.prescriptionIcon}>
          <Text style={styles.prescriptionIconText}>Rx</Text>
        </View>
        <View style={styles.prescriptionContent}>
          <Text style={styles.prescriptionKicker}>MON ORDONNANCE</Text>
          <Text style={styles.prescriptionTitle}>
            {prescriptionName || 'Ajouter une prescription'}
          </Text>
          <Text style={styles.prescriptionText}>
            {prescriptionName ? 'Document enregistré sur cet appareil.' : 'PDF, JPG, PNG ou WEBP.'}
          </Text>
          <View style={styles.prescriptionActions}>
            <Pressable onPress={pickPrescription} style={styles.prescriptionButton}>
              <Text style={styles.prescriptionButtonText}>
                {prescriptionName ? 'REMPLACER' : 'CHOISIR UN FICHIER'}
              </Text>
            </Pressable>
            {prescriptionName ? (
              <Pressable onPress={() => setPrescriptionName('')}>
                <Text style={styles.prescriptionRemove}>RETIRER</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>

      <Text style={styles.profileSectionTitle}>Loza Optique</Text>
      <ContactAction
        icon="call-outline"
        label="+212 5 22 82 12 83"
        onPress={() => void Linking.openURL('tel:+212522821283')}
      />
      <ContactAction
        icon="mail-outline"
        label="lozaoptique@gmail.com"
        onPress={() => void Linking.openURL('mailto:lozaoptique@gmail.com')}
      />
      <ContactAction
        icon="location-outline"
        label="Itinéraire vers la boutique"
        onPress={() =>
          void Linking.openURL('https://maps.google.com/?q=132+Souk+Korea+Bloc+EF+Casablanca')
        }
      />
      <ContactAction
        icon="globe-outline"
        label="lozaoptique.com"
        onPress={() => void Linking.openURL('https://lozaoptique.com')}
      />
      <ContactAction
        icon="shield-checkmark-outline"
        label="Confidentialité"
        onPress={() => void Linking.openURL('https://lozaoptique.com/confidentialite/')}
      />

      <View style={styles.versionBox}>
        <Text style={styles.versionText}>LOZA OPTIQUE · MOBILE V2 · 0.9.0</Text>
        <Text style={styles.versionSubtext}>Android · AR ready · Casablanca</Text>
      </View>
    </ScrollView>
  );

  const screen = {
    home: renderHome(),
    catalogue: renderCatalogue(),
    favorites: renderFavorites(),
    profile: renderProfile(),
  }[tab];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" backgroundColor={COLORS.ivory} />
      <View style={styles.content}>{screen}</View>

      <View style={styles.bottomNavShell}>
        <View style={styles.bottomNav}>
          {tabs.slice(0, 2).map((item) => (
            <Pressable key={item.key} onPress={() => setTab(item.key)} style={styles.navItem}>
              <Ionicons
                name={tab === item.key ? item.activeIcon : item.icon}
                size={21}
                color={tab === item.key ? COLORS.gold : '#78908F'}
              />
              <Text style={[styles.navLabel, tab === item.key && styles.navLabelActive]}>
                {item.label}
              </Text>
            </Pressable>
          ))}

          <Pressable onPress={() => setTryOn(eyewear[0])} style={styles.arNavButton}>
            <LinearGradient
              colors={[COLORS.goldSoft, COLORS.gold]}
              style={styles.arNavGradient}
            >
              <Ionicons name="scan" size={25} color={COLORS.petrol} />
            </LinearGradient>
            <Text style={styles.arNavLabel}>TRY ON</Text>
          </Pressable>

          {tabs.slice(2).map((item) => (
            <Pressable key={item.key} onPress={() => setTab(item.key)} style={styles.navItem}>
              <Ionicons
                name={tab === item.key ? item.activeIcon : item.icon}
                size={21}
                color={tab === item.key ? COLORS.gold : '#78908F'}
              />
              <Text style={[styles.navLabel, tab === item.key && styles.navLabelActive]}>
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Modal
        visible={Boolean(selected)}
        transparent
        animationType="slide"
        onRequestClose={() => setSelected(null)}
      >
        {selected ? (
          <View style={styles.modalShade}>
            <View style={styles.productSheet}>
              <View style={styles.sheetHandle} />
              <Pressable onPress={() => setSelected(null)} style={styles.sheetClose}>
                <Ionicons name="close" size={21} color={COLORS.ink} />
              </Pressable>

              <View style={[styles.sheetVisual, { backgroundColor: selected.color }]}>
                <View style={styles.sheetHalo} />
                <Image source={selected.image} style={styles.sheetImage} resizeMode="contain" />
              </View>

              <Text style={styles.sheetBrand}>{selected.brand.toUpperCase()} · {selected.code}</Text>
              <Text style={styles.sheetName}>{selected.name}</Text>
              <Text style={styles.sheetDescription}>{selected.description}</Text>

              <View style={styles.measureRow}>
                <View style={styles.measureItem}>
                  <Text style={styles.measureValue}>{selected.measurements.lens}</Text>
                  <Text style={styles.measureLabel}>VERRE</Text>
                </View>
                <View style={styles.measureDivider} />
                <View style={styles.measureItem}>
                  <Text style={styles.measureValue}>{selected.measurements.bridge}</Text>
                  <Text style={styles.measureLabel}>PONT</Text>
                </View>
                <View style={styles.measureDivider} />
                <View style={styles.measureItem}>
                  <Text style={styles.measureValue}>{selected.measurements.temple}</Text>
                  <Text style={styles.measureLabel}>BRANCHE</Text>
                </View>
              </View>

              <View style={styles.sheetActions}>
                {selected.tryOn ? (
                  <Pressable
                    onPress={() => {
                      setSelected(null);
                      setTryOn(selected);
                    }}
                    style={styles.tryButton}
                  >
                    <Ionicons name="scan-outline" size={18} color={COLORS.white} />
                    <Text style={styles.tryButtonText}>ESSAYER EN AR</Text>
                  </Pressable>
                ) : null}
                <Pressable
                  onPress={() => toggleFavorite(selected.id)}
                  style={styles.sheetFavorite}
                >
                  <Ionicons
                    name={favorites.includes(selected.id) ? 'heart' : 'heart-outline'}
                    size={20}
                    color={COLORS.danger}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        ) : null}
      </Modal>

      <Modal
        visible={bookingOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setBookingOpen(false)}
      >
        <View style={styles.modalShade}>
          <View style={styles.bookingSheet}>
            <View style={styles.sheetHandle} />
            <Pressable onPress={() => setBookingOpen(false)} style={styles.sheetClose}>
              <Ionicons name="close" size={21} color={COLORS.ink} />
            </Pressable>

            <Text style={styles.bookingEyebrow}>RENDEZ-VOUS EN BOUTIQUE</Text>
            <Text style={styles.bookingTitle}>Votre temps,{'\n'}rien que pour vous.</Text>
            <Text style={styles.bookingText}>
              Vendredi fermé. Les créneaux seront confirmés par Loza Optique.
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookingDays}
            >
              {bookingDays.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setBookingDay(item.id)}
                  style={[
                    styles.bookingDay,
                    bookingDay === item.id && styles.bookingDayActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.bookingDayName,
                      bookingDay === item.id && styles.bookingDayTextActive,
                    ]}
                  >
                    {item.dayName}
                  </Text>
                  <Text
                    style={[
                      styles.bookingDayNumber,
                      bookingDay === item.id && styles.bookingDayTextActive,
                    ]}
                  >
                    {item.dayNumber}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.bookingFieldLabel}>HEURE SOUHAITÉE</Text>
            <View style={styles.bookingTimes}>
              {['10:00', '11:30', '14:00', '15:30', '17:00', '18:30'].map((time) => (
                <Pressable
                  key={time}
                  onPress={() => setBookingTime(time)}
                  style={[
                    styles.bookingTime,
                    bookingTime === time && styles.bookingTimeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.bookingTimeText,
                      bookingTime === time && styles.bookingTimeTextActive,
                    ]}
                  >
                    {time}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={pickPrescription} style={styles.bookingPrescription}>
              <View style={styles.bookingPrescriptionIcon}>
                <Text style={styles.bookingPrescriptionIconText}>Rx</Text>
              </View>
              <View style={styles.bookingPrescriptionCopy}>
                <Text style={styles.bookingPrescriptionTitle}>
                  {prescriptionName || 'Ajouter une ordonnance'}
                </Text>
                <Text style={styles.bookingPrescriptionText}>PDF ou photo</Text>
              </View>
              <Text style={styles.bookingPrescriptionAction}>CHOISIR</Text>
            </Pressable>

            <Pressable style={styles.confirmBookingButton} onPress={confirmBooking}>
              <Text style={styles.confirmBookingText}>ENVOYER LA DEMANDE</Text>
              <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={bookingConfirmed} transparent animationType="fade">
        <View style={styles.confirmShade}>
          <View style={styles.confirmCard}>
            <View style={styles.confirmIcon}>
              <Ionicons name="checkmark" size={34} color={COLORS.success} />
            </View>
            <Text style={styles.confirmEyebrow}>DEMANDE PRÉPARÉE</Text>
            <Text style={styles.confirmTitle}>À bientôt chez Loza.</Text>
            <Text style={styles.confirmText}>
              Votre demande de rendez-vous est prête. La boutique confirmera le créneau.
            </Text>
            <Pressable
              onPress={() => {
                setBookingConfirmed(false);
                setBookingOpen(false);
              }}
              style={styles.darkButton}
            >
              <Text style={styles.darkButtonText}>TERMINER</Text>
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

const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.ivory },
  content: { flex: 1 },
  page: { paddingHorizontal: 18, paddingBottom: 126 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] },

  logo: { width: 236, height: 74 },
  logoCompact: { width: 154, height: 52 },
  logoLight: { opacity: 1 },

  header: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: COLORS.ink,
    fontSize: 14,
    fontWeight: '700',
  },
  headerAction: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },

  hero: {
    height: 525,
    borderRadius: 30,
    overflow: 'hidden',
    padding: 21,
    justifyContent: 'space-between',
  },
  heroImage: { borderRadius: 30 },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroEdition: { color: COLORS.white, fontSize: 9, fontWeight: '900', letterSpacing: 1.25 },
  heroPill: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.35)',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  heroPillText: { color: COLORS.white, fontSize: 8, fontWeight: '900', letterSpacing: 1 },
  heroKicker: { color: COLORS.goldSoft, fontSize: 9, fontWeight: '900', letterSpacing: 1.8 },
  heroTitle: {
    color: COLORS.white,
    fontSize: 44,
    lineHeight: 46,
    letterSpacing: -1.8,
    marginTop: 12,
    fontWeight: '600',
  },
  heroCopy: {
    color: 'rgba(255,255,255,.84)',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 13,
    maxWidth: 305,
  },
  heroActions: { flexDirection: 'row', gap: 9, marginTop: 21 },
  primaryButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.goldSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  primaryButtonText: { color: COLORS.petrol, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  glassButton: {
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.45)',
    backgroundColor: 'rgba(7,29,34,.32)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 15,
  },
  glassButtonText: { color: COLORS.white, fontSize: 9, fontWeight: '900', letterSpacing: 0.7 },

  quickRow: { flexDirection: 'row', gap: 10, marginTop: 13 },
  quickCard: {
    flex: 1,
    minHeight: 130,
    borderRadius: 22,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 17,
  },
  quickTitle: { color: COLORS.ink, fontSize: 15, fontWeight: '800', marginTop: 14 },
  quickCopy: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 5 },

  sectionHeading: {
    marginTop: 34,
    marginBottom: 17,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  eyebrow: { color: COLORS.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.7 },
  sectionTitle: { color: COLORS.ink, fontSize: 29, fontWeight: '700', marginTop: 6, letterSpacing: -0.8 },
  sectionAction: { color: COLORS.petrol, fontSize: 12, fontWeight: '800' },

  horizontalProducts: { gap: 12, paddingRight: 18 },
  productCard: { width: CARD_WIDTH, marginBottom: 25 },
  productCardCompact: { width: 194 },
  productVisual: {
    height: 198,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productVisualCompact: { height: 218 },
  productHalo: {
    position: 'absolute',
    width: 165,
    height: 165,
    borderRadius: 83,
    backgroundColor: 'rgba(255,255,255,.28)',
  },
  productImage: { width: '96%', height: '76%' },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,253,248,.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arBadge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    height: 27,
    borderRadius: 14,
    backgroundColor: COLORS.petrol,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
  },
  arBadgeText: { color: COLORS.white, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  productBrand: { color: COLORS.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1.1, marginTop: 10 },
  productName: { color: COLORS.ink, fontSize: 16, fontWeight: '800', marginTop: 5 },
  productMeta: { color: COLORS.muted, fontSize: 9, marginTop: 5 },

  arFeature: {
    height: 315,
    borderRadius: 28,
    overflow: 'hidden',
    marginTop: 14,
    flexDirection: 'row',
  },
  arFeatureCopy: { width: '64%', padding: 22, zIndex: 2 },
  arFeatureKicker: { color: COLORS.goldSoft, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  arFeatureTitle: { color: COLORS.white, fontSize: 28, lineHeight: 31, fontWeight: '700', marginTop: 13 },
  arFeatureText: { color: '#B9CFCC', fontSize: 12, lineHeight: 18, marginTop: 12 },
  arFeatureLink: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 21 },
  arFeatureLinkText: { color: COLORS.goldSoft, fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  arFeatureImage: {
    position: 'absolute',
    right: -68,
    bottom: -18,
    width: 285,
    height: 260,
    resizeMode: 'contain',
    transform: [{ rotate: '-4deg' }],
  },

  serviceCard: {
    minHeight: 92,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: COLORS.petrol,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceCopy: { flex: 1, marginLeft: 13 },
  serviceTitle: { color: COLORS.ink, fontSize: 14, fontWeight: '800' },
  serviceText: { color: COLORS.muted, fontSize: 10, marginTop: 5 },
  serviceArrow: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.ivory,
    alignItems: 'center',
    justifyContent: 'center',
  },

  screenEyebrow: { color: COLORS.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.8, marginTop: 20 },
  screenTitle: { color: COLORS.ink, fontSize: 39, lineHeight: 42, fontWeight: '700', letterSpacing: -1.5, marginTop: 8 },
  searchBox: {
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    marginTop: 23,
  },
  searchInput: { flex: 1, color: COLORS.ink, fontSize: 13, marginLeft: 10 },
  categories: { gap: 8, paddingVertical: 18 },
  category: {
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  categoryActive: { backgroundColor: COLORS.petrol, borderColor: COLORS.petrol },
  categoryText: { color: COLORS.muted, fontSize: 11, fontWeight: '800' },
  categoryTextActive: { color: COLORS.white },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 },
  resultCount: { color: COLORS.muted, fontSize: 8, fontWeight: '900', letterSpacing: 1.2 },
  resultSort: { color: COLORS.ink, fontSize: 10 },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  favoriteGrid: { marginTop: 28 },

  emptyState: { alignItems: 'center', paddingTop: 90 },
  emptyIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: { color: COLORS.ink, fontSize: 21, fontWeight: '800', marginTop: 20 },
  emptyText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', maxWidth: 290, marginTop: 9 },
  darkButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.petrol,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    marginTop: 23,
  },
  darkButtonText: { color: COLORS.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.9 },

  profileHero: { borderRadius: 28, padding: 22, marginTop: 10 },
  profileHeroTitle: { color: COLORS.white, fontSize: 26, lineHeight: 29, fontWeight: '700', marginTop: 22 },
  profileHeroText: { color: '#B9CFCC', fontSize: 12, lineHeight: 18, marginTop: 10 },
  prescriptionCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    padding: 18,
    flexDirection: 'row',
    gap: 14,
    marginTop: 14,
  },
  prescriptionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.petrol,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prescriptionIconText: { color: COLORS.goldSoft, fontSize: 18, fontWeight: '900' },
  prescriptionContent: { flex: 1 },
  prescriptionKicker: { color: COLORS.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1.4 },
  prescriptionTitle: { color: COLORS.ink, fontSize: 15, fontWeight: '800', marginTop: 6 },
  prescriptionText: { color: COLORS.muted, fontSize: 10, lineHeight: 15, marginTop: 5 },
  prescriptionActions: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 13 },
  prescriptionButton: {
    height: 37,
    borderRadius: 19,
    backgroundColor: COLORS.petrol,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prescriptionButtonText: { color: COLORS.white, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  prescriptionRemove: { color: COLORS.danger, fontSize: 8, fontWeight: '900', letterSpacing: 0.7 },
  profileSectionTitle: { color: COLORS.ink, fontSize: 20, fontWeight: '800', marginTop: 28, marginBottom: 12 },
  contactAction: {
    minHeight: 70,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 9,
  },
  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.petrol,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactLabel: { flex: 1, color: COLORS.ink, fontSize: 12, fontWeight: '700', marginLeft: 12 },
  versionBox: { alignItems: 'center', paddingVertical: 30 },
  versionText: { color: COLORS.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1.4 },
  versionSubtext: { color: COLORS.muted, fontSize: 9, marginTop: 6 },

  bottomNavShell: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 13,
  },
  bottomNav: {
    height: 82,
    borderRadius: 28,
    backgroundColor: COLORS.petrol,
    borderWidth: 1,
    borderColor: '#1D4A4D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 },
  navLabel: { color: '#78908F', fontSize: 8 },
  navLabelActive: { color: COLORS.white, fontWeight: '900' },
  arNavButton: { width: 72, alignItems: 'center', marginTop: -28 },
  arNavGradient: {
    width: 59,
    height: 59,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.petrol,
  },
  arNavLabel: { color: COLORS.goldSoft, fontSize: 7, fontWeight: '900', marginTop: 3, letterSpacing: 0.7 },

  modalShade: { flex: 1, backgroundColor: 'rgba(7,29,34,.64)', justifyContent: 'flex-end' },
  productSheet: {
    backgroundColor: COLORS.ivory,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 19,
    paddingBottom: 30,
  },
  bookingSheet: {
    maxHeight: '92%',
    backgroundColor: COLORS.ivory,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    padding: 20,
    paddingBottom: 28,
  },
  sheetHandle: { width: 42, height: 4, borderRadius: 2, backgroundColor: '#B7B1A5', alignSelf: 'center', marginBottom: 16 },
  sheetClose: {
    position: 'absolute',
    right: 20,
    top: 18,
    width: 37,
    height: 37,
    borderRadius: 19,
    backgroundColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  sheetVisual: { height: 255, borderRadius: 23, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  sheetHalo: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,.28)' },
  sheetImage: { width: '92%', height: '82%' },
  sheetBrand: { color: COLORS.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginTop: 18 },
  sheetName: { color: COLORS.ink, fontSize: 29, fontWeight: '800', marginTop: 6, letterSpacing: -0.9 },
  sheetDescription: { color: COLORS.muted, fontSize: 12, lineHeight: 19, marginTop: 10 },
  measureRow: {
    height: 75,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 17,
  },
  measureItem: { flex: 1, alignItems: 'center' },
  measureValue: { color: COLORS.ink, fontSize: 19, fontWeight: '900' },
  measureLabel: { color: COLORS.muted, fontSize: 7, fontWeight: '900', letterSpacing: 1, marginTop: 5 },
  measureDivider: { width: 1, height: 34, backgroundColor: COLORS.border },
  sheetActions: { flexDirection: 'row', gap: 9, marginTop: 14 },
  tryButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: COLORS.petrol,
    flex: 1,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryButtonText: { color: COLORS.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.7 },
  sheetFavorite: {
    width: 55,
    height: 55,
    borderRadius: 18,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookingEyebrow: { color: COLORS.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginTop: 9 },
  bookingTitle: { color: COLORS.ink, fontSize: 31, lineHeight: 34, fontWeight: '800', marginTop: 8 },
  bookingText: { color: COLORS.muted, fontSize: 12, lineHeight: 18, marginTop: 9 },
  bookingDays: { gap: 8, paddingVertical: 20 },
  bookingDay: {
    width: 70,
    height: 82,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingDayActive: { backgroundColor: COLORS.petrol, borderColor: COLORS.petrol },
  bookingDayName: { color: COLORS.muted, fontSize: 8, fontWeight: '900' },
  bookingDayNumber: { color: COLORS.ink, fontSize: 22, fontWeight: '800', marginTop: 7 },
  bookingDayTextActive: { color: COLORS.white },
  bookingFieldLabel: { color: COLORS.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1.3, marginBottom: 11 },
  bookingTimes: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  bookingTime: {
    width: '31%',
    height: 45,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingTimeActive: { backgroundColor: '#D9E6E2', borderColor: COLORS.petrol },
  bookingTimeText: { color: COLORS.muted, fontSize: 11 },
  bookingTimeTextActive: { color: COLORS.petrol, fontWeight: '900' },
  bookingPrescription: {
    minHeight: 70,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.paper,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
    marginTop: 17,
  },
  bookingPrescriptionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.petrol,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingPrescriptionIconText: { color: COLORS.goldSoft, fontSize: 14, fontWeight: '900' },
  bookingPrescriptionCopy: { flex: 1, marginLeft: 11 },
  bookingPrescriptionTitle: { color: COLORS.ink, fontSize: 12, fontWeight: '800' },
  bookingPrescriptionText: { color: COLORS.muted, fontSize: 9, marginTop: 4 },
  bookingPrescriptionAction: { color: COLORS.petrol, fontSize: 8, fontWeight: '900' },
  confirmBookingButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.petrol,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginTop: 12,
  },
  confirmBookingText: { color: COLORS.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },

  confirmShade: { flex: 1, backgroundColor: 'rgba(7,29,34,.7)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  confirmCard: { width: '100%', borderRadius: 30, backgroundColor: COLORS.paper, padding: 29, alignItems: 'center' },
  confirmIcon: { width: 74, height: 74, borderRadius: 37, backgroundColor: '#D9ECE3', alignItems: 'center', justifyContent: 'center' },
  confirmEyebrow: { color: COLORS.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1.6, marginTop: 22 },
  confirmTitle: { color: COLORS.ink, fontSize: 26, fontWeight: '800', marginTop: 8 },
  confirmText: { color: COLORS.muted, fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10 },
});
