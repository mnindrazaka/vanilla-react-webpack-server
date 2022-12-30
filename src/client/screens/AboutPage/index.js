import Link from "../../components/Link";

export default function AboutPage(props) {
  const linkHome = Link({
    href: "/home",
    label: "Back to Home",
    onClick: props.onLinkHomeClick,
  });

  const p = document.createElement("p");
  p.textContent = "Welcome to About Page";

  const div = document.createElement("div");
  div.appendChild(linkHome);
  div.appendChild(p);
  return div;
}
