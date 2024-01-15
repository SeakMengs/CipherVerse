import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// its type definition may like this
import type * as app from '@tauri-apps/api/app';

declare global {
  interface Window {
    __TAURI__: {
      app?: typeof app;
    };
  }
}

export const RUNNING_IN_TAURI = window.__TAURI__ !== undefined || false;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}