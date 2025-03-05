import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage, userName }) {    //updated
  const imageUrl = featuredImage
    ? appwriteService.getFilePreview(featuredImage)
    : "";

  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-transparent rounded-lg  transform transition-all duration-300 hover:scale-102 hover:shadow-2xl overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-800">
            <span className="text-sm font-medium">No Image Available</span>
          </div>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-orange-600 transition-colors duration-300">
            {title}
          </h2>

          {/* Updated  */}
          <div className="text-sm text-gray-500 mb-2">
            <span>{userName || ""} </span>| {" "}
          </div>

          <p className="text-gray-700 text-sm hover:text-blue-500 transition-colors duration-300">
            Read more...
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

