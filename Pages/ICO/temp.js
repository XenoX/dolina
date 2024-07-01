document.addEventListener("DOMContentLoaded", () => {
  const dropdownToggle = document.querySelector(".dropdown-toggle");
  const dropdownMenu = document.querySelector(".dropdown-menu");
  const dropdownItems = document.querySelectorAll(".dropdown-arrow");

  dropdownToggle.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      dropdownItems.forEach((i) => i.classList.remove("selected"));
      event.target.classList.add("selected");
      dropdownToggle.textContent = event.target.textContent;
      dropdownMenu.style.display = "none";
      console.log(`Selected currency: ${event.target.dataset.value}`);
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !dropdownToggle.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
});
