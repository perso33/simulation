import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')
const isDark = ref(false)

// Charger le thème depuis le localStorage au démarrage
const savedTheme = localStorage.getItem('pms-theme') as Theme
if (savedTheme) {
  theme.value = savedTheme
  isDark.value = savedTheme === 'dark'
} else {
  // Détecter la préférence système
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  theme.value = prefersDark ? 'dark' : 'light'
  isDark.value = prefersDark
}

// Appliquer le thème initial
applyTheme(theme.value)

function applyTheme(newTheme: Theme) {
  const root = document.documentElement
  if (newTheme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Watcher pour appliquer les changements de thème
watch(theme, (newTheme) => {
  applyTheme(newTheme)
  isDark.value = newTheme === 'dark'
  localStorage.setItem('pms-theme', newTheme)
})

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    isDark,
    toggleTheme
  }
}
