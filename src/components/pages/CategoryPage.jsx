import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import appwriteService from "../../appwrite/config";
import { PostCard, Container } from '../../components';
import Bg3 from "../../../images/bg3.jpg"

function CategoryPage() {
  const { categoryTitle } = useParams(); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log('Searching for category:', categoryTitle);
        const response = await appwriteService.getPostsByCategory(categoryTitle); 
        setResults(response.documents || []);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryTitle) {
      fetchResults();
    } else {
      setLoading(false); 
    }
  }, [categoryTitle]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(${Bg3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', 
    minHeight: '100vh', 
  };

  return (
    <div style={backgroundStyle} className="py-8 w-full">
      <h2 className="text-2xl lg:text-2xl md:text-xl sm:text-lg font-semibold text-gray-900 mb-8 text-center">
        <span className="text-gray-700 libre-baskerville-bold">Category:</span>
        <span className="text-orange-500 libre-baskerville-bold">"{categoryTitle} Photography"</span>
      </h2>

      <Container>
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4">
          {results.length > 0 ? (
            results.map((post) => (
              <div key={post.$id} className="break-inside-avoid mb-4 bg-transparent shadow-lg rounded-lg overflow-hidden">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <h4 className='text-gray-800 text-xl text-center font-medium'>
              No images found in this category. ❌
            </h4>
          )}
        </div>
      </Container>
    </div>
  );
}

export default CategoryPage;