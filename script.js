const search = document.getElementById("search");
const body = document.getElementById("cards");
const card = document.getElementById("card");

async function Paises() {

    try {

        const res = await fetch("restcountries.com");
        const data = await res.json();
        console.log(data);

    } catch (err) {

        console.error("Um erro interno aconteceu");
        card.textContent = "Erro interno";

    }

}

search.addEventListener("input", () => {
    const key = search.value.toLowerCase().trim();
    const cardRender = body.cloneNode(true);

    cardRender.removeAttribute("id");

    body.appendChild(cardRender);


    console.log(key);
});

Paises();