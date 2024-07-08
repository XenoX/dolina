import Web3 from "web3";
let web3;
let userAccount;
let chainId;
let formattedBalance;
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
//Fonction qui récupère la valeur en dollards et fait le calcul

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
      ).textContent;
      console.log(accountBalance);

      if (selectedCrypto === "Matic") {
        calculatedValueOfBalance = parseFloat(
          maticValue * accountBalance
        ).toFixed(0);
      } else if (selectedCrypto === "Usdc") {
        calculatedValueOfBalance = parseFloat(
          usdcValue * accountBalance
        ).toFixed(0);
      } else {
        console.log("Invalid crypto selection");
      }
      accountBalanceValueUsdConvert.textContent = `≈$${calculatedValueOfBalance}`;
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

//---------------
// Fonction qui vérifie si l'utilisateur est sur le bon réseau et modifie le fonctionne du bouton en conséquence
async function checkNetwork() {
  if (web3) {
    const chainId = await web3.eth.getChainId();
    console.log(chainId);
    connectWalletButton.removeEventListener("click", connectWallet); // une fois connecté l'utilisateur le bouton on retire l'event au click
    if (chainId !== 137n) {
      connectWalletButton.innerHTML = "UTILISER LE RÉSEAU";
      connectWalletButton.addEventListener("click", switchNetwork);
    } else {
      connectWalletButton.innerHTML = "TICKET MINIMUM : $500";
      connectWalletButton.removeEventListener("click", switchNetwork);
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
  } catch (error) {
    console.error(error);
  }
}

//-----------
// Gestionnaire d'événements pour le bouton de connexion du portefeuille
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
}

// Ajout du gestionnaire d'événements pour le bouton de connexion
connectWalletButton.addEventListener("click", connectWallet);
//--------------
// Fonction pour récupérer le solde du compte connecté

function getBalance() {
  if (userAccount) {
    web3.eth.getBalance(userAccount).then((balance) => {
      const formattedBalance = Math.floor(web3.utils.fromWei(balance, "ether"));
      const accountBalance = document.querySelector(
        ".select-crypto__input__balance-amount"
      );
      accountBalance.textContent = formattedBalance;
      console.log(formattedBalance, " ETH sur le solde");
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
// Ajout de toute la section qui permet l'achat de Token

function addTokenPurchaseSection() {
  walletInvestSection.innerHTML = `
   <div class="connected-wallet__token-purchase">
   <p>Vous investissez en :</p>      
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
            <span class = "select-crypto__input__balance-amount"></span>
            <span class="select-crypto__input__balance-value-usd"
              ></span
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
            <span class="money-to-invest__input__wrapper--size">≈$0</span>
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
    let selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption = event.target.textContent;
    InputSelectedCrypto.textContent = selectedOption;
  });
}

//---------------
