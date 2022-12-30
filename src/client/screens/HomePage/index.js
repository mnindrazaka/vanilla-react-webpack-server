import { React } from "../../React";
import Navbar from "../../components/Navbar";
import ProductSearchInput from "./ProductSearchInput";
import ProductList from "./ProductList";

function reducer(prevState, action) {
  switch (prevState.tag) {
    case "idle": {
      switch (action.type) {
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loading": {
      switch (action.type) {
        case "FETCH_SUCCESS": {
          return {
            ...prevState,
            tag: "loaded",
            errorMessage: "",
            products: action.payload.products,
          };
        }
        case "FETCH_EMPTY": {
          return {
            ...prevState,
            tag: "empty",
            errorMessage: "",
            products: [],
          };
        }
        case "FETCH_ERROR": {
          return {
            ...prevState,
            tag: "error",
            errorMessage: action.payload.errorMessage,
            products: [],
          };
        }
        default: {
          return prevState;
        }
      }
    }
    case "loaded": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        default: {
          return prevState;
        }
      }
    }
    case "empty": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        default: {
          return prevState;
        }
      }
    }
    case "error": {
      switch (action.type) {
        case "CHANGE_INPUT": {
          return {
            ...prevState,
            inputValue: action.payload.inputValue,
          };
        }
        case "CLEAR_INPUT": {
          return {
            ...prevState,
            inputValue: "",
          };
        }
        case "FETCH": {
          return { ...prevState, tag: "loading" };
        }
        default: {
          return prevState;
        }
      }
    }
    default: {
      return prevState;
    }
  }
}

export default function HomePage(props) {
  const [state, send] = React.useReducer(reducer, {
    inputValue: localStorage.getItem("inputValue") ?? "",
    tag: "idle",
    products: [],
    errorMessage: "",
  });

  React.useEffect(() => {
    localStorage.setItem("inputValue", state.inputValue);
  }, [state.inputValue]);

  React.useEffect(() => {
    switch (state.tag) {
      case "idle": {
        send({ type: "FETCH" });
        break;
      }
      case "loading": {
        fetch("https://dummyjson.com/products/search?q=" + state.inputValue)
          .then((res) => res.json())
          .then((data) => {
            if (data.products.length === 0) {
              send({ type: "FETCH_EMPTY" });
            } else {
              send({
                type: "FETCH_SUCCESS",
                payload: { products: data.products },
              });
            }
          })
          .catch((err) => {
            send({
              type: "FETCH_ERROR",
              payload: { errorMessage: err.message },
            });
          });
        break;
      }
    }
  }, [state.tag, state.inputValue]);

  const navbar = Navbar({
    onLinkHomeClick: props.onLinkHomeClick,
    onLinkAboutClick: props.onLinkAboutClick,
  });

  const productSearchInput = ProductSearchInput({
    inputValue: state.inputValue,
    tag: state.tag,
    onInputChange: (newInputValue) =>
      send({
        type: "CHANGE_INPUT",
        payload: { inputValue: event.target.value },
      }),
    onButtonClearClick: () => send({ type: "CLEAR_INPUT" }),
    onButtonSubmitClick: () => send({ type: "FETCH" }),
  });

  const productList = ProductList({
    products: state.products,
    tag: state.tag,
    errorMessage: state.errorMessage,
  });

  const p = document.createElement("p");
  p.textContent = "Welcome to Home Page";

  const textPreview = document.createElement("p");
  textPreview.textContent = state.inputValue;

  const div = document.createElement("div");
  div.append(navbar);
  div.append(p);
  div.append(productSearchInput);
  div.append(textPreview);
  div.append(productList);

  return div;
}
