(() => {
  "use strict";

  /*
   * =========================================================
   * DYNAMIC EXPERIENCE
   * =========================================================
   *
   * Employment start date:
   * December 30, 2024
   *
   * The displayed experience automatically updates over time.
   */

  const START_DATE = new Date("2024-12-30T00:00:00+05:30");

  function calculateExperience(startDate) {
    const now = new Date();

    let totalMonths =
      (now.getFullYear() - startDate.getFullYear()) * 12 +
      (now.getMonth() - startDate.getMonth());

    /*
     * If the current day has not reached the start-date day,
     * the current month is not counted as a completed month.
     */
    if (now.getDate() < startDate.getDate()) {
      totalMonths--;
    }

    totalMonths = Math.max(0, totalMonths);

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    /*
     * Display format:
     *
     * 1 year 7 months
     * 1 year 8 months
     * 2 years
     *
     * This is more accurate than displaying
     * "1.5+ years" indefinitely.
     */
    let display;

    if (years === 0) {
      display = `${months} months`;
    } else if (months === 0) {
      display = `${years} ${years === 1 ? "year" : "years"}`;
    } else {
      display = `${years} ${years === 1 ? "year" : "years"} ${months} months`;
    }

    return {
      years,
      months,
      totalMonths,
      display
    };
  }


  function updateExperience() {
    const experience = calculateExperience(START_DATE);

    /*
     * Hero:
     * Example:
     * "1 year 7 months"
     */
    document
      .querySelectorAll("#heroExperience")
      .forEach(element => {
        element.textContent = experience.display;
      });


    /*
     * About section:
     * Example:
     * "1 year 7 months"
     */
    document
      .querySelectorAll("#aboutExperience")
      .forEach(element => {
        element.textContent = experience.display;
      });
  }


  updateExperience();


  /*
   * =========================================================
   * FOOTER YEAR
   * =========================================================
   */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /*
   * =========================================================
   * MOBILE NAVIGATION
   * =========================================================
   */

  const menuButton = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  menuButton?.addEventListener("click", () => {
    const isOpen = mobileNav?.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(Boolean(isOpen))
    );
  });


  mobileNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {

      mobileNav.classList.remove("open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

    });
  });


  /*
   * =========================================================
   * DESKTOP NAVIGATION
   * =========================================================
   *
   * Automatically highlights the navigation item
   * corresponding to the section currently visible.
   */

  const navLinks = [
    ...document.querySelectorAll(".desktop-nav a")
  ];

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];


  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


  sections.forEach(section => {
    observer.observe(section);
  });

})();