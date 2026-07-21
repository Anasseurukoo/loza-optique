import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { eyewear, type CatalogueItem } from './data';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

const DEGREE = String.fromCharCode(176);

const COPY = {
  permissionKicker: 'VIRTUAL MIRROR',
  permissionTitle: 'Votre miroir Loza.',
  permissionCopy:
    'Autorisez la cam\u00e9ra frontale. Dans Expo Go, vous pouvez calibrer manuellement la monture. Le suivi automatique est activ\u00e9 dans l\u2019APK de d\u00e9veloppement.',
  permissionButton: 'AUTORISER LA CAM\u00c9RA',
  later: 'Plus tard',
  hint: 'Glissez la monture sur votre visage',
  privacy: 'Aucune image envoy\u00e9e \u00b7 traitement local',
};

type Offset = {
  x: number;
  y: number;
};

export default function TryOnExpoGo({
  initial,
  onClose,
}: {
  initial: CatalogueItem;
  onClose: () => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [active, setActive] = useState(initial);
  const [scale, setScale] = useState(initial.ar.scale);
  const [rotation, setRotation] = useState(0);

  const [offset, setOffset] = useState<Offset>({
    x: initial.ar.offsetX * SCREEN_WIDTH,
    y: initial.ar.offsetY * SCREEN_HEIGHT,
  });

  const dragStart = useRef<Offset>({
    x: 0,
    y: 0,
  });

  const resetCalibration = () => {
    setScale(active.ar.scale);
    setRotation(0);

    setOffset({
      x: active.ar.offsetX * SCREEN_WIDTH,
      y: active.ar.offsetY * SCREEN_HEIGHT,
    });
  };

  useEffect(() => {
    setScale(active.ar.scale);
    setRotation(0);

    setOffset({
      x: active.ar.offsetX * SCREEN_WIDTH,
      y: active.ar.offsetY * SCREEN_HEIGHT,
    });
  }, [active]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          dragStart.current = offset;
        },

        onPanResponderMove: (_, gesture) => {
          setOffset({
            x: dragStart.current.x + gesture.dx,
            y: dragStart.current.y + gesture.dy,
          });
        },
      }),
    [offset],
  );

  if (!permission) {
    return <View style={styles.root} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permission}>
        <View style={styles.permissionIcon}>
          <Ionicons
            name="camera-outline"
            size={37}
            color="#D8BF82"
          />
        </View>

        <Text style={styles.permissionKicker}>
          {COPY.permissionKicker}
        </Text>

        <Text style={styles.permissionTitle}>
          {COPY.permissionTitle}
        </Text>

        <Text style={styles.permissionCopy}>
          {COPY.permissionCopy}
        </Text>

        <Pressable
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            {COPY.permissionButton}
          </Text>
        </Pressable>

        <Pressable onPress={onClose}>
          <Text style={styles.cancel}>{COPY.later}</Text>
        </Pressable>
      </View>
    );
  }

  /*
   * Persol front images contain around 30 percent transparent padding.
   * We compensate for that padding so the visible frame matches face width.
   */
  const imageVisibleOccupancy = 0.69;
  const targetVisibleFrameRatio = 0.7;

  const physicalRatio =
    active.measurements.opticalWidth / 124;

  const calculatedWidth =
    (SCREEN_WIDTH *
      targetVisibleFrameRatio *
      physicalRatio *
      scale) /
    imageVisibleOccupancy;

  const width = Math.min(
    SCREEN_WIDTH * 0.98,
    Math.max(SCREEN_WIDTH * 0.76, calculatedWidth),
  );

  const height = width / active.ar.aspect;

  const left =
    (SCREEN_WIDTH - width) / 2 + offset.x;

  const top =
    SCREEN_HEIGHT * 0.285 - height / 2 + offset.y;

  return (
    <View style={styles.root}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="front"
        mirror
      />

      <View style={styles.tint} pointerEvents="none" />

      <View
        style={styles.faceGuide}
        pointerEvents="none"
      />

      <View
        {...panResponder.panHandlers}
        style={[
          styles.glasses,
          {
            left,
            top,
            width,
            height,
            transform: [
              {
                rotate: `${rotation}deg`,
              },
            ],
          },
        ]}
      >
        <Image
          source={active.arImage ?? active.image}
          style={[
            styles.glassesImage,
            {
              transform: [{ scale: 1.55 }],
            },
          ]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.header}>
        <Pressable
          style={styles.roundButton}
          onPress={onClose}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color="#FFFFFF"
          />
        </Pressable>

        <View>
          <Text style={styles.logo}>LOZA</Text>
          <Text style={styles.subLogo}>
            VIRTUAL MIRROR
          </Text>
        </View>

        <View style={styles.modeBadge}>
          <Text style={styles.modeBadgeText}>
            EXPO GO
          </Text>
        </View>
      </View>

      <View
        style={styles.hint}
        pointerEvents="none"
      >
        <Text style={styles.hintText}>
          {COPY.hint}
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          style={styles.controlButton}
          onPress={() =>
            setScale((value) =>
              Math.max(0.65, value - 0.05),
            )
          }
        >
          <Ionicons
            name="remove"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          style={styles.controlButton}
          onPress={() =>
            setOffset((value) => ({
              ...value,
              y: value.y - 4,
            }))
          }
        >
          <Ionicons
            name="arrow-up"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          style={styles.controlButton}
          onPress={resetCalibration}
        >
          <Ionicons
            name="locate-outline"
            size={19}
            color="#D8BF82"
          />
        </Pressable>

        <Pressable
          style={styles.controlButton}
          onPress={() =>
            setOffset((value) => ({
              ...value,
              y: value.y + 4,
            }))
          }
        >
          <Ionicons
            name="arrow-down"
            size={19}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          style={styles.controlButton}
          onPress={() =>
            setScale((value) =>
              Math.min(1.45, value + 0.05),
            )
          }
        >
          <Ionicons
            name="add"
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      <View style={styles.rotationControls}>
        <Pressable
          style={styles.rotationButton}
          onPress={() =>
            setRotation((value) => value - 1)
          }
        >
          <Ionicons
            name="arrow-undo-outline"
            size={18}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.rotationValue}>
          {rotation}
          {DEGREE}
        </Text>

        <Pressable
          style={styles.rotationButton}
          onPress={() =>
            setRotation((value) => value + 1)
          }
        >
          <Ionicons
            name="arrow-redo-outline"
            size={18}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.activeLabel}>
          {`${active.code} \u00b7 ${active.measurements.lens}-${active.measurements.bridge}`}
        </Text>

        <Text style={styles.activeName}>
          {active.name}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.choices}
        >
          {eyewear.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => setActive(item)}
              style={[
                styles.choice,
                {
                  backgroundColor: item.color,
                },
                item.id === active.id &&
                  styles.choiceActive,
              ]}
            >
              <Image
                source={item.image}
                style={styles.choiceImage}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.privacy}>
          {COPY.privacy}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#071D22',
  },

  tint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(7,29,34,0.08)',
  },

  faceGuide: {
    position: 'absolute',
    left: '16%',
    top: '17%',
    width: '68%',
    height: '43%',
    borderRadius: 180,
    borderWidth: 1,
    borderColor: 'rgba(216,191,130,0.42)',
    borderStyle: 'dashed',
  },

  glasses: {
    position: 'absolute',
    zIndex: 5,
    overflow: 'visible',
  },

  glassesImage: {
    width: '100%',
    height: '100%',
  },

  header: {
    position: 'absolute',
    top: 42,
    left: 17,
    right: 17,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(7,29,34,0.68)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 5,
    textAlign: 'center',
  },

  subLogo: {
    color: '#D8BF82',
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 1.6,
    textAlign: 'center',
    marginTop: 4,
  },

  modeBadge: {
    borderRadius: 16,
    backgroundColor: 'rgba(7,29,34,0.68)',
    paddingHorizontal: 11,
    paddingVertical: 9,
  },

  modeBadgeText: {
    color: '#D8BF82',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  hint: {
    position: 'absolute',
    top: '61%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  hintText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: 'rgba(7,29,34,0.62)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 18,
  },

  controls: {
    position: 'absolute',
    top: '67%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },

  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(7,29,34,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rotationControls: {
    position: 'absolute',
    top: '73%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(7,29,34,0.74)',
    borderRadius: 18,
    paddingHorizontal: 10,
  },

  rotationButton: {
    paddingHorizontal: 7,
    paddingVertical: 6,
  },

  rotationValue: {
    color: '#D8BF82',
    fontSize: 10,
    fontWeight: '900',
    minWidth: 28,
    textAlign: 'center',
  },

  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7,29,34,0.93)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 17,
    paddingBottom: 18,
  },

  activeLabel: {
    color: '#D8BF82',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.4,
    textAlign: 'center',
  },

  activeName: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 5,
  },

  choices: {
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },

  choice: {
    width: 75,
    height: 58,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.72,
  },

  choiceActive: {
    borderWidth: 2,
    borderColor: '#D8BF82',
    opacity: 1,
  },

  choiceImage: {
    width: '91%',
    height: '80%',
  },

  privacy: {
    color: '#8EA2A2',
    fontSize: 8,
    textAlign: 'center',
    letterSpacing: 0.4,
  },

  permission: {
    flex: 1,
    backgroundColor: '#071D22',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  permissionIcon: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#17474B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  permissionKicker: {
    color: '#D8BF82',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.8,
    marginTop: 25,
  },

  permissionTitle: {
    color: '#F6F1E7',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 9,
  },

  permissionCopy: {
    color: '#9FB1AF',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 13,
    maxWidth: 320,
  },

  permissionButton: {
    height: 54,
    borderRadius: 27,
    backgroundColor: '#D8BF82',
    paddingHorizontal: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },

  permissionButtonText: {
    color: '#071D22',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.9,
  },

  cancel: {
    color: '#9FB1AF',
    fontSize: 12,
    marginTop: 19,
  },
});