import { useState, useCallback } from 'react';

export function useVisible() {
  const [visible, setVisible] = useState(false);

  const onHide = useCallback(() => {
    setVisible(false);
  }, []);

  const onShow = useCallback(() => {
    setVisible(true);
  }, []);

  return {
    visible,
    setVisible,
    onShow,
    onHide,
  };
}
