import type { ArCalibration } from '../data';

export type Point = { x: number; y: number };
export type FaceBounds = { x: number; y: number; width: number; height: number };
export type Overlay = {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
  yawScale: number;
};

const REFERENCE_OPTICAL_WIDTH_MM = 124;
const EYE_DISTANCE_TO_FRAME = 2.22;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const normalizeAngle = (angle: number) => {
  let normalized = angle;
  while (normalized > 180) normalized -= 360;
  while (normalized < -180) normalized += 360;
  return normalized;
};

const physicalScale = (opticalWidth: number) =>
  clamp(opticalWidth / REFERENCE_OPTICAL_WIDTH_MM, 0.84, 1.24);

const yawScaleFor = (yawAngle: number, response: number) => {
  const progress = clamp(Math.abs(yawAngle) / 52, 0, 1);
  return 1 - progress * response;
};

export function overlayFromEyes(input: {
  leftEye: Point;
  rightEye: Point;
  viewportWidth: number;
  viewportHeight: number;
  opticalWidth: number;
  calibration: ArCalibration;
  yawAngle?: number;
  userScale?: number;
  userOffsetY?: number;
}): Overlay {
  const {
    leftEye,
    rightEye,
    viewportWidth,
    viewportHeight,
    opticalWidth,
    calibration,
    yawAngle = 0,
    userScale = 1,
    userOffsetY = 0,
  } = input;
  const dx = rightEye.x - leftEye.x;
  const dy = rightEye.y - leftEye.y;
  const eyeDistance = Math.sqrt(dx * dx + dy * dy);
  const yawScale = yawScaleFor(yawAngle, calibration.yawResponse);
  const rawWidth =
    eyeDistance *
    EYE_DISTANCE_TO_FRAME *
    physicalScale(opticalWidth) *
    calibration.scale *
    userScale *
    yawScale;
  const width = clamp(rawWidth, viewportWidth * 0.46, viewportWidth * 0.96);
  const height = width / calibration.aspect;
  const centerX =
    (leftEye.x + rightEye.x) / 2 +
    width * calibration.offsetX +
    (yawAngle / 52) * width * 0.035;
  const centerY =
    (leftEye.y + rightEye.y) / 2 +
    width * calibration.offsetY +
    userOffsetY;

  return {
    left: clamp(centerX - width / 2, -width * 0.12, viewportWidth - width * 0.88),
    top: clamp(centerY - height * 0.5, 0, viewportHeight - height),
    width,
    height,
    rotation: normalizeAngle(Math.atan2(dy, dx) * (180 / Math.PI)),
    yawScale,
  };
}

export function overlayFromBounds(input: {
  bounds: FaceBounds;
  viewportWidth: number;
  viewportHeight: number;
  opticalWidth: number;
  calibration: ArCalibration;
  rollAngle?: number;
  yawAngle?: number;
  userScale?: number;
  userOffsetY?: number;
}): Overlay {
  const {
    bounds,
    viewportWidth,
    viewportHeight,
    opticalWidth,
    calibration,
    rollAngle = 0,
    yawAngle = 0,
    userScale = 1,
    userOffsetY = 0,
  } = input;
  const yawScale = yawScaleFor(yawAngle, calibration.yawResponse);
  const width = clamp(
    bounds.width * 1.06 * physicalScale(opticalWidth) * calibration.scale * userScale * yawScale,
    viewportWidth * 0.46,
    viewportWidth * 0.96,
  );
  const height = width / calibration.aspect;
  const centerX =
    bounds.x +
    bounds.width / 2 +
    width * calibration.offsetX +
    (yawAngle / 52) * width * 0.035;
  const eyeLine = bounds.y + bounds.height * 0.39;
  const centerY = eyeLine + width * calibration.offsetY + userOffsetY;

  return {
    left: clamp(centerX - width / 2, -width * 0.12, viewportWidth - width * 0.88),
    top: clamp(centerY - height * 0.5, 0, viewportHeight - height),
    width,
    height,
    rotation: normalizeAngle(rollAngle),
    yawScale,
  };
}

export function manualOverlay(input: {
  viewportWidth: number;
  viewportHeight: number;
  opticalWidth: number;
  calibration: ArCalibration;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  rotation?: number;
}): Overlay {
  const {
    viewportWidth,
    viewportHeight,
    opticalWidth,
    calibration,
    scale = 1,
    offsetX = 0,
    offsetY = 0,
    rotation = 0,
  } = input;
  const width = clamp(
    viewportWidth * 0.72 * physicalScale(opticalWidth) * calibration.scale * scale,
    viewportWidth * 0.5,
    viewportWidth * 0.94,
  );
  const height = width / calibration.aspect;
  const centerX = viewportWidth / 2 + width * calibration.offsetX + offsetX;
  const centerY = viewportHeight * 0.36 + width * calibration.offsetY + offsetY;
  return {
    left: clamp(centerX - width / 2, -width * 0.12, viewportWidth - width * 0.88),
    top: clamp(centerY - height / 2, 0, viewportHeight - height),
    width,
    height,
    rotation: normalizeAngle(rotation),
    yawScale: 1,
  };
}

export function smoothOverlay(previous: Overlay | null, next: Overlay, alpha = 0.3): Overlay {
  if (!previous) return next;
  const weight = clamp(alpha, 0.05, 1);
  const rotationDelta = normalizeAngle(next.rotation - previous.rotation);
  return {
    left: previous.left + (next.left - previous.left) * weight,
    top: previous.top + (next.top - previous.top) * weight,
    width: previous.width + (next.width - previous.width) * weight,
    height: previous.height + (next.height - previous.height) * weight,
    rotation: normalizeAngle(previous.rotation + rotationDelta * weight),
    yawScale: previous.yawScale + (next.yawScale - previous.yawScale) * weight,
  };
}
