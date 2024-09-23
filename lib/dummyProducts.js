// lib/dummyProducts.js
const dummyProducts = [
    {
        title: "Product 1",
        description: "This is a great product.",
        price: 29.99,
        images: [
            "https://example.com/images/product1.jpg",
            "https://example.com/images/product1-1.jpg"
        ],
        category: null, // or you can use a dummy ObjectId
        properties: {
            color: "Red",
            size: "M"
        }
    },
    {
        title: "Product 2",
        description: "This is another great product.",
        price: 39.99,
        images: [
            "https://example.com/images/product2.jpg",
            "https://example.com/images/product2-1.jpg"
        ],
        category: null,
        properties: {
            color: "Blue",
            size: "L"
        }
    },
    // Add more products as needed
];

export default dummyProducts;
