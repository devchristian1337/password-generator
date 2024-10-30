import { useState, useEffect, useCallback, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Sun, Moon, History, Palette, Trash2, X } from "lucide-react"
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

const translations = {
  en: {
    title: "Password Generator",
    generate: "Generate Password",
    length: "Length",
    specialChars: "Special Characters",
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
  },
  it: {
    title: "Generatore di Password",
    generate: "Genera Password",
    length: "Lunghezza",
    specialChars: "Caratteri Speciali",
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
  },
  es: {
    title: "Generador de Contraseñas",
    generate: "Generar Contraseña",
    length: "Longitud",
    specialChars: "Caracteres Especiales",
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
  },
  fr: {
    title: "Générateur de Mot de Passe",
    generate: "Générer un Mot de Passe",
    length: "Longueur",
    specialChars: "Caractères Spéciaux",
    numbers: "Chiffres",
    uppercase: "Majuscules",
    placeholder: "Votre mot de passe apparaîtra ici",
    history: "Historique des Mots de Passe",
    emptyHistory: "Historique vide.",
    mainColor: "Couleur principale",
    clearHistory: "Vider l'historique",
    clearHistoryConfirm: "Êtes-vous sûr de vouloir vider l'historique des mots de passe?",
    clearHistoryDescription: "Cette action ne peut être annulée.",
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

type TranslationType = typeof translations[keyof typeof translations]

function getStrengthLabel(strength: number, t: TranslationType) {
  if (strength < 20) return t.veryWeak
  if (strength < 40) return t.weak
  if (strength < 60) return t.moderate
  if (strength < 80) return t.strong
  return t.veryStrong
}

function getStrengthColor(strength: number) {
  if (strength < 20) return 'bg-red-500'
  if (strength < 40) return 'bg-orange-500'
  if (strength < 60) return 'bg-yellow-500'
  if (strength < 80) return 'bg-lime-500'
  return 'bg-green-500'
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

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(12)
  const [useSpecialChars, setUseSpecialChars] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [copiedHistoryIndex, setCopiedHistoryIndex] = useState<number | null>(null)
  const [theme, setTheme] = useState('light')
  const [passwordHistory, setPasswordHistory] = useState<string[]>([])
  const [primaryColor, setPrimaryColor] = useState("#18181b")
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
  const [scrambledText, setScrambledText] = useState('')

  // Aggiungi questo state per tracciare se è il primo caricamento
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Aggiungi questo effect per salvare la preferenza dell'utente
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language)
  }, [language])

  const generateScrambledText = (finalPassword: string, currentIndex: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let text = ''
    
    // Usa i caratteri della password finale fino all'indice corrente
    for (let i = 0; i < finalPassword.length; i++) {
      if (i < currentIndex) {
        text += finalPassword[i]  // Caratteri già rivelati
      } else {
        text += chars.charAt(Math.floor(Math.random() * chars.length))  // Caratteri ancora da rivelare
      }
    }
    
    return text
  }

  useEffect(() => {
    setIsGenerating(true)
    
    const chars = 'abcdefghijklmnopqrstuvwxyz'
      + (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
      + (useNumbers ? '0123456789' : '')
      + (useSpecialChars ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '')

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Impostiamo subito la password finale
    setPassword(newPassword)

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= length) {
        setScrambledText(generateScrambledText(newPassword, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        setIsInitialLoad(false)
        
        if (isFirstLoad.current) {
          setPasswordHistory([newPassword])
          isFirstLoad.current = false
        } else {
          // Aggiungi la notifica quando la password viene generata
          setPasswordHistory(prev => [newPassword, ...prev].slice(0, 5))
          toast.success(t.passwordGenerated)
        }
      }
    }, 50)

    return () => clearInterval(interval)
  }, [length, useNumbers, useSpecialChars, useUppercase, t])

  const generatePassword = useCallback(() => {
    setIsGenerating(true)
    
    const chars = 'abcdefghijklmnopqrstuvwxyz'
      + (useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '')
      + (useNumbers ? '0123456789' : '')
      + (useSpecialChars ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '')

    let newPassword = ''
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Impostiamo subito la password finale
    setPassword(newPassword)

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= length) {
        setScrambledText(generateScrambledText(newPassword, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsGenerating(false)
        setPasswordHistory(prev => [newPassword, ...prev].slice(0, 5))
        toast.success(t.passwordGenerated)
      }
    }, 50)
  }, [length, useSpecialChars, useNumbers, useUppercase, t])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setIsCopied(true)
    toast.success(t.passwordCopied)
    setTimeout(() => setIsCopied(false), 1000)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.querySelector(':root')?.classList.toggle('dark')
  }

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
      const darkL = Math.max(25, Math.min(hsl.l * 0.85, 65))
      const darkS = Math.min(hsl.s * 1.2, 100)
      root?.style.setProperty('--primary', `${hsl.h} ${darkS}% ${darkL}%`)
      root?.style.setProperty('--primary-foreground',
        darkL > 65 ? '240 5.9% 10%' : '0 0% 98%'
      )
      root?.style.setProperty('--muted', `${hsl.h} ${Math.max(8, darkS * 0.2)}% 12%`)
      root?.style.setProperty('--muted-foreground', `${hsl.h} ${Math.min(25, darkS)}% 85%`)
      root?.style.setProperty('--border', `${hsl.h} ${Math.max(15, darkS * 0.25)}% 25%`)
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

  const deletePassword = (index: number) => {
    setPasswordHistory(prev => prev.filter((_, i) => i !== index))
    toast.success(t.passwordDeleted)
  }

  const clearHistory = () => {
    setPasswordHistory([])
    toast.success(t.historyCleared)
  }

  const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }

  const textVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const textTransition = {
    duration: 0.3,
    ease: "easeInOut"
  }

  return (
    <div className="min-h-screen bg-background" data-color={primaryColor}>
      <motion.div 
        className="fixed top-4 right-4 flex gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div {...hoverScale}>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 cursor-pointer"
              >
                <Languages className="h-4 w-4" />
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center gap-2 cursor-pointer">
              <GB className="w-4 h-4" />
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('it')} className="flex items-center gap-2 cursor-pointer">
              <IT className="w-4 h-4" />
              Italiano
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('es')} className="flex items-center gap-2 cursor-pointer">
              <ES className="w-4 h-4" />
              Español
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('de')} className="flex items-center gap-2 cursor-pointer">
              <DE className="w-4 h-4" />
              Deutsch
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('fr')} className="flex items-center gap-2 cursor-pointer">
              <FR className="w-4 h-4" />
              Français
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <motion.div {...hoverScale}>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 cursor-pointer"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-foreground mb-2">Colore principale</h3>
              <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <motion.div {...hoverScale}>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 cursor-pointer"
              >
                <History className="h-4 w-4" />
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-2">
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
                    className="flex items-center justify-between p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors relative group cursor-default"
                  >
                    <div className="flex-1 relative">
                      <span className="font-mono text-sm text-foreground truncate block select-none">
                        {pwd}
                      </span>
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-muted to-transparent" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
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
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              className="text-green-500"
                            >
                              <Check className="h-4 w-4" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                            >
                              <Copy className="h-4 w-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Button>
                      <div className="w-0 group-hover:w-8 overflow-hidden transition-all duration-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deletePassword(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>

        <motion.div {...hoverScale}>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 cursor-pointer"
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeInOut"
                  }}
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="w-full max-w-md"
        >
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <AnimatePresence mode="wait">
                <motion.div
                  key={language + "title"}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={textVariants}
                  transition={textTransition}
                >
                  <CardTitle className="text-center">
                    {t.title}
                  </CardTitle>
                </motion.div>
              </AnimatePresence>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="flex-1 text-center p-4 bg-muted rounded-lg font-mono text-xl overflow-hidden relative"
                    initial={{ opacity: 0.7, scale: 0.95 }}
                    animate={{ 
                      scale: password ? 1 : 0.95,
                      opacity: password ? 1 : 0.7
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      mass: 0.8
                    }}
                  >
                    <div className="relative select-none cursor-default">
                      <div className="whitespace-nowrap overflow-hidden text-foreground">
                        {isGenerating ? scrambledText : (password || t.placeholder)}
                      </div>
                      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-muted to-transparent" />
                    </div>
                  </motion.div>
                  <motion.div {...hoverScale}>
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                      disabled={!password}
                      className="h-14 w-14 relative"
                    >
                      <AnimatePresence mode="wait">
                        {isCopied ? (
                          <motion.div
                            key="check"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-green-500"
                          >
                            <Check className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="copy"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          >
                            <Copy className="h-4 w-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={language + "strength"}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={textVariants}
                        transition={textTransition}
                        className="text-muted-foreground"
                      >
                        {t.passwordStrength}
                      </motion.span>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={getStrengthLabel(calculatePasswordStrength(password), t) + language}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={textVariants}
                        transition={textTransition}
                        className="font-medium"
                      >
                        {getStrengthLabel(calculatePasswordStrength(password), t)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getStrengthColor(calculatePasswordStrength(password))}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${calculatePasswordStrength(password)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-foreground cursor-pointer">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={language + "length"}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          variants={textVariants}
                          transition={textTransition}
                          className="inline-block min-w-[6rem]"
                        >
                          {t.length}: {length}
                        </motion.span>
                      </AnimatePresence>
                    </Label>
                    <Slider 
                      value={[length]}
                      onValueChange={([value]) => setLength(value)}
                      min={8}
                      max={32}
                      step={1}
                      className="text-foreground cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between text-foreground">
                    <Label className="cursor-pointer">{t.specialChars}</Label>
                    <Switch 
                      checked={useSpecialChars}
                      onCheckedChange={setUseSpecialChars}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between text-foreground">
                    <Label className="cursor-pointer">{t.numbers}</Label>
                    <Switch 
                      checked={useNumbers}
                      onCheckedChange={setUseNumbers}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between text-foreground">
                    <Label className="cursor-pointer">{t.uppercase}</Label>
                    <Switch 
                      checked={useUppercase}
                      onCheckedChange={setUseUppercase}
                      className="cursor-pointer"
                    />
                  </div>
                </div>

                <motion.div className="w-full">
                  <motion.button
                    className="w-full bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium"
                    {...hoverScale}
                    onClick={generatePassword}
                    disabled={isGenerating}
                    animate={isGenerating && !isInitialLoad ? { opacity: 0.7 } : { opacity: 1 }}
                  >
                    <AnimatePresence mode="wait">
                      {isGenerating && !isInitialLoad ? (
                        <motion.div
                          key="generating"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                          <span>{t.generating}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="generate"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeOut"
                          }}
                        >
                          {t.generate}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div 
        className="fixed bottom-4 left-0 right-0 flex items-center justify-center gap-2 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
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

