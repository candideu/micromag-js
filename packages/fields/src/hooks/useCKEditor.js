import { useState, useEffect } from 'react';

/**
 * Locale loader
 */
let packageCache = null;
const useCKEditor = () => {
    // transport
    const [{ package: loadedPackage }, setLoadedPackage] = useState({
        package: packageCache,
    });
    useEffect(() => {
        let canceled = false;
        if (loadedPackage !== null) {
            return () => {
                canceled = true;
            };
        }
        import('@ckeditor/ckeditor5-react').then(({ CKEditor }) => {
            packageCache = CKEditor;
            if (!canceled) {
                setLoadedPackage({
                    package: CKEditor,
                });
            }
        });
        return () => {
            canceled = true;
        };
    }, [loadedPackage, setLoadedPackage]);
    return loadedPackage;
};

export default useCKEditor;
