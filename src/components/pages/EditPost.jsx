import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../../components';
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import Bg1 from "../../../images/bg1.jpg"

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post);
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const backgroundStyle = {
        backgroundImage: `url(${Bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
    };

    return post ? (
        <div style={backgroundStyle} className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
