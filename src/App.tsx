import './index.css'
import './App.css'
import '@workokay/atom/dist/atom.css'
import { Badge } from './components/badge/Badge'
import { useThemeSync } from './hooks/useTheme';
function App() {
    useThemeSync();
  return (
    <>
      <Badge priority="high" status="validated">Value</Badge>
    </>
  )
}

export default App
