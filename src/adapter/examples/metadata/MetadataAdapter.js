'use strict';

const path = require('path');
const { spawnSync } = require('child_process');
const ImageMetadata = require('./ImageMetadata');

const SCRIPT = path.join(__dirname, '..', '..', '..', '..', 'python', 'image_analyzer.py');
const PY_CMD = process.platform === 'win32' ? 'python' : 'python3';

/**
 * Adapter: convierte RawImage (formato vendor) al esquema JSON estandar
 * delegando el analisis al script Python. Mantiene RNF2.1 intercambiable.
 */
class MetadataAdapter {
  adapt(rawImage) {
    const payload = JSON.stringify({
      bytes: Array.from(rawImage.bytes || []),
      vendorFormat: rawImage.vendorFormat,
    });

    const proc = spawnSync(PY_CMD, [SCRIPT], {
      input: payload,
      encoding: 'utf8',
    });

    if (proc.status !== 0) {
      throw new Error(`image_analyzer fallo: ${proc.stderr || proc.error}`);
    }

    return new ImageMetadata(JSON.parse(proc.stdout.trim()));
  }
}

module.exports = MetadataAdapter;
