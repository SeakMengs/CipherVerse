import { create } from "zustand";

type TTextCipher = {
    textEncrypted: {
        plainText: string
        cipherText: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    },
    setTextEncrypted: (textEncrypted: {
        plainText: string
        cipherText: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    }) => void,
    textDecrypted: {
        plainText: string
        cipherText: string
    },
    setTextDecrypted: (textDecrypted: {
        plainText: string
        cipherText: string
    }) => void,
}

export const useTextCipher = create<TTextCipher>((set) => {
    return {
        textEncrypted: {
            plainText: "",
            cipherText: "",
            c1Prime: undefined,
            c2Prime: undefined,
        },
        setTextEncrypted: (textEncrypted: {
            plainText: string
            cipherText: string
            c1Prime: number | undefined
            c2Prime: number | undefined
        }) => set({ textEncrypted }),
        textDecrypted: {
            plainText: "",
            cipherText: "",
        },
        setTextDecrypted: (textDecrypted: {
            plainText: string
            cipherText: string
        }) => set({ textDecrypted }),
    }
})