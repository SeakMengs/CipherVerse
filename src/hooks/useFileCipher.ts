import { create } from "zustand";

export enum FileType {
    Image = "image",
    Video = "video",
    Audio = "audio",
    None = "none",
}

type TFileCipher = {
    type: FileType
    setFileType: (type: FileType) => void
    fileEncrypted: {
        plainInputFilePath: string
        cipherOutputFilePath: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    },
    setFileEncrypted: (fileEncrypted: {
        plainInputFilePath: string
        cipherOutputFilePath: string
        c1Prime: number | undefined
        c2Prime: number | undefined
    }) => void,
    fileDecrypted: {
        cipherInputFilePath: string
        plainOutputFilePath: string
    },
    setFileDecrypted: (fileDecrypted: {
        cipherInputFilePath: string
        plainOutputFilePath: string
    }) => void,
    notSameTypeResetState: (type: FileType) => void
}

export const useFileCipher = create<TFileCipher>((set) => {
    return {
        type: FileType.None,
        setFileType(type) { set({ type }) },
        fileEncrypted: {
            plainInputFilePath: "",
            cipherOutputFilePath: "",
            c1Prime: undefined,
            c2Prime: undefined
        },
        setFileEncrypted: (fileEncrypted) => set({ fileEncrypted }),
        fileDecrypted: {
            cipherInputFilePath: "",
            plainOutputFilePath: "",
        },
        setFileDecrypted: (fileDecrypted) => set({ fileDecrypted }),
        // compare current type, if different, reset state
        notSameTypeResetState: (type) => {
            set((state) => {
                if (state.type !== type) {
                    return {
                        type,
                        fileEncrypted: {
                            plainInputFilePath: "",
                            cipherOutputFilePath: "",
                            c1Prime: undefined,
                            c2Prime: undefined
                        },
                        fileDecrypted: {
                            cipherInputFilePath: "",
                            plainOutputFilePath: "",
                        },
                    }
                }
                return state
            })
        }
    }
})