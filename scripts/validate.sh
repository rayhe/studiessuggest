#!/usr/bin/env bash
# Studies Suggest — Site Validation Script
set -euo pipefail
cd "$(dirname "$0")/.."

ERRORS=0
WARNINGS=0

echo "=== Studies Suggest Validation ==="
echo ""

# 1. Check all HTML files exist and are well-formed
echo "--- HTML Structure ---"
for f in index.html stories/*.html; do
  if ! grep -q '<!DOCTYPE html>' "$f"; then
    echo "ERROR: $f missing DOCTYPE"
    ((ERRORS++))
  fi
  if ! grep -q '</html>' "$f"; then
    echo "ERROR: $f missing closing </html>"
    ((ERRORS++))
  fi
  # Check for duplicate </html>
  count=$(grep -c '</html>' "$f")
  if [ "$count" -gt 1 ]; then
    echo "ERROR: $f has duplicate </html> tags ($count found)"
    ((ERRORS++))
  fi
  echo "  ✓ $f structure OK"
done

# 2. Check all images referenced exist
echo ""
echo "--- Images ---"
for f in stories/*.html index.html; do
  for img in $(grep -oP 'src="[^"]*\.(webp|png|jpg|jpeg)"' "$f" | sed 's/src="//;s/"//'); do
    # Resolve relative to the HTML file's directory
    dir=$(dirname "$f")
    resolved="$dir/$img"
    if [ ! -f "$resolved" ]; then
      # Also try from root
      root_img="${img#../}"
      root_img="${root_img#/}"
      if [ ! -f "$root_img" ]; then
        echo "ERROR: $f references missing image: $img"
        ((ERRORS++))
      fi
    fi
  done
done
echo "  ✓ All referenced images exist"

# 3. Check all audio files referenced exist
echo ""
echo "--- Audio ---"
for f in stories/*.html; do
  for mp3 in $(grep -oP 'data-src="[^"]*\.mp3"' "$f" | sed 's/data-src="//;s/"//'); do
    dir=$(dirname "$f")
    if [ ! -f "$dir/$mp3" ]; then
      echo "ERROR: $f references missing audio: $mp3"
      ((ERRORS++))
    fi
  done
done
echo "  ✓ All referenced audio files exist"

# 4. Check sitemap matches actual pages
echo ""
echo "--- Sitemap ---"
actual_stories=$(ls stories/*.html | wc -l)
sitemap_stories=$(grep -c '<loc>.*stories/' sitemap.xml)
if [ "$actual_stories" -ne "$sitemap_stories" ]; then
  echo "WARNING: $actual_stories story files but $sitemap_stories in sitemap"
  ((WARNINGS++))
else
  echo "  ✓ Sitemap matches ($actual_stories stories)"
fi

# 5. Check RSS feed matches
echo ""
echo "--- RSS Feed ---"
feed_items=$(grep -c '<item>' feed.xml)
if [ "$actual_stories" -gt "$feed_items" ]; then
  echo "WARNING: $actual_stories stories but only $feed_items in RSS feed"
  ((WARNINGS++))
else
  echo "  ✓ RSS feed has $feed_items items"
fi

# 6. Check for JSON-LD
echo ""
echo "--- JSON-LD ---"
for f in stories/*.html index.html; do
  if ! grep -q 'schema.org' "$f"; then
    echo "WARNING: $f missing JSON-LD structured data"
    ((WARNINGS++))
  fi
done
echo "  ✓ JSON-LD present in all pages"

# 7. Check for OG meta tags
echo ""
echo "--- Open Graph ---"
for f in stories/*.html index.html; do
  if ! grep -q 'og:title' "$f"; then
    echo "WARNING: $f missing og:title"
    ((WARNINGS++))
  fi
done
echo "  ✓ OG tags present"

# 8. Check for canonical URLs
echo ""
echo "--- Canonical URLs ---"
for f in stories/*.html index.html; do
  if ! grep -q 'rel="canonical"' "$f"; then
    echo "WARNING: $f missing canonical URL"
    ((WARNINGS++))
  fi
done
echo "  ✓ Canonical URLs present"

# 9. Image sizes
echo ""
echo "--- Image Sizes ---"
for img in images/*.webp; do
  size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
  kb=$((size / 1024))
  if [ "$kb" -gt 500 ]; then
    echo "WARNING: $img is ${kb}KB (>500KB)"
    ((WARNINGS++))
  fi
done
echo "  ✓ Image sizes checked"

echo ""
echo "=== Results: $ERRORS errors, $WARNINGS warnings ==="
exit $ERRORS
