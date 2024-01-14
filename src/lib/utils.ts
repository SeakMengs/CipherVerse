import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const RUNNING_IN_TAURI = window.__TAURI__ !== undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}