import assert from 'node:assert/strict';
import test from 'node:test';

import {
  manualOverlay,
  normalizeAngle,
  overlayFromBounds,
  overlayFromEyes,
  smoothOverlay,
} from '../src/ar/geometry.ts';
import type { ArCalibration } from '../src/data.ts';

const calibration: ArCalibration = {
  scale: 1,
  offsetX: 0,
  offsetY: 0,
  aspect: 2,
  yawResponse: 0.2,
};

test('eye tracking centers the overlay and respects the frame aspect', () => {
  const overlay = overlayFromEyes({
    leftEye: { x: 130, y: 260 },
    rightEye: { x: 250, y: 260 },
    viewportWidth: 390,
    viewportHeight: 844,
    opticalWidth: 124,
    calibration,
  });
  assert.equal(overlay.rotation, 0);
  assert.equal(overlay.height, overlay.width / 2);
  assert.ok(Math.abs(overlay.left + overlay.width / 2 - 190) < 0.001);
});

test('larger real frames produce a larger overlay', () => {
  const base = {
    leftEye: { x: 130, y: 250 },
    rightEye: { x: 230, y: 250 },
    viewportWidth: 430,
    viewportHeight: 900,
    calibration,
  };
  const small = overlayFromEyes({ ...base, opticalWidth: 116 });
  const large = overlayFromEyes({ ...base, opticalWidth: 140 });
  assert.ok(large.width > small.width);
});

test('yaw applies a controlled perspective squeeze', () => {
  const base = {
    leftEye: { x: 120, y: 250 },
    rightEye: { x: 260, y: 250 },
    viewportWidth: 430,
    viewportHeight: 900,
    opticalWidth: 124,
    calibration,
  };
  const front = overlayFromEyes(base);
  const turned = overlayFromEyes({ ...base, yawAngle: 45 });
  assert.ok(turned.yawScale < 1);
  assert.ok(turned.width < front.width);
});

test('bounds fallback stays inside usable viewport limits', () => {
  const overlay = overlayFromBounds({
    bounds: { x: 110, y: 180, width: 180, height: 260 },
    viewportWidth: 390,
    viewportHeight: 844,
    opticalWidth: 124,
    calibration,
  });
  assert.ok(overlay.width <= 390 * 0.96);
  assert.ok(overlay.top >= 0);
});

test('manual and automatic overlays use the same calibrated asset aspect', () => {
  const manual = manualOverlay({
    viewportWidth: 390,
    viewportHeight: 844,
    opticalWidth: 124,
    calibration,
  });
  assert.equal(manual.height, manual.width / calibration.aspect);
});

test('smoothing moves toward the next pose without jumping', () => {
  const previous = { left: 10, top: 20, width: 200, height: 100, rotation: 0, yawScale: 1 };
  const next = { left: 30, top: 40, width: 240, height: 120, rotation: 20, yawScale: 0.9 };
  const value = smoothOverlay(previous, next, 0.25);
  assert.deepEqual(value, { left: 15, top: 25, width: 210, height: 105, rotation: 5, yawScale: 0.975 });
});

test('angles normalize across full turns', () => {
  assert.equal(normalizeAngle(370), 10);
  assert.equal(normalizeAngle(-190), 170);
});
