import { exists } from '@tauri-apps/api/fs'
import { useEffect, useState } from 'react';

export const useFileExists = (path: string) => {
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const checkFileExist = async () => {
            const fileExist = await exists(path);
            setExist(fileExist);
        };

        checkFileExist();
    }, [path]);

    return exist;
}