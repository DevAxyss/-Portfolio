/*<!-- ══════════════════════════════════════════════════════════
       JAVASCRIPT
       Colocado no final do body para não bloquear a renderização do HTML.
       Scripts executam depois que o navegador já processou todo o HTML.
  ══════════════════════════════════════════════════════════ -->


    /* ══════════════════════════════════════════════════════════
       CONFIGURAÇÕES DO CORRETOR
       Altere apenas este bloco para personalizar o portfólio.
       Todas as informações dinâmicas são geradas a partir daqui.
       ATENÇÃO: não exponha senhas, tokens ou chaves de API aqui.
    ══════════════════════════════════════════════════════════ */
    const CORRETOR = {
      nome:         'Victor Araújo',
      creci:        '1816-J',
      whatsapp:     '5583991603629',       /* DDI+DDD+número, sem espaços ou traços */
      telMask:      '(83) 9 9160-3629',    /* formato de exibição no site             */
      instagram:    '@victor_barbosaa_',
      instagramUrl: 'https://instagram.com/victor_barbosaa_',
      email:        'victorconsolprime@gmail.com',
    };


    /* ──────────────────────────────────────────────────────
       INJEÇÃO DE DADOS — applyConfig()
       Aplica as variáveis do CORRETOR nos elementos do DOM.
       Evita que informações sensíveis fiquem espalhadas
       pelo HTML e centraliza a manutenção em um único lugar.
    ────────────────────────────────────────────────────── */
    function applyConfig() {

      /* ── Nomes e CRECI visíveis na página ── */
      var mapa = {
        'display-nome':         CORRETOR.nome,
        'display-eyebrow':      'Corretor Imobiliário · CRECI ' + CORRETOR.creci,
        'display-badge-nome':   CORRETOR.nome,
        'display-badge-creci':  'CRECI ' + CORRETOR.creci + ' · Ativo',
        'display-cred-creci':   'CRECI ' + CORRETOR.creci + ' — Ativo',
        'display-callout-nome': '— ' + CORRETOR.nome + ' · Corretor CRECI ' + CORRETOR.creci,
        'display-footer-nome':  CORRETOR.nome,
        'display-footer-creci': '© 2025 · CRECI ' + CORRETOR.creci + ' · Todos os direitos reservados',
        'display-tel':          CORRETOR.telMask,
        'display-ig':           CORRETOR.instagram,
        'display-email':        CORRETOR.email,
      };
      Object.keys(mapa).forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = mapa[id];
      });

      /* ── Links de contato ── */
      var linkIg = document.getElementById('link-instagram');
      if (linkIg) linkIg.setAttribute('href', CORRETOR.instagramUrl);

      var linkEmail = document.getElementById('link-email');
      if (linkEmail) linkEmail.setAttribute('href', 'mailto:' + CORRETOR.email);

      /* ── Todos os links WhatsApp — mantém o parâmetro ?text= intacto ── */
      document.querySelectorAll('a[href*="wa.me/"]').forEach(function(el) {
        var href = el.getAttribute('href');
        var baseUrl = 'https://wa.me/' + CORRETOR.whatsapp;
        el.setAttribute('href', href.indexOf('?text=') !== -1
          ? baseUrl + '?text=' + href.split('?text=')[1]
          : baseUrl);
      });

      /* ── Links Instagram no rodapé e demais ── */
      document.querySelectorAll('a[href*="instagram.com/"]').forEach(function(el) {
        if (el.id !== 'link-instagram') {
          el.setAttribute('href', CORRETOR.instagramUrl);
        }
      });

      /* ── Título da aba do navegador ── */
      document.title = CORRETOR.nome + ' | Corretor Imobiliário · CRECI ' + CORRETOR.creci;
    }

    document.addEventListener('DOMContentLoaded', applyConfig);


    /* ──────────────────────────────────────────────────────
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
    /* Remove tags HTML e caracteres de controle dos inputs do formulário.
       Evita injeção de conteúdo malicioso na URL gerada para o WhatsApp. */
    function sanitize(str) {
      return str
        .replace(/<[^>]*>/g, '')          /* remove qualquer tag HTML */
        .replace(/[^\w\s@.,;:()\-+]/gu, '')  /* mantém apenas chars seguros */
        .trim();
    }

    function sendWhatsApp() {
      /* Verifica consentimento LGPD antes de processar qualquer dado */
      var lgpdCheck = document.getElementById('f-lgpd');
      if (lgpdCheck && !lgpdCheck.checked) {
        alert('Para enviar, aceite o uso dos seus dados conforme a LGPD.');
        lgpdCheck.focus();
        return;
      }

      /* Coleta e sanitiza os valores dos campos */
      var nome      = sanitize(document.getElementById('f-nome').value);
      var telefone  = sanitize(document.getElementById('f-tel').value);
      var interesse = document.getElementById('f-interesse').value;
      var valor     = sanitize(document.getElementById('f-valor').value);
      var mensagem  = sanitize(document.getElementById('f-msg').value);

      /* Validação: campos obrigatórios não podem estar vazios */
      if (!nome || !telefone || !interesse) {
        alert('Por favor, preencha seu nome, telefone e interesse.');
        return;
      }

      /* Monta o array de linhas — asteriscos deixam em negrito no WhatsApp */
      var linhas = [
        'Ola, me chamo *' + nome + '*.',
        'Tenho interesse em: *' + interesse + '*.',
        valor    ? 'Valor pretendido: *' + valor + '*.'  : '',
        telefone ? 'Telefone: *' + telefone + '*.'       : '',
        mensagem ? 'Observacao: ' + mensagem             : ''
      ].filter(Boolean);

      var textoFinal = linhas.join('\n');

      /* Usa o número centralizado do objeto CORRETOR */
      var urlWhatsApp = 'https://wa.me/' + CORRETOR.whatsapp + '?text=' + encodeURIComponent(textoFinal);

      /* Abre o WhatsApp em nova aba com segurança */
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


    /* ──────────────────────────────────────────────────────
       BANNER LGPD — initLGPD() / aceitarLGPD()
       Exibe o aviso de privacidade na primeira visita.
       Consent salvo em localStorage — não reaparece após aceite.
    ────────────────────────────────────────────────────── */
    function initLGPD() {
      if (localStorage.getItem('lgpd_aceito')) return; /* já aceitou antes */
      var banner = document.getElementById('lgpd-banner');
      if (banner) banner.removeAttribute('hidden');
    }

    function aceitarLGPD() {
      localStorage.setItem('lgpd_aceito', '1');
      var banner = document.getElementById('lgpd-banner');
      if (banner) banner.setAttribute('hidden', '');
    }

    document.addEventListener('DOMContentLoaded', initLGPD);
