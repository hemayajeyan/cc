import React from 'react';

import Layout from 'pages/Layout';
import { wrapper } from 'store';


const CategoryPage = ({title}) => {
  const category = false


  return (
  <Layout>
    <nav className="text-sm font-medium text-gray-700">
      <ol className="list-reset p-0 inline-flex">
        <li className="flex items-center">
          <a href="/home" className="text-indigo-600 hover:text-indigo-800">Home</a>
          <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </li>
        <li className="flex items-center">
          <span>{title}</span>
        </li>
      </ol>
    </nav>
    <section className="p-10" style={{ fontFamily: 'Ubuntu' }}>
        <div className="max-w-4xl mx-auto bg-ccWhite p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600 mb-4">{category.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!category? <div>Loading...</div>:
            category.products.map((product) => (
              <div key={product.id} className="bg-ccWhite rounded-lg shadow-md p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h2 className="text-xl font-bold">{product.name}</h2>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
  </Layout>
    
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
    const { slug } = context.params;

  
      return {
        props: {
            title:slug,
        },
      };
    }
  );

export default CategoryPage;