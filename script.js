const homeView = document.getElementById('homeView');
const checkoutView = document.getElementById('checkoutView');
const plansView = document.getElementById('plansView');
const pixView = document.getElementById('pixView');

const productTriggers = document.querySelectorAll('.product-trigger');
const planItems = document.querySelectorAll('.plan-card-item');
const paymentTriggers = document.querySelectorAll('.payment-method-trigger');

const backToHomeBtn = document.getElementById('backToHome');
const backToCheckoutBtn = document.getElementById('backToCheckout');
const backToPlansFromPix = document.getElementById('backToPlansFromPix');

const checkoutProductTitle = document.getElementById('checkoutProductTitle');
const plansProductTitle = document.getElementById('plansProductTitle');
const checkoutDisplayPrice = document.getElementById('checkoutDisplayPrice');

const checkoutThumb = document.getElementById('checkoutThumb');
const plansThumb = document.getElementById('plansThumb');
const planThumb1 = document.getElementById('planThumb1');
const planThumb2 = document.getElementById('planThumb2');
const planThumb3 = document.getElementById('planThumb3');

// Selecionar Produto na Vitrine e atualizar dinamicamente todas as miniaturas com a foto certa
productTriggers.forEach(card => {
    card.addEventListener('click', () => {
        const productName = card.querySelector('.product-title').innerText;
        const productImage = card.getAttribute('data-img');

        checkoutProductTitle.innerText = productName;
        plansProductTitle.innerText = productName;

        // Atualiza todas as miniaturas internas garantindo que não misture Android e iOS
        if (checkoutThumb) checkoutThumb.src = productImage;
        if (plansThumb) plansThumb.src = productImage;
        if (planThumb1) planThumb1.src = productImage;
        if (planThumb2) planThumb2.src = productImage;
        if (planThumb3) planThumb3.src = productImage;
        
        homeView.classList.remove('active');
        checkoutView.classList.add('active');
        window.scrollTo(0, 0);
    });
});

backToHomeBtn.addEventListener('click', () => {
    checkoutView.classList.remove('active');
    homeView.classList.add('active');
    window.scrollTo(0, 0);
});

// Ir para Planos ao clicar em Pix no Checkout
paymentTriggers.forEach(method => {
    method.addEventListener('click', () => {
        checkoutView.classList.remove('active');
        plansView.classList.add('active');
        window.scrollTo(0, 0);
    });
});

backToCheckoutBtn.addEventListener('click', () => {
    plansView.classList.remove('active');
    checkoutView.classList.add('active');
    window.scrollTo(0, 0);
});

// Clicar em Comprar no Plano -> Ir para a Tela do Pix com o QR Code
planItems.forEach(item => {
    const buyBtn = item.querySelector('.buy-plan-btn');
    buyBtn.addEventListener('click', () => {
        const planPrice = item.getAttribute('data-price');
        checkoutDisplayPrice.innerText = planPrice;
        
        plansView.classList.remove('active');
        pixView.classList.add('active');
        window.scrollTo(0, 0);
    });
});

backToPlansFromPix.addEventListener('click', () => {
    pixView.classList.remove('active');
    plansView.classList.add('active');
    window.scrollTo(0, 0);
});

// Botão Copiar Chave Pix
const copyPixBtn = document.getElementById('copyPixBtn');
const pixKeyText = document.getElementById('pixKeyText');

copyPixBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(pixKeyText.innerText).then(() => {
        const originalHTML = copyPixBtn.innerHTML;
        copyPixBtn.innerHTML = '<i class="fa-solid fa-check"></i> Chave Pix Copiada!';
        copyPixBtn.style.backgroundColor = '#00ff66';
        copyPixBtn.style.color = '#000';
        
        setTimeout(() => {
            copyPixBtn.innerHTML = originalHTML;
            copyPixBtn.style.backgroundColor = '';
            copyPixBtn.style.color = '#fff';
        }, 2500);
    });
});

// Menu Lateral e Seletor de Cores
const openMenuBtn = document.getElementById('openMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const colorOptionBtns = document.querySelectorAll('.color-option-btn');

function toggleMenu() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

openMenuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

// Lógica de Mudança de Cores Dinâmica
colorOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedColor = btn.getAttribute('data-color');
        document.documentElement.style.setProperty('--main-color', selectedColor);
        document.documentElement.style.setProperty('--main-glow', selectedColor + '99');
        toggleMenu();
    });
});

// Cronômetro Regressivo
let totalSeconds = 8 * 60 + 56;
const countdownElement = document.getElementById('countdownTimer');

function updateCountdown() {
    if (totalSeconds <= 0) {
        countdownElement.innerText = "00:00";
        clearInterval(timerInterval);
        return;
    }

    totalSeconds--;
    
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(seconds).padStart(2, '0');

    countdownElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

const timerInterval = setInterval(updateCountdown, 1000);
