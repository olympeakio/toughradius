import { useState } from 'react';

/** react-admin filtre değerlerini (boşları atarak) metin sözlüğüne çevirir. */
export function toLocalFilters(filterValues: Record<string, unknown> | undefined | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (filterValues) {
    for (const [key, value] of Object.entries(filterValues)) {
      if (value !== undefined && value !== null && value !== '') out[key] = String(value);
    }
  }
  return out;
}

/**
 * Arama formunun yerel (düzenlenebilir) filtre durumu; dış `filterValues` değişince yeniden
 * eşitlenir. Effect içinde setState yerine React'in önerdiği "prop değişince render
 * sırasında güncelle" kalıbı kullanılır → ek (kademeli) render yok.
 * https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
 */
export function useSyncedLocalFilters(filterValues: Record<string, unknown> | undefined | null) {
  const [source, setSource] = useState(filterValues);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>(() => toLocalFilters(filterValues));
  if (filterValues !== source) {
    setSource(filterValues);
    setLocalFilters(toLocalFilters(filterValues));
  }
  return [localFilters, setLocalFilters] as const;
}
