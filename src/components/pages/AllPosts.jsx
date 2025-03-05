import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../../components';
import appwriteService from "../../appwrite/config";
import Bg5 from "../../../images/bg5.jpg"

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response && response.documents) {
          setPosts(response.documents);
          console.log("Fetched posts:", response.documents);
        } else {
          console.error("Failed to fetch posts: No documents found.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className='w-full py-8 mt-4 text-center text-2xl text-white'>Loading images...</div>;

  const backgroundStyle = {
    backgroundImage: `url(${Bg5})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className='w-full py-8 flex flex-wrap'>
      <Container>
        <div className=' columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-full shadow-md rounded-lg overflow-hidden hover:shadow-xl'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
