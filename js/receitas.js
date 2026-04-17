const guest = "Guest#6967";
let dados = {};

const receitas = [
    {
        nome: "Pizza",
        tipo: "Tradicional",
        tempo: "40 min",
        img: "img/culinaria.png",
        nota: "4.8",
        imagens: ["img/culinaria.png", "img/pizza2.png"]
    },

    {
        nome: "Spaghetti Carbonara",
        tipo: "Massa",
        tempo: "30 min",
        img: "img/macarrao1.png",
        nota: "4.7",
        imagens: ["img/macarrao1.png", "img/macarrao2.png"]
    },

    {
        nome: "Lasanha",
        tipo: "Tradicional",
        tempo: "1h",
        img: "img/lasanha1.png",
        nota: "4.9",
        imagens: ["img/lasanha1.png", "img/lasanha2.png"]
    },

    {
        nome: "Bruschetta",
        tipo: "Entrada",
        tempo: "15 min",
        img: "img/bruschetta1.png",
        nota: "4.4",
        imagens: ["img/bruschetta1.png", "img/bruschetta2.png"]
    },

    {
        nome: "Ravioli",
        tipo: "Massa",
        tempo: "35 min",
        img: "img/ravioli1.png",
        nota: "4.6",
        imagens: ["img/ravioli1.png", "img/ravioli2.png"]
    },

    {
        nome: "Tiramisu",
        tipo: "Sobremesa",
        tempo: "25 min",
        img: "img/tiramisu1.png",
        nota: "4.9",
        imagens: ["img/tiramisu1.png", "img/tiramisu2.png"]
    }
];

const receitasDetalhes = {
    "Pizza": {
        ingredientes: [
            "500g de farinha de trigo",
            "10g de fermento biológico",
            "300ml de água",
            "Molho de tomate",
            "Queijo mussarela",
            "Sal e azeite"
        ],
        preparo: [
            "Misture farinha, fermento, água e sal.",
            "Sove até formar uma massa lisa.",
            "Deixe descansar por 1 hora.",
            "Abra a massa e adicione o molho.",
            "Coloque o queijo e leve ao forno.",
            "Asse por 20 minutos a 220°C."
        ]
    },

    "Spaghetti Carbonara": {
        ingredientes: [
            "200g de spaghetti",
            "2 ovos",
            "100g de pancetta ou bacon",
            "Queijo parmesão ralado",
            "Pimenta-do-reino"
        ],
        preparo: [
            "Cozinhe o macarrão.",
            "Frite o bacon até dourar.",
            "Misture ovos com parmesão.",
            "Junte tudo com o macarrão quente.",
            "Finalize com pimenta."
        ]
    },

    "Lasanha": {
        ingredientes: [
            "Massa de lasanha",
            "Carne moída",
            "Molho de tomate",
            "Queijo mussarela",
            "Queijo parmesão"
        ],
        preparo: [
            "Prepare o molho com carne.",
            "Monte camadas de massa, molho e queijo.",
            "Repita as camadas.",
            "Finalize com queijo por cima.",
            "Asse por 40 minutos."
        ]
    },

    "Bruschetta": {
        ingredientes: [
            "Pão italiano",
            "Tomate",
            "Alho",
            "Manjericão",
            "Azeite"
        ],
        preparo: [
            "Corte o pão em fatias.",
            "Esfregue alho no pão.",
            "Adicione tomate picado.",
            "Finalize com azeite e manjericão.",
            "Leve ao forno por 10 minutos."
        ]
    },

    "Ravioli": {
        ingredientes: [
            "Massa de ravioli",
            "Ricota",
            "Espinafre",
            "Molho de tomate",
            "Parmesão"
        ],
        preparo: [
            "Prepare o recheio.",
            "Monte os raviolis.",
            "Cozinhe em água fervente.",
            "Sirva com molho.",
            "Finalize com parmesão."
        ]
    },

    "Tiramisu": {
        ingredientes: [
            "Biscoito champagne",
            "Café forte",
            "Mascarpone",
            "Ovos",
            "Cacau em pó"
        ],
        preparo: [
            "Molhe o biscoito no café.",
            "Monte camadas com creme.",
            "Repita as camadas.",
            "Finalize com cacau.",
            "Leve à geladeira por 4 horas."
        ]
    }
};

const comentariosPorAutor = {
    Jian: [
        "Essa receita é tão boa que me fez parar de jogar por uns 10 minutos.",
        "200g disso aqui é maior que eu, complicado.",
        "Comi metade e já precisei de descanso."
    ],
    Cesar: [
        "Essa receita está aprovada pelo exército.",
        "Disciplina e sabor, isso aqui é padrão militar.",
        "Marchando direto pra repetir o prato."
    ],
    pasteleiro67: [
        "Receita incrível, vale muito a pena!",
        "Ficou sensacional, recomendo demais.",
        "Muito saborosa, perfeita para qualquer ocasião.",
        "Uma das melhores receitas que já fiz.",
        "Vale cada minuto, simplesmente incrível."
    ]
};

function gerarComentariosFake() {
    const nomes = ["Jian", "Cesar", "pasteleiro67"];

    receitas.forEach((r, id) => {
        dados[id] = [];

        for (let i = 0; i < 3; i++) {

            const autor = nomes[i % nomes.length];
            const listaComentarios = comentariosPorAutor[autor];

            dados[id].push({
                autor: autor,
                texto: listaComentarios[Math.floor(Math.random() * listaComentarios.length)],
                nota: Math.floor(Math.random() * 5) + 1,
                likes: Math.floor(Math.random() * 20),
                dislikes: Math.floor(Math.random() * 5)
            });
        }
    });
}



const params = new URLSearchParams(window.location.search);
const nome = params.get("receita");

const receita = receitas.find(r => r.nome === nome);
const idReceita = receitas.findIndex(r => r.nome === nome);


if (Object.keys(dados).length === 0) {
    gerarComentariosFake();
}

if (receita) {

    document.getElementById("titulo").innerText = receita.nome;
    document.getElementById("tipo").innerText = receita.tipo;
    document.getElementById("duracao").innerText = receita.tempo;

    document.getElementById("descricao").innerText =
        "Preparar " + receita.nome + " é uma experiência deliciosa que combina tradição, sabor e técnica.";

    let carousel = document.getElementById("carouselImgs");

    const detalhes = receitasDetalhes[receita.nome];

    if (detalhes) {

        document.getElementById("ingredientes").innerHTML =
            detalhes.ingredientes.map(i => `<li class="list-group-item">${i}</li>`).join("");

        document.getElementById("modoPreparo").innerHTML =
            detalhes.preparo.map(p => `<li>${p}</li>`).join("");

    }

    receita.imagens.forEach((img, i) => {
        carousel.innerHTML += `
        <div class="carousel-item ${i === 0 ? "active" : ""}">
            <img src="${img}" class="d-block w-100">
        </div>`;
    });

    document.getElementById("rating").innerHTML = calcularMedia(idReceita);

    renderComentariosDetalhe(idReceita);

} else {
    document.body.innerHTML = `<h2 class="text-center mt-5 text-danger">Receita não encontrada</h2>`;
}

/* ================= COMENTÁRIOS ================= */

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

    if (!dados[idReceita]) dados[idReceita] = [];

    dados[idReceita].push({
        autor: guest,
        texto,
        nota: parseInt(notaEl.value),
        likes: 0,
        dislikes: 0
    });

    input.value = "";

    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);

    renderComentariosDetalhe(idReceita);
    document.getElementById("rating").innerHTML = calcularMedia(idReceita);
}


function calcularMedia(id) {
    if (!dados[id] || dados[id].length === 0) return "☆☆☆☆☆ (0.0)";

    let soma = dados[id].reduce((total, c) => total + c.nota, 0);
    let media = (soma / dados[id].length).toFixed(1);

    let estrelas = "★".repeat(Math.round(media)) + "☆".repeat(5 - Math.round(media));

    return `${estrelas} <span class="text-muted">(${media})</span>`;
}