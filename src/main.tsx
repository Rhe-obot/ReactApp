import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClickProvider } from './component/Click/ClckContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClickProvider>
    <App />
  </ClickProvider>,
)
