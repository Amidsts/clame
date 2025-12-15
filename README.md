## CLAME

Clame is an AI product search assistance in an E-commerce store (or any big store). Relate with it like a customer speaking with a store attendant, requesting for a product, the store attendant search the entire store for all products that matches your request. This ease you the stres of searching the entire store.

### Technologies

    - Nodejs
    - Typescript
    - OpenAI
    - MongoDB
    - Mongoose

### Installation

    - git clone https://github.com/Amidsts/clame
    - cd clame
    - provide environment variables (reference .env.example)
    - pnpm install
    - pnpm run dev

### Usage
    - populate the DB with sample products. (populate products.csv)
    - make a request to the `{{baseUrl}}/v1/products/search` endpoint for a product search