import React, { useEffect, useState } from "react";
import Layout from "../layout";
import { useQuery } from "@tanstack/react-query";
import { getCategories, setProduct } from "../api/Products";
import { storage } from "../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid4 } from "uuid";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("form", form);
    setProduct(form);
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
        onSubmit={(e) => handleForm(e)}
        className="grid justify-items-start gap-3"
      >
        <label htmlFor="title">Nom du produit :</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          // onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
          className="text-black"
        />
        <label htmlFor="category">Categorie</label>
        <select
          className="py-1 px-2 text-black"
          id="category"
          name="category"
          // onChange={(e) => setForm({ ...form, category: e.target.value })}

          onChange={handleChange}
          value={form.category}
        >
          <option value="">Tous</option> {/* Option par défaut */}
          {categories?.map((category: any) => (
            <option
              key={category.id}
              value={category.name}
              className="text-black"
            >
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => handleImageUpload(e)}
        />
        <label htmlFor="description">Description du produit :</label>

        <textarea
          id="description"
          name="description"
          rows={5}
          cols={33}
          placeholder="Description"
          // onChange={(e) => setForm({ ...form, description: e.target.value })}

          onChange={handleChange}
          defaultValue={form.description}
          className="text-black"
        ></textarea>
        <label htmlFor="price">Prix :</label>
        <input
          type={"number"}
          id="price"
          name="price"
          min={1.0}
          max={10000.0}
          step={0.1}
          className="text-black"
          // onChange={(e) =>
          //   setForm({ ...form, price: parseFloat(e.target.value) })
          // }

          onChange={handleChange}
        />
        <label htmlFor="promotion">Promotion :</label>
        <input
          type="checkbox"
          name="promotion"
          id="promotion"
          onClick={(e) => setPromotion(e.currentTarget.checked)}
          checked={promotion}
          readOnly
        />
        {promotion && (
          <>
            <label htmlFor="reduction">Reduction du prix (en %) :</label>{" "}
            <input
              type="number"
              id="reduction"
              name="reduction"
              min={1}
              max={70}
              step={1}
              className="text-black"
              // onChange={(e) =>
              //   setForm({ ...form, promo: [parseInt(e.target.value)] })
              // }

              onChange={handleChange}
            />
          </>
        )}

        <label htmlFor="stock">Stock :</label>
        <input
          type="number"
          id="stock"
          name="stock"
          min={1}
          max={10000}
          step={1}
          className="text-black"
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

        <input
          type="submit"
          value="Ajouter"
          // onClick={(e) => {
          //   e.preventDefault();
          //   console.log(e);
          // }}
        />
      </form>
    </Layout>
  );
};

export default Admin;
