import { create } from "zustand";
import { z } from "zod";

export const variantSchema = z.object({
    // coerce auto convert string to number
    c1: z.coerce.number().min(-1).max(1),
    c2: z.coerce.number().min(-1).max(1),
    y1: z.coerce.number().min(-1).max(1),
    y2: z.coerce.number().min(-1).max(1),
    y1_prime: z.coerce.number().min(-1).max(1),
    y2_prime: z.coerce.number().min(-1).max(1),
    key: z.string().length(16, {
        message: "Key must be exactly 16 characters long"
    }),
})

type TVariant = {
    variant: z.infer<typeof variantSchema>
    setVariant: (variant: z.infer<typeof variantSchema>) => void
    getVariantFromStorage: () => z.infer<typeof variantSchema>
}

const getVariantFromStorage = (): z.infer<typeof variantSchema> => {
    return {
        c1: parseFloat(localStorage.getItem("c1") || "0.5"),
        c2: parseFloat(localStorage.getItem("c2") || "0.25"),
        y1: parseFloat(localStorage.getItem("y1") || "0.25"),
        y2: parseFloat(localStorage.getItem("y2") || "0.2"),
        y1_prime: parseFloat(localStorage.getItem("y1_prime") || "0.99"),
        y2_prime: parseFloat(localStorage.getItem("y2_prime") || "0.16"),
        key: localStorage.getItem("key") || "asdbgffdmsestuiu",
    }
}

export const useVariantStore = create<TVariant>((set) => {
    return {
        variant: getVariantFromStorage(),
        setVariant: (variant: z.infer<typeof variantSchema>) => set({ variant }),
        getVariantFromStorage,
    }
})