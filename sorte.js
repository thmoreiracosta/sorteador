let participantes = [];
let numeros = [];
let modo = "lista"; // lista ou numeros
let intervaloInicio = 1;
let intervaloFim = 100;

const resultadoDiv = document.getElementById("resultado");
const sorteadosDiv = document.getElementById("sorteados");
const contagemDiv = document.getElementById("contagem");
const listaInput = document.getElementById("listaInput");

// Troca de modo
document.querySelectorAll('input[name="tipoSorteio"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    modo = document.querySelector('input[name="tipoSorteio"]:checked').value;
    document.getElementById("modoLista").style.display =
      modo === "lista" ? "block" : "none";
    document.getElementById("modoNumeros").style.display =
      modo === "numeros" ? "block" : "none";
    resetar();
  });
});

// Carrega lista de participantes
function carregarLista() {
  const linhas = listaInput.value.trim().split("\n");
  participantes = linhas.map((linha) => {
    const partes = linha.trim().split(/\s+/);
    const numero = parseInt(partes[0]);
    const nome = partes.slice(1).join(" ");
    return { numero, nome };
  });
  alert(`✅ ${participantes.length} participantes carregados!`);
}

// Carrega intervalo de números
function carregarNumeros() {
  intervaloInicio = parseInt(document.getElementById("numInicio").value);
  intervaloFim = parseInt(document.getElementById("numFim").value);

  participantes = [];
  for (let i = intervaloInicio; i <= intervaloFim; i++) {
    participantes.push({ numero: i, nome: "" });
  }
  alert(`✅ Intervalo definido: ${intervaloInicio} a ${intervaloFim}`);
}

// Sorteio com contagem regressiva
function sortear() {
  if (participantes.length === 0) {
    alert("⚠️ Nenhuma lista ou intervalo definido!");
    return;
  }

  let tempo = 10;

  // Mostra o contador e aplica a animação
  contagemDiv.style.display = "block";
  contagemDiv.textContent = tempo;
  contagemDiv.style.animation = "pulse 1s infinite";

  resultadoDiv.innerHTML = "";

  const intervalo = setInterval(() => {
    tempo--;
    contagemDiv.textContent = tempo;

    if (tempo <= 0) {
      clearInterval(intervalo);

      // Esconde o contador ao finalizar
      contagemDiv.style.display = "none";
      contagemDiv.style.animation = "none";

      realizarSorteio();
    }
  }, 1000);
}

// Realiza o sorteio
function realizarSorteio() {
  const disponiveis = participantes.filter((p) => !numeros.includes(p.numero));
  if (disponiveis.length === 0) {
    resultadoDiv.innerHTML = `<strong>Todos já foram sorteados.</strong>`;
    return;
  }

  const sorteado = disponiveis[Math.floor(Math.random() * disponiveis.length)];
  numeros.push(sorteado.numero);

  if (modo === "lista" && sorteado.nome) {
    resultadoDiv.innerHTML = `🎉 Número sorteado: <strong>${sorteado.numero}</strong> - ${sorteado.nome}`;
  } else {
    resultadoDiv.innerHTML = `🎉 Número sorteado: <strong>${sorteado.numero}</strong>`;
  }

  atualizarSorteados();
}

// Atualiza lista de sorteados
function atualizarSorteados() {
  sorteadosDiv.innerHTML = "";
  numeros.forEach((num) => {
    const participante = participantes.find((p) => p.numero === num);
    const li = document.createElement("li");
    li.textContent = participante.nome
      ? `${participante.numero} - ${participante.nome}`
      : `${participante.numero}`;
    sorteadosDiv.appendChild(li);
  });
}

// Reseta sorteio
function resetar() {
  numeros = [];
  resultadoDiv.innerHTML = "";
  sorteadosDiv.innerHTML = "";
  contagemDiv.textContent = "";
}
