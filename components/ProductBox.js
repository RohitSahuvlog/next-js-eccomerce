import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { toast } from "react-toastify"

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: .9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

export default function ProductBox({ product }) {
  const { addProduct } = useContext(CartContext);
  const url = '/product/' + product?._id;

  // Function to handle adding product and showing notification
  const handleAddToCart = (productId) => {
    addProduct(productId);
    toast.success("Product added to cart!"); // Show success toast
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={product?.images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{product?.title}</Title>
        <PriceRow>
          <Price>
            ${product?.price}
          </Price>
          <Button block onClick={() => handleAddToCart(product?._id)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
