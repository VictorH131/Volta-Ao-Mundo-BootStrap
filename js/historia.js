function toggleCard(el) {
            el.classList.toggle("active");
        }

        const items = document.querySelectorAll(".item");

        window.addEventListener("scroll", () => {
            items.forEach(i => {
                const top = i.getBoundingClientRect().top;
                if (top < window.innerHeight - 120) {
                    i.classList.add("show");
                }
            });
        });