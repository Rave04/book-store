import storage from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Card from "../../components/UI/Card";
import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { BookStoreContext } from "../../context/BookStoreContext";
import { API_URL } from "../../config";
import { v4 as uuidv4 } from "uuid";
import { getActualYear } from "../../helpers";
import { AuthContext } from "../../context/AuthContext";
import usePermissions from "../../hooks/usePermissions";

const AddBookForm = () => {
  const navigate = useNavigate();
  const [isLoading, fetchError, sendRequest] = useFetch();
  const [inputError, setInputError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formToSend, setFormToSend] = useState(false);

  const titleRef = useRef();
  const authorRef = useRef();
  const publishYearRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();

  const { categories } = useContext(BookStoreContext);

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
          console.log(url);
        });
      });
    };
    sendImage();
  }, [image]);

  const sendBookToDatabase = () => {
    const enteredTitle = titleRef.current.value;
    const enteredAuthor = authorRef.current.value;
    const enteredPublishYear = publishYearRef.current.value;
    const enteredPrice = priceRef.current.value;
    const enteredCategory = categoryRef.current.value;
    const titleIsValid = !isEmpty(enteredTitle);
    const authorIsValid = !isEmpty(enteredAuthor);
    const publishYearIsValid = enteredPublishYear > 1700;
    const priceIsValid = enteredPrice > 0;
    const categoryIsValid = !isEmpty(enteredCategory);
    console.log(imageUrl);
    const formIsValid =
      titleIsValid &&
      authorIsValid &&
      publishYearIsValid &&
      priceIsValid &&
      categoryIsValid;

    if (!formIsValid) {
      setInputError(true);
      return;
    } else {
      setInputError(false);
    }

    const newBook = {
      id: uuidv4(),
      title: enteredTitle,
      author: enteredAuthor,
      publishYear: enteredPublishYear,
      price: enteredPrice,
      category: enteredCategory,
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
          <label>Tytuł</label>
          <input ref={titleRef} type="text" />
        </div>
        <div className="formAction">
          <label>Autor</label>
          <input ref={authorRef} type="text" />
        </div>
        <div className="formAction">
          <label>Rok wydania</label>
          <input
            ref={publishYearRef}
            type="number"
            min="1701"
            max={getActualYear()}
          />
        </div>
        <div className="formAction">
          <label>Cena</label>
          <input ref={priceRef} type="number" min="0" step="0.01" />
        </div>
        <div className="formAction">
          <label>Kategoria</label>
          <select ref={categoryRef}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="formAction">
          <label>Zdjęcie okładki</label>
          <input type="file" onChange={handleChangeImage} accept="image/*" />
        </div>
        <button type="submit">Dodaj książkę</button>
      </form>
      {inputError && (
        <p className="errorMessage">
          Dane książki są nieprawidłowe! Rok wydania musi być wyższy niż 1700, a
          cena nie może być równa 0.
        </p>
      )}
    </Card>
  );
};

export default AddBookForm;
