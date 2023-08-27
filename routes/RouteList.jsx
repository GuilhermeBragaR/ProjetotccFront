import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Product } from '../pages/Product';
import { NotFound } from '../pages/NotFound';
import { Home } from '../pages/Home';
import { Update } from '../pages/Update';
import { CreateAccount } from '../pages/CreateAccount';
import { Purchase } from '../pages/Purchase';
import { Checkout } from '../pages/Checkout';
 

export const RouteList = () => {
    return (
        <Routes>
           <Route path='/' element={<Login/>}/>
           <Route path='/createaccount' element={<CreateAccount/>}/>
           <Route path='/purchase' element={<Purchase/>}/>
           <Route path='/checkout' element={<Checkout/>}></Route>
           <Route path='/home' element={<Home/>}/>
           <Route path='/product' element={<Product/>}/>
           <Route path='/update' element={<Update/>}/>
           <Route path='*' element={<NotFound />} />
         </Routes>
    )
}