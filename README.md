# GEM Jardim Nair

Portal da CCB Jardim Nair em arquivo único (`index.html`). Fichas do grupo musical (link oficial), agenda de cultos, ensaios, reuniões e DARPE com comando de voz em português, assistente digitado e foto do templo.

Produção: https://gem-jardim-nair-production.up.railway.app

Ficha genérica SJC (qualquer comum, sem custo): `ensaio.html`, mesma pasta.
Validar grátis: `python -m http.server 8000` e abrir `/ensaio.html`.
Com voz em português, contagem por instrumento, hinos, métodos GEM,
frequência local, impressão A4, JSON/CSV e WhatsApp. Tudo em localStorage.

Deploy: Railway, projeto `gem-jardim-nair`, serviço ligado ao repo com Dockerfile nginx na porta 8080.

```powershell
python -m http.server 8000
```

Foto do templo é ilustrativa (domínio público). Trocar por foto real do Jardim Nair quando enviarem.
