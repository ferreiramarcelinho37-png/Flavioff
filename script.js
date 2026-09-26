document.addEventListener("DOMContentLoaded", function() {
    // Sistema de Notificações Inteligentes, Pequenas e Aleatórias
    const notifications = [
        "🔥 300 pessoas visitaram o site nos últimos 10 minutos!",
        "⚡ 100 pessoas acessaram o site nos últimos 5 minutos.",
        "📥 20 pessoas baixaram o painel grátis agora pouco!",
        "👥 45 pessoas estão navegando no site neste momento.",
        "🍎 15 pessoas resgataram o link do iPhone recentemente.",
        "🚀 50 novos membros entraram no canal do WhatsApp!",
        "🤖 35 pessoas baixaram o painel Android hoje."
    ];

    const toast = document.getElementById("notification-toast");
    const notifDesc = document.getElementById("notif-desc");
    let lastIndex = -1;

    function showRandomNotification() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * notifications.length);
        } while (randomIndex === lastIndex);
        
        lastIndex = randomIndex;
        notifDesc.textContent = notifications[randomIndex];

        // Mostrar notificação
        toast.classList.add("show");

        // Ocultar após 4 segundos
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    // Disparar a primeira notificação logo após 3 segundos, e depois a cada 3 minutos (180000 ms)
    setTimeout(() => {
        showRandomNotification();
        setInterval(showRandomNotification, 180000);
    }, 3000);
});
