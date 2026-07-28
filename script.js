const isCharPage = location.pathname.includes("/char/");
const basePath = isCharPage ? "" : "";

//キャラ一覧
const grid = document.getElementById("grid");
if (grid) {
    let draggedCard = null;
    fetch(basePath + "characters.json")
        .then(response => response.json())
        .then(characters => {
            for (let i = characters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [characters[i], characters[j]] = [characters[j], characters[i]];
            }
            characters.forEach(character => {
                const card = document.createElement("a");
                card.className = "card";
                card.href = character.link;
                const img = document.createElement("img");
                img.src = character.image;
                img.alt = character.name;
                img.loading = "lazy";
                const overlay = document.createElement("div");
                overlay.className = "card-overlay";
                const name = document.createElement("span");
                name.className = "chara-name";
                name.textContent = character.name;
                overlay.appendChild(name);
                card.appendChild(img);
                card.appendChild(overlay);
                grid.appendChild(card);
            });
            const isTouchDevice = "ontouchstart" in window;
            if (!isTouchDevice) {
                new Sortable(grid, {
                    animation: 150,
                    ghostClass: "sortable-ghost",
                    dragClass: "sortable-drag",
                    onStart: () => { grid.classList.add("dragging"); },
                    onEnd: () => { grid.classList.remove("dragging"); }
                });
            }
        });
}

// ヘッダー
fetch(basePath + "header.html")
    .then(r => r.text())
    .then(t => {
        const el = document.getElementById("header");
        if (el) el.innerHTML = t;
    });

// フッター
fetch(basePath + "footer.html")
    .then(r => r.text())
    .then(t => {
        const el = document.getElementById("footer");
        if (el) el.innerHTML = t;
    });

// キャラページ用フッター
fetch(basePath + "footer_char.html")
    .then(r => r.text())
    .then(t => {
        const el = document.getElementById("footer_char");
        if (el) el.innerHTML = t;
    });

// ライトボックス
const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

if (lightbox && lightboxImg) {
    images.forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightbox.classList.add("active");
        });
    });

    lightbox.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });
}
