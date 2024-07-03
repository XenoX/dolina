async function fetchComponents() {
  const footerHTML = await fetch("../../components/footer/footer.html").then(
    (response) => response.text()
  );
  const footerCSS = await fetch("../../components/footer/footer.css").then(
    (response) => response.text()
  );

  // Assuming navbar is also in the components directory:
  const navbarHTML = await fetch("../../components/navbar/navbar.html").then(
    (response) => response.text()
  );
  const navbarCSS = await fetch("../../components/navbar/navbar.css").then(
    (response) => response.text()
  );

  return {
    footerHTML,
    footerCSS,
    navbarHTML,
    navbarCSS,
  };
}

async function injectComponents() {
  const components = await fetchComponents();
  const body = document.body;

  const footerElement = document.createElement("footer");
  footerElement.innerHTML = components.footerHTML;
  body.parentNode.insertBefore(footerElement, null); // Insert before body // Create style element for navbar CSS

  const footerStyleElement = document.createElement("style");
  footerStyleElement.type = "text/css";
  footerStyleElement.textContent = components.footerCSS;
  document.head.appendChild(footerStyleElement);

  const navbarElement = document.createElement("header");
  navbarElement.innerHTML = components.navbarHTML;
  body.parentNode.insertBefore(navbarElement, body); // Insert before body // Create style element for navbar CSS

  const navbarStyleElement = document.createElement("style");
  navbarStyleElement.type = "text/css";
  navbarStyleElement.textContent = components.navbarCSS;
  document.head.appendChild(navbarStyleElement);
}

window.addEventListener("DOMContentLoaded", injectComponents);
