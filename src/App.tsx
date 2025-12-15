import './index.css'
import './App.css'
import '@workokay/atom/dist/atom.css'
import { Badge } from './components/badge/Badge'
function App() {
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="atom-theme" data-theme="light">
        <button className="inline-flex px-4 py-2 bg-[--atom-button-bg] text-[--atom-button-fg] rounded-md">
          Test Button
        </button>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      {/* <Button variant="secondary" className="text-var(--atom-bg)">
        Render
      </Button> */}
       {/* <p className='text-green-700'>text</p> */}
      <Badge priority="high" status="validated">Value</Badge>
    </>
  )
}

export default App
