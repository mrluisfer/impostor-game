#!/bin/bash

# Script para generar iconos PWA a partir del SVG
# Requiere: ImageMagick (brew install imagemagick)

SIZES=(72 96 128 144 152 192 384 512)
SVG_PATH="public/icons/icon.svg"
OUTPUT_DIR="public/icons"

for size in "${SIZES[@]}"; do
  echo "Generando icon-${size}x${size}.png..."
  convert -background none -resize ${size}x${size} "$SVG_PATH" "$OUTPUT_DIR/icon-${size}x${size}.png"
done

echo "¡Iconos generados!"
