import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { Camera, type Face } from 'react-native-vision-camera-face-detector';

import {
  overlayFromBounds,
  overlayFromEyes,
  smoothOverlay,
  type Overlay,
} from './ar/geometry';
import { eyewear, type CatalogueItem } from './data';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function TryOnNative({
  initial,
  onClose,
}: {
  initial: CatalogueItem;
  onClose: () => void;
}) {
  const device = useCameraDevice('front');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [active, setActive] = useState(initial);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [error, setError] = useState('');
  const [userScale, setUserScale] = useState(1);
  const [userOffsetY, setUserOffsetY] = useState(0);
  const previous = useRef<Overlay | null>(null);
  const lastUpdate = useRef(0);

  useEffect(() => {
    previous.current = null;
    setOverlay(null);
    setUserScale(1);
    setUserOffsetY(0);
  }, [active]);

  const handleFaces = useCallback(
    (faces: Face[]) => {
      const now = Date.now();
      if (now - lastUpdate.current < 55) return;
      lastUpdate.current = now;

      const face = faces[0];
      if (!face) {
        setOverlay(null);
        previous.current = null;
        return;
      }

      const leftEye = face.landmarks?.LEFT_EYE;
      const rightEye = face.landmarks?.RIGHT_EYE;
      const yawAngle = face.yawAngle ?? 0;
      let next: Overlay;

      if (leftEye && rightEye) {
        next = overlayFromEyes({
          leftEye,
          rightEye,
          viewportWidth: SCREEN_WIDTH,
          viewportHeight: SCREEN_HEIGHT,
          opticalWidth: active.measurements.opticalWidth,
          calibration: active.ar,
          yawAngle,
          userScale,
          userOffsetY,
        });
      } else {
        next = overlayFromBounds({
          bounds: face.bounds,
          viewportWidth: SCREEN_WIDTH,
          viewportHeight: SCREEN_HEIGHT,
          opticalWidth: active.measurements.opticalWidth,
          calibration: active.ar,
          rollAngle: face.rollAngle,
          yawAngle,
          userScale,
          userOffsetY,
        });
      }

      const smooth = smoothOverlay(previous.current, next, 0.3);

      previous.current = smooth;
      setOverlay(smooth);
    },
    [active, userOffsetY, userScale],
  );

  if (!hasPermission) {
    return (
      <View style={styles.permission}>
        <View style={styles.permissionIcon}>
          <Text style={styles.permissionIconText}>◎</Text>
        </View>
        <Text style={styles.permissionKicker}>ESSAYAGE VIRTUEL</Text>
        <Text style={styles.permissionTitle}>Votre miroir Loza.</Text>
        <Text style={styles.permissionCopy}>
          Autorisez la caméra frontale. Les images sont traitées localement et ne quittent
          pas votre téléphone.
        </Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>AUTORISER LA CAMÉRA</Text>
        </Pressable>
        <Pressable onPress={onClose}>
          <Text style={styles.cancel}>Plus tard</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {device ? (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive
          cameraFacing="front"
          autoMode
          windowWidth={SCREEN_WIDTH}
          windowHeight={SCREEN_HEIGHT}
          performanceMode="fast"
          outputResolution="preview"
          runLandmarks
          trackingEnabled
          onFacesDetected={handleFaces}
          onError={(cameraError) => setError(cameraError.message)}
        />
      ) : (
        <View style={styles.noCamera}>
          <Text style={styles.noCameraText}>Caméra frontale indisponible</Text>
        </View>
      )}

      <View style={styles.tint} pointerEvents="none" />
      <View style={styles.guide} pointerEvents="none" />

      {overlay ? (
        <View
          style={[
            styles.glasses,
            {
              left: overlay.left,
              top: overlay.top,
              width: overlay.width,
              height: overlay.height,
              transform: [{ rotate: `${overlay.rotation}deg` }],
            },
          ]}
        >
          <Image
            source={active.arImage ?? active.image}
            style={styles.glassesImage}
            resizeMode="contain"
          />
        </View>
      ) : null}

      <View style={styles.header}>
        <Pressable style={styles.roundButton} onPress={onClose}>
          <Text style={styles.roundButtonText}>‹</Text>
        </Pressable>
        <View>
          <Text style={styles.logo}>LOZA</Text>
          <Text style={styles.subLogo}>VIRTUAL MIRROR</Text>
        </View>
        <View style={styles.live}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE 2.5D</Text>
        </View>
      </View>

      <View style={styles.hint} pointerEvents="none">
        <Text style={styles.hintText}>
          {overlay ? 'Tournez doucement la tête' : 'Placez votre visage dans le cadre'}
        </Text>
      </View>

      {error ? (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <View style={styles.controls}>
        <Pressable
          style={styles.controlButton}
          onPress={() => setUserScale((value) => Math.max(0.82, value - 0.04))}
        >
          <Ionicons name="remove" size={19} color="#FFFFFF" />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => setUserOffsetY((value) => value - 4)}
        >
          <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => {
            setUserScale(1);
            setUserOffsetY(0);
          }}
        >
          <Ionicons name="locate-outline" size={19} color="#D8BF82" />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => setUserOffsetY((value) => value + 4)}
        >
          <Ionicons name="arrow-down" size={18} color="#FFFFFF" />
        </Pressable>
        <Pressable
          style={styles.controlButton}
          onPress={() => setUserScale((value) => Math.min(1.22, value + 0.04))}
        >
          <Ionicons name="add" size={19} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.activeLabel}>
          {active.code} · {active.measurements.lens}-{active.measurements.bridge}
        </Text>
        <Text style={styles.activeName}>{active.name}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.choices}>
          {eyewear.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setActive(item)}
              style={[
                styles.choice,
                { backgroundColor: item.color },
                item.id === active.id && styles.choiceActive,
              ]}
            >
              <Image source={item.image} style={styles.choiceImage} resizeMode="contain" />
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.privacyText}>Traitement local · aucune photo envoyée</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#071315' },
  tint: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(3,12,13,.08)' },
  guide: {
    position: 'absolute',
    left: '16%',
    top: '18%',
    width: '68%',
    height: '42%',
    borderRadius: 150,
    borderWidth: 1,
    borderColor: 'rgba(216,191,130,.45)',
    borderStyle: 'dashed',
  },
  glasses: { position: 'absolute', zIndex: 4 },
  glassesImage: { width: '100%', height: '100%' },
  header: {
    position: 'absolute',
    top: 40,
    left: 18,
    right: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(7,19,21,.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.18)',
  },
  roundButtonText: { color: '#fff', fontSize: 32, lineHeight: 34 },
  logo: { color: '#fff', fontSize: 15, fontWeight: '900', letterSpacing: 5, textAlign: 'center' },
  subLogo: { color: '#D8BF82', fontSize: 8, fontWeight: '800', letterSpacing: 1.7, textAlign: 'center', marginTop: 4 },
  live: { height: 32, paddingHorizontal: 11, borderRadius: 16, backgroundColor: 'rgba(7,19,21,.65)', flexDirection: 'row', alignItems: 'center', gap: 6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#73D7A7' },
  liveText: { color: '#fff', fontSize: 9, fontWeight: '900', letterSpacing: 0.8 },
  hint: { position: 'absolute', top: '63%', left: 0, right: 0, alignItems: 'center' },
  hintText: { color: '#fff', fontSize: 12, fontWeight: '700', backgroundColor: 'rgba(7,19,21,.6)', paddingHorizontal: 15, paddingVertical: 9, borderRadius: 18 },
  error: { position: 'absolute', top: 98, left: 20, right: 20, backgroundColor: '#8D3D37', borderRadius: 14, padding: 10 },
  errorText: { color: '#fff', fontSize: 10, textAlign: 'center' },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 206,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
    zIndex: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7,19,21,.74)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(7,19,21,.92)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  activeLabel: { color: '#D8BF82', fontSize: 9, fontWeight: '900', letterSpacing: 1.7, textAlign: 'center' },
  activeName: { color: '#fff', fontSize: 22, fontWeight: '600', textAlign: 'center', marginTop: 5 },
  choices: { paddingHorizontal: 16, gap: 9, paddingVertical: 15 },
  choice: { width: 76, height: 60, borderRadius: 17, alignItems: 'center', justifyContent: 'center', opacity: 0.7 },
  choiceActive: { borderWidth: 2, borderColor: '#D8BF82', opacity: 1 },
  choiceImage: { width: '90%', height: '80%' },
  privacyText: { color: '#8EA2A2', fontSize: 9, letterSpacing: 0.4, textAlign: 'center' },
  permission: { flex: 1, backgroundColor: '#071315', alignItems: 'center', justifyContent: 'center', padding: 30 },
  permissionIcon: { width: 82, height: 82, borderRadius: 41, backgroundColor: '#17474B', alignItems: 'center', justifyContent: 'center' },
  permissionIconText: { color: '#D8BF82', fontSize: 38 },
  permissionKicker: { color: '#D8BF82', fontSize: 10, fontWeight: '900', letterSpacing: 1.8, marginTop: 26 },
  permissionTitle: { color: '#F3EEDF', fontSize: 31, fontWeight: '600', marginTop: 9 },
  permissionCopy: { color: '#9FB1AF', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 13, maxWidth: 315 },
  permissionButton: { height: 54, borderRadius: 27, backgroundColor: '#D8BF82', paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center', marginTop: 27 },
  permissionButtonText: { color: '#071315', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  cancel: { color: '#9FB1AF', fontSize: 13, marginTop: 20 },
  noCamera: { ...StyleSheet.absoluteFill, alignItems: 'center', justifyContent: 'center' },
  noCameraText: { color: '#fff' },
});
