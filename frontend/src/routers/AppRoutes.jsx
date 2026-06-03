import { Route , Routes } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import CreateFood from "../pages/CreateFoodPage/CreateFood";
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import FoodPartnerProfile from "../pages/CreateFoodPage/FoodPartnerProfile";  

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/user/register' element={<UserRegister />} />
            <Route path='/user/login' element={<UserLogin />} />
            <Route path='/food-partner/register' element={<FoodPartnerRegister />} />
            <Route path='/food-partner/login' element={<FoodPartnerLogin />} />
            <Route path="/dashboard" element = {<Home/>}/>
            <Route path="/create-food" element={<CreateFood/>}/>
            <Route path="/food-partner/:id" element={<FoodPartnerProfile/>}/>
            <Route path="/saved" element={<Saved/>}/>
        </Routes>
    )
}
export default AppRoutes;