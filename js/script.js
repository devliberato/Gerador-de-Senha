//Seleções de Elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")

const openCloseGeneratorButton = document.querySelector("#open-generate-password")

const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

const passwordStrengthElement = document.querySelector("#strength-password");


//Funções
const getLetterLowerCase = () => {
    return (String.fromCharCode(Math.floor(Math.random() * 26) + 97))
};

const getLetterUpperCase = () => {
    return (String.fromCharCode(Math.floor(Math.random() * 26) + 65))
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "(){}[]=<>!@#$&?/.,%+-";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

//Função para gerar senha
const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = "";

    const passwordLength = +lengthInput.value;

    const generators = [];

          if(lettersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
      }

           if(numbersInput.checked) {
        generators.push(getNumber)
      }

           if(symbolsInput.checked) {
        generators.push(getSymbol)
      }
          
      if(generators.length === 0) {

   return;
      }

   for(let i = 0; i < passwordLength; i = i + generators.length) {
    generators.forEach(() => {
        const randomValue = 
        generators[Math.floor(Math.random() * generators.length)]();

        password += randomValue;
    });
   }
   password = password.slice(0, passwordLength);


//Funcionalidade para verificar a força da senha 
const passwordColor = [
    {min: 12, level: "Senha forte", colorClass: "awesome"},
    {min: 12, level: "Senha forte", colorClass: "awesome"},
    {min: 9, level: "Senha boa", colorClass: "good"},
    {min: 7, level: "Senha média", colorClass: "medium"},
    {min: 5, level: "Senha fraca", colorClass: "bad"},
];



   const definePassword = passwordColor.find(item => password.length >= item.min);

      const h5 = passwordStrengthElement.querySelector("h5");
   h5.classList.remove("bad", "medium", "good", "awesome");

   if (definePassword) {
    h5.innerText = definePassword.level;
    h5.classList.add(definePassword.colorClass);
   }

 
   generatedPasswordElement.style.display = "block";
   generatedPasswordElement.querySelector("h4").innerText = password;
};

//Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol);
   
});

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide");
    if(generatePasswordContainer.classList.contains("hide")) {
        openCloseGeneratorButton.innerText = "Clique aqui";
    } else {
        openCloseGeneratorButton.innerText = "Fechar";
    }

})


//Para copiar pra área de trabalho 
copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const password = generatedPasswordElement.querySelector("h4").innerText;

    navigator.clipboard.writeText(password).then(() => {
       
             copyPasswordButton.innerText = "Senha copiada para  área de transferência";

        setTimeout(() => {
             copyPasswordButton.innerText = "Copiar";
        }, 1000)

        
    })
})