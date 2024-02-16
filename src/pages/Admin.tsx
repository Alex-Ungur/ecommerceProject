import React, { useState } from "react";
import Layout from "../layout";
import { useQuery } from "@tanstack/react-query";
import { getCategories, setProduct } from "../api/Products";
import { storage } from "../firebase/firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuid4 } from "uuid";

type CategoryData = {
  [id: string]: {
    name: string;
    id: string;
  };
};

const Admin = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    image: File,
    price: 1,
    promo: [0],
    rating: {
      count: 0,
      rate: 0,
    },
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

  const handleForm = async (e) => {
    e.preventDefault();
    if (form.image) {
      const imgName = form.image.name + uuid4();
      const imageRef = ref(storage, `produits/${imgName}`);
      try {
        await uploadBytes(imageRef, form.image).then(() => {
          alert("image uploadée");
        });
      } catch (err) {
        console.error(err);
      }
    }
    console.log("form", form);
    setProduct(form);
  };
  console.log(categories);

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
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />
        <label htmlFor="category">Categorie</label>
        <select
          className="py-1 px-2"
          id="category"
          name="category"
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          value={form.category} // Assurez-vous de contrôler la valeur de la liste déroulante
        >
          <option value="">Tous</option> {/* Option par défaut */}
          {categories?.map((category: any) => (
            <option key={category.id} value={category.name}>
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
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <label htmlFor="description">Description du produit :</label>

        <textarea
          id="description"
          name="description"
          rows={5}
          cols={33}
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          defaultValue={form.description}
        ></textarea>
        <label htmlFor="price">Prix :</label>
        <input
          type="number"
          id="price"
          name="price"
          min="1.00"
          max="10000.00"
          step="0.10"
          onChange={(e) =>
            setForm({ ...form, price: parseFloat(e.target.value) })
          }
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
              onChange={(e) =>
                setForm({ ...form, promo: [parseInt(e.target.value)] })
              }
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
          onChange={(e) =>
            setForm((prevForm) => ({
              ...prevForm,
              rating: {
                ...prevForm.rating,
                count: parseInt(e.target.value),
              },
            }))
          }
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
