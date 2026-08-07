const formulario = document.getElementById("formulario");
const resultados = document.getElementById("resultados");
const novoCalculo = document.getElementById("novoCalculo");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);
    const idade = Number(document.getElementById("idade").value);
    const sexo = document.getElementById("sexo").value;

    const objetivo =
        document.querySelector(
            'input[name="objetivo"]:checked'
        )?.value;

    if (!peso || !altura || !idade || !sexo || !objetivo) {
        alert("Preencha todos os campos.");
        return;
    }

    /*
        IMC
    */

    const alturaMetros = altura / 100;

    const imc = peso / (alturaMetros * alturaMetros);

    /*
        TMB - Mifflin-St Jeor
    */

    let tmb;

    if (sexo === "masculino") {

        tmb =
            (10 * peso) +
            (6.25 * altura) -
            (5 * idade) +
            5;

    } else {

        tmb =
            (10 * peso) +
            (6.25 * altura) -
            (5 * idade) -
            161;
    }

    /*
        Estimativa simplificada de calorias.
        O site aplica um ajuste de acordo
        com o objetivo escolhido.
    */

    let calorias;

    if (objetivo === "ganho") {

        calorias = tmb + 300;

    } else {

        calorias = tmb - 300;
    }

    /*
        Macronutrientes
    */

    let proteinas;
    let carboidratos;

    if (objetivo === "ganho") {

        proteinas = peso * 2.2;
        carboidratos = peso * 5;

    } else {

        proteinas = peso * 2.0;
        carboidratos = peso * 2.5;
    }

    /*
        Gorduras
    */

    const gorduras = peso * 0.9;

    /*
        Água
        Estimativa de 35 ml por kg.
    */

    const agua = (peso * 35) / 1000;

    /*
        Classificação simplificada do IMC
    */

    let classificacao;

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

    } else if (imc < 25) {

        classificacao = "Peso normal";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

    } else {

        classificacao = "Obesidade";
    }

    /*
        Mostrar resultados
    */

    document.getElementById("calorias").textContent =
        Math.round(calorias);

    document.getElementById("proteinas").textContent =
        Math.round(proteinas);

    document.getElementById("carboidratos").textContent =
        Math.round(carboidratos);

    document.getElementById("gorduras").textContent =
        Math.round(gorduras);

    document.getElementById("agua").textContent =
        agua.toFixed(1);

    document.getElementById("imc").textContent =
        imc.toFixed(1);

    document.getElementById("classificacao").textContent =
        classificacao;

    resultados.classList.remove("escondido");

    resultados.scrollIntoView({
        behavior: "smooth"
    });
});


novoCalculo.addEventListener("click", function() {

    formulario.reset();

    resultados.classList.add("escondido");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});