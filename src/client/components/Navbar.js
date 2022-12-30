import Link from "./Link";

export default function Navbar(props) {
  const linkHome = Link({
    href: "/home",
    label: "Home",
    onClick: props.onLinkHomeClick,
  });
  const linkAbout = Link({
    href: "/about",
    label: "About",
    onClick: props.onLinkAboutClick,
  });

  const div = document.createElement("div");
  div.append(linkHome);
  div.append(linkAbout);

  return div;
}
