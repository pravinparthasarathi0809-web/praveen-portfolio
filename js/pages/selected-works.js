
/* =========================================================
   SELECTED WORK
   Complete Project Data + Thumbnail + Fallback + Filters
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       01. PROJECT DATA
    ===================================================== */

    const portfolioProjects = [

        // WEB DEVELOPMENT

        {
            category: "web",
            title: "Sarvaa Smile Care",
            type: "Website Design & Development",
            url: "https://www.sarvaasmilecare.com/",
            thumbnail: "website"
        },
        {
            category: "web",
            title: "A-Gun Academy",
            type: "Website Design & Development",
            url: "https://www.agunacademy.com/",
            thumbnail: "website"
        },
        {
            category: "web",
            title: "AR Corporates",
            type: "Website Design & Development",
            url: "https://arcorporates.in/",
            thumbnail: "website"
        },
        {
            category: "web",
            title: "PPS Group",
            type: "Website Design & Development",
            url: "https://ppscorps.in/",
            thumbnail: "website"
        },
        {
            category: "web",
            title: "JMS Industries",
            type: "Website Design & Development",
            url: "https://www.jmsindustries.org/",
            thumbnail: "website"
        },


        // SOCIAL MEDIA CREATIVES

        {
            category: "social",
            title: "Camon by GK Secure Tech",
            type: "Social Media Creative",
            url: "https://www.instagram.com/camon_secure_tech/p/DerXmYIiUU0/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/camon.png"
        },
        {
            category: "social",
            title: "Shridevi Chit Funds",
            type: "Social Media Creative",
            url: "https://www.instagram.com/shridevichitfunds/p/DbViNyRDQiv/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/shridevi.png"
        },
        {
            category: "social",
            title: "AR Corporates",
            type: "Social Media Creative",
            url: "https://www.instagram.com/ar_corporates/p/DZWuwKPiQ53/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/ar-corporates.png"
        },
        {
            category: "social",
            title: "JB Masala",
            type: "Social Media Creative",
            url: "https://www.instagram.com/jb_masala/p/Dc-Qbq7Ae1b/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/jb-masala.png"
        },
        {
            category: "social",
            title: "Footopia",
            type: "Social Media Creative",
            url: "https://www.instagram.com/footopia.official/reel/DcfNi0rzuv3/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/footopia.png"
        },


        // AI VIDEO PRODUCTION

        {
            category: "ai",
            title: "Clips and Narrates",
            type: "AI Video Production",
            url: "https://youtube.com/shorts/O6qm3z-FjnI",
            thumbnail: "youtube"
        },
        {
            category: "ai",
            title: "JB Masala",
            type: "AI Video Production",
            url: "https://youtube.com/shorts/KOVv0Y3ZFXs",
            thumbnail: "youtube"
        },
        {
            category: "ai",
            title: "The Giants App",
            type: "AI Video Production",
            url: "https://youtu.be/a7NGNBOOnes",
            thumbnail: "youtube"
        },
        {
            category: "ai",
            title: "ATHEN",
            type: "AI Video Production",
            url: "https://youtu.be/qCtETP-mW0k",
            thumbnail: "youtube"
        },
        {
            category: "ai",
            title: "Arun Physio Rehab Center",
            type: "AI Video Production",
            url: "https://www.instagram.com/aprc_coimbatore/reel/DeGl0lGTEDy/",
            thumbnail: "local",
            image: "assets/images/portfolio/social/aprc.png"
        },


        // 2D ANIMATION

        {
            category: "animation",
            title: "Neptune Green Energy",
            type: "2D Animation",
            url: "https://youtu.be/g3f5POgInyM",
            thumbnail: "youtube"
        },
        {
            category: "animation",
            title: "TechnoForte",
            type: "2D Animation",
            url: "https://youtu.be/jzuzFwuSg6U",
            thumbnail: "youtube"
        },
        {
            category: "animation",
            title: "Address Developers",
            type: "2D Animation",
            url: "https://youtu.be/ZUsVd0x2f4Y",
            thumbnail: "youtube"
        },
        {
            category: "animation",
            title: "Arun Physio Rehab Center",
            type: "2D Animation",
            url: "https://youtu.be/q6ZUQUC62bQ",
            thumbnail: "youtube"
        },
        {
            category: "animation",
            title: "AR Corporates",
            type: "2D Animation",
            url: "https://youtu.be/BIfBLShq9Ks",
            thumbnail: "youtube"
        }

    ];


    /* =====================================================
       02. CONFIGURATION
    ===================================================== */

    const CONFIG = {
        imageTimeout: 12000,

        screenshotWidth: 1200,

        youtubeQualities: [
            "maxresdefault",
            "hqdefault",
            "mqdefault",
            "default"
        ]
    };


    /* =====================================================
       03. GET YOUTUBE VIDEO ID
    ===================================================== */

    function getYouTubeId(url) {

        try {

            const parsed = new URL(url);

            const host = parsed.hostname.replace("www.", "");

            if (host === "youtu.be") {
                return parsed.pathname
                    .split("/")
                    .filter(Boolean)[0] || null;
            }

            if (
                host === "youtube.com" ||
                host === "m.youtube.com"
            ) {

                if (parsed.pathname.startsWith("/shorts/")) {
                    return parsed.pathname.split("/")[2] || null;
                }

                if (parsed.pathname.startsWith("/embed/")) {
                    return parsed.pathname.split("/")[2] || null;
                }

                return parsed.searchParams.get("v");

            }

            return null;

        } catch (error) {

            console.error("Invalid video URL:", url);

            return null;

        }

    }


    /* =====================================================
       04. GET THUMBNAIL SOURCES
    ===================================================== */

    function getThumbnailSources(project) {

        // LOCAL IMAGE
        if (project.thumbnail === "local") {

            return project.image ? [project.image] : [];

        }


        // WEBSITE SCREENSHOT
        if (project.thumbnail === "website") {

            return [
                `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=${CONFIG.screenshotWidth}`
            ];

        }


        // YOUTUBE THUMBNAILS
        if (project.thumbnail === "youtube") {

            const videoId = getYouTubeId(project.url);

            if (!videoId) return [];

            return CONFIG.youtubeQualities.map(
                quality =>
                    `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
            );

        }

        return [];

    }


    /* =====================================================
       05. FALLBACK PLACEHOLDER
    ===================================================== */

    function showThumbnailFallback(media, project) {

        if (media.querySelector(".work-thumbnail-placeholder")) {
            return;
        }

        media.classList.add("thumbnail-fallback");

        const placeholder = document.createElement("div");

        placeholder.className = "work-thumbnail-placeholder";


        const categoryNames = {
            web: "WEB DEVELOPMENT",
            social: "SOCIAL MEDIA",
            ai: "AI VIDEO PRODUCTION",
            animation: "2D ANIMATION"
        };


        const category = document.createElement("span");

        category.className = "fallback-category";

        category.textContent =
            categoryNames[project.category] || "SELECTED WORK";


        const title = document.createElement("span");

        title.className = "fallback-title";

        title.textContent = project.title;


        const number = document.createElement("span");

        number.className = "fallback-index";

        number.textContent = String(
            portfolioProjects.indexOf(project) + 1
        ).padStart(2, "0");


        placeholder.append(category, title, number);

        media.prepend(placeholder);

    }


    /* =====================================================
       06. LOAD IMAGE
    ===================================================== */

    function loadProjectImage(image, media, project) {

        const sources = getThumbnailSources(project);

        if (!sources.length) {

            image.remove();

            showThumbnailFallback(media, project);

            return;

        }


        let currentIndex = 0;

        let completed = false;

        let timeoutId;


        function finishWithFallback() {

            if (completed) return;

            completed = true;

            clearTimeout(timeoutId);

            image.remove();

            showThumbnailFallback(media, project);

        }


        function tryNextSource() {

            if (completed) return;

            if (currentIndex >= sources.length) {

                finishWithFallback();

                return;

            }

            const source = sources[currentIndex];

            currentIndex++;

            image.src = source;

            clearTimeout(timeoutId);

            timeoutId = window.setTimeout(() => {

                if (completed) return;

                tryNextSource();

            }, CONFIG.imageTimeout);

        }


        image.onload = () => {

            if (completed) return;

            completed = true;

            clearTimeout(timeoutId);

            image.classList.add("thumbnail-loaded");

            media.classList.remove("thumbnail-fallback");

        };


        image.onerror = () => {

            if (completed) return;

            clearTimeout(timeoutId);

            tryNextSource();

        };


        tryNextSource();

    }


    /* =====================================================
       07. CREATE PROJECT CARD
    ===================================================== */

    function createProjectCard(project, index) {

        const card = document.createElement("article");

        card.className = "work-card reveal";


        // PROJECT LINK

        const link = document.createElement("a");

        link.className = "work-card-link";

        link.href = project.url;

        link.target = "_blank";

        link.rel = "noopener noreferrer";

        link.setAttribute(
            "aria-label",
            `View ${project.title}`
        );


        // MEDIA

        const media = document.createElement("div");

        media.className = "work-card-media";


        // IMAGE

        const image = document.createElement("img");

        image.className = "work-card-image";

        image.alt = `${project.title} project preview`;

        image.loading = "lazy";

        image.decoding = "async";


        // Append before setting image source

        media.appendChild(image);

        loadProjectImage(image, media, project);


        // VIEW LABEL

        const view = document.createElement("span");

        view.className = "work-view";

        view.textContent = "VIEW PROJECT ↗";

        media.appendChild(view);


        // INFORMATION

        const info = document.createElement("div");

        info.className = "work-card-info";


        const title = document.createElement("h3");

        title.textContent = project.title;


        const type = document.createElement("span");

        type.textContent = project.type;


        const number = document.createElement("span");

        number.className = "work-card-number";

        number.textContent = String(index + 1).padStart(2, "0");


        info.append(title, type, number);

        link.append(media, info);

        card.appendChild(link);


        return card;

    }


    /* =====================================================
       08. RENDER PROJECTS
    ===================================================== */

    function renderProjects(category = "web") {

        const grid = document.getElementById("workGrid");

        if (!grid) {

            console.warn(
                "Selected Work: #workGrid element not found."
            );

            return;

        }


        const filteredProjects = portfolioProjects.filter(
            project => project.category === category
        );


        grid.innerHTML = "";


        if (!filteredProjects.length) {

            const empty = document.createElement("p");

            empty.className = "work-empty";

            empty.textContent =
                "No projects available in this category.";

            grid.appendChild(empty);

            return;

        }


        const fragment = document.createDocumentFragment();


        filteredProjects.forEach((project, index) => {

            fragment.appendChild(
                createProjectCard(project, index)
            );

        });


        grid.appendChild(fragment);


        requestAnimationFrame(() => {

            grid.querySelectorAll(".work-card").forEach(card => {

                card.classList.add("is-visible");

            });

        });

    }


    /* =====================================================
       09. CATEGORY FILTERS
    ===================================================== */

    function initWorkFilters() {

        const filters = document.querySelectorAll(".work-filter");

        filters.forEach(button => {

            // Prevent duplicate initialization

            if (button.dataset.workInitialized === "true") {
                return;
            }

            button.dataset.workInitialized = "true";


            button.addEventListener("click", () => {

                const category = button.dataset.category;

                if (!category) return;


                filters.forEach(item => {

                    item.classList.remove("active");

                });


                button.classList.add("active");

                renderProjects(category);

            });

        });

    }


    /* =====================================================
       10. INITIALIZE
    ===================================================== */

    function initSelectedWork() {

        const grid = document.getElementById("workGrid");

        if (!grid) return;


        initWorkFilters();


        const activeFilter = document.querySelector(
            ".work-filter.active"
        );


        const initialCategory =
            activeFilter?.dataset.category || "web";


        renderProjects(initialCategory);


        console.log(
            `Selected Work initialized: ${portfolioProjects.length} projects`
        );

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initSelectedWork,
            { once: true }
        );

    } else {

        initSelectedWork();

    }

})();
