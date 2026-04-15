const guest = "Guest#6967";
let dados = {};

const comentariosFake = [
    "Lugar incrível, vale muito a pena!",
    "Experiência sensacional, recomendo demais.",
    "Fui e com certeza voltaria novamente.",
    "Muito bonito, perfeito pra fotos.",
    "Um dos melhores passeios que já fiz.",
    "Vale cada minuto, simplesmente incrível."
];

const lugares = [
    { nome: "Coliseu", duracao: "3 horas", tipo: "Ponto turístico", imagens: ["img/coliseu1.png", "img/coliseu2.png"] },
    { nome: "Roma", duracao: "4 horas", tipo: "Tour", imagens: ["img/roma1.png", "img/roma2.png"] },
    { nome: "Veneza", duracao: "2 horas", tipo: "Passeio de barco", imagens: ["img/veneza1.png", "img/veneza2.png"] },
    { nome: "Milão", duracao: "5 horas", tipo: "Cultural", imagens: ["img/milao1.png", "img/milao2.png"] },
    { nome: "Pisa", duracao: "2 horas", tipo: "Visita guiada", imagens: ["img/pisa1.png", "img/pisa2.png"] },
    { nome: "Florença", duracao: "3 horas", tipo: "Trilha", imagens: ["img/florenca1.png", "img/florenca2.png"] },
    { nome: "Napoli", duracao: "4 horas", tipo: "Tour", imagens: ["img/napoli1.png", "img/napoli2.png"] },
    { nome: "Verona", duracao: "3 horas", tipo: "Cultural", imagens: ["img/verona1.png", "img/verona2.png"] },
    { nome: "Sicília", duracao: "6 horas", tipo: "Trilha", imagens: ["img/sicilia1.png", "img/sicilia2.png"] },
    { nome: "Sardenha", duracao: "5 horas", tipo: "Passeio de barco", imagens: ["img/sardenha1.png", "img/sardenha2.png"] },
    { nome: "Cinque Terre", duracao: "5 horas", tipo: "Trilha", imagens: ["img/cinque1.png", "img/cinque2.png"] },
    { nome: "Amalfi", duracao: "4 horas", tipo: "Passeio de barco", imagens: ["img/amalfi1.png", "img/amalfi2.png"] }
];

let filtroAtual = [], busca = "", minHoras = 0;

function gerarComentariosFake() {
    lugares.forEach((l, id) => {
        dados[id] = [];
        const nomes = ["Jian", "Cesar", "William"];

        for (let i = 0; i < 3; i++) {
            dados[id].push({
                autor: nomes[i % nomes.length],
                texto: comentariosFake[Math.floor(Math.random() * comentariosFake.length)],
                nota: Math.floor(Math.random() * 5) + 1,
                likes: Math.floor(Math.random() * 20),
                dislikes: Math.floor(Math.random() * 5)
            });
        }
    });
}

/* BUSCA */
function normalizar(txt) {
    return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

document.getElementById("search").addEventListener("input", e => {
    busca = normalizar(e.target.value);
    renderCards();
});

/* FILTRO */
function filtrar() {
    let checks = document.querySelectorAll(".form-check-input:checked");
    filtroAtual = Array.from(checks).map(c => c.value);
    renderCards();
}

/* MEDIA */
function media(id) {
    if (!dados[id] || dados[id].length == 0) return "☆☆☆☆☆";
    let soma = dados[id].reduce((a, b) => a + b.nota, 0);
    let m = (soma / dados[id].length).toFixed(1);
    return "★".repeat(Math.round(m)) + "☆".repeat(5 - Math.round(m)) + " (" + m + ")";
}



/* RENDER */
function renderCards() {
    let c = document.getElementById("cards");
    c.innerHTML = "";

    lugares
        .filter(l => !busca || normalizar(l.nome).includes(busca))
        .filter(l => !filtroAtual.length || filtroAtual.includes(l.tipo))
        .filter(l => parseInt(l.duracao) >= minHoras)

        .forEach((l, id) => {

            c.innerHTML += `
                      <div class="col-md-6">
                      <div class="card shadow-sm h-100">

                      <div class="position-relative">

                      <button class="btn btn-light btn-circle overlay-btn overlay-left" onclick="toggleFav(this)">
                      <i class="bi bi-heart"></i>
                      </button>

                      <button class="btn btn-light btn-circle overlay-btn overlay-right" onclick="abrirMapa('${l.nome}')">
                      <i class="bi bi-geo-alt"></i>
                      </button>

                      <div id="carousel-${id}" class="carousel slide">
                      <div class="carousel-inner">
                      ${l.imagens.map((img, i) => `
                      <div class="carousel-item ${i == 0 ? "active" : ""}">
                      <img src="${img}" class="d-block w-100 card-img-top">
                      </div>`).join("")}
                      </div>
                      <button class="carousel-control-prev" data-bs-target="#carousel-${id}" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                      </button>
                      <button class="carousel-control-next" data-bs-target="#carousel-${id}" data-bs-slide="next">
                      <span class="carousel-control-next-icon"></span>
                      </button>
                      </div>

                      </div>

                      <div class="card-body">

                      <h5 class="fw-bold text-primary">${l.nome}</h5>

                      <div class="mb-2">${media(id)}</div>

                      <button class="btn btn-outline-secondary w-100 mb-2" onclick="toggleDesc(${id})">
                      Ver mais ▼
                      </button>

                      <div id="desc-${id}" class="descricao">
                      Explorar ${l.nome} é uma experiência única que combina história, cultura e paisagens impressionantes.
                      Durante o passeio, você poderá conhecer pontos icônicos, aprender curiosidades e vivenciar a essência local.
                      Cada detalhe revela séculos de tradição, arquitetura marcante e histórias fascinantes.
                      Além disso, o ambiente oferece ótimas oportunidades para fotos e momentos inesquecíveis.
                      Ideal para quem busca uma viagem rica em experiências e descobertas.
                      </div>

                      <div class="d-flex justify-content-between mt-2">
                      <div><small>Duração</small><div class="fw-bold">${l.duracao}</div></div>
                      <div><small>Tipo</small><div class="fw-bold">${l.tipo}</div></div>
                      </div>

                      <div class="d-flex gap-2 mt-3">
                      <a href="detalhes.html?lugar=${encodeURIComponent(l.nome)}" class="btn btn-primary w-100">Ver mais</a>
                      <button class="btn btn-outline-primary w-100" onclick="toggleComentarios(${id})">
                      <i class="bi bi-chat"></i>
                      </button>
                      </div>

                      <div id="comentarios-${id}" class="comentarios mt-3">

                      ${renderComentarios(id)}

                      <input id="input-${id}" class="form-control mb-2" placeholder="Comentário...">

                      <div class="rating">
                      ${[5, 4, 3, 2, 1].map(n => `
                      <input type="radio" name="rating-${id}" value="${n}" id="${n}-${id}">
                      <label for="${n}-${id}">★</label>`).join("")}
                      </div>

                      <button class="btn btn-success w-100 mt-2" onclick="addComentario(${id})">
                      Enviar
                      </button>

                      </div>

                      </div>
                      </div>
                      </div>`;
        });
}


function renderComentarios(id) {
    if (!dados[id]) return "";

    return dados[id].map((c, i) => `
              <div class="bg-light p-2 rounded mb-2">
              <b>${c.autor}</b> - ${"⭐".repeat(c.nota)}<br>
              ${c.texto}
              <div>
              <span onclick="like(${id},${i})" style="cursor:pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" viewBox="0 0 16 16">
              <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
              </svg> ${c.likes}
              </span>

              <span onclick="dislike(${id},${i})" style="cursor:pointer; margin-left:10px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
              <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964z"/>
              </svg> ${c.dislikes}
              </span>
              </div>
              </div>`).join("");
}

function addComentario(id) {
    let texto = document.getElementById(`input-${id}`).value;
    let notaEl = document.querySelector(`input[name="rating-${id}"]:checked`);

    if (!texto || !notaEl) return;

    if (!dados[id]) dados[id] = [];

    dados[id].push({
        autor: guest,
        texto,
        nota: parseInt(notaEl.value),
        likes: 0,
        dislikes: 0
    });

    renderCards();
}

function like(id, i) { dados[id][i].likes++; renderCards(); }
function dislike(id, i) { dados[id][i].dislikes++; renderCards(); }

function toggleDesc(id) {
    let el = document.getElementById("desc-" + id);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

function toggleComentarios(id) {
    let el = document.getElementById("comentarios-" + id);
    el.style.display = el.style.display === "block" ? "none" : "block";
}

function abrirMapa(nome) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nome + " Itália")}`);
}

function toggleFav(btn) {
    let icon = btn.querySelector("i");
    icon.classList.toggle("bi-heart");
    icon.classList.toggle("bi-heart-fill");
    btn.classList.toggle("btn-danger");
}

function atualizarHoras() {
    minHoras = parseInt(rangeHoras.value);
    valorHoras.innerText = minHoras + "h";
    renderCards();
}
document.getElementById("btnFakeLoad").addEventListener("click", () => {
    let btn = document.getElementById("btnFakeLoad");
    let load = document.getElementById("loadingFake");

    btn.style.display = "none";
    load.style.display = "block";
});

gerarComentariosFake();
renderCards();