import React from 'react';
import { Container, PostForm } from '../../components';
import Bg4 from "../../../images/bg4.jpg"

function AddPost() {
  const backgroundStyle = {
    backgroundImage: `url(${Bg4})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  return (
    <div style={backgroundStyle} className='py-8'>
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
