# ⚡ FocusLearn

Plataforma de estudos com modo foco, XP, plano semanal e exercícios. HTML, CSS e JavaScript puros, sem backend e sem dependências.

## Como publicar (GitHub Pages)
1. Crie um repositório **público** novo.
2. **Add file → Upload files** e arraste `index.html`, a pasta `css` e a pasta `js` (direto na raiz, sem pasta por fora).
3. **Commit changes**.
4. **Settings → Pages → Branch: main / (root) → Save**.
5. O link aparece em alguns minutos: `https://SEU-USUARIO.github.io/NOME-DO-REPO/`

## 🔒 Segurança (leia antes de publicar)
- **Nenhuma chave de API está no código.** A chave do YouTube é digitada na própria plataforma (Importar playlist) e fica só no `localStorage` do seu navegador.
- Se você já publicou uma versão antiga com chave no código, **apague a chave no Google Cloud e crie outra**. Apagar o arquivo no GitHub não basta: o histórico guarda a chave.
- Crie a chave com **restrições**: em *Restrições de aplicativo* escolha **Sites** e coloque `https://SEU-USUARIO.github.io/*`; em *Restrições de API* marque só **YouTube Data API v3**.
- Nunca suba para o repositório: exportações do Telegram, prints com dados pessoais, arquivos `.env` ou qualquer chave.
- Seu progresso, XP, notas e cursos importados ficam **só no seu navegador**. Nada é enviado para servidor nenhum.
- A página tem uma política de segurança (CSP) que só permite falar com YouTube e Google, e todo título vindo do YouTube é escapado antes de aparecer na tela.

## Funcionalidades
- Cursos com sidebar, progresso e check de aula concluída
- Importar playlist do YouTube (precisa da chave própria)
- Modo foco (Pomodoro ou meta de aulas): pausa o vídeo e tira XP se sair da aba
- XP, 4 patentes e ranking local
- Plano semanal com resumo diário
- Exercícios após cada aula: múltipla escolha, verdadeiro/falso, código e reflexão
- Curso **Python do Zero ao Avançado** (28 aulas, 84 exercícios) incluído

## Vídeos nas aulas de Python
As aulas vêm sem vídeo de propósito. Abra a aula e cole o link do YouTube na caixa que aparece, ou importe uma playlist inteira (ex.: Curso em Vídeo, Mundo 1: `PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6`).

## Estrutura
```
index.html
css/   estilos (variables.css = cores)
js/    data.js (cursos) · data_python.js · app.js · player.js · focus.js
       xp.js · plan.js · exercises.js · import.js · home.js
```
