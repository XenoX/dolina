import Web3 from "web3";
let web3;
let userAccount;
let calculatedValue;
let calculatedValueOfBalance;

const connectWalletButton = document.querySelector(
  ".invest__section__connect-wallet__button"
);
const connectWalletErrorMessage = document.querySelector(
  ".invest__section__connect-wallet__error-message"
);

const walletInvestSection = document.querySelector(
  ".invest__section__connect-wallet__text"
);
const connectedWalletButtons = document.querySelector(
  ".invest__section__buttons"
);

//-------------
//Fonction qui récupère la valeur en dollards des crypto et fait les calculs

async function fetchCryptoValue() {
  try {
    const [maticResponse, usdcResponse] = await Promise.all([
      fetch("https://api.coincap.io/v2/assets/polygon"),
      fetch("https://api.coincap.io/v2/assets/usd-coin"),
    ]);

    const matic = await maticResponse.json();
    const maticValue = parseFloat(matic.data.priceUsd);
    const usdc = await usdcResponse.json();
    const usdcValue = parseFloat(usdc.data.priceUsd);

    const currentValueElement = document.querySelector(
      ".money-to-invest__input__wrapper--size"
    );
    const accountBalanceValueUsdConvert = document.querySelector(
      ".select-crypto__input__balance-value-usd"
    );

    // Calcul la valeur en dollards du nombre tapé dans l'input
    const inputUsdValue = () => {
      const selectedCrypto = document.querySelector(
        ".select-crypto__input__select"
      ).textContent;
      const inputValue =
        parseFloat(document.querySelector(".input__field").value) || 0;

      if (selectedCrypto === "Matic") {
        calculatedValue = (maticValue * inputValue).toFixed(0);
      } else if (selectedCrypto === "Usdc") {
        calculatedValue = (usdcValue * inputValue).toFixed(0);
      } else {
        console.log("Invalid crypto selection");
      }

      currentValueElement.textContent = `≈$${calculatedValue}`;
    };

    //Calcul la valeur en dollards du solde du compte connecté
    const accountBalanceUsdValue = () => {
      const selectedCrypto = document.querySelector(
        ".select-crypto__input__select"
      ).textContent;
      const accountBalance = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      console.log(accountBalance);

      setTimeout(() => {
        if (selectedCrypto === "Matic") {
          calculatedValueOfBalance = parseFloat(
            maticValue * accountBalance.textContent
          ).toFixed(0);
        } else if (selectedCrypto === "Usdc") {
          calculatedValueOfBalance = parseFloat(
            usdcValue * accountBalance.textContent
          ).toFixed();
        } else {
          console.log("Invalid crypto selection");
        }
        accountBalanceValueUsdConvert.textContent = `≈$${calculatedValueOfBalance}`;

        inputUsdValue();
      }, 400);
    };

    document
      .querySelector(".input__field")
      .addEventListener("input", inputUsdValue);

    const observer = new MutationObserver(accountBalanceUsdValue);
    const selectedCryptoElement = document.querySelector(
      ".select-crypto__input__select"
    );
    observer.observe(selectedCryptoElement, { childList: true });

    inputUsdValue();
    accountBalanceUsdValue();
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

function connectButtonchange() {
  const moneyInvestInput = document.querySelector(".input__field");
  connectWalletButton.textContent = "TICKET MINIMUM : $500";

  moneyInvestInput.addEventListener("input", () => {
    const inputValue = moneyInvestInput.value;

    if (inputValue >= 500) {
      connectWalletButton.textContent = "INVESTIR";
    } else {
      connectWalletButton.textContent = "TICKET MINIMUM : $500";
    }
  });
}

//---------------
// Fonction qui vérifie si l'utilisateur est sur le bon réseau et modifie le fonctionne du bouton en conséquence

async function checkNetwork() {
  if (web3) {
    let chainId = await web3.eth.getChainId();
    console.log(chainId);

    if (chainId !== 137n) {
      connectWalletButton.textContent = "UTILISER LE RÉSEAU POLYGON";
      connectWalletButton.addEventListener("click", switchNetwork);
    } else if (chainId === 137n) {
      connectButtonchange();
    }
  }
}

//------------
// Fonction qui permet de changer de réseau vers le réseau Polygon
async function switchNetwork() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x89" }],
    });
    connectButtonchange();
  } catch (error) {
    console.error(error);
  }
}

connectWalletButton.addEventListener("click", connectWallet);

//-----------
// Fonction qui connecte l'utilisateur

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      fetchCryptoValue();
      getBalance();
      checkNetwork();
      addTransactionAndDisconnestButtons();
      addTokenPurchaseSection();
    } catch (error) {
      console.error(error);
    }
  } else {
    connectWalletErrorMessage.style.visibility = "visible";
  }

  // l'utilisateur est connecté donc on supprime la fonctionnalité du button
}

//--------------
// Fonction pour récupérer le solde du compte connecté

function getBalance() {
  if (userAccount) {
    web3.eth.getBalance(userAccount).then((balance) => {
      const balanceConvertToEth = web3.utils.fromWei(balance, "ether");
      const balanceFixed = parseFloat(balanceConvertToEth).toFixed(4);
      const accountBalance = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      accountBalance.textContent = balanceFixed;
      console.log(balanceConvertToEth, " ETH sur le solde");
    });
  }
}

//--------------
// Rend visisble les boutons "transtactions" et "se déconnecter" visible

function addTransactionAndDisconnestButtons() {
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");
  connectedWalletButtons.style.visibility = "visible";
}

//-------------
// Ajout de la section qui permet l'achat de Token

function addTokenPurchaseSection() {
  const template = document.getElementById("purchase-token-section").content;
  walletInvestSection.innerHTML = "";
  walletInvestSection.appendChild(template.cloneNode(true));

  //--------
  // Fonctionnement de l'input select

  const cryptoInput = document.querySelector(
    ".connected-wallet__select-crypto__wrapper"
  );
  const InputSelectedCrypto = document.querySelector(
    ".select-crypto__input__select"
  );
  const dropdownContent = document.querySelector(
    ".select-crypto__input__dropdown-content"
  );

  const downArrow = document.querySelector(
    ".select-crypto__input__dropdown-arrow"
  );

  function toggleDropdown() {
    dropdownContent.classList.toggle("show");
    downArrow.classList.toggle("rotate");
  }

  cryptoInput.addEventListener("click", toggleDropdown);

  dropdownContent.addEventListener("click", (event) => {
    let selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption;
  });
}
//---------------

const disconnectWalletButton = document.querySelector(
  ".invest__section__buttons__disconnect"
);

// Fonction de déconnexion
function disconnectWallet() {
  userAccount = null;
  web3 = null;

  // Réinitialiser l'affichage et masquer les boutons connectés
  walletInvestSection.classList.remove("invest__section__connected-wallet");
  walletInvestSection.classList.add("invest__section__connect-wallet__text");
  connectedWalletButtons.style.visibility = "hidden";
  connectWalletButton.textContent = "CONNECTEZ SON WALLET";

  // Réinitialiser les éléments spécifiques au portefeuille connecté
  walletInvestSection.innerHTML = `
    <p>Pour investir, </br>
     connectez votre wallet</p>
 `;
}

// Ajouter l'événement de clic au bouton de déconnexion
disconnectWalletButton.addEventListener("click", disconnectWallet);
