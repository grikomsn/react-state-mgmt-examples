import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation.tsx'
import Home from './components/Home.tsx'
import UseStateExample from './examples/built-in/UseStateExample.tsx'
import UseReducerExample from './examples/built-in/UseReducerExample.tsx'
import UseContextExample from './examples/built-in/UseContextExample.tsx'
import ReduxExample from './examples/external/ReduxExample.tsx'
import ZustandExample from './examples/external/ZustandExample.tsx'
import JotaiExample from './examples/external/JotaiExample.tsx'
import MobXExample from './examples/external/MobXExample.tsx'
import RecoilExample from './examples/external/RecoilExample.tsx'
import TanStackQueryExample from './examples/server-state/TanStackQueryExample.tsx'
import SWRExample from './examples/server-state/SWRExample.tsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usestate" element={<UseStateExample />} />
            <Route path="/usereducer" element={<UseReducerExample />} />
            <Route path="/usecontext" element={<UseContextExample />} />
            <Route path="/redux" element={<ReduxExample />} />
            <Route path="/zustand" element={<ZustandExample />} />
            <Route path="/jotai" element={<JotaiExample />} />
            <Route path="/mobx" element={<MobXExample />} />
            <Route path="/recoil" element={<RecoilExample />} />
            <Route path="/tanstack-query" element={<TanStackQueryExample />} />
            <Route path="/swr" element={<SWRExample />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
