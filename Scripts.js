/*<!-- ══════════════════════════════════════════════════════════
       JAVASCRIPT
       Colocado no final do body para não bloquear a renderização do HTML.
       Scripts executam depois que o navegador já processou todo o HTML.
  ══════════════════════════════════════════════════════════ -->


     ──────────────────────────────────────────────────────
       MENU MOBILE — toggleMenu()
       Abre/fecha o overlay de navegação mobile.
       Não trava o scroll do body (document.body.style.overflow = '' sempre).
    ────────────────────────────────────────────────────── */
    function toggleMenu() {
      const menu        = document.getElementById('mobileMenu');
      const botaoHamb   = document.querySelector('.hamburger');

      /* toggle() adiciona .open se não existir, remove se existir — retorna o estado atual */
      const estaAberto  = menu.classList.toggle('open');

      /* Atualiza aria-expanded para acessibilidade com leitores de tela */
      botaoHamb.setAttribute('aria-expanded', estaAberto);

      /* Garante que o scroll da página nunca fique travado */
      document.body.style.overflow = '';
    }

    /* Listener global: fecha o menu quando o usuário clica em um link do overlay.
       Necessário porque links com href="#ancora" não chamam toggleMenu() diretamente */
    document.addEventListener('click', function(evento) {
      const clicouEmLink  = evento.target.tagName === 'A';
      const dentroDoMenu  = evento.target.closest('#mobileMenu');

      if (clicouEmLink && dentroDoMenu) {
        document.getElementById('mobileMenu').classList.remove('open');
        document.querySelector('.hamburger').setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });


    /* ──────────────────────────────────────────────────────
       FAQ ACCORDION — toggleFaq(itemFaq)
       Expande/recolhe a resposta de um item do FAQ.
       Fecha todos os outros itens antes de abrir o selecionado (comportamento accordion).
    ────────────────────────────────────────────────────── */
    function toggleFaq(itemFaq) {
      const estaAberto = itemFaq.classList.contains('open');

      /* Fecha todos os itens que estão abertos */
      document.querySelectorAll('.faq-item.open').forEach(function(item) {
        item.classList.remove('open');
        item.querySelector('.faq-icon').textContent = '+';                          /* restaura símbolo */
        item.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      /* Se o item clicado estava fechado, abre ele */
      if (!estaAberto) {
        itemFaq.classList.add('open');
        itemFaq.querySelector('.faq-icon').textContent = '−';                       /* símbolo de aberto */
        itemFaq.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
      }
      /* Se estava aberto, já foi fechado acima — comportamento de toggle natural */
    }


    /* ──────────────────────────────────────────────────────
       FORMULÁRIO → WHATSAPP — sendWhatsApp()
       Coleta os dados do formulário, monta uma mensagem formatada em negrito
       e abre o WhatsApp do corretor com a mensagem já preenchida.

       Resultado: o lead chega qualificado com nome, interesse, valor e telefone.
       Não usa backend nem banco de dados — tudo via link wa.me (ideal para o MVP).
    ────────────────────────────────────────────────────── */
    function sendWhatsApp() {
      /* Coleta os valores dos campos e remove espaços extras com trim() */
      const nome      = document.getElementById('f-nome').value.trim();
      const telefone  = document.getElementById('f-tel').value.trim();
      const interesse = document.getElementById('f-interesse').value;
      const valor     = document.getElementById('f-valor').value.trim();
      const mensagem  = document.getElementById('f-msg').value.trim();

      /* Validação: campos obrigatórios não podem estar vazios */
      if (!nome || !telefone || !interesse) {
        alert('Por favor, preencha seu nome, telefone e interesse.');
        return; /* interrompe a função */
      }

      /* Monta o array de linhas da mensagem
         * (asterisco) ao redor do texto deixa em negrito no WhatsApp
         filter(Boolean) remove as linhas vazias (campos opcionais não preenchidos) */
      const linhas = [
        `Olá, me chamo *${nome}*.`,
        `Tenho interesse em: *${interesse}*.`,
        valor    ? `Valor pretendido: *${valor}*.` : '',  /* só adiciona se preenchido */
        telefone ? `Telefone: *${telefone}*.`       : '',
        mensagem ? `Observação: ${mensagem}`         : ''
      ].filter(Boolean);

      /* Junta as linhas com quebra de linha (\n) */
      const textoFinal = linhas.join('\n');

      /* Número do corretor — PERSONALIZE: substitua pelo número real (DDI+DDD+número sem espaços) */
      const numeroWhatsApp = '5583991603629';

      /* encodeURIComponent converte caracteres especiais para formato URL seguro
         Ex: "ã" vira "%C3%A3", "\n" vira "%0A" */
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoFinal)}`;

      /* Abre o WhatsApp em uma nova aba com segurança (noopener previne acesso ao window.opener) */
      window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    }


    /* ──────────────────────────────────────────────────────
       INTERSECTION OBSERVER — mantido como no-op
       As animações de scroll foram desativadas para evitar bugs de
       stacking context (transform: translateY cria contexto de empilhamento
       que causava sobreposição de elementos no mobile).
       O observer está aqui apenas por compatibilidade com a classe .fade-in no HTML.
    ────────────────────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entradas) {
        entradas.forEach(function(entrada) {
          if (entrada.isIntersecting) {
            observer.unobserve(entrada.target); /* para de observar após a primeira interseção */
          }
        });
      }, { threshold: 0.05 }); /* dispara quando 5% do elemento está visível */

      /* Observa todos os elementos com a classe .fade-in */
      document.querySelectorAll('.fade-in').forEach(function(elemento) {
        observer.observe(elemento);
      });
    }
