# Aplicativos Android e iPhone

Projetos nativos gerados com Capacitor 8.5.3, contendo os arquivos do jogo no pacote. Não dependem do site para abrir o modo local.

## Preparar

Use Node.js 22 ou superior, execute `npm ci` e `npm run native:sync`. Os projetos estão em `android/` e `ios/`. `npm run native:android` abre Android Studio; `npm run native:ios` abre Xcode. Requisitos atuais: [Capacitor](https://capacitorjs.com/docs/getting-started/environment-setup).

## Artefatos de teste

O workflow **Native builds** executa a compilação Android em Linux e a compilação iOS em macOS. O APK Android é de depuração. O pacote iOS é para simulador e não pode ser instalado em um iPhone físico. Resultados e arquivos aparecem em GitHub → Actions → Native builds.

## Publicação nas lojas

Para Google Play: gerar AAB de release com uma chave de assinatura sob controle do titular, criar o cadastro e concluir a ficha, classificação e revisão. Para App Store/TestFlight: conta Apple Developer, equipe de assinatura, identificador, certificados/perfis e envio pelo Xcode/App Store Connect. Nenhuma credencial ou chave de release foi criada ou incluída no repositório.

A política de privacidade está em `dist/privacy.html`. A indicação 16+ no protótipo é editorial; as lojas exigem questionário próprio. Testar em aparelhos físicos antes de distribuir ao público.

## Beta compilada em 20/10/2026

[Baixar pacotes de teste](https://github.com/tavinorama/streets-of-rage-brasa/releases/tag/beta-online-2026-10-20) · [Compilação verificada](https://github.com/tavinorama/streets-of-rage-brasa/actions/runs/39490669189). Android: APK de depuração. iOS: somente simulador, sem assinatura para iPhone físico.

Esta beta inclui a configuração do servidor online público e a correção da animação dos corpos derrotados. O conteúdo dos pacotes foi comparado aos módulos do commit da release.
