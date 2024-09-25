import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";

export default function HomePage() {
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        async function fetchFeaturedProduct() {
            const response = await fetch('/api/featuredProduct');
            const data = await response.json();
            setFeaturedProduct(data);
        }

        async function fetchNewProducts() {
            const response = await fetch('/api/products');
            const data = await response.json();
            setNewProducts(data);
        }

        fetchFeaturedProduct();
        fetchNewProducts();
    }, []);

    return (
        <div>
            <Header />
            <Featured product={featuredProduct} />
            <NewProducts products={newProducts} />
        </div>
    );
}
