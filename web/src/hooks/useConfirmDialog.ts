import { useCallback, useState } from 'react';

/**
 * Hook to manage confirm dialog state
 */
export const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const showConfirm = useCallback((action: () => void) => {
    setPendingAction(() => action);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPendingAction(null);
  }, []);

  const handleConfirm = useCallback(() => {
    if (pendingAction) {
      pendingAction();
    }
    setOpen(false);
    setPendingAction(null);
  }, [pendingAction]);

  return {
    open,
    showConfirm,
    handleClose,
    handleConfirm,
  };
};
