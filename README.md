# 🏠 Realtor Portfolio — Digital Presence for Real Estate Agents

> **A high-performance, SEO-optimized landing page built for Brazilian real estate agents.**  
> Single HTML file · No frameworks · WhatsApp lead generation · PageSpeed-ready

---

## 🇧🇷 Português | 🇺🇸 English

> Jump to: [English version](#-english-version) ↓

---

## 🇧🇷 Versão em Português

### Sobre o projeto

Portfolio digital profissional desenvolvido especificamente para **corretores imobiliários** no Brasil. O objetivo é centralizar a presença online do corretor em um único canal próprio, capturar leads qualificados e direcioná-los diretamente para o WhatsApp — sem dependência de portais terceiros ou redes sociais.

O projeto nasceu de uma documentação de produto real (MVP) e foi construído do zero com foco em três pilares: **performance**, **SEO técnico** e **conversão de leads**.

---

### ✨ Funcionalidades

- **Site completo em arquivo único** — sem dependências externas, sem frameworks, sem build step
- **SEO técnico avançado** — Schema.org `RealEstateAgent`, `FAQPage` em JSON-LD, Open Graph, Twitter Card, meta tags completas, link canônico e robots
- **Integração WhatsApp** — formulário que monta mensagem automaticamente e redireciona com dados do lead já preenchidos
- **Performance otimizada** — fontes não-bloqueantes (`media="print"` + `onload`), `fetchpriority`, `loading="lazy"`, `decoding="async"`, prevenção de CLS com `width`/`height` nas imagens
- **Totalmente responsivo** — mobile-first, breakpoints em 960px e 480px
- **Slot de logo da empresa** — espaço dedicado na nav e no footer para a marca da imobiliária
- **Acessibilidade** — skip link, `aria-label`, `role`, `aria-expanded`, landmarks semânticos
- **FAQ accordion** — expande/recolhe com animação CSS pura, sem JavaScript de animação
- **Menu mobile overlay** — abre sobre a tela com links grandes, sem travar o scroll
- **Seções completas** — Hero, Banner full-width, Sobre, Serviços, FAQ, Depoimentos e Contato

---

### 🗂️ Estrutura do projeto

```
/
├── index.html                  # Site completo (renomeie portfolio_corretor_v3.html)
├── foto-corretor-hero.png      # PNG do corretor (fundo transparente) — hero
├── foto-corretor-sobre.png     # PNG do corretor (fundo transparente) — sobre
├── banner-escritorio.jpg       # Foto panorâmica 1600×480px — banner full-width
├── og-image.jpg                # Imagem 1200×630px — compartilhamento social
├── sitemap.xml                 # Sitemap para Google Search Console
├── robots.txt                  # Instruções para crawlers
└── .htaccess                   # Regras de segurança e redirecionamento HTTPS
```

---

### 🖼️ Imagens — guia de substituição

| Arquivo | Descrição | Tamanho recomendado |
|---|---|---|
| `foto-corretor-hero.png` | Corretor em pé, apontando ou braços cruzados. PNG com fundo transparente (canal alpha). Fica como elemento visual do cenário. | 600×900px |
| `foto-corretor-sobre.png` | Corretor de braços cruzados. PNG com fundo transparente. Exibido sobre fundo decorativo na seção Sobre. | 600×750px |
| `banner-escritorio.jpg` | Foto panorâmica do escritório, imóvel em destaque ou fachada. Vai de ponta a ponta da página. | 1600×480px |
| `og-image.jpg` | Imagem exibida quando o link é compartilhado no WhatsApp, Facebook e Twitter. | 1200×630px |

---

### 🔧 Como personalizar

Abra o `index.html` e localize os comentários `<!-- PERSONALIZE: ... -->`. Os principais pontos são:

**Dados do corretor**
```html
<!-- Título da página -->
<title>Carlos Mendes | Corretor Imobiliário em [Cidade] — CRECI 12.345-F</title>

<!-- Schema.org -->
"name": "Carlos Mendes",
"telephone": "+55-83-99999-9999",
"email": "carlos@exemplo.com"

<!-- WhatsApp (DDI + DDD + número, sem espaços) -->
href="https://wa.me/5583999999999?text=..."
```

**Logo da empresa (nav e footer)**
```html
<!-- Substitua o <span> por: -->
<img class="nav-logo-empresa" src="logo-imobiliaria.png"
     alt="Nome da Imobiliária" width="120" height="34">
```

**Cores (variáveis CSS)**
```css
:root {
  --accent:    #B07D4F; /* dourado principal — botões, destaques */
  --brown:     #3E2C1E; /* marrom escuro — títulos, footer */
  --sand:      #F7F3EE; /* fundo bege claro */
}
```

---

### 📦 Como publicar

1. Renomeie `portfolio_corretor_v3.html` para `index.html`
2. Coloque todos os arquivos na mesma pasta
3. Faça upload para `public_html` na sua hospedagem (Hostinger, Netlify, Vercel etc.)
4. Ative o SSL gratuito no painel da hospedagem
5. Registre o domínio no [Registro.br](https://registro.br) ou na sua hospedagem
6. Adicione o site no [Google Search Console](https://search.google.com/search-console)
7. Envie o `sitemap.xml` pelo Search Console

---

### 🔒 Segurança

O site **não usa backend e não armazena dados**. Os dados do formulário de contato são enviados diretamente pelo WhatsApp via link `wa.me` — risco zero de vazamento pelo servidor.

Para a hospedagem, use o `.htaccess` incluído no projeto. Ele configura:
- Redirecionamento forçado para HTTPS
- Headers de segurança (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- Bloqueio de acesso a arquivos sensíveis (`.htpasswd`, `.log`, `.sql` etc.)
- Remoção de informações do servidor dos headers de resposta

---

### ⚡ Performance

| Métrica | Estratégia usada |
|---|---|
| LCP (Largest Contentful Paint) | `fetchpriority="high"` + `loading="eager"` na foto hero |
| CLS (Cumulative Layout Shift) | `width` e `height` declarados em todas as imagens |
| Fontes não-bloqueantes | `media="print"` + `onload="this.media='all'"` |
| Imagens abaixo do fold | `loading="lazy"` + `decoding="async"` |
| JavaScript mínimo | Zero dependências externas, JS inline no final do body |
| SEO estruturado | JSON-LD Schema.org `RealEstateAgent` + `FAQPage` |

---

### 🛠️ Stack

| Tecnologia | Uso |
|---|---|
| HTML5 semântico | Estrutura e acessibilidade (`article`, `section`, `main`, `nav`, `footer`) |
| CSS3 puro | Layout (Grid, Flexbox), variáveis CSS, responsividade, pseudo-elementos |
| JavaScript vanilla | Menu mobile, FAQ accordion, redirect WhatsApp com dados do formulário |
| Schema.org JSON-LD | Dados estruturados para SEO rico no Google |
| Google Fonts | Playfair Display + Plus Jakarta Sans (carregamento não-bloqueante) |

**Sem React. Sem Vue. Sem Node. Sem build. Um arquivo.**

---

### 📋 Checklist de personalização

- [ ] Substituir `[Cidade]` pelo nome real da cidade em todos os lugares
- [ ] Atualizar número de WhatsApp (DDI+DDD+número)
- [ ] Atualizar CRECI com o número real
- [ ] Substituir e-mail e Instagram pelos reais
- [ ] Adicionar as 3 fotos do corretor (hero, sobre, banner)
- [ ] Criar e adicionar a `og-image.jpg` (1200×630px)
- [ ] Adicionar logo da imobiliária (substituir o placeholder na nav e footer)
- [ ] Atualizar URL canônica e links do Schema.org com o domínio real
- [ ] Atualizar textos de depoimentos com clientes reais
- [ ] Configurar Google Search Console e enviar sitemap
- [ ] Ativar SSL na hospedagem
- [ ] Fazer upload do `.htaccess`

---

### 📁 Arquivos de suporte

Além do `index.html`, o projeto inclui:

**`sitemap.xml`**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://carlosmendes.com.br/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**`robots.txt`**
```
User-agent: *
Allow: /
Sitemap: https://carlosmendes.com.br/sitemap.xml
```

**`.htaccess`**
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

ServerSignature Off

<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|sql)$">
  Order Allow,Deny
  Deny from all
</FilesMatch>

Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

---

### 📄 Licença

Este projeto foi desenvolvido como produto comercial. O código pode ser adaptado para uso em portfólios de corretores imobiliários. Redistribuição ou revenda do código-fonte sem autorização não é permitida.

---
---

## 🇺🇸 English Version

### About

A professional digital portfolio built specifically for **Brazilian real estate agents (corretores imobiliários)**. The goal is to centralize the agent's online presence in a single owned channel, capture qualified leads, and route them directly to WhatsApp — without relying on third-party portals or social media algorithms.

The project was born from a real product documentation (MVP) and built from scratch with three core pillars: **performance**, **technical SEO**, and **lead conversion**.

---

### ✨ Features

- **Complete site in a single file** — no external dependencies, no frameworks, no build step
- **Advanced technical SEO** — Schema.org `RealEstateAgent` + `FAQPage` JSON-LD, Open Graph, Twitter Card, full meta tags, canonical link, robots meta
- **WhatsApp integration** — contact form that automatically composes a pre-filled message and opens the agent's WhatsApp
- **Optimized performance** — non-blocking fonts (`media="print"` + `onload`), `fetchpriority`, `loading="lazy"`, `decoding="async"`, CLS prevention with explicit image dimensions
- **Fully responsive** — mobile-first, breakpoints at 960px and 480px
- **Company logo slot** — dedicated space in both the nav bar and footer for the real estate agency's brand
- **Accessibility** — skip link, `aria-label`, `role`, `aria-expanded`, semantic landmarks
- **FAQ accordion** — pure CSS-driven expand/collapse animation, no JS animation libraries
- **Mobile overlay menu** — full-screen navigation without scroll locking
- **Complete sections** — Hero, Full-width Banner, About, Services, FAQ, Testimonials, and Contact

---

### 🗂️ Project structure

```
/
├── index.html                  # Complete site (rename from portfolio_corretor_v3.html)
├── foto-corretor-hero.png      # Agent PNG (transparent background) — hero section
├── foto-corretor-sobre.png     # Agent PNG (transparent background) — about section
├── banner-escritorio.jpg       # Panoramic photo 1600×480px — full-width banner
├── og-image.jpg                # 1200×630px — social sharing preview
├── sitemap.xml                 # Sitemap for Google Search Console
├── robots.txt                  # Crawler instructions
└── .htaccess                   # Security rules and HTTPS redirect
```

---

### 🔧 How to customize

Open `index.html` and look for `<!-- PERSONALIZE: ... -->` comments throughout the file. Key areas:

**Agent data**
```html
<title>Agent Name | Real Estate Agent in [City] — License No.</title>

"telephone": "+55-00-00000-0000",
"email": "agent@example.com"

href="https://wa.me/55XXXXXXXXXXX?text=..."
```

**Agency logo (nav + footer)**
```html
<img class="nav-logo-empresa" src="agency-logo.png"
     alt="Agency Name" width="120" height="34">
```

**Brand colors**
```css
:root {
  --accent: #B07D4F; /* golden — buttons and highlights */
  --brown:  #3E2C1E; /* dark brown — headings and footer */
  --sand:   #F7F3EE; /* light beige — background */
}
```

---

### 📦 Deployment

1. Rename `portfolio_corretor_v3.html` to `index.html`
2. Place all files in the same folder
3. Upload to `public_html` on your host (Hostinger, Netlify, Vercel, etc.)
4. Enable free SSL on your hosting panel
5. Register the domain at [Registro.br](https://registro.br) or your host
6. Add the site to [Google Search Console](https://search.google.com/search-console)
7. Submit `sitemap.xml` via Search Console

---

### ⚡ Performance strategy

| Metric | Strategy |
|---|---|
| LCP | `fetchpriority="high"` + `loading="eager"` on the hero image |
| CLS | Explicit `width` and `height` on all images |
| Non-blocking fonts | `media="print"` + `onload="this.media='all'"` |
| Below-the-fold images | `loading="lazy"` + `decoding="async"` |
| Minimal JavaScript | Zero external dependencies, inline JS at end of body |
| Rich SEO | JSON-LD Schema.org `RealEstateAgent` + `FAQPage` |

---

### 🛠️ Tech stack

| Technology | Usage |
|---|---|
| Semantic HTML5 | Structure and accessibility (`article`, `section`, `main`, `nav`, `footer`) |
| Pure CSS3 | Grid, Flexbox, CSS variables, responsive design, pseudo-elements |
| Vanilla JavaScript | Mobile menu, FAQ accordion, WhatsApp redirect with form data |
| Schema.org JSON-LD | Structured data for rich results in Google Search |
| Google Fonts | Playfair Display + Plus Jakarta Sans (non-blocking load) |

**No React. No Vue. No Node. No build step. One file.**

---

### 🔒 Data & security

The site **has no backend and stores no data**. Contact form data is sent directly via the WhatsApp `wa.me` link — zero server-side data exposure.

The included `.htaccess` configures forced HTTPS redirect, security headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`), and blocks direct access to sensitive files.

---

### 📄 License

Developed as a commercial product. The code may be adapted for individual real estate agent portfolios. Redistribution or resale of the source code without authorization is not permitted.

---

## 💬 Description for GitHub (short bio)

> Professional digital portfolio for Brazilian real estate agents. Single-file HTML, advanced technical SEO (Schema.org JSON-LD), WhatsApp lead generation, mobile-first, PageSpeed-optimized. No frameworks, no build step.

**Topics / tags sugeridas para o GitHub:**
`html` `css` `javascript` `seo` `real-estate` `portfolio` `landing-page` `whatsapp` `responsive` `schema-org` `vanilla-js` `lead-generation` `imobiliario` `corretor` `pagespeed`
