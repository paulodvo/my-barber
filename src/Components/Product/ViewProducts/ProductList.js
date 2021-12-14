import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { selectUserId } from "../../../slices/cartDetailsSlice";
import { useridUpdater } from "../../../slices/cartDetailsSlice";


import ProductItem from "./ProductItem";
import ProductFilter from "./ProductFilter";
import Header from '../../Header/Header';
import ViewCart from "../../Cart/ViewCart";
import EnterCustomer from "./EnterCustomer/EnterCustomer";

const ProductList = () =>{
    const dispatch = useDispatch();
    const userIdSelector = useSelector(selectUserId);

    const [searchProduct, setSearchProduct] = useState('');
    const [customer, setCustomer] = useState({});
    const [products, getProducts] = useState([]);

    useEffect(()=>{
        myfunction()
    },[]);

    const myfunction = async () => {
        let result = await Axios.get('http://localhost:3001/api/get')
        getProducts(result.data);
      }

    const filteredProductArray = products.filter(product => product.productName.includes(searchProduct.toLowerCase()));
    
    const filteredProduct = (event) =>{
        setSearchProduct(event.target.value);
    }

    const userIdGetter = async (object) => {
        let result = await Axios.post("http://localhost:3001/selectuser", {
                            userid: object
                        });

        if(result.data === null){
            window.alert("User Not Found!");
        }
        else{
            dispatch(useridUpdater(result.data.userid));
            
                
        }
    }

    return(
        <React.Fragment>
            <Header/>
            {!userIdSelector ? 
            (<div>
                <EnterCustomer userIdGetter={userIdGetter}/>    
            </div>) : 
            <div>
                <ViewCart/>
                <h1>Customer Name</h1>
                <ProductFilter filteredProduct={filteredProduct}/>
                <ul>
                    {filteredProductArray.length === 0 
                            ? 
                                (<li style={{display: 'inline-block', marginRight: '5rem'}}>
                                <p style={{textAlign: 'center'}}>Product Not Found!</p>
                                </li>)
                            : 
                            filteredProductArray.map((product) =>
                                <li style={{display: 'inline-block', marginRight: '5rem'}} key={product.productId}>
                                <ProductItem 
                                productName={product.productName} 
                                price={product.price}/>
                                </li>
                    )}
                </ul>
            </div>
            }
        </React.Fragment>
    );
    // }
   
}

export default ProductList;