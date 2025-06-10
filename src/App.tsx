import '@mantine/core/styles.css';
import './App.css'
import { MantineProvider } from '@mantine/core';
import { ConfigurationRenderer } from './Components/ConfigurationRenderer';
function App() {

  return (
    <MantineProvider>
      <ConfigurationRenderer/>
    </MantineProvider>
  )
}

export default App
