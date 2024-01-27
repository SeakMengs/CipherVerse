import { create } from "zustand";

type TFileCipher = {
    fileEncrypted: {
        plainInputFilePath: string
        cipherOutputFolderPath: string
        cipherOutputFileName: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    },
    setFileEncrypted: (fileEncrypted: {
        plainInputFilePath: string
        cipherOutputFolderPath: string
        cipherOutputFileName: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    }) => void,
    fileDecrypted: {
        cipherInputFilePath: string
        plainOutputFolderPath: string
        plainOutputFileName: string
    },
    setFileDecrypted: (fileDecrypted: {
        cipherInputFilePath: string
        plainOutputFolderPath: string
        plainOutputFileName: string
    }) => void,
}

export const useTextCipher = create<TFileCipher>((set) => {
    return {
        fileEncrypted: {
            plainInputFilePath: "",
            cipherOutputFolderPath: "",
            cipherOutputFileName: "",
            c1Prime: undefined,
            c2Prime: undefined
        },
        setFileEncrypted: (fileEncrypted) => set({ fileEncrypted }),
        fileDecrypted: {
            cipherInputFilePath: "",
            plainOutputFolderPath: "",
            plainOutputFileName: "",
        },
        setFileDecrypted: (fileDecrypted) => set({ fileDecrypted }),
    }
})