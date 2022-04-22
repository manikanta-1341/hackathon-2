import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./login_page"
import ProductComponent from "./product"
export default function Routing(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}></Route>
                        <Route path="/product" element={<ProductComponent/>}></Route>
                    </Routes>
                </BrowserRouter>

            </div>
        </>
    );
}