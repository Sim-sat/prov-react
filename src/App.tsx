import {Route, Routes} from "react-router";
import ProtocolSite from "./Protocol/ProtocolSite.tsx";
import {Reseller} from "./Reseller/Reseller.tsx";
import {Maschinen} from "./Maschines/Maschinen.tsx";
import {Modelle} from "./Modelle/Modelle.tsx";
import {Kunden} from "./Kunden/Kunden.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<div>Home Page</div>}/>
            <Route path="/protocol" element={<ProtocolSite/>}/>
            <Route path="/reseller" element={<Reseller/>}/>
            <Route path="/customer" element={<Kunden/>}/>
            <Route path="/maschine" element={<Maschinen/>}/>
            <Route path="/model" element={<Modelle/>}/>
            <Route path="*" element={<div>404 - Page not found</div>}/>
        </Routes>
    );
}

export default App;