#!/usr/bin/env python3
"""
Analizador de imagen (RNF2.1).

Entrada: JSON por stdin con {"bytes": [...], "vendorFormat": "JPEG|PNG"}.
Salida: JSON por stdout con esquema estandar {mime,w,h,color,species}.

En produccion aqui iria el modelo de vision (PyTorch/ONNX/etc.). Este script
mantiene el contrato para que la logica JS pueda intercambiar el motor sin
cambiar el resto del sistema.
"""
import json
import sys


def analyze(payload):
    vendor = payload.get('vendorFormat', 'JPEG').upper()
    raw_bytes = payload.get('bytes', []) or []
    mime = 'image/png' if vendor == 'PNG' else 'image/jpeg'
    color = 'brown' if (sum(raw_bytes) % 2 == 0) else 'black'
    return {
        'mime': mime,
        'w': 800,
        'h': 600,
        'color': color,
        'species': 'dog',
    }


def main():
    data = sys.stdin.read().strip()
    payload = json.loads(data) if data else {}
    result = analyze(payload)
    print(json.dumps(result))


if __name__ == '__main__':
    main()
