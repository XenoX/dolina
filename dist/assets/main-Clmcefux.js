(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const a=document.querySelector(".invest__section__connect-wallet__button"),u=document.querySelector(".invest__section__connect-wallet__error-message");async function _(){try{const[t,n]=await Promise.all([fetch("https://api.coincap.io/v2/assets/polygon"),fetch("https://api.coincap.io/v2/assets/usd-coin")]),s=await t.json(),c=parseFloat(s.data.priceUsd),e=document.querySelector(".input__field"),o=document.querySelector(".money-to-invest__input__wrapper--size"),r=()=>{const i=parseFloat(e.value)||0,l=(c*i).toFixed(0);o.textContent=`≈$${l}`};e.addEventListener("input",r)}catch(t){console.error("Erreur lors de la récupération des données :",t)}}a.addEventListener("click",async()=>{if(typeof window.ethereum<"u")try{const t=await window.ethereum.request({method:"eth_requestAccounts"});if(t.length>0){const n=t[0];p(n),d(),m(),v(),_()}}catch(t){console.error("User denied account access:",t)}else u.innerHTML="MetaMask n'est pas installé"});async function p(t){try{const n=await window.ethereum.request({method:"eth_getBalance",params:[t,"latest"]}),s=parseInt(n,16)/1e18;console.log("Account balance:",s,"ETH")}catch(n){console.error("Error getting balance:",n)}}function d(){const t=document.querySelector(".invest__section__connect-wallet__text");t.classList.remove("invest__section__connect-wallet__text"),t.classList.add("invest__section__connected-wallet");const n=document.querySelector(".invest__section__buttons");n.style.visibility="visible",a.textContent="TICKET MINIMUM : 500$"}function m(){const t=document.querySelector(".invest__section__connected-wallet");t.innerHTML=`
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
    </div>`;const n=document.querySelector(".connected-wallet__select-crypto__wrapper"),s=document.querySelector(".select-crypto__input__select"),c=document.querySelector(".select-crypto__input__dropdown-content"),e=document.querySelector(".select-crypto__input__dropdown-arrow");function o(){c.classList.toggle("show"),e.classList.toggle("rotate")}n.addEventListener("click",o),c.addEventListener("click",r=>{const i=r.target.textContent;s.textContent=i})}function v(){const t=document.querySelector(".input__field");t.addEventListener("input",()=>{const n=t.value;!isNaN(n)&&n>=500?a.textContent="INVESTIR":a.textContent="TICKET MINIMUM : 500$"})}
