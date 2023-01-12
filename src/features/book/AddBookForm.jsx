import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import storage from "../../firebase-config";
import { v4 as uuidv4 } from "uuid";
import { BookStoreContext } from "../../context/BookStoreContext";
import useFetch from "../../hooks/useFetch";
import usePermissions from "../../hooks/usePermissions";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import { API_URL } from "../../config";
import { getActualYear } from "../../helpers";

const AddBookForm = () => {
  const navigate = useNavigate();
  const { sendRequest } = useFetch();
  const [inputError, setInputError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formToSend, setFormToSend] = useState(false);
  const { categories } = useContext(BookStoreContext);

  const titleRef = useRef();
  const authorRef = useRef();
  const publishYearRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  usePermissions(false);

  const isEmpty = (value) => value.toString().trim() === "";
  const clearInputs = () => {
    titleRef.current.value = "";
    authorRef.current.value = "";
    publishYearRef.current.value = null;
    priceRef.current.value = null;
    categoryRef.current.value = "Fantasy";
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const sendImage = () => {
      if (!image) return;

      const storageRef = ref(storage, `images/${image.name}`);
      uploadBytes(storageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrl(url);
        });
      });
    };
    sendImage();
  }, [image]);

  const validateFormInputs = () => {
    const titleIsValid = !isEmpty(titleRef.current.value);
    const authorIsValid = !isEmpty(authorRef.current.value);
    const publishYearIsValid = publishYearRef.current.value > 1700;
    const priceIsValid = priceRef.current.value > 0;
    const categoryIsValid = !isEmpty(categoryRef.current.value);
    const imageIsValid = imageUrl.length > 0;

    return (
      titleIsValid &&
      authorIsValid &&
      publishYearIsValid &&
      priceIsValid &&
      categoryIsValid &&
      imageIsValid
    );
  };
  const sendBookToDatabase = () => {
    const formIsValid = validateFormInputs();
    if (!formIsValid) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }

    const newBook = {
      id: uuidv4(),
      title: titleRef.current.value,
      author: authorRef.current.value,
      publishYear: publishYearRef.current.value,
      price: priceRef.current.value,
      category: categoryRef.current.value,
      image: imageUrl,
    };

    clearInputs();
    sendRequest({
      method: "POST",
      url: `${API_URL}/books.json`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    navigate("/");
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (imageUrl.trim().length === 0) {
      setInputError(true);
    }
    setFormToSend(true);
  };

  useEffect(() => {
    if (formToSend) {
      sendBookToDatabase();
      setFormToSend(false);
    }
  }, [imageUrl]);

  return (
    <Card className="cardForm">
      <form onSubmit={handleAddBook}>
        <div className="formAction">
          <label htmlFor="title">Tytuł</label>
          <input ref={titleRef} id="title" type="text" />
        </div>
        <div className="formAction">
          <label htmlFor="author">Autor</label>
          <input ref={authorRef} id="author" type="text" />
        </div>
        <div className="formAction">
          <label htmlFor="publishYear">Rok wydania</label>
          <input
            ref={publishYearRef}
            id="publishYear"
            type="number"
            min="1701"
            max={getActualYear()}
          />
        </div>
        <div className="formAction">
          <label htmlFor="price">Cena</label>
          <input ref={priceRef} id="price" type="number" min="0" step="0.01" />
        </div>
        <div className="formAction">
          <label htmlFor="category">Kategoria</label>
          <select ref={categoryRef} htmlFor="category">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="formAction">
          <label htmlFor="coverImage">Zdjęcie okładki</label>
          <input
            type="file"
            id="coverImage"
            onChange={handleChangeImage}
            accept="image/*"
          />
        </div>
        <Button type="submit">Dodaj książkę</Button>
      </form>
      {inputError && (
        <p className="errorMessage">Dane książki są nieprawidłowe!</p>
      )}
    </Card>
  );
};

export default AddBookForm;
