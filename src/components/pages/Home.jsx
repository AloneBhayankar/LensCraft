import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import { Container } from '../../components'
import './home.css'
import { Link } from 'react-router-dom';
import Bg1 from "../../../images/bg1.jpg"
import Img_Home from '../../../images/home_img.jpg'
import Img_Home1 from '../../../images/home_img1.jpg'
import Img_Home_Center from '../../../images/home_img_center.jpg'
import Img_Home2 from '../../../images/home_img2.jpg'
import Img_Home3 from '../../../images/home_img3.jpg'
import Img1 from '../../../images/home1.jpg'
import Img2 from '../../../images/home2.jpg'
import Img3 from '../../../images/home3.jpg'
import Img4 from '../../../images/PM.jpg'

function Home() {
  const [posts, setPosts] = useState([])
  const userData = useSelector((state) => state.auth.userData); 

  // Before Login Slider Left Side
  const images0 = [Img_Home, Img_Home1];  // Array of images
  const [currentIndex0, setCurrentIndex0] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex0((prevIndex) => (prevIndex + 1) % images0.length);
    }, 3000); // Change image every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images0.length]);

  // Before Login Slider Right Side
  const images1 = [Img_Home2, Img_Home3];  // Array of images
  const [currentIndex1, setCurrentIndex1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex1((prevIndex) => (prevIndex + 1) % images1.length);
    }, 4000); // Change image every 2 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [images1.length]);

  // After Login Slider 
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [Img1, Img2, Img3];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userData) {
        setPosts([]);
        return;
      }

      try {
        const postsResponse = await appwriteService.getPosts();
        if (postsResponse) {
          const usersPosts = postsResponse.documents.filter(
            (post) => post.userId === userData.$id
          );
          setPosts(usersPosts);
          console.log("Fetched images:", postsResponse.documents);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err.message || "Failed to fetch images.");
      }
    };

    fetchPosts();
  }, [userData]); 
  
  const backgroundStyle = {
    backgroundImage: `url(${Bg1})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', 
    minHeight: '100vh', 
    maxWidth: '100vw', 
    overflowX: 'hidden', 
  };

  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">

              <table className="border-separate border-spacing-10 w-full">
                <tbody>
                  {/* First Row */}
                  <tr className="first-row">
                    <td className="first-column">
                      <div className='group relative flex justify-start items-start'>
                        <Link to={"/login"}>
                          <img
                            className='transition-transform duration-300 ease-in-out group-hover:scale-[1.05] group-hover:brightness-110 w-full sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] border border-solid border-[#EEEEEE] rounded-lg'
                            src={images0[currentIndex0]}
                            alt="Img"
                          />
                        </Link>
                      </div>
                    </td>
                    <td className="first-column">
                      <div className='flex flex-col justify-center items-center py-2.5 text-2xl font-light'>
                        <h1 className='text-center xl:text-3xl lg:text-2xl md:text-xl sm:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#EEEEEE] to-[#6bc1ff]'>
                          Join <span className='text-yellow-400 libre-baskerville-bold'><strong>LensCraft</strong></span> community—share your work, find inspiration, and enhance your photography expertise.
                        </h1>
                        <div className='group relative flex justify-start items-start'>
                          <Link to={"/login"}>
                            <img
                              className='transition-transform duration-300 ease-in-out group-hover:scale-[1.05] group-hover:brightness-110 w-full sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] my-10 border-4 border-solid border-[#EEEEEE] rounded-lg'
                              src={Img_Home_Center}
                              alt="Img"
                            />
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="first-column">
                      <div className='group relative flex justify-start items-start'>
                        <Link to={"/login"}>
                          <img
                            className='transition-transform duration-300 ease-in-out group-hover:scale-[1.05] group-hover:brightness-110 w-full sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw] border border-solid border-[#EEEEEE] rounded-lg'
                            src={images1[currentIndex1]}
                            alt="Img"
                          />
                        </Link>
                      </div>
                    </td>
                  </tr>

                  {/* Second Row */}
                  <tr>
                    <td colSpan={3}>
                      <div className='flex flex-col justify-center items-center py-2.5 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg'>
                        <h1 className='text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#12ffdf] to-[#EEEEEE]'>
                          "Engage with a thriving community of creatives, share your visual stories through captivating images
                          <span className="text-black">📸</span>, and inspire others with the narratives behind each shot
                          <span className="text-black">📝</span>. Build your portfolio, receive constructive feedback
                          <span className="text-black">💬</span>, and enhance your artistic skills
                          <span className="text-black">🎨</span>—all while seamlessly managing and showcasing your photos with ease."
                        </h1>
                      </div>
                    </td>
                  </tr>

                  {/* Third Row */}
                  <tr>
                    <td colSpan={3}>
                      <div className='flex flex-col justify-center items-center py-2.5'>
                        <div className="flex items-center space-x-2">
                          <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-lg font-bold text-yellow-200 underline text-center libre-baskerville-bold">Why LensCraft?</h1>
                          <span className="text-blue-600 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">📸</span>
                          <span className="text-yellow-500 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">🌟</span>
                        </div>
                        <ul className='flex flex-col justify-start items-center py-2.5 font-semibold text-transparent xl:text-xl lg:text-lg md:text-md sm:text-sm bg-clip-text bg-gradient-to-r from-[#EEEEEE] to-[#6bc1ff]'>
                          <li><span className='text-[#EEEEEE] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>Showcase Your Craft:</span> Upload your photography and curate a personalized, stunning gallery to display your artistic journey.</li>
                          <li><span className='text-[#EEEEEE] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>Collaborate and Evolve:</span> Connect with a community of photographers, exchange feedback, and continuously refine your skills and techniques.</li>
                          <li><span className='text-[#EEEEEE] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>Simplified Management:</span> Enjoy seamless photo management with easy options to edit, update, or remove images as your collection evolves.</li>
                          <li><span className='text-[#EEEEEE] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>Inspire Through Stories:</span> Enrich your images with thoughtful descriptions, sharing the stories and emotions that make each shot unique.</li>
                        </ul>
                      </div>
                    </td>
                  </tr>

                  {/* Fouth Row - Call to Action (CTA) + Login/Signup */}
                  <tr>
                    <td colSpan={3}>
                      <div>
                        <div className="mx-auto">
                          <div className="relative isolate overflow-hidden shadow-none sm:rounded-3xl">
                            <div className="mx-auto text-center">
                              <h2 className="text-base font-semibold text-[#EEEEEE] sm:text-lg md:text-xl lg:text-2xl libre-baskerville-bold">
                                📸 Signup Today and Showcase Your Passion for Photography! ✨
                              </h2>
                              <p className="mt-2 text-[#EEEEEE] text-base sm:text-md md:text-lg lg:text-xl">
                                Share your creative photography with a community that shares your passion. 🌟 Start your journey today and let your work shine. 🌍
                              </p>
                              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6">
                                <Link
                                  to="/signup"
                                  className="rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-950 shadow-xs hover:bg-blue-600 hover:text-[#EEEEEE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                  Sign Up Now
                                </Link>
                                <Link
                                  to="/signup"
                                  className="underline text-sm font-semibold text-gray-200 hover:text-gray-400"
                                >
                                  Learn More <span aria-hidden="true">→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </Container>
      </div>
    )
  }

  else {
  return (
    <div style={backgroundStyle}>
      <Container>

        {/* First Table  */}
        <table className="border-separate border-spacing-5 pt-4 w-full">
          <tbody>
            <tr className="first-row">
              <td className='first-column'>
                {/* Content section */}
                <div className="flex flex-col justify-center items-center py-2.5">
                  <div className="flex items-center space-x-2">
                    <h1 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-lg font-bold text-blue-900 underline text-center libre-baskerville-bold">LensCraft Features!</h1>
                    <span className="text-yellow-500 xl:text-3xl lg:text-2xl md:text-xl sm:text-lg">📸</span>
                  </div>
                  <ul className='flex flex-col justify-center items-center py-2.5 text-left font-semibold text-transparent xl:text-xl lg:text-lg md:text-md sm:text-sm bg-clip-text bg-gradient-to-r from-[#1b1d20] to-[#1f6699] '>
                    <li className='py-2'><span className='text-[#2F4F4F] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>🔐 Secure Sign-Up/Login:</span> Your personal gallery, protected and private.</li>
                    <li className='py-2'><span className='text-[#2F4F4F] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>🖼️ Easy Photo Management:</span> Upload, organize, and manage your photos in categories.</li>
                    <li className='py-2'><span className='text-[#2F4F4F] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>✍️ Image Descriptions:</span> Enhance each image with details, and the story behind the lens.</li>
                    <li className='py-2'><span className='text-[#2F4F4F] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>🌍 Community Interaction:</span> Share feedback and be inspired by photographers worldwide.</li>
                    <li className='py-2'><span className='text-[#2F4F4F] font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md'>💡 Inspiration Hub:</span> Browse and explore photography from various genres and styles.</li>
                  </ul>
                </div>
              </td>
              <td>
                <div className="slider-container group relative flex justify-center items-center lg:w-1/2">
                  <div className="slider">
                    <Link to='/all-posts'>
                      <img
                        src={images[currentIndex]}
                        alt={`slide-${currentIndex}`}
                        className="slider-image transition-transform duration-300 ease-in-out group-hover:scale-[1.05] group-hover:brightness-110 w-full sm:w-[60vw] md:w-[50vw] lg:w-[40vw] xl:w-[35vw]"
                      />
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <hr />
        <hr />

        {/* Second Table  */}
        <div className='partner text-left font-semibold xl:text-xl lg:text-lg md:text-md sm:text-sm'>
          <table className="border-separate border-spacing-4 w-full">
            <tbody>
              <tr className='first-row'>
                <td className="first-column thumbnail" rowSpan={9}>
                  <Link to={'https://www.youtube.com/@PeterMcKinnon'} target="_blank" rel="noopener noreferrer">
                  <h6 className='font-semibold xl:text-3xl lg:text-2xl md:text-xl sm:text-lg p-4 text-center underline libre-baskerville-bold'>-Peter McKinnon-</h6>            
                    <img src={Img4} alt="PM-Photographer" className='mx-auto' />
                    <p className='font-semibold xl:text-2xl lg:text-xl md:text-lg sm:text-md m-5 text-center hover:underline libre-baskerville-bold'>🍁Canadian Photographer</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <th>➣Meet Our Partnered Photographer 📸</th>
              </tr>
              <tr>
                <td>
                  At LensCraft, we are proud to collaborate with a talented photographer who brings a wealth of experience, creativity, and passion for visual storytelling. Our partnered photographer shares our mission of making photography accessible and enjoyable for everyone, contributing their unique insights and expertise to our community.
                </td>
              </tr>
              <tr>
                <th>➢Why Partner with Us? 💡</th>
              </tr>
              <tr>
                <td>
                  Our partnered photographer is dedicated to inspiring both aspiring and professional photographers. Through expert tips, signature photography techniques, and valuable advice, they help you explore new perspectives, creative processes, and photographic styles. Coming from a diverse background, they bring a fresh approach that enriches our community and encourages you to push the boundaries of your craft.
                </td>
              </tr>
              <tr>
                <th>➢Get Inspired 🌟</th>
              </tr>
              <tr>
                <td>
                  Whether you're looking for tips on portrait photography or exploring the wonders of nature through your lens, our partnered photographer offers something for everyone. From classic photography techniques to innovative new styles, you'll discover tutorials and inspiration that will elevate your photography skills and fuel your creative passion.
                </td>
              </tr>
              <tr>
                <th>➣Join the Journey 🚀</th>
              </tr>
              <tr>
                <td>
                  As LensCraft continues to grow, we invite you to follow our partnered photographer's journey. Discover their story, explore their favorite projects, and learn their photography tips and techniques that will help you master your craft. Together, we can turn every shot into a masterpiece and every experience into a creative adventure.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
}

export default Home;


