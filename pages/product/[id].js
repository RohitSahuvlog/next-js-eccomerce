import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { toast } from "react-toastify";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const { addProduct } = useContext(CartContext);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        console.log('Fetching product with id:', id);
        const response = await fetch(`/api/product/?id=${id}`);
        const data = await response.json();
        setProduct(data);
      }
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = (productId) => {
    addProduct(productId);
    toast.success("Product added to cart!"); // Show success toast
  };


  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product?.images} />
          </WhiteBox>
          <div>
            <Title>{product?.title}</Title>
            <p>{product?.description}</p>
            <PriceRow>
              <div>
                <Price>${product?.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => handleAddToCart(product?._id)}>
                  <CartIcon />Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}
