const footerTemplate = `
  <footer class="footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <a class="footer-brand" href="index.html"><span class="brand-mark">KE</span> Kapse Engineering</a>
          <p>Precision engineering company in Waluj MIDC for CNC machining, tool room work, heavy machine maintenance, dynamic balancing and industrial automation services.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="https://wa.me/919370707113" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h3>Quick Links</h3>
          <a href="about.html">About</a>
          <a href="services.html">Services</a>
          <a href="gallery.html">Gallery</a>
          <a href="clients.html">Clients</a>
          <a href="contact.html">Contact</a>
          <a href="admin.html">Admin</a>
        </div>
        <div class="col-6 col-lg-3">
          <h3>Contact</h3>
          <p>9370707113<br>7588165620<br>7020976602<br>9665489315</p>
          <p>kapseengineering07@gmail.com</p>
          <p>Waluj MIDC, Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>
        <div class="col-lg-3">
          <h3>Map</h3>
          <iframe title="Waluj MIDC map" src="https://www.google.com/maps?q=Waluj%20MIDC%2C%20Chhatrapati%20Sambhajinagar%2C%20Maharashtra&output=embed" loading="lazy"></iframe>
        </div>
      </div>
      <div class="copyright">© <span data-year></span> Kapse Engineering. All rights reserved.</div>
    </div>
  </footer>
`;

const defaultProducts = [
  { name: "Collet Flange", description: "Precision collet flange for industrial machine assemblies.", image: "assets/products.svg" },
  { name: "PPE Flange", description: "Robust flange machining for plant and maintenance requirements.", image: "assets/products.svg" },
  { name: "Drive Shaft", description: "Custom drive shaft manufacturing and repair support.", image: "assets/products.svg" },
  { name: "Split Coupling Hub", description: "Split coupling hub components made for precise fitment.", image: "assets/maintenance.svg" },
  { name: "V-Belt Pulley", description: "V-belt pulley machining and maintenance for drive systems.", image: "assets/automation.svg" },
  { name: "Flange Assembly", description: "Machined flange assembly for industrial machinery.", image: "assets/products.svg" },
  { name: "Collet Ring", description: "Accurate collet ring manufacturing for tool holding applications.", image: "assets/tool-room.svg" },
  { name: "Ram Holder", description: "Ram holder components manufactured for rugged machine use.", image: "assets/balancing.svg" },
  { name: "Roller Groove", description: "Roller groove machining, finishing and repair work.", image: "assets/automation.svg" },
  { name: "Shaft", description: "Shaft manufacturing and repair for rotating industrial equipment.", image: "assets/cnc.svg" },
  { name: "Taper Die", description: "Precision taper die and split die tool room work.", image: "assets/tool-room.svg" },
  { name: "Custom Machine Parts", description: "Custom mechanical components for maintenance and production.", image: "assets/products.svg" }
];

const getProducts = () => {
  const saved = localStorage.getItem("kapseProducts");
  return saved ? JSON.parse(saved) : defaultProducts;
};

const setProducts = products => localStorage.setItem("kapseProducts", JSON.stringify(products));

// ========== MOBILE MENU HANDLING =========
// Close hamburger menu when a link is clicked (mobile only)
const navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.getElementById("mainNav");

if (navbarCollapse) {
  document.querySelectorAll(".navbar-nav .nav-link, .navbar-nav .btn").forEach(link => {
    link.addEventListener("click", () => {
      if (navbarToggler && navbarCollapse.classList.contains("show")) {
        navbarToggler.click();
      }
    });
  });
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (navbarCollapse && navbarCollapse.classList.contains("show")) {
    if (!e.target.closest(".navbar")) {
      navbarToggler?.click();
    }
  }
});

// ========== PAGE LOAD AND ANIMATIONS =========
window.addEventListener("load", () => {
  document.querySelector(".loader")?.classList.add("loaded");
});

document.querySelectorAll("[data-footer]").forEach(slot => {
  slot.outerHTML = footerTemplate;
});

document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ========== NAVIGATION SCROLL EFFECT =========
const nav = document.querySelector("[data-nav]");
const setNavState = () => nav?.classList.toggle("scrolled", window.scrollY > 20);
setNavState();
window.addEventListener("scroll", setNavState, { passive: true });

// ========== PREVENT BODY SCROLL ON MOBILE WHEN MENU OPEN =========
let isMenuOpen = false;
if (navbarToggler) {
  navbarToggler.addEventListener("click", () => {
    isMenuOpen = !isMenuOpen;
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const target = entry.target;
    const finalValue = Number(target.dataset.count || "0");
    let current = 0;
    const step = Math.max(1, Math.ceil(finalValue / 48));
    const timer = setInterval(() => {
      current += step;
      if (current >= finalValue) {
        current = finalValue;
        clearInterval(timer);
      }
      target.textContent = `${current}${finalValue === 24 ? "/7" : "+"}`;
    }, 24);
    countObserver.unobserve(target);
  });
}, { threshold: 0.4 });

document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

function renderProducts() {
  document.querySelectorAll("[data-product-grid]").forEach(grid => {
    grid.innerHTML = getProducts().map((product, index) => `
      <article class="product-card" data-animate>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="body">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="actions">
            <button class="btn btn-outline-orange btn-sm" data-product-modal="${index}" type="button">View</button>
            <a class="btn btn-orange btn-sm" href="contact.html?product=${encodeURIComponent(product.name)}">Inquiry</a>
          </div>
        </div>
      </article>
    `).join("");
    grid.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
  });
}
renderProducts();

document.addEventListener("click", event => {
  const modalButton = event.target.closest("[data-product-modal]");
  if (modalButton) {
    if (!document.getElementById("productModal")) return;
    const product = getProducts()[Number(modalButton.dataset.productModal)];
    document.querySelector("[data-modal-image]").src = product.image;
    document.querySelector("[data-modal-image]").alt = product.name;
    document.querySelector("[data-modal-title]").textContent = product.name;
    document.querySelector("[data-modal-text]").textContent = product.description;
    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  }
});

document.querySelectorAll("[data-email-form]").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`${data.get("formType") || "Inquiry"} - ${data.get("subject") || "Kapse Engineering"}`);
    const body = encodeURIComponent([
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Subject / Service: ${data.get("subject") || ""}`,
      "",
      data.get("message") || ""
    ].join("\n"));
    window.location.href = `mailto:kapseengineering07@gmail.com?subject=${subject}&body=${body}`;
  });
});

const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-gallery] button");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    galleryItems.forEach(item => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
galleryItems.forEach(item => {
  item.addEventListener("click", () => {
    lightbox.querySelector("img").src = item.dataset.full;
    lightbox.classList.add("open");
  });
});
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox || event.target.closest("button")) lightbox.classList.remove("open");
});

const adminForm = document.querySelector("[data-admin-form]");
adminForm?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(adminForm);
  const products = getProducts();
  products.unshift({
    name: data.get("name"),
    description: data.get("description"),
    image: data.get("image")
  });
  setProducts(products);
  adminForm.reset();
  renderProducts();
});

document.querySelector("[data-reset-products]")?.addEventListener("click", () => {
  localStorage.removeItem("kapseProducts");
  renderProducts();
});
