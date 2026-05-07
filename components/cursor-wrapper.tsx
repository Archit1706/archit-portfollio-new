'use client';

import { useTheme } from './theme-provider';
import { CustomCursor } from './cursor';

export function CursorWrapper() {
  const { customCursor } = useTheme();
  return customCursor ? <CustomCursor /> : null;
}
