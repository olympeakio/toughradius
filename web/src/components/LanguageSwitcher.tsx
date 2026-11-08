import { useState } from 'react';
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { useSetLocale, useLocaleState, useTranslate } from 'react-admin';
import LanguageIcon from '@mui/icons-material/Language';
import CheckIcon from '@mui/icons-material/Check';
import { LOCALES } from '../i18n';

/** Dil seçici — giriş ekranında ve başka yerlerde kullanılabilen bağımsız düğme + menü. */
export const LanguageSwitcher = ({ color = 'inherit' }: { color?: string }) => {
  const setLocale = useSetLocale();
  const [locale] = useLocaleState();
  const translate = useTranslate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const current = LOCALES.find((l) => l.locale === locale) ?? LOCALES[0];

  return (
    <>
      <Button
        size="small"
        startIcon={<LanguageIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label={translate('appbar.switch_language')}
        sx={{ color, textTransform: 'none' }}
      >
        {current.name}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {LOCALES.map((l) => (
          <MenuItem
            key={l.locale}
            selected={l.locale === locale}
            onClick={() => {
              setLocale(l.locale);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>{l.locale === locale && <CheckIcon fontSize="small" />}</ListItemIcon>
            <ListItemText>{l.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
