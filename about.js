const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    { transform: `translate(${nextPercentage}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentage}% center` },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Use pointer events (works for mouse + touch) -- */
window.onpointerdown = e => handleOnDown(e);
window.onpointerup = e => handleOnUp(e);
window.onpointermove = e => handleOnMove(e);

/* Code above should not be touched */
function toggleNav() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('is-active');
}

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Function to adjust layout based on screen size
function checkScreenSize() {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const navLinks = document.querySelector(".navbar-menu");

  // Adjust layout styles based on screen width
  navLinks.style.flexDirection = isMobile ? "column" : "row";
}

// Call the function on page load and on window resize
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);

// Call animations on page load (AOS Init)
document.addEventListener("DOMContentLoaded", () => {
  AOS.init(); // Initialize AOS (animation on scroll)
});

if (window.innerWidth <= 768) {
  // Disable or adjust smooth scrolling on mobile for better performance
  document.documentElement.style.scrollBehavior = 'auto'; // Reset smooth scrolling if needed
} else {
  document.documentElement.style.scrollBehavior = 'smooth';
}