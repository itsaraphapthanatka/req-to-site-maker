// src/context/LanguageContext.tsx
import { createContext, useContext, useState } from "react";

interface LangContextProps {
    lang: "en" | "th";
    setLang: (value: "en" | "th") => void;
}

const LanguageContext = createContext<LangContextProps>({
    lang: "en",
    setLang: () => { },
});

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState<"en" | "th">("en");

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = () => useContext(LanguageContext);
