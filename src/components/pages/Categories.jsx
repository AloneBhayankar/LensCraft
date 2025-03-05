import React from 'react';
import { Container, Category } from '../../components';
import Bg5 from '../../../images/bg5.jpg'

function Categories() {
  const categories = [
    { title: 'Nature', featuredImage: 'Nature' },
    { title: 'Portrait', featuredImage: 'Portrait' },
    { title: 'Travel', featuredImage: 'Travel' },
    { title: 'Product', featuredImage: 'Product' },
    { title: 'Food', featuredImage: 'Food' },
    { title: 'Event', featuredImage: 'Event' },
  ];

  return (
    <div
      className="py-8 w-full bg-gray-50"
      style={{
        backgroundImage: `url(${Bg5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container>
        <h2 className="text-3xl font-bold text-gray-800 text-center pb-8 libre-baskerville-bold hover:underline">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-300 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <Category title={category.title} featuredImage={category.featuredImage} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Categories;
