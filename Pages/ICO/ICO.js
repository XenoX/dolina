import { ethers } from "ethers";
import { Web3 } from "web3";
const connectWalletButton = document.querySelector(
  ".invest__section__connect-wallet__button"
);
const connectWalletErrorMessage = document.querySelector(
  ".invest__section__connect-wallet__error-message"
);

//-------------

//

async function fetchCryptoValue() {
  try {
    const [maticResponse, usdcResponse] = await Promise.all([
      fetch("https://api.coincap.io/v2/assets/polygon"),
      fetch("https://api.coincap.io/v2/assets/usd-coin"),
    ]);

    const matic = await maticResponse.json();
    const usdc = await usdcResponse.json();

    console.log(matic);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}
//------------

// Gestionnaire d'événements pour le bouton de connexion du portefeuille
connectWalletButton.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        const connectedAddress = accounts[0];

        getBalance(connectedAddress); // Call the function with the connected address
        updateUserInterface();
        addTokenPurchaseSection();
        changeInvestButtonText();
        fetchCryptoValue();
        e.preventdefault();
      }
    } catch (error) {
      console.error("User denied account access:", error);
    }
  } else {
    connectWalletErrorMessage.innerHTML = "MetaMask n'est pas installé";
  }
});

//--------------
// Fonction pour récupérer le solde du compte connecté

async function getBalance(address) {
  try {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    const balanceInEther = parseInt(balance, 16) / 1e18;
    console.log("Account balance:", balanceInEther, "ETH");
  } catch (error) {
    console.error("Error getting balance:", error);
  }
}

//--------------
function updateUserInterface() {
  const walletInvestSection = document.querySelector(
    ".invest__section__connect-wallet__text"
  );
  walletInvestSection.classList.remove("invest__section__connect-wallet__text");
  walletInvestSection.classList.add("invest__section__connected-wallet");

  const connectedWalletButtons = document.querySelector(
    ".invest__section__buttons"
  );
  connectedWalletButtons.style.visibility = "visible";

  connectWalletButton.textContent = "TICKET MINIMUM : 500$";
}

//-------------
function addTokenPurchaseSection() {
  const walletInvestSection = document.querySelector(
    ".invest__section__connected-wallet"
  );
  walletInvestSection.innerHTML = `
   <div class="connected-wallet__token-purchase">
      <div class="connected-wallet__select-crypto__wrapper">
        <div class="select-crypto__input input">
          <p class="select-crypto__input__select">Matic</p>
          <ul class="select-crypto__input__dropdown-content">
            <li>Matic</li>
            <li>Usdc</li>
          </ul>
        </div>
        <div class="select-crypto__input__wrapper">
          <div class="select-crypto__input__current-value__wrapper">
            <span>1921</span>
            <span class="select-crypto__input__current-value--size"
              >≈$1920</span
            >
          </div>
          <span class="line"></span>
          <span class="select-crypto__input__down-arrow">
            <img
              src="../../assets/images/down-arrow-img.png"
              alt="flèche blanche pointant vers le bas"
              class="select-crypto__input__dropdown-arrow"
          /></span>
        </div>
      </div>

      <div class="connected-wallet__money-to-invest__wrapper">
        <label for="money-to-invest">Montant investi :</label>
        <div class="money-to-invest__input input">
          <input
            type="number"
            value="0"
            id="money-to-invest"
            class="input__field"
          />
          <div class="money-to-invest__input__wrapper">
            <span class="money-to-invest__input__wrapper--size">≈150</span>
            <button class="money-to-invest__input__wrapper__button">MAX</button>
          </div>
        </div>
      </div>
    </div>
    <div class="connected-wallet__token-amount">
      <p>Vous recevez en $ANZ</p>
      <div class="token-amount__wrapper">
        <p>0</p>
        <img
          src="../../assets/images/TOKEN-color.png"
          alt="Logo du jeux Anazir sous forme d'une piece de monnaie"
        />
      </div>
      <div class="token-amount__max-amount__wrapper">
        <span class="token-amount__max-amount__line"></span>
        <p class="token-amount__max-amount">15 000 000</p>
        <p class="token-amount__max-amount__info">Token alloués pressed</p>
      </div>
    </div>
    </div>`;
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
    let isOpen = false;
    isOpen = !isOpen;
    dropdownContent.classList.toggle("show");
    downArrow.classList.toggle("rotate");
  }

  cryptoInput.addEventListener("click", toggleDropdown);

  dropdownContent.addEventListener("click", (event) => {
    const selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption;
  });
}

//----------------------

function changeInvestButtonText() {
  const moneyInvestInput = document.querySelector(".input__field");

  moneyInvestInput.addEventListener("input", () => {
    const inputValue = moneyInvestInput.value;

    if (!isNaN(inputValue) && inputValue >= 500) {
      connectWalletButton.textContent = "INVESTIR";
    } else {
      connectWalletButton.textContent = "TICKET MINIMUM : 500$";
    }
  });
}
//---------------
