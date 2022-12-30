import ProductItem from "./ProductItem";

export default function ProductList(props) {
  const items = props.products.map((product) =>
    ProductItem({ title: product.title })
  );

  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading Products...";

  const emptyText = document.createElement("p");
  emptyText.textContent = "Product Empty";

  const errorText = document.createElement("p");
  errorText.textContent = props.errorMessage;

  const div = document.createElement("div");

  if (props.tag === "loading") {
    div.append(loadingText);
  } else if (props.tag === "error") {
    div.append(errorText);
  } else if (props.tag === "empty") {
    div.append(emptyText);
  } else if (props.tag === "loaded") {
    div.append(...items);
  }

  return div;
}
