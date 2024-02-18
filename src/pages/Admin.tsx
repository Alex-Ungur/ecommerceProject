import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useQuery } from "@tanstack/react-query";
import { getCategories, setProduct } from "../api/Products";
import { storage } from "../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

type CategoryData = {
  [id: string]: {
    name: string;
    id: string;
  };
};

const Admin = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: 1,
    rating: 0,
    reduction: 0,
    stock: 0,
  });
  const [promotion, setPromotion] = useState(false);
  const {
    isLoading,
    isFetching,
    isRefetching,
    error,
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/");
    }
  }, []);

  if (isLoading || isFetching || isRefetching) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <p>Une erreur s'est produite</p>
      </Layout>
    );
  }

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const baseImage = e.target.files[0];
    const imageName = baseImage.name + uuid4();
    const imageRef = ref(storage, `produits/${imageName}`);

    // console.log(baseImage);
    // console.log(imageName);
    // console.log(imageRef);
    try {
      await uploadBytes(imageRef, baseImage).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setForm((prevForm) => ({ ...prevForm, image: url }));
          console.log(url);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form", form);
    setProduct(form);
    toast(`${form.title} a bien été enregistré`);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    if (!isNaN(value)) {
      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: parseFloat(value),
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [e.target.name]: e.target.value,
      }));
    }
  };

  return (
    <Layout>
      <form
        className="max-w-md mx-auto my-[10rem]"
        onSubmit={(e) => handleForm(e)}
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            // onChange={(e) => setForm({ ...form, title: e.target.value })}
            value={form.title || ""}
            className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Titre
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <select
            // className="py-1 px-2 text-black"
            id="category"
            name="category"
            className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            // onChange={(e) => setForm({ ...form, category: e.target.value })}

            onChange={handleChange}
            value={form.category}
            required
          >
            <option
              value=""
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              Tous
            </option>{" "}
            {/* Option par défaut */}
            {categories?.map((category: any) => (
              <option
                key={category.id}
                value={category.name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                {category.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="category"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Categorie
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group flex flex-col">
          <label
            htmlFor="image"
            className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mt-6"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="text-sm"
            onChange={(e) => handleImageUpload(e)}
          />
        </div>

        <div className="relative z-0 w-full mb-5 group flex flex-col">
          <textarea
            id="description"
            name="description"
            rows={5}
            cols={33}
            placeholder=" "
            // onChange={(e) => setForm({ ...form, description: e.target.value })}

            onChange={handleChange}
            defaultValue={form.description}
            className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          ></textarea>
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description du produit :
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="promotion"
              className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 duration-300 transform -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mr-2"
            >
              Promotion :
            </label>
            <input
              type="checkbox"
              name="promotion"
              id="promotion"
              onClick={(e) => setPromotion(e.currentTarget.checked)}
              checked={promotion}
              readOnly
            />
          </div>
          {promotion && (
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="reduction"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Reduction du prix (en %) :
              </label>{" "}
              <input
                type="number"
                id="reduction"
                name="reduction"
                min={1}
                max={70}
                step={1}
                className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                // onChange={(e) =>
                //   setForm({ ...form, promo: [parseInt(e.target.value)] })
                // }

                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type={"number"}
              id="price"
              name="price"
              min={1.0}
              max={10000.0}
              step={0.1}
              className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              // onChange={(e) =>
              //   setForm({ ...form, price: parseFloat(e.target.value) })
              // }

              onChange={handleChange}
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Prix :
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              id="stock"
              name="stock"
              min={1}
              max={10000}
              step={1}
              className="block py-2.5 px-0 w-full text-sm text-gray-600 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              // onChange={(e) =>
              //   setForm((prevForm) => ({
              //     ...prevForm,
              //     rating: {
              //       ...prevForm.rating,
              //       count: parseInt(e.target.value),
              //     },
              //   }))
              // }

              onChange={handleChange}
            />
            <label
              htmlFor="stock"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Stock :
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default Admin;
