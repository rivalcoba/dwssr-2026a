// Punto de entrada principal para Vite
// Importar estilos
import "./styles/main.css";

// const navbarDropdowns = Array.from(document.querySelectorAll(".navbar .dropdown"));

// if (navbarDropdowns.length > 0) {
//   const closeAllDropdowns = () => {
//     navbarDropdowns.forEach((dropdown) => {
//       dropdown.classList.remove("dropdown-open");
//     });
//   };

//   navbarDropdowns.forEach((dropdown) => {
//     const trigger = dropdown.querySelector(':scope > a[role="button"]');
//     if (!trigger) {
//       return;
//     }

//     trigger.addEventListener("click", (event) => {
//       event.preventDefault();
//       event.stopPropagation();

//       const shouldOpen = !dropdown.classList.contains("dropdown-open");
//       closeAllDropdowns();

//       if (shouldOpen) {
//         dropdown.classList.add("dropdown-open");
//       }
//     });
//   });

//   document.addEventListener("click", (event) => {
//     if (!event.target.closest(".navbar .dropdown")) {
//       closeAllDropdowns();
//     }
//   });

//   document.addEventListener("keydown", (event) => {
//     if (event.key === "Escape") {
//       closeAllDropdowns();
//     }
//   });
// }

// const mobileDrawer = document.getElementById("mobile-drawer");

// if (mobileDrawer instanceof HTMLInputElement) {
//   document.addEventListener("click", (event) => {
//     const sidebarLink = event.target.closest(".drawer-side a");
//     if (sidebarLink) {
//       mobileDrawer.checked = false;
//     }
//   });
// }
