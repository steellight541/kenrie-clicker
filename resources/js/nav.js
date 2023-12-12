function navVisibility(div) {
    let sibling = div.nextElementSibling;
    sibling.style.display = sibling.style.display !== "none" ? "none" : "flex";

    let section = document.querySelector("section");
    let x = section.style.getPropertyValue("width");
    section.style.setProperty("width", x == "var(--section-nav-hidden)" ? "var(--section-nav-visible)" : "var(--section-nav-hidden)");
}