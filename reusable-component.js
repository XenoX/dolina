async function fetchComponents() {
  const footerHTML = await fetch("../../footer/footer.html").then((response) =>
    response.text()
  );
  const footerCSS = await fetch("../../footer/footer.css").then((response) => {
    response.text();
  });

  const navbarHTML = await fetch("../../navbar/navbar.html").then((response) =>
    response.text()
  );
  const navbarCSS = await fetch("../../navbar/navbar.css").then((response) =>
    response.text()
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
  const body = document.body; // Create footer element and inject HTML after closing body tag for "footer"

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
