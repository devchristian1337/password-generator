/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Sun, Moon, History, Palette, Trash2, X, Menu, ChevronDown, Loader2, Eye, EyeOff } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { HexColorPicker } from "react-colorful"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Toaster } from "sonner"
import { Github } from "lucide-react"
import { GB, IT, ES, DE, FR } from 'country-flag-icons/react/3x2'
import Lottie from "lottie-react"
import animationData from "./assets/animation.json"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import ShimmerButton from "@/components/ui/shimmer-button"
import Dock, { DockIcon } from "@/components/ui/dock"

const translations = {
  en: {
    title: "Password Generator",
    generate: "Generate Password",
    length: "Length",
    specialChars: "Special characters",
    numbers: "Numbers",
    uppercase: "Uppercase",
    placeholder: "Your password will appear here",
    history: "Password History",
    emptyHistory: "History is empty.",
    mainColor: "Main Color",
    clearHistory: "Clear History",
    clearHistoryConfirm: "Are you sure you want to clear the password history?",
    clearHistoryDescription: "This action cannot be undone.",
    cancel: "Cancel",
    passwordCopied: "Password copied to clipboard",
    passwordGenerated: "New password generated",
    historyCleared: "Password history cleared",
    passwordDeleted: "Password deleted from history",
    passwordStrength: "Password Strength",
    veryWeak: "Very Weak",
    weak: "Weak",
    moderate: "Moderate",
    strong: "Strong",
    veryStrong: "Very Strong",
    generating: "Generating...",
    customPattern: "Custom pattern",
    patternHelp: "Use: a (lowercase), A (uppercase), 0 (numbers), # (special), * (any)",
    invalidPattern: "Invalid pattern. Only use: a, A, 0, #, *",
    patternTooShort: "Pattern must be at least 8 characters long",
    language: "Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    show: "Show password",
    hide: "Hide password",
  },
  it: {
    title: "Generatore di Password",
    generate: "Genera Password",
    length: "Lunghezza",
    specialChars: "Caratteri speciali",
    numbers: "Numeri",
    uppercase: "Maiuscole",
    placeholder: "La tua password apparirà qui",
    history: "Cronologia Password",
    emptyHistory: "Cronologia vuota.",
    mainColor: "Colore principale",
    clearHistory: "Cancella Cronologia",
    clearHistoryConfirm: "Sei sicuro di voler cancellare la cronologia delle password?",
    clearHistoryDescription: "Questa azione non può essere annullata.",
    cancel: "Annulla",
    passwordCopied: "Password copiata negli appunti",
    passwordGenerated: "Nuova password generata",
    historyCleared: "Cronologia password cancellata",
    passwordDeleted: "Password eliminata dalla cronologia",
    passwordStrength: "Forza della Password",
    veryWeak: "Molto Debole",
    weak: "Debole",
    moderate: "Moderata",
    strong: "Forte",
    veryStrong: "Molto Forte",
    generating: "Generazione...",
    customPattern: "Pattern personalizzato",
    patternHelp: "Usa: a (minuscole), A (maiuscole), 0 (numeri), # (speciali), * (qualsiasi)",
    invalidPattern: "Pattern non valido. Usa solo: a, A, 0, #, *",
    patternTooShort: "Il pattern deve essere lungo almeno 8 caratteri",
    language: "Lingua",
    theme: "Tema",
    darkMode: "Modalità Scura",
    lightMode: "Modalità Chiara",
    show: "Mostra password",
    hide: "Nascondi password",
  },
  es: {
    title: "Generador de Contraseñas",
    generate: "Generar Contraseña",
    length: "Longitud",
    specialChars: "Caracteres especiales",
    numbers: "Números",
    uppercase: "Mayúsculas",
    placeholder: "Tu contraseña aparecerá aquí",
    history: "Historial de Contraseñas",
    emptyHistory: "Historial vacío.",
    mainColor: "Color principal",
    clearHistory: "Limpiar Historial",
    clearHistoryConfirm: "¿Estás seguro de que quieres limpiar el historial de contraseñas?",
    clearHistoryDescription: "Esta acción no se puede deshacer.",
    cancel: "Cancelar",
    passwordCopied: "Contraseña copiada al portapapeles",
    passwordGenerated: "Nueva contraseña generada",
    historyCleared: "Historial de contraseñas borrado",
    passwordDeleted: "Contraseña eliminada del historial",
    passwordStrength: "Fuerza de la Contraseña",
    veryWeak: "Muy Débil",
    weak: "Débil",
    moderate: "Moderada",
    strong: "Fuerte",
    veryStrong: "Muy Fuerte",
    generating: "Generando...",
    customPattern: "Patrón personalizado",
    patternHelp: "Usa: a (minúsculas), A (mayúsculas), 0 (números), # (especiales), * (cualquier)",
    invalidPattern: "Patrón no válido. Use solo: a, A, 0, #, *",
    patternTooShort: "El patrón debe tener al menos 8 caracteres",
    language: "Idioma",
    theme: "Tema",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    show: "Mostrar contraseña",
    hide: "Ocultar contraseña",
  },
  de: {
    title: "Passwort-Generator",
    generate: "Passwort generieren",
    length: "Länge",
    specialChars: "Sonderzeichen",
    numbers: "Zahlen",
    uppercase: "Großbuchstaben",
    placeholder: "Dein Passwort erscheint hier",
    history: "Passwort-Verlauf",
    emptyHistory: "Verlauf ist leer.",
    mainColor: "Hauptfarbe",
    clearHistory: "Historie löschen",
    clearHistoryConfirm: "Sind Sie sicher, dass Sie die Passwort-Historie löschen möchten?",
    clearHistoryDescription: "Diese Aktion kann nicht rückgängig gemacht werden.",
    cancel: "Abbrechen",
    passwordCopied: "Passwort in die Zwischenablage kopiert",
    passwordGenerated: "Neues Passwort generiert",
    historyCleared: "Passwort-Verlauf gelöscht",
    passwordDeleted: "Passwort aus dem Verlauf gelöscht",
    passwordStrength: "Passwort-Stärke",
    veryWeak: "Sehr Schwach",
    weak: "Schwach",
    moderate: "Mäßig",
    strong: "Stark",
    veryStrong: "Sehr Stark",
    generating: "Generieren...",
    customPattern: "Benutzerdefiniertes muster",
    patternHelp: "Verwendung: a (Kleinbuchstaben), A (Großbuchstaben), 0 (Zahlen), # (Sonderzeichen), * (beliebig)",
    invalidPattern: "Ungültiges Muster. Verwenden Sie nur: a, A, 0, #, *",
    patternTooShort: "Das Muster muss mindestens 8 Zeichen lang sein",
    language: "Sprache",
    theme: "Thema",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    show: "Passwort anzeigen",
    hide: "Passwort ausblenden",
  },
  fr: {
    title: "Générateur de Mot de Passe",
    generate: "Générer un Mot de Passe",
    length: "Longueur",
    specialChars: "Caractères spéciaux",
    numbers: "Chiffres",
    uppercase: "Majuscules",
    placeholder: "Votre mot de passe apparaîtra ici",
    history: "Historique des Mots de Passe",
    emptyHistory: "Historique vide.",
    mainColor: "Couleur principale",
    clearHistory: "Vider l'historique",
    clearHistoryConfirm: "Êtes-vous sûr de vouloir vider l'historique des mots de passe?",
    clearHistoryDescription: "Cette action ne peut tre annulée.",
    cancel: "Annuler",
    passwordCopied: "Mot de passe copié dans le presse-papiers",
    passwordGenerated: "Nouveau mot de passe généré",
    historyCleared: "Historique des mots de passe effacé",
    passwordDeleted: "Mot de passe supprimé de l'historique",
    passwordStrength: "Force du Mot de Passe",
    veryWeak: "Très Faible",
    weak: "Faible",
    moderate: "Modéré",
    strong: "Fort",
    veryStrong: "Très Fort",
    generating: "Génération...",
    customPattern: "Motif personnalisé",
    patternHelp: "Utilisation: a (minuscules), A (majuscules), 0 (chiffres), # (caractères spéciaux), * (tout)",
    invalidPattern: "Motif invalide. Utilisez uniquement : a, A, 0, #, *",
    patternTooShort: "Le motif doit contenir au moins 8 caractères",
    language: "Langue",
    theme: "Thème",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    show: "Afficher le mot de passe",
    hide: "Masquer le mot de passe",
  }
} as const

function calculatePasswordStrength(password: string): number {
  if (!password) return 0
  
  let score = 0
  
  // Lunghezza (max 25 punti)
  score += Math.min(25, password.length * 2)
  
  // Varietà di caratteri
  if (/[a-z]/.test(password)) score += 10 // lowercase
  if (/[A-Z]/.test(password)) score += 15 // uppercase
  if (/[0-9]/.test(password)) score += 15 // numeri
  if (/[^a-zA-Z0-9]/.test(password)) score += 20 // caratteri speciali
  
  // Complessità
  const uniqueChars = new Set(password).size
  score += uniqueChars * 2
  
  // Normalizza il punteggio a 100
  return Math.min(100, score)
}

function getStrengthColor(strength: number): { bg: string, text: string } {
  if (strength < 20) return { bg: 'bg-red-500', text: 'text-red-500' }
  if (strength < 40) return { bg: 'bg-orange-500', text: 'text-orange-500' }
  if (strength < 60) return { bg: 'bg-yellow-500', text: 'text-yellow-500' }
  if (strength < 80) return { bg: 'bg-lime-500', text: 'text-lime-500' }
  return { bg: 'bg-green-500', text: 'text-green-500' }
}

// Aggiungi questa funzione all'inizio del file, fuori dal componente
function getBrowserLanguage(): 'en' | 'it' | 'es' | 'de' | 'fr' {
  // Ottiene la lingua del browser
  const browserLang = navigator.language.toLowerCase().split('-')[0]
  
  // Mappa delle lingue supportate
  const supportedLanguages: Record<string, 'en' | 'it' | 'es' | 'de' | 'fr'> = {
    en: 'en',
    it: 'it',
    es: 'es',
    de: 'de',
    fr: 'fr'
  }
  
  // Restituisce la lingua supportata o 'en' come fallback
  return supportedLanguages[browserLang] || 'en'
}

// Aggiungi questa funzione di utilità
const colorizePassword = (password: string, isVisible: boolean) => {
  return password.split('').map((char, index) => {
    let styledChar;
    if (/[0-9]/.test(char)) {
      styledChar = <span className="text-primary">{char}</span>
    } else if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(char)) {
      styledChar = <span style={{ color: '#fc4f66' }}>{char}</span>
    } else {
      styledChar = char;
    }

    return (
      <AnimatedCharacter 
        key={index} 
        char={styledChar} 
        isVisible={isVisible}
      />
    );
  });
}

const generateFromPattern = (pattern: string): string => {
  const charSets = {
    a: 'abcdefghijklmnopqrstuvwxyz',
    A: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    '0': '0123456789',
    '#': '!@#$%^&*()_+-=[]{}|;:,.<>?',
    '*': 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

  return pattern.split('').map(char => {
    const charSet = charSets[char as keyof typeof charSets]
    if (charSet) {
      return charSet[Math.floor(Math.random() * charSet.length)]
    }
    return char
  }).join('')
}

const isValidPattern = (pattern: string): boolean => {
  const validChars = ['a', 'A', '0', '#', '*']
  return pattern.split('').every(char => validChars.includes(char))
}

// Aggiungi queste varianti di animazione
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95,
    rotateX: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 12,
      duration: 0.6
    }
  }
}

const passwordDisplayVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0.2)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
}

// Aggiungi queste varianti di animazione
const optionsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
}

const optionItemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15
    }
  }
}

const sliderVariants = {
  hidden: { 
    opacity: 0,
    x: -50
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
}

const copyButtonVariants = {
  initial: { 
    scale: 1,
    opacity: 0.7
  },
  hover: { 
    scale: 1.05,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  },
  success: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
}

// Modifica il componente AnimatedCharacter per un'animazione più futuristica
const AnimatedCharacter = ({ char, isVisible }: { char: string | JSX.Element, isVisible: boolean }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-block relative"
    >
      <motion.span
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: { duration: 0.15 }
        }}
        className="inline-block"
      >
        {char}
      </motion.span>
      <motion.span
        initial={false}
        animate={{
          opacity: isVisible ? 0 : 1,
          scale: isVisible ? 0.8 : 1,
          transition: { duration: 0.15 }
        }}
        className="absolute left-0 text-primary"
      >
        •
      </motion.span>
    </motion.span>
  )
}

// Aggiungi questo nuovo tipo all'inizio del file
type PasswordVisibility = {
  [password: string]: boolean;
};

function getStrengthText(strength: number, t: typeof translations['en']) {
  if (strength < 20) return t.veryWeak
  if (strength < 40) return t.weak
  if (strength < 60) return t.moderate
  if (strength < 80) return t.strong
  return t.veryStrong
}

// Modifica queste varianti di animazione
const strengthVariants = {
  initial: { 
    scale: 0.95,
    opacity: 0 
  },
  animate: (isInitialLoad: boolean) => ({ 
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      delay: isInitialLoad ? 1.1 : 0
    }
  }),
  exit: { 
    scale: 0.95,
    opacity: 0 
  }
}

// Aggiungi questa funzione di utilità per ottenere il livello di forza
function getStrengthLevel(strength: number): number {
  if (strength < 20) return 1 // very weak
  if (strength < 40) return 2 // weak
  if (strength < 60) return 3 // moderate
  if (strength < 80) return 4 // strong
  return 5 // very strong
}

// Modifica queste varianti di animazione per l'icona del tema
const themeIconVariants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
    y: 10
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: -10,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [useSpecialChars, setUseSpecialChars] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [copiedHistoryIndex, setCopiedHistoryIndex] = useState<number | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check localStorage for saved theme, default to 'light' if not found
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  })
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])
  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    // Check localStorage for saved color, default to "#18181b" if not found
    return localStorage.getItem('primaryColor') || "#18181b"
  })
  const [language, setLanguage] = useState<'en' | 'it' | 'es' | 'de' | 'fr'>(() => {
    // Controlla prima il localStorage per mantenere la preferenza dell'utente
    const savedLang = localStorage.getItem('preferredLanguage') as 'en' | 'it' | 'es' | 'de' | 'fr'
    if (savedLang) return savedLang
    
    // Altrimenti usa la lingua del browser
    return getBrowserLanguage()
  })
  const t = translations[language]

  const isFirstLoad = useRef(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [scrambledText, setScrambledText] = useState<(string | JSX.Element)[]>([])

  // Modifica la gestione di isInitialLoad
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Aggiungi questi nuovi stati
  const [useCustomPattern, setUseCustomPattern] = useState(false)
  const [customPattern, setCustomPattern] = useState('aA00##**')

  // Aggiungi questo state per gestire le sezioni aperte
  const [openSection, setOpenSection] = useState<string | null>(null)

  // Aggiungi questo state per mascherare la password
  const [isPasswordVisible, setIsPasswordVisible] = useState(true)

  // Aggiungi questo state per gestire la visibilità delle singole password nella cronologia
  const [historyPasswordsVisibility, setHistoryPasswordsVisibility] = useState<PasswordVisibility>({})

  // Aggiungi questo stato per tracciare quale password è in hover
  const [hoveredPasswordIndex, setHoveredPasswordIndex] = useState<number | null>(null);

  // Aggiungi questa funzione per gestire la visibilità delle singole password nella cronologia
  const toggleHistoryPasswordVisibility = (password: string) => {
    setHistoryPasswordsVisibility(prev => ({
      ...prev,
      [password]: !prev[password]
    }));
  };

  // Aggiungi questo effect per salvare la preferenza dell'utente
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  // Add this effect to save the primary color
  useEffect(() => {
    localStorage.setItem('primaryColor', primaryColor)
  }, [primaryColor])

  const generateScrambledText = (finalPassword: string, currentIndex: number): (string | JSX.Element)[] => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let text = ''
    
    for (let i = 0; i < finalPassword.length; i++) {
      if (i < currentIndex) {
        text += finalPassword[i]
      } else {
        text += chars.charAt(Math.floor(Math.random() * chars.length))
      }
    }
    
    return colorizePassword(text, isPasswordVisible)
  }

  // Modifica l'effect del caricamento iniziale
  useEffect(() => {
    if (isFirstLoad.current) {
      const chars = 'abcdefghijklmnopqrstuvwxyz'
        + (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
        + (useNumbers ? '0123456789' : '')
        + (useSpecialChars ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '')

      let newPassword = ''
      for (let i = 0; i < length; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      setPassword(newPassword)
      setPasswordHistory([newPassword])
      // Inizializza la visibilità usando la password come chiave
      setHistoryPasswordsVisibility({ [newPassword]: true })
      
      setTimeout(() => {
        setIsInitialLoad(false)
      }, 1500)
      
      isFirstLoad.current = false
    }
  }, [length, useNumbers, useSpecialChars, useUppercase])

  // Modifica l'effect per le opzioni
  useEffect(() => {
    if (!isFirstLoad.current && !isInitialLoad) {
      setIsGenerating(true)
      
      const chars = 'abcdefghijklmnopqrstuvwxyz'
        + (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
        + (useNumbers ? '0123456789' : '')
        + (useSpecialChars ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '')

      let newPassword = ''
      for (let i = 0; i < length; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
      }

      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= newPassword.length) {
          setScrambledText(generateScrambledText(newPassword, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsGenerating(false)
          setPassword(newPassword)
          setPasswordHistory(prev => {
            const newHistory = [newPassword, ...prev].slice(0, 5)
            
            setHistoryPasswordsVisibility(prevVisibility => ({
              ...prevVisibility,
              [newPassword]: true, // Usa la password come chiave
            }))
            
            return newHistory
          })
          toast.success(t.passwordGenerated)
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [length, useNumbers, useSpecialChars, useUppercase])

  const handlePatternChange = (value: string) => {
    if (value === '' || isValidPattern(value)) {
      setCustomPattern(value)
    } else {
      toast.error(t.invalidPattern)
    }
  }

  const copyToClipboard = useCallback(() => {
    if (password && !isGenerating) {
      navigator.clipboard.writeText(password)
      setIsCopied(true)
      toast.success(t.passwordCopied)
      setTimeout(() => setIsCopied(false), 1000)
    }
  }, [password, isGenerating, t.passwordCopied])

  // Modifica la funzione generatePassword
  const generatePassword = useCallback(() => {
    if (useCustomPattern) {
      if (!isValidPattern(customPattern)) {
        toast.error(t.invalidPattern)
        return
      }
      if (customPattern.length < 8) {
        toast.error(t.patternTooShort)
        return
      }
      if (customPattern.length === 0) {
        toast.error(t.invalidPattern)
        return
      }
    }

    setIsGenerating(true)
    
    let newPassword: string
    
    if (useCustomPattern) {
      newPassword = generateFromPattern(customPattern)
    } else {
      const chars = 'abcdefghijklmnopqrstuvwxyz'
        + (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
        + (useNumbers ? '0123456789' : '')
        + (useSpecialChars ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '')

      newPassword = Array(length).fill(0)
        .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
        .join('')
    }

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= newPassword.length) {
        setScrambledText(generateScrambledText(newPassword, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        setPassword(newPassword)
        setPasswordHistory(prev => {
          const newHistory = [newPassword, ...prev].slice(0, 5)
          
          setHistoryPasswordsVisibility(prevVisibility => ({
            ...prevVisibility,
            [newPassword]: true, // Usa la password come chiave
          }))
          
          return newHistory
        })
        toast.success(t.passwordGenerated)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [length, useSpecialChars, useNumbers, useUppercase, useCustomPattern, customPattern])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.querySelector(':root')?.classList.toggle('dark')
  }

  // Initialize theme on first load
  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement
    if (theme === 'dark') {
      root?.classList.add('dark')
    } else {
      root?.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const root = document.querySelector(':root') as HTMLElement
    const hsl = hexToHSL(primaryColor)
    
    if (theme === 'light') {
      root?.style.setProperty('--primary', `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root?.style.setProperty('--primary-foreground', 
        hsl.l > 60 ? '240 5.9% 10%' : '0 0% 98%'
      )
      root?.style.setProperty('--muted', `${hsl.h} ${Math.max(5, hsl.s * 0.2)}% 96%`)
      root?.style.setProperty('--muted-foreground', `${hsl.h} ${Math.min(30, hsl.s)}% 30%`)
      root?.style.setProperty('--border', `${hsl.h} ${Math.max(10, hsl.s * 0.3)}% 90%`)
    } else {
      const darkL = Math.max(45, Math.min(hsl.l * 0.95, 85))
      const darkS = Math.min(hsl.s * 1.2, 100)
      root?.style.setProperty('--primary', `${hsl.h} ${darkS}% ${darkL}%`)
      root?.style.setProperty('--primary-foreground',
        darkL > 65 ? '240 5.9% 10%' : '0 0% 98%'
      )
      root?.style.setProperty('--muted', `${hsl.h} ${Math.max(8, darkS * 0.2)}% 15%`)
      root?.style.setProperty('--muted-foreground', `${hsl.h} ${Math.min(25, darkS)}% 95%`)
      root?.style.setProperty('--border', `${hsl.h} ${Math.max(15, darkS * 0.25)}% 30%`)
    }
  }, [primaryColor, theme])

  const hexToHSL = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h: number, s: number
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h! /= 6
    }

    return {
      h: Math.round(h! * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // Modifica la funzione deletePassword
  const deletePassword = (index: number) => {
    setPasswordHistory(prev => {
      const newHistory = prev.filter((_, i) => i !== index)
      return newHistory
    })
    
    setHistoryPasswordsVisibility(prev => {
      const newVisibility: PasswordVisibility = {}
      for (let i = 0; i < 5; i++) {
        if (i < index) {
          newVisibility[i] = prev[i]
        } else {
          newVisibility[i] = prev[i + 1]
        }
      }
      return newVisibility
    })
    
    toast.success(t.passwordDeleted)
  }

  const clearHistory = () => {
    setPasswordHistory([])
    setHistoryPasswordsVisibility({}) // Reset della visibilità quando la cronologia viene svuotata
    toast.success(t.historyCleared)
  }

  const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }

  return (
    <div className="min-h-screen bg-background relative pb-16" data-color={primaryColor}>
      <motion.div 
        className="absolute top-4 right-4 flex gap-2 z-50 bg-background/80 backdrop-blur-sm p-2 rounded-lg"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut"
        }}
      >
        {/* Sostituisci i bottoni con il Dock */}
        <div className="hidden md:block">
          <Dock className="!mt-0">
            <DockIcon>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Languages className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  side="bottom" 
                  align="start" 
                  className="mt-4 isolate pointer-events-auto"
                  style={{ pointerEvents: 'auto' }}
                >
                  {[
                    { code: 'en', label: 'English', icon: GB },
                    { code: 'it', label: 'Italiano', icon: IT },
                    { code: 'es', label: 'Español', icon: ES },
                    { code: 'de', label: 'Deutsch', icon: DE },
                    { code: 'fr', label: 'Français', icon: FR },
                  ].map(({ code, label, icon: Icon }) => (
                    <DropdownMenuItem 
                      key={code}
                      onClick={() => setLanguage(code as typeof language)}
                      className="cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </div>
                      {language === code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                          }}
                        >
                          <Check className="w-4 h-4" />
                        </motion.div>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </DockIcon>

            <DockIcon>
              <Popover>
                <PopoverTrigger asChild>
                  <Palette className="h-5 w-5 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent 
                  side="bottom" 
                  align="start" 
                  className="mt-4 w-auto p-3 isolate"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-foreground mb-2">{t.mainColor}</h3>
                    <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
                  </div>
                </PopoverContent>
              </Popover>
            </DockIcon>

            <DockIcon>
              <Popover>
                <PopoverTrigger asChild>
                  <History className="h-5 w-5 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent 
                  side="bottom" 
                  align="start" 
                  className="mt-4 w-80 p-2 pointer-events-auto"
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm text-foreground">Cronologia Password</h3>
                      {passwordHistory.length > 0 && (
                        <motion.div {...hoverScale}>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t.clearHistoryConfirm}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t.clearHistoryDescription}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                                <AlertDialogAction onClick={clearHistory}>
                                  {t.clearHistory}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </motion.div>
                      )}
                    </div>
                    {passwordHistory.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Cronologia vuota.
                      </p>
                    ) : (
                      passwordHistory.map((pwd, index) => (
                        <div 
                          key={index}
                          className="relative flex items-center bg-muted rounded-lg p-2 group min-h-[40px]"
                          onMouseEnter={() => setHoveredPasswordIndex(index)}
                          onMouseLeave={() => setHoveredPasswordIndex(null)}
                        >
                          <div className="flex-1 font-mono text-sm text-foreground truncate pr-24">
                            {colorizePassword(pwd, historyPasswordsVisibility[pwd] ?? true)}
                          </div>
                          <div className="absolute right-2 flex items-center gap-1">
                            <motion.button
                              className="p-2 rounded-md hover:bg-muted-foreground/10"
                              variants={copyButtonVariants}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              onClick={() => toggleHistoryPasswordVisibility(pwd)}
                            >
                              {(historyPasswordsVisibility[pwd] ?? true) ? (
                                <motion.div
                                  key="eye"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Eye className="h-4 w-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="eye-off"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <EyeOff className="h-4 w-4" />
                                </motion.div>
                              )}
                            </motion.button>
                            <motion.button
                              className="p-2 rounded-md hover:bg-muted-foreground/10"
                              variants={copyButtonVariants}
                              initial="initial"
                              whileHover="hover"
                              whileTap="tap"
                              animate={copiedHistoryIndex === index ? "success" : "initial"}
                              onClick={() => {
                                navigator.clipboard.writeText(pwd)
                                setCopiedHistoryIndex(index)
                                toast.success(t.passwordCopied)
                                setTimeout(() => setCopiedHistoryIndex(null), 1000)
                              }}
                            >
                              <AnimatePresence mode="wait">
                                {copiedHistoryIndex === index ? (
                                  <motion.div
                                    key="check"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Check className="h-4 w-4" />
                                  </motion.div>
                                ) : (
                                  <motion.div
                                    key="copy"
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.button>
                            <AnimatePresence>
                              {hoveredPasswordIndex === index && (
                                <motion.div
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ 
                                    width: "32px",
                                    opacity: 1,
                                    transition: {
                                      width: {
                                        duration: 0.2,
                                        ease: "easeOut"
                                      },
                                      opacity: {
                                        duration: 0.1,
                                        delay: 0.1
                                      }
                                    }
                                  }}
                                  exit={{ 
                                    width: 0,
                                    opacity: 0,
                                    transition: {
                                      width: {
                                        duration: 0.2,
                                        ease: "easeIn"
                                      },
                                      opacity: {
                                        duration: 0.1
                                      }
                                    }
                                  }}
                                >
                                  <button
                                    onClick={() => deletePassword(index)}
                                    className="p-2 rounded-md hover:bg-muted-foreground/10"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </DockIcon>

            <DockIcon onClick={toggleTheme}>
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.div
                    key="moon"
                    variants={themeIconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    variants={themeIconVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </DockIcon>
          </Dock>
        </div>

        {/* Mantieni il menu hamburger per mobile */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <motion.div {...hoverScale}>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
              <motion.div 
                className="space-y-4 py-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Sezione Lingua */}
                <motion.div className="border-b border-border">
                  <motion.button
                    className="flex items-center justify-between w-full py-4 cursor-pointer"
                    onClick={() => setOpenSection(openSection === 'language' ? null : 'language')}
                  >
                    <div className="flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      <h4 className="font-medium">{t.language}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openSection === 'language' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {openSection === 'language' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-2 pb-4">
                          {[
                            { code: 'en', label: 'English', icon: GB },
                            { code: 'it', label: 'Italiano', icon: IT },
                            { code: 'es', label: 'Español', icon: ES },
                            { code: 'de', label: 'Deutsch', icon: DE },
                            { code: 'fr', label: 'Français', icon: FR },
                          ].map(({ code, label, icon: Icon }) => (
                            <Button
                              key={code}
                              variant={language === code ? "default" : "outline"}
                              className="w-full justify-between gap-2 h-9 hover:cursor-pointer [&>*]:hover:cursor-pointer"
                              onClick={() => {
                                setLanguage(code as typeof language)
                                setOpenSection(null)
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                <span>{label}</span>
                              </div>
                              {language === code && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20
                                  }}
                                >
                                  <Check className="w-4 h-4" />
                                </motion.div>
                              )}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Sezione Tema */}
                <motion.div className="border-b border-border">
                  <motion.button
                    className="flex items-center justify-between w-full py-4"
                    onClick={() => setOpenSection(openSection === 'theme' ? null : 'theme')}
                  >
                    <div className="flex items-center gap-2">
                      {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      <h4 className="font-medium">{t.theme}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openSection === 'theme' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {openSection === 'theme' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          <Button
                            variant="outline"
                            className="w-full justify-between h-9"
                            onClick={() => {
                              toggleTheme()
                              setOpenSection(null)
                            }}
                          >
                            <span>{theme === 'light' ? t.darkMode : t.lightMode}</span>
                            <AnimatePresence mode="wait">
                              {theme === 'light' ? (
                                <motion.div
                                  key="moon"
                                  variants={themeIconVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                >
                                  <Moon className="h-4 w-4" />
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="sun"
                                  variants={themeIconVariants}
                                  initial="initial"
                                  animate="animate"
                                  exit="exit"
                                >
                                  <Sun className="h-4 w-4" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Sezione Colore */}
                <motion.div className="border-b border-border">
                  <motion.button
                    className="flex items-center justify-between w-full py-4"
                    onClick={() => setOpenSection(openSection === 'color' ? null : 'color')}
                  >
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      <h4 className="font-medium">{t.mainColor}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openSection === 'color' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {openSection === 'color' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          <div className="p-3 border rounded-lg bg-background">
                            <HexColorPicker 
                              color={primaryColor} 
                              onChange={setPrimaryColor}
                              style={{ width: '100%' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Sezione Cronologia */}
                <motion.div className="border-b border-border">
                  <motion.button
                    className="flex items-center justify-between w-full py-4"
                    onClick={() => setOpenSection(openSection === 'history' ? null : 'history')}
                  >
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4" />
                      <h4 className="font-medium">{t.history}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openSection === 'history' ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {openSection === 'history' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 pb-4">
                          {passwordHistory.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-2">
                              {t.emptyHistory}
                            </p>
                          ) : (
                            <>
                              {passwordHistory.map((pwd, index) => (
                                <div 
                                  key={index}
                                  className="relative flex items-center bg-muted rounded-lg p-2 group min-h-[40px]"
                                  onMouseEnter={() => setHoveredPasswordIndex(index)}
                                  onMouseLeave={() => setHoveredPasswordIndex(null)}
                                >
                                  <div className="flex-1 font-mono text-sm truncate pr-24">
                                    {colorizePassword(pwd, historyPasswordsVisibility[pwd] ?? true)}
                                  </div>
                                  <div className="absolute right-2 flex items-center gap-1">
                                    <motion.button
                                      className="p-2 rounded-md hover:bg-muted-foreground/10"
                                      variants={copyButtonVariants}
                                      initial="initial"
                                      whileHover="hover"
                                      whileTap="tap"
                                      onClick={() => toggleHistoryPasswordVisibility(pwd)}
                                    >
                                      {(historyPasswordsVisibility[pwd] ?? true) ? (
                                        <motion.div
                                          key="eye"
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -5 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <Eye className="h-4 w-4" />
                                        </motion.div>
                                      ) : (
                                        <motion.div
                                          key="eye-off"
                                          initial={{ opacity: 0, y: 5 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -5 }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <EyeOff className="h-4 w-4" />
                                        </motion.div>
                                      )}
                                    </motion.button>
                                    <motion.button
                                      className="p-2 rounded-md hover:bg-muted-foreground/10"
                                      variants={copyButtonVariants}
                                      initial="initial"
                                      whileHover="hover"
                                      whileTap="tap"
                                      animate={copiedHistoryIndex === index ? "success" : "initial"}
                                      onClick={() => {
                                        navigator.clipboard.writeText(pwd)
                                        setCopiedHistoryIndex(index)
                                        toast.success(t.passwordCopied)
                                        setTimeout(() => setCopiedHistoryIndex(null), 1000)
                                      }}
                                    >
                                      <AnimatePresence mode="wait">
                                        {copiedHistoryIndex === index ? (
                                          <motion.div
                                            key="check"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <Check className="h-4 w-4" />
                                          </motion.div>
                                        ) : (
                                          <motion.div
                                            key="copy"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                          >
                                            <Copy className="h-4 w-4" />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </motion.button>
                                    <AnimatePresence>
                                      {hoveredPasswordIndex === index && (
                                        <motion.div
                                          initial={{ width: 0, opacity: 0 }}
                                          animate={{ 
                                            width: "32px",
                                            opacity: 1,
                                            transition: {
                                              width: {
                                                duration: 0.2,
                                                ease: "easeOut"
                                              },
                                              opacity: {
                                                duration: 0.1,
                                                delay: 0.1
                                              }
                                            }
                                          }}
                                          exit={{ 
                                            width: 0,
                                            opacity: 0,
                                            transition: {
                                              width: {
                                                duration: 0.2,
                                                ease: "easeIn"
                                              },
                                              opacity: {
                                                duration: 0.1
                                              }
                                            }
                                          }}
                                        >
                                          <button
                                            onClick={() => deletePassword(index)}
                                            className="p-2 rounded-md hover:bg-muted-foreground/10"
                                          >
                                            <X className="h-4 w-4" />
                                          </button>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              ))}
                              {passwordHistory.length > 0 && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-full"
                                    >
                                      {t.clearHistory}
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>{t.clearHistoryConfirm}</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        {t.clearHistoryDescription}
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => {
                                          clearHistory()
                                          setOpenSection(null)
                                        }}
                                      >
                                        {t.clearHistory}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      <motion.div 
        className="flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-4rem)] p-4 gap-8 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="w-full max-w-[400px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ 
            opacity: 1, 
            x: 0,
            transition: {
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.1
            }
          }}
        >
          <Lottie 
            animationData={animationData}
            loop={true}
            className="w-full h-full"
          />
        </motion.div>

        <motion.div
          className="w-full max-w-md order-2 md:order-2"
          variants={cardVariants}
        >
          <Card>
            <CardHeader>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <CardTitle className="text-center">{t.title}</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Display with Copy Button */}
              <motion.div 
                className="relative flex items-center bg-muted rounded-lg p-4 group min-h-[60px] overflow-hidden"
                variants={passwordDisplayVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="flex-1 text-center font-mono text-xl pr-24 relative w-full"
                  animate={{
                    scale: isGenerating ? [1, 1.02, 1] : 1,
                    transition: {
                      duration: 0.5,
                      repeat: isGenerating ? Infinity : 0
                    }
                  }}
                >
                  <div className="relative select-none cursor-default w-full">
                    <div className="whitespace-nowrap overflow-x-auto scrollbar-hide text-foreground min-h-[28px] flex items-center justify-center max-w-full">
                      {isGenerating 
                        ? scrambledText 
                        : (password 
                            ? colorizePassword(password, isPasswordVisible)
                            : t.placeholder
                          )
                      }
                    </div>
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-muted to-transparent pointer-events-none" />
                  </div>
                </motion.div>

                {/* Buttons container con sfondo fisso */}
                <div className="absolute right-2 flex items-center gap-1 z-10 bg-muted">
                  {password && !isGenerating && (
                    <motion.button
                      className="p-2 rounded-md"
                      variants={copyButtonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      title={isPasswordVisible ? t.hide : t.show}
                    >
                      <AnimatePresence mode="wait">
                        {isPasswordVisible ? (
                          <motion.div
                            key="eye"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Eye className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="eye-off"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <EyeOff className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  )}

                  <motion.button
                    className="p-2 rounded-md"
                    variants={copyButtonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    animate={isCopied ? "success" : "initial"}
                    onClick={copyToClipboard}
                    disabled={isGenerating || !password}
                  >
                    <AnimatePresence mode="wait">
                      {isCopied ? (
                        <motion.div
                          key="check"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.div>

              {/* Strength Indicator */}
              <motion.div className="space-y-1">
                <motion.div 
                  className="h-2 bg-muted rounded-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  <motion.div
                    className={`h-full ${getStrengthColor(calculatePasswordStrength(password)).bg}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${calculatePasswordStrength(password)}%` }}
                  />
                </motion.div>
                
                {/* Strength Text con AnimatePresence */}
                <AnimatePresence mode="wait">
                  {password && (
                    <motion.p 
                      key={getStrengthLevel(calculatePasswordStrength(password))}
                      variants={strengthVariants}
                      initial="initial"
                      animate="animate"
                      custom={isInitialLoad}
                      exit="exit"
                      className={`text-center text-sm ${getStrengthColor(calculatePasswordStrength(password)).text}`}
                    >
                      {getStrengthText(calculatePasswordStrength(password), t as typeof translations['en'])}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Options */}
              <motion.div 
                className="space-y-4"
                variants={optionsContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Length Slider */}
                <motion.div 
                  className="space-y-2"
                  variants={sliderVariants}
                >
                  <div className="flex items-center justify-between">
                    <Label>{t.length}</Label>
                    <span className="text-sm text-muted-foreground">{length}</span>
                  </div>
                  <div className={`${useCustomPattern ? "opacity-50 cursor-default" : ""}`}>
                    <Slider
                      value={[length]}
                      onValueChange={([value]) => setLength(value)}
                      min={8}
                      max={32}
                      step={1}
                      className={`${useCustomPattern ? "cursor-default" : "cursor-pointer"} [&_[role=slider]]:h-4 [&_[role=slider]]:w-4`}
                      disabled={useCustomPattern}
                    />
                  </div>
                </motion.div>

                {/* Toggle Options */}
                <motion.div 
                  className="space-y-3"
                  variants={optionsContainerVariants}
                >
                  {/* Uppercase */}
                  <motion.div 
                    className={`flex items-center justify-between ${useCustomPattern ? "cursor-default" : ""}`}
                    variants={optionItemVariants}
                  >
                    <Label className={useCustomPattern ? "cursor-default" : "cursor-pointer"}>{t.uppercase}</Label>
                    <Switch
                      checked={useUppercase}
                      onCheckedChange={setUseUppercase}
                      disabled={useCustomPattern}
                      className={useCustomPattern ? "!cursor-default" : "!cursor-pointer"}
                    />
                  </motion.div>

                  {/* Numbers */}
                  <motion.div 
                    className={`flex items-center justify-between ${useCustomPattern ? "cursor-default" : ""}`}
                    variants={optionItemVariants}
                  >
                    <Label className={useCustomPattern ? "cursor-default" : "cursor-pointer"}>{t.numbers}</Label>
                    <Switch
                      checked={useNumbers}
                      onCheckedChange={setUseNumbers}
                      disabled={useCustomPattern}
                      className={useCustomPattern ? "!cursor-default" : "!cursor-pointer"}
                    />
                  </motion.div>

                  {/* Special Characters */}
                  <motion.div 
                    className={`flex items-center justify-between ${useCustomPattern ? "cursor-default" : ""}`}
                    variants={optionItemVariants}
                  >
                    <Label className={useCustomPattern ? "cursor-default" : "cursor-pointer"}>{t.specialChars}</Label>
                    <Switch
                      checked={useSpecialChars}
                      onCheckedChange={setUseSpecialChars}
                      disabled={useCustomPattern}
                      className={useCustomPattern ? "!cursor-default" : "!cursor-pointer"}
                    />
                  </motion.div>

                  {/* Custom Pattern Option */}
                  <motion.div 
                    className="flex items-center justify-between"
                    variants={optionItemVariants}
                  >
                    <Label className="cursor-pointer">{t.customPattern}</Label>
                    <Switch
                      checked={useCustomPattern}
                      onCheckedChange={setUseCustomPattern}
                      className="!cursor-pointer"
                    />
                  </motion.div>
                </motion.div>

                {/* Custom Pattern Input (conditionally rendered) */}
                <AnimatePresence>
                  {useCustomPattern && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 overflow-hidden"
                    >
                      <input
                        type="text"
                        value={customPattern}
                        onChange={(e) => handlePatternChange(e.target.value)}
                        className="w-full p-2 bg-muted rounded-md font-mono"
                        placeholder="aA0#*"
                      />
                      <p className="text-xs text-muted-foreground">
                        {t.patternHelp}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Generate Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }
                }}
              >
                <ShimmerButton
                  onClick={generatePassword}
                  disabled={isGenerating}
                  className="w-full font-medium"
                  background="hsl(var(--primary))"
                  shimmerColor="hsl(var(--primary-foreground))"
                  borderRadius="0.5rem"
                >
                  <motion.div className="flex items-center justify-center gap-2">
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t.generating}</span>
                      </>
                    ) : (
                      <span>{t.generate}</span>
                    )}
                  </motion.div>
                </ShimmerButton>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm py-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          delay: 0.2,
          ease: "easeOut"
        }}
      >
        <span>Made by devchristian1337</span>
        <motion.a
          href="https://github.com/devchristian1337"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="h-4 w-4" />
        </motion.a>
      </motion.div>

      <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default App

