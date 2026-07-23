# 📐 ESQUADЯO — Plugin UXP Lápis Raro (2026)

O **ESQUADЯO** é o plugin oficial da **Lápis Raro** para Adobe Illustrator e Photoshop. Ele gera pranchetas com dimensões exatas e desenha guias de segurança (*Safe Zones*) e linhas de corte (*Crop Feed / Mobile vs Desktop*) automaticamente com base no **Guia de Formatos Digitais 2026**.

---

## 🎨 Características do Plugin

- **Identidade Lápis Raro:** Fundo *Noir Raro*, destaques em *Vermelho Raro* (`#E61C00`), tipografia oficial *IBM Plex Mono* e *Milo/IBM Plex Sans*, com o icônico **Я virado** no nome.
- **7 Redes Sociais Auditadas:** Facebook, Instagram, LinkedIn, TikTok, WhatsApp, X (Twitter) e YouTube.
- **2 Modos de Ação:**
  1. `CRIAR PRANCHETA(S)`: Cria novas pranchetas com todas as guias oficiais.
  2. `APLICAR APENAS GUIAS`: Desenha as guias na prancheta já aberta no arquivo ativo.
- **Ajuste Inteligente de Múltiplas Pranchetas:** Quando geradas $N > 1$ pranchetas, as linhas de corte do Feed são desenhadas **apenas na 1ª prancheta**, mantendo as demais limpas para o fluxo de carrossel.

---

## 🚀 Como Instalar e Testar no Illustrator / Photoshop

1. **Abra o Adobe UXP Developer Tool (UDT):**
   - Baixe ou abra o *Adobe UXP Developer Tool* no seu Mac.
2. **Adicione o Plugin:**
   - Clique em **"Add Plugin"**.
   - Selecione o arquivo `manifest.json` que está na pasta `esquadro-uxp`.
3. **Carregue no App:**
   - Com o Illustrator ou Photoshop aberto, clique em **"Load"** no UXP Developer Tool.
   - O painel **ESQUADЯO** aparecerá automaticamente em `Window > Extensions / Plugins > ESQUADЯO`.

---

## 📂 Arquivos do Pacote

- `manifest.json`: Configuração do plugin UXP v5 para Illustrator & Photoshop.
- `index.html`: Estrutura da interface do painel.
- `styles.css`: Estilização oficial com a identidade Lápis Raro.
- `index.js`: Motor de lógica de UI e chamadas às APIs nativas da Adobe.
- `formats-master.json`: Banco de dados com todas as redes e margens auditadas.
