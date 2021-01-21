import React, {useState,useEffect} from 'react';
import './App.css';

function ItemDetail({ match }) {

    useEffect(()=>{
        fetchItem();
        console.log(item);
    },[]);

    const [item, setItem] = useState({});

    const fetchItem = async() => {
        const fetchItem = await fetch(`https://fortnite-public-api.theapinetwork.com/prod09/item/get?ids=${match.params.id}`);
        const item = await fetchItem.json();

        console.log(item);
    }

    return(
        <div>
            <h1>Item</h1>
        </div>
    );
}

export default ItemDetail;