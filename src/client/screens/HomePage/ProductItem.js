export default function ProductItem(props) {
  const titleText = document.createElement("p");
  titleText.textContent = props.title;
  return titleText;
}
