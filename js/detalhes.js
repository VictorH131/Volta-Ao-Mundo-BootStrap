const params = new URLSearchParams(window.location.search);
const nome = params.get("lugar");

const lugar = lugares.find(l => l.nome === nome);
const idLugar = lugares.findIndex(l => l.nome === nome);

// Garante que os comentários fake existam
if (Object.keys(dados).length === 0) {
    gerarComentariosFake();
}

if (lugar) {

    document.getElementById("titulo").innerText = lugar.nome;
    document.getElementById("duracao").innerText = lugar.duracao;
    document.getElementById("tipo").innerText = lugar.tipo;

    document.getElementById("descricao").innerText =
        "Explorar " + lugar.nome + " é uma experiência inesquecível. Este destino combina história rica, cultura vibrante e paisagens impressionantes.";

    let carousel = document.getElementById("carouselImgs");

    lugar.imagens.forEach((img, i) => {
        carousel.innerHTML += `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="${img}" class="d-block w-100">
            </div>
        `;
    });

    document.getElementById("rating").innerHTML = calcularMedia(idLugar);

    document.getElementById("btnMapa").onclick = () => {
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lugar.nome + " Itália")}`);
    };

    renderComentariosDetalhe(idLugar);

} else {
    document.body.innerHTML = `<h2 class="text-center mt-5 text-danger">Lugar não encontrado</h2>`;
}

function renderComentariosDetalhe(id) {
    const lista = document.getElementById("listaComentarios");

    if (!dados[id] || dados[id].length === 0) {
        lista.innerHTML = `<p class="text-muted small">Ainda não há comentários.</p>`;
        return;
    }

    lista.innerHTML = dados[id].map((c, i) => `
        <div class="bg-light p-2 rounded mb-2 small">
            
            <b>${c.autor}</b> - ${"⭐".repeat(c.nota)}<br>
            ${c.texto}

            <div class="mt-1">

                <span onclick="like(${id},${i})" style="cursor:pointer;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.90.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                    </svg> ${c.likes}
                </span>

                <span onclick="dislike(${id},${i})" style="cursor:pointer; margin-left:10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                        <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964z"/>
                    </svg> ${c.dislikes}
                </span>

            </div>

        </div>
    `).join("");
}

function like(id, i) {
    dados[id][i].likes++;
    renderComentariosDetalhe(id);
    document.getElementById("rating").innerHTML = calcularMedia(id);
}

function dislike(id, i) {
    dados[id][i].dislikes++;
    renderComentariosDetalhe(id);
    document.getElementById("rating").innerHTML = calcularMedia(id);
}

function addComentario() {
    const input = document.getElementById("comentario");
    const texto = input.value.trim();

    const notaEl = document.querySelector('input[name="rating"]:checked');

    if (!texto || !notaEl) return;

    if (!dados[idLugar]) dados[idLugar] = [];

    dados[idLugar].push({
        autor: guest,
        texto,
        nota: parseInt(notaEl.value),
        likes: 0,
        dislikes: 0
    });

    input.value = "";

    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);


    renderComentariosDetalhe(idLugar);
    document.getElementById("rating").innerHTML = calcularMedia(idLugar);
}

function calcularMedia(id) {
    if (!dados[id] || dados[id].length === 0) return "☆☆☆☆☆ (0.0)";

    let soma = dados[id].reduce((total, c) => total + c.nota, 0);
    let media = (soma / dados[id].length).toFixed(1);

    let estrelas = "★".repeat(Math.round(media)) + "☆".repeat(5 - Math.round(media));

    return `${estrelas} <span class="text-muted">(${media})</span>`;
}