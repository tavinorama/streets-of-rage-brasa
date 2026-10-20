# Preparação para as lojas — 0.3.3 / 33

O workflow Native builds gera APK de depuração, AAB de release **sem assinatura** e aplicativo iOS para simulador. AAB sem assinatura não está pronto para upload; simulador não instala em iPhone.

## Google Play

A assinatura é opcional no Gradle e usa somente variáveis de ambiente. O workflow manual Signed Android bundle requer os secrets ANDROID_KEYSTORE_BASE64, ANDROID_KEYSTORE_PASSWORD, ANDROID_KEY_ALIAS e ANDROID_KEY_PASSWORD no ambiente mobile-release. A chave pertence ao titular: não gerar/substituir a chave de um aplicativo já publicado. O workflow gera o AAB assinado como artefato; não o envia automaticamente à loja.

Ainda é necessário acesso à conta Play Console, confirmação dos dados do responsável, cadastro do aplicativo, ficha e questionários, screenshots finais e teste em aparelho físico.

## Apple / TestFlight

O projeto está versionado e compila no CI para simulador. Para distribuição real faltam conta Apple Developer, equipe, certificados e perfis sob controle do titular. Abrir o projeto no Xcode, escolher equipe, testar num iPhone, arquivar para dispositivo e validar no Organizer antes de enviar ao App Store Connect. Nenhuma assinatura ou conta foi simulada.

## Materiais preparados

- Ícones: dist/assets/icon-192.png e icon-512.png; projetos nativos contêm os ícones por plataforma.
- Privacidade: https://brasa-arcade.pages.dev/privacy.html
- Título, descrição e URL: store-listing.json (rascunho para revisão do titular).
- Relatórios de campanha e online: validation/. Testes automatizados não substituem sessões humanas ou testes em redes móveis reais.
- Confirmar classificação nas lojas: o 16+ do jogo é apenas editorial.
