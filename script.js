const grid = document.getElementById("grid");

let draggedCard = null;

fetch("characters.json")
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
        new Sortable(grid, {
            animation: 150,
            ghostClass: "sortable-ghost",
            dragClass: "sortable-drag",
            delay: 200,
            delayOnTouchOnly: true,
            touchStartThreshold: 5,
            onStart: () => { grid.classList.add("dragging"); },
            onEnd: () => { grid.classList.remove("dragging"); }
        });
    });

fetch("header.html")
    .then(r => r.text())
    .then(t => document.getElementById("header").innerHTML = t);

fetch("footer.html")
    .then(r => r.text())
    .then(t => document.getElementById("footer").innerHTML = t);