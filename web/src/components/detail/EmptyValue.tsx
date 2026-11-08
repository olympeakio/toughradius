import { Box, Typography } from '@mui/material';
import { useTranslate } from 'react-admin';

export interface EmptyValueProps {
  message?: string;
}

/**
 * 空态组件
 * 用于在详情页中显示空值占位符
 */
export const EmptyValue = ({ message }: EmptyValueProps) => {
  const translate = useTranslate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        color: 'text.disabled',
        fontStyle: 'italic',
        fontSize: '0.85rem',
      }}
    >
      <Typography variant="body2" sx={{ opacity: 0.6 }}>
        {message ?? translate('common.no_data', { _: 'No data' })}
      </Typography>
    </Box>
  );
};

export default EmptyValue;
