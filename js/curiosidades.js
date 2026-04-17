
        const quiz = [
            { q: "Qual cidade foi o centro do Império Romano?", o: ["Roma", "Milão", "Veneza", "Nápoles"], a: 0 },
            { q: "Quem pintou a Mona Lisa?", o: ["Michelangelo", "Da Vinci", "Rafael", "Donatello"], a: 1 },
            { q: "Ano da queda de Roma?", o: ["476", "1492", "1200", "1918"], a: 0 },
            { q: "Movimento artístico italiano?", o: ["Renascimento", "Barroco", "Gótico", "Pop Art"], a: 0 },
            { q: "Capital da Itália?", o: ["Roma", "Paris", "Berlim", "Madrid"], a: 0 },
            { q: "Coliseu fica onde?", o: ["Roma", "Milão", "Florença", "Pisa"], a: 0 },
            { q: "Michelangelo era?", o: ["Escultor", "Rei", "Guerreiro", "Soldado"], a: 0 },
            { q: "WW2 terminou em?", o: ["1945", "1939", "1918", "1960"], a: 0 },
            { q: "Torre de Pisa é famosa por?", o: ["Inclinação", "Altura", "Cor", "Idade"], a: 0 },
            { q: "Roma nasceu como?", o: ["Vila", "Império direto", "Colônia grega", "Reino egípcio"], a: 0 }
        ];

        let i = 0;
        let score = 0;
        let time = 20;
        let interval;
        let locked = false;

        let ranking = [
            { name: "Jian", score: 85 },
            { name: "Gabriel", score: 55 },
            { name: "pasteleiro67", score: 40 },
            { name: "William", score: 30 },
            { name: "Tornado", score: -2 }
        ];

        function startGame() {
            document.getElementById("start").style.display = "none";
            document.getElementById("game").style.display = "block";
            loadQ();
        }

        /* SHUFFLE */
        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        /* LOAD */
        function loadQ() {
            locked = false;
            clearInterval(interval);
            time = 20;

            document.getElementById("time").innerText = time;

            interval = setInterval(() => {
                time--;
                document.getElementById("time").innerText = time;
                if (time <= 0) next();
            }, 1000);

            let q = quiz[i];
            document.getElementById("question").innerText = q.q;

            let options = q.o.map((opt, idx) => ({ opt, idx }));
            options = shuffle(options);

            let html = "";
            options.forEach((o) => {
                html += `
      <div class="option" onclick="answer(this, ${o.idx})">
        <i class="bi bi-circle"></i> ${o.opt}
      </div>
    `;
            });

            document.getElementById("options").innerHTML = html;
        }

        /* ANSWER FIXADO */
        function answer(el, idx) {
            if (locked) return;
            locked = true;

            let correct = quiz[i].a;

            let all = document.querySelectorAll(".option");

            // trava clique
            all.forEach(o => o.style.pointerEvents = "none");

            // sempre mostra correta
            all.forEach(o => {
                let text = o.innerText.trim();

                let original = quiz[i].o[correct];

                if (text === original) {
                    o.classList.add("correct");
                }
            });

            if (idx === correct) {
                el.classList.add("correct");
                score += 10;
            } else {
                el.classList.add("wrong");
            }

            document.getElementById("score").innerText = score;

            setTimeout(next, 900);
        }

        /* NEXT */
        function next() {
            clearInterval(interval);
            i++;

            if (i >= quiz.length) {
                endGame();
                return;
            }

            loadQ();
        }

        /* END */
        function endGame() {
            document.getElementById("game").style.display = "none";
            document.getElementById("end").style.display = "block";

            document.getElementById("finalScore").innerText = score;

            let msg = "Tente novamente";
            if (score >= 80) msg = "Muito bom";
            if (score >= 100) msg = "Lenda da Itália";

            document.getElementById("endMsg").innerText = msg;

            ranking.push({ name: "Guest#6967", score: score });
            ranking.sort((a, b) => b.score - a.score);

            renderRank();
        }

        /* RESTART */
        function restart() {
            i = 0;
            score = 0;
            document.getElementById("score").innerText = 0;

            document.getElementById("end").style.display = "none";
            document.getElementById("start").style.display = "block";
        }

        /* RANK */
        function renderRank() {
            let html = "";
            ranking.forEach((r, i) => {
                html += `
      <div class="rank-item">
        <span>${i + 1}. ${r.name}</span>
        <span>${r.score}</span>
      </div>
    `;
            });
            document.getElementById("ranking").innerHTML = html;
        }

        renderRank();
