/* =====================================
   HERO INTERACTIONS
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    // Scroll Reveal
    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    // Hero Background Parallax
    const hero = document.querySelector(".hero");
    const background = document.querySelector(".hero-background");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hero && background && !reducedMotion) {

        hero.addEventListener("pointermove", (event) => {

            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            background.style.transform = `
                scale(1.08)
                translate(${x * -12}px, ${y * -12}px)
            `;

        });

        hero.addEventListener("pointerleave", () => {

            background.style.transform = "scale(1.05)";

        });

    }

});


/* =====================================
   SELECTED WORK FILTER
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".work-filter");
    const workCards = document.querySelectorAll(".work-card");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Active filter
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter projects
            workCards.forEach((card) => {

                const category = card.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    category === selectedFilter;

                card.classList.toggle("is-hidden", !shouldShow);

            });

        });

    });

});
