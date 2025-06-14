import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {HeaderTabs} from "./Components/HeaderTabs.tsx";
import {MantineProvider} from "@mantine/core";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider>


            <BrowserRouter>
                <HeaderTabs/>
                <App/>
            </BrowserRouter>
        </MantineProvider>
    </StrictMode>,
)
