import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

// Styled Components
const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
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

// Product Page Component
export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);

  // Dummy product fallback in case product is not found
  const fallbackProduct = {
    _id: "dummy-id", // Add a dummy ID for cart functionality
    title: "Dummy Product",
    description: "This is a dummy product description.",
    price: 19.99,
    images: ["/images/dummy-product.jpg"],
  };

  const currentProduct = product || fallbackProduct;

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={currentProduct.images} />
          </WhiteBox>
          <div>
            <Title>{currentProduct.title}</Title>
            <p>{currentProduct.description}</p>
            <PriceRow>
              <div>
                <Price>${currentProduct.price}</Price>
              </div>
              <div>
                <Button primary onClick={() => addProduct(currentProduct._id)}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}

// Static Paths for Dynamic Routing
export async function getStaticPaths() {
  await mongooseConnect();
  const products = await Product.find({});
  const paths = products.map(product => ({
    params: { id: product._id.toString() },
  }));

  return { paths, fallback: 'blocking' }; // Use 'blocking' for SSR fallback
}

// Static Props for Product Page
export async function getStaticProps(context) {
  await mongooseConnect();
  const { id } = context.params;
  const product = await Product.findById(id);

  if (!product) {
    return {
      props: {
        product: null, // Indicate no product found
      },
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)), // Convert to JSON for serialization
    },
  };
}
