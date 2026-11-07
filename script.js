// The content and Discord links work without JavaScript.
document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const desktop = window.matchMedia("(min-width: 768px)");

function setMenuOpen(open, restoreFocus = false) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  if (restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenuOpen(false, true);
  }
  if (
    event.key !== "Tab" ||
    menuButton.getAttribute("aria-expanded") !== "true"
  )
    return;
  const links = [...navigation.querySelectorAll("a")];
  const first = menuButton;
  const last = links.at(-1);
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

desktop.addEventListener("change", () => setMenuOpen(false));

document.querySelector("#copyright-year").textContent = String(
  new Date().getFullYear(),
);
