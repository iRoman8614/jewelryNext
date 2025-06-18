"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';

const LanguageContext = createContext({
    lang: 'ru',
    setLang: () => {},
});

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('ru');
    useEffect(() => {
        const storedLang = localStorage.getItem('appLang');
        if (storedLang && (storedLang === 'ru' || storedLang === 'en')) {
            setLang(storedLang);
        }
    }, []);
    const handleSetLang = (newLang) => {
        setLang(newLang);
        localStorage.setItem('appLang', newLang);
    };

    const value = {
        lang,
        setLang: handleSetLang,
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}