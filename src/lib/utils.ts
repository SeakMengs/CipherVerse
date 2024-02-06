import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// its type definition may like this
import type * as app from '@tauri-apps/api/app';
import { CryptoFormType } from "@/types/form";

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

export function isSideCarReady(payload: any, type: CryptoFormType): {
  sideCarReady: boolean,
  stdout: string
} {
  const splitPayload = payload.split('-splitter');

  if (splitPayload[0] === type) {
    return {
      sideCarReady: true,
      stdout: splitPayload[1]
    }
  }

  return {
    sideCarReady: false,
    stdout: ''
  }
}

export function separateFolderAndFile(path: string): {
  folderPath: string,
  fileName: string
} {
  // example "C:\\Users\\user\\Desktop\\test.mp4"
  const splitPath = path.split('\\');
  const fileName = splitPath[splitPath.length - 1];
  const folderPath = path.replace(fileName, '');

  return {
    folderPath,
    fileName
  }
}