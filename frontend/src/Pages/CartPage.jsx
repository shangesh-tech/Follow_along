import axios from "axios";
import React, { useEffect, useState } from "react";
import CartCard from "../Components/ProductCard/CartCard";

const CartPage = () => {
  const [UsersCartData, setUsersCartData] = useState([]);

  useEffect(() => {
    const getCartData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return alert("Token is missing");
      }

      const response = await axios.get(
        `http://localhost:8080/cart/get-user-cart-data?token=${token}`
      );
      console.log(response);
      setUsersCartData(response.data.cartData);
    };
    getCartData();
  }, []);

  return (
    <div>
      {UsersCartData?.map((singleCartObject, index) => {
        return (
          <div key={index}>
            <CartCard
              title={singleCartObject.productId.title}
              image={singleCartObject.productId.images[0]}
              description={singleCartObject.productId.description}
              originalPrice={singleCartObject.productId.originalPrice}
              discountedPrice={singleCartObject.productId.discountedPrice}
              id={singleCartObject._id}
              createdBy={"jeev@hd.com"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CartPage;
