import { createRoot } from 'react-dom/client'
import './styles/global.css'
import './i18n/config.ts'
import App from 'components/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
