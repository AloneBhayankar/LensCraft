import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Bg2 from "../../../images/bg2.jpg"

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    const backgroundStyle = {
        backgroundImage: `url(${Bg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
    };

    return post ? (
        <div style={backgroundStyle} className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 libre-baskerville-bold">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 cursor-pointer hover:bg-green-800" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-600 cursor-pointer hover:bg-red-800" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full">
                    <h1 className="text-2xl font-bold text-center libre-baskerville-bold">{post.title}</h1>
                </div>
                <div className="text-start lg:text-2xl md:text-2xl sm:text-xl">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
