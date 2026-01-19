'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'hi' | 'pa' | 'gu'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Common
    'search': 'Search',
    'cancel': 'Cancel',
    'save': 'Save',
    'delete': 'Delete',
    'edit': 'Edit',
    'add': 'Add',
    'remove': 'Remove',
    'close': 'Close',
    'loading': 'Loading',
    'error': 'Error',
    'success': 'Success',
    
    // Navigation
    'dashboard': 'Dashboard',
    'teachers': 'Teachers',
    'students': 'Students',
    'classes': 'Classes',
    'subjects': 'Subjects',
    'settings': 'Settings',
    
    // Teacher Management
    'add_faculty': 'Add Faculty',
    'faculty_management': 'Faculty Management',
    'search_faculty': 'Search faculty...',
    'department': 'Department',
    'experience': 'Experience',
    'manual_entry': 'Manual Entry',
    'invite_link': 'Invite Link',
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'email_address': 'Email Address',
    'phone_number': 'Phone Number',
    'create_faculty_account': 'Create Faculty Account',
    'remove_faculty_member': 'Remove Faculty Member',
    
    // Settings
    'appearance': 'Appearance',
    'language': 'Language',
    'notifications': 'Notifications',
    'privacy': 'Privacy',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    'system': 'System'
  },
  hi: {
    // Common
    'search': 'खोजें',
    'cancel': 'रद्द करें',
    'save': 'सहेजें',
    'delete': 'हटाएं',
    'edit': 'संपादित करें',
    'add': 'जोड़ें',
    'remove': 'हटाएं',
    'close': 'बंद करें',
    'loading': 'लोड हो रहा है',
    'error': 'त्रुटि',
    'success': 'सफलता',
    
    // Navigation
    'dashboard': 'डैशबोर्ड',
    'teachers': 'शिक्षक',
    'students': 'छात्र',
    'classes': 'कक्षाएं',
    'subjects': 'विषय',
    'settings': 'सेटिंग्स',
    
    // Teacher Management
    'add_faculty': 'फैकल्टी जोड़ें',
    'faculty_management': 'फैकल्टी प्रबंधन',
    'search_faculty': 'फैकल्टी खोजें...',
    'department': 'विभाग',
    'experience': 'अनुभव',
    'manual_entry': 'मैन्युअल एंट्री',
    'invite_link': 'आमंत्रण लिंक',
    'first_name': 'पहला नाम',
    'last_name': 'अंतिम नाम',
    'email_address': 'ईमेल पता',
    'phone_number': 'फोन नंबर',
    'create_faculty_account': 'फैकल्टी खाता बनाएं',
    'remove_faculty_member': 'फैकल्टी सदस्य हटाएं',
    
    // Settings
    'appearance': 'दिखावट',
    'language': 'भाषा',
    'notifications': 'सूचनाएं',
    'privacy': 'गोपनीयता',
    'dark_mode': 'डार्क मोड',
    'light_mode': 'लाइट मोड',
    'system': 'सिस्टम'
  },
  pa: {
    // Common
    'search': 'ਖੋਜੋ',
    'cancel': 'ਰੱਦ ਕਰੋ',
    'save': 'ਸੇਵ ਕਰੋ',
    'delete': 'ਮਿਟਾਓ',
    'edit': 'ਸੰਪਾਦਨ',
    'add': 'ਜੋੜੋ',
    'remove': 'ਹਟਾਓ',
    'close': 'ਬੰਦ ਕਰੋ',
    'loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
    'error': 'ਗਲਤੀ',
    'success': 'ਸਫਲਤਾ',
    
    // Navigation
    'dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'teachers': 'ਅਧਿਆਪਕ',
    'students': 'ਵਿਦਿਆਰਥੀ',
    'classes': 'ਕਲਾਸਾਂ',
    'subjects': 'ਵਿਸ਼ੇ',
    'settings': 'ਸੈਟਿੰਗਜ਼',
    
    // Teacher Management
    'add_faculty': 'ਫੈਕਲਟੀ ਜੋੜੋ',
    'faculty_management': 'ਫੈਕਲਟੀ ਪ੍ਰਬੰਧਨ',
    'search_faculty': 'ਫੈਕਲਟੀ ਖੋਜੋ...',
    'department': 'ਵਿਭਾਗ',
    'experience': 'ਤਜਰਬਾ',
    'manual_entry': 'ਮੈਨੁਅਲ ਐਂਟਰੀ',
    'invite_link': 'ਸੱਦਾ ਲਿੰਕ',
    'first_name': 'ਪਹਿਲਾ ਨਾਮ',
    'last_name': 'ਆਖਰੀ ਨਾਮ',
    'email_address': 'ਈਮੇਲ ਪਤਾ',
    'phone_number': 'ਫੋਨ ਨੰਬਰ',
    'create_faculty_account': 'ਫੈਕਲਟੀ ਖਾਤਾ ਬਣਾਓ',
    'remove_faculty_member': 'ਫੈਕਲਟੀ ਮੈਂਬਰ ਹਟਾਓ',
    
    // Settings
    'appearance': 'ਦਿੱਖ',
    'language': 'ਭਾਸ਼ਾ',
    'notifications': 'ਸੂਚਨਾਵਾਂ',
    'privacy': 'ਗੁਪਤਤਾ',
    'dark_mode': 'ਡਾਰਕ ਮੋਡ',
    'light_mode': 'ਲਾਈਟ ਮੋਡ',
    'system': 'ਸਿਸਟਮ'
  },
  gu: {
    // Common
    'search': 'શોધો',
    'cancel': 'રદ કરો',
    'save': 'સેવ કરો',
    'delete': 'ડિલીટ કરો',
    'edit': 'એડિટ કરો',
    'add': 'ઉમેરો',
    'remove': 'દૂર કરો',
    'close': 'બંધ કરો',
    'loading': 'લોડ થઈ રહ્યું છે',
    'error': 'ભૂલ',
    'success': 'સફળતા',
    
    // Navigation
    'dashboard': 'ડેશબોર્ડ',
    'teachers': 'શિક્ષકો',
    'students': 'વિદ્યાર્થીઓ',
    'classes': 'વર્ગો',
    'subjects': 'વિષયો',
    'settings': 'સેટિંગ્સ',
    
    // Teacher Management
    'add_faculty': 'ફેકલ્ટી ઉમેરો',
    'faculty_management': 'ફેકલ્ટી મેનેજમેન્ટ',
    'search_faculty': 'ફેકલ્ટી શોધો...',
    'department': 'વિભાગ',
    'experience': 'અનુભવ',
    'manual_entry': 'મેન્યુઅલ એન્ટ્રી',
    'invite_link': 'આમંત્રણ લિંક',
    'first_name': 'પ્રથમ નામ',
    'last_name': 'છેલ્લું નામ',
    'email_address': 'ઈમેલ સરનામું',
    'phone_number': 'ફોન નંબર',
    'create_faculty_account': 'ફેકલ્ટી એકાઉન્ટ બનાવો',
    'remove_faculty_member': 'ફેકલ્ટી સભ્ય દૂર કરો',
    
    // Settings
    'appearance': 'દેખાવ',
    'language': 'ભાષા',
    'notifications': 'સૂચનાઓ',
    'privacy': 'ગોપનીયતા',
    'dark_mode': 'ડાર્ક મોડ',
    'light_mode': 'લાઈટ મોડ',
    'system': 'સિસ્ટમ'
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && ['en', 'hi', 'pa', 'gu'].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return (translations[language] as any)[key] || (translations.en as any)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}