import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, RTE, Select } from "../../components/index"; // Import necessary components
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

function PostForm({ post }) {
  const { register, handleSubmit, setValue, control, getValues, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      category: post?.category || "", // Update category field if present
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // Get userData from Redux store
  const [file, setFile] = useState(null);

  // Slug transformation logic
  const slugTransform = (value) => value?.trim().replace(/ /g, "-") || '';

  // Set default values on post change
  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.slug || slugTransform(post.title)); // Set the slug from title or default
      setValue("content", post.content);
      setValue("status", post.status);
      setValue("category", post.category);
    }
  }, [post, setValue]);

  // Update slug automatically when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  // Handle form submission (both create and update logic)
  const submit = async (data) => {
    try {
      // Handle file upload (only when a file is selected)
      if (file) {
        if (post?.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const uploadedFile = await appwriteService.uploadFile(file);
        data.featuredImage = uploadedFile.$id;
      } else {
        data.featuredImage = post?.featuredImage || null;
      }

      const postData = {
        ...data,
        userId: userData.$id, // Ensure userData is defined
        userName: userData.name,  // Username of image uploader
      };

      const dbPost = post
        ? await appwriteService.updatePost(post.$id, postData)
        : await appwriteService.createPost(postData);

      if (dbPost) {
        navigate(`/posts/${dbPost.$id}`);
      }
    } catch (error) {
      console.error("Error in submit function:", error);
    }
  };

  return (
    <>
      <h1 className="flex justify-center items-center flex-col md:flex-row flex-wrap p-8 rounded-lg shadow-lg max-w-4xl mx-auto m-5 text-xl lg:text-5xl md:text-4xl sm:text-3xl font-semibold text-gray-800 leading-tight border-gray-800 border-4 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 libre-baskerville-bold">
        💻 Upload Image 📸
      </h1>

      <form onSubmit={handleSubmit(submit)} className="flex flex-col md:flex-row flex-wrap bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="md:w-2/3 w-full px-4 mb-6 md:mb-0">

          {/* Title Input */}
          <Input
            label="Title:"
            placeholder="Title"
            className="mb-4 p-3 border rounded-md w-full text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          {/* Slug Input */}
          <Input
            label="Slug:"
            placeholder="Slug (URL-friendly version of a title, used to identify a page)"
            className="mb-4 p-3 border rounded-md w-full text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("slug", { required: "Slug is required" })}
            onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
          />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}

          {/* Rich Text Editor for Content */}
          <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <div className="md:w-1/3 w-full px-4">

          {/* Featured Image Input */}
          <Input
            label="Featured Image:"
            type="file"
            className="mb-4 p-3 border rounded-md w-full text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { onChange: (e) => setFile(e.target.files[0]) })}
          />
          {post?.featuredImage && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg w-full"
              />
            </div>
          )}

          {/* Category Select */}
          <Select
            placeholder="Category"
            options={['Nature Photography', 'Portrait Photography', 'Travel Photography', 'Product Photography', 'Food Photography', 'Event Photography']}
            label="Category"
            className="mb-4 p-3 border rounded-md w-full text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("category", { required: "Select Photography Category" })}
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

          {/* Status Select */}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 p-3 border rounded-md w-full text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("status", { required: "Status is required" })}
          />
          {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}

          <div className="text-sm text-gray-800 my-5">
            <p><strong>Tips for better images:</strong></p>
            <ul className="list-disc pl-5">
              <li>Choose the correct category to help your image reach the right audience.</li>
              <li>Be mindful of your image's status. Mark it as 'active' when ready to publish.</li>
              <li>Use high-quality images for better engagement.</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className={`cursor-pointer w-full py-3 px-6 rounded-md text-white font-medium transition-all duration-300 hover:bg-opacity-80 ${post ? "hover:bg-green-400" : "hover:bg-[#1b4a74]"}`}
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default PostForm;
