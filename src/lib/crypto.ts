import { invoke } from '@tauri-apps/api/tauri'
import { useVariantStore } from '@/hooks/useVariantStore';

export const encryptText = async (text: string) => {
    const { getVariantFromStorage } = useVariantStore.getState()
    const variant = getVariantFromStorage()

    await invoke("cipher_verse", {
        args: [
            'text',
            '-t',
            'encrypt',
            '-i',
            text.toString(),
            '-k',
            variant.key,
            '-c1',
            variant.c1.toString(),
            '-c2',
            variant.c2.toString(),
            '-y1',
            variant.y1.toString(),
            '-y2',
            variant.y2.toString(),
            '-y1_prime',
            variant.y1_prime.toString(),
            '-y2_prime',
            variant.y2_prime.toString(),
        ]
    });
}

export const decryptText = async (text: string, c1_prime: number, c2_prime: number) => {
    const { getVariantFromStorage } = useVariantStore.getState()
    const variant = getVariantFromStorage()

    await invoke("cipher_verse", {
        args: [
            'text',
            '-t',
            'decrypt',
            '-i',
            text.toString(),
            '-y1_prime',
            variant.y1_prime.toString(),
            '-y2_prime',
            variant.y2_prime.toString(),
            '-c1_prime',
            c1_prime.toString(),
            '-c2_prime',
            c2_prime.toString(),
        ]
    });
}