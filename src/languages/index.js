import es from './es.json'
import en from './en.json'
const TRANSLATIONS = {
 es,
 en
}

export default TRANSLATIONS[localStorage.getItem('lang') ?? 'es']