// Configuração do Supabase
const SUPABASE_URL = 'https://ttzgmysucadmcfjulpbj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0emdteXN1Y2FkbWNmanVscGJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTg0OTUsImV4cCI6MjA3MDY5NDQ5NX0.510m4SDa6nMW3ftzzJ-A8FPm23lUB3xam123KYLlyRw';

// Inicializar Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Máscara de telefone brasileira
function maskPhone(value) {
    value = value.replace(/\D/g, '');
    if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
    }
    return value;
}

// Aplicar máscara no campo de telefone
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            e.target.value = maskPhone(e.target.value);
        });
    }

    // Countdown timer da página
    startCountdown();
});

// Abrir modal de formulário
function openFormModal() {
    const modal = document.getElementById('formModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Fechar modal
function closeModal() {
    const formModal = document.getElementById('formModal');
    const successModal = document.getElementById('successModal');
    
    if (formModal) formModal.classList.remove('active');
    if (successModal) successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const formModal = document.getElementById('formModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === formModal) {
        closeModal();
    }
    if (event.target === successModal) {
        closeModal();
    }
});

// Submeter formulário
const leadForm = document.getElementById('leadForm');
if (leadForm) {
    leadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        
        if (!nome || !email || !telefone) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        try {
            // Salvar no Supabase
            const { data, error } = await supabase
                .from('interesse_giovanni')
                .insert([
                    {
                        nome: nome,
                        email: email,
                        telefone: telefone
                    }
                ]);
            
            if (error) {
                console.error('Erro ao salvar:', error);
                alert('Erro ao processar seu cadastro. Tente novamente.');
                return;
            }
            
            // Fechar modal de formulário
            const formModal = document.getElementById('formModal');
            if (formModal) {
                formModal.classList.remove('active');
            }
            
            // Limpar formulário
            leadForm.reset();
            
            // Abrir modal de sucesso
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.classList.add('active');
            }
            
            // Iniciar countdown de redirecionamento
            startRedirectCountdown();
            
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao processar seu cadastro. Tente novamente.');
        }
    });
}

// Countdown de redirecionamento
function startRedirectCountdown() {
    let seconds = 5;
    const countdownElement = document.getElementById('redirectCountdown');
    const secondsElement = document.getElementById('redirectSeconds');
    const whatsappLink = 'https://chat.whatsapp.com/LbXIDOzWmMGG3civVKxiOb?mode=hqrt1';
    
    if (countdownElement) countdownElement.textContent = seconds;
    if (secondsElement) secondsElement.textContent = seconds;
    
    const interval = setInterval(() => {
        seconds--;
        if (countdownElement) countdownElement.textContent = seconds;
        if (secondsElement) secondsElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            window.location.href = whatsappLink;
        }
    }, 1000);
}

// Countdown timer da página - 22/12/2025 às 20h
function startCountdown() {
    // Definir data alvo: 22 de dezembro de 2025 às 20:00 (horário local)
    const targetDate = new Date('2025-12-22T20:00:00');
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

