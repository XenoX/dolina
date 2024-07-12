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
  body.parentNode.insertBefore(footerElement, null);

  const footerStyleElement = document.createElement("style");
  footerStyleElement.type = "text/css";
  footerStyleElement.textContent = components.footerCSS;
  document.head.appendChild(footerStyleElement);

  const navbarElement = document.createElement("header");
  navbarElement.innerHTML = components.navbarHTML;
  body.parentNode.insertBefore(navbarElement, body);

  navbar();

  const navbarStyleElement = document.createElement("style");
  navbarStyleElement.type = "text/css";
  navbarStyleElement.textContent = components.navbarCSS;
  document.head.appendChild(navbarStyleElement);
}
window.addEventListener("DOMContentLoaded", injectComponents);

//---------- fonction qui gère le comportement de la navbar en responsive
function navbar() {
  const navbarMobileButton = document.querySelector(".navbar-mobile");
  const navbarMobileCloseButton = document.querySelector(
    ".navbar__mobile-menu__close-item"
  );
  const mobileMenu = document.querySelector(".navbar__mobile-menu");

  navbarMobileButton.addEventListener("click", () => {
    mobileMenu.classList.add("active");
  });

  navbarMobileCloseButton.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });

  // Fonction pour vérifier et ajuster les logos en fonction de la largeur de la fenêtre
  function checkWindowSize() {
    if (window.innerWidth <= 576) {
      // Vérifiez si les logos sont déjà ajoutés pour éviter les doublons
      if (
        !document.querySelector(".google-logo") &&
        !document.querySelector(".apple-logo")
      ) {
        const googleLogo = document.createElement("img");
        const googleLogoLink = document.createElement("a");
        googleLogoLink.href =
          "https://play.google.com/store/apps/details?id=com.Threevision.AnazirGame";
        googleLogo.src = "../../../assets/google-store-logo.png";
        googleLogo.alt = "Logo du google play store";
        googleLogo.classList.add("google-logo"); // Ajout d'une classe pour vérification future
        googleLogoLink.appendChild(googleLogo);
        mobileMenu.appendChild(googleLogoLink);

        const appleLogoLink = document.createElement("a");
        appleLogoLink.href =
          "https://apps.apple.com/us/app/anazir-td-arena-tower-defense/id6450485930?uo=2";
        const appleLogo = document.createElement("img");
        appleLogo.src = "../../../assets/apple-store-logo.png";
        appleLogo.alt = "Logo de l'apple store";
        appleLogo.classList.add("apple-logo"); // Ajout d'une classe pour vérification future
        appleLogoLink.appendChild(appleLogo);
        mobileMenu.appendChild(appleLogoLink);
      }
    } else {
      // Supprimez les logos si la largeur de la fenêtre est supérieure à 576px
      const googleLogo = document.querySelector(".google-logo");
      const appleLogo = document.querySelector(".apple-logo");
      if (googleLogo) googleLogo.parentElement.remove();
      if (appleLogo) appleLogo.parentElement.remove();
    }
  }

  // Vérification de la taille de la fenêtre au chargement de la page
  checkWindowSize();

  // Vérification la taille de la fenêtre à chaque redimensionnement
  window.addEventListener("resize", checkWindowSize);
}
