# Aplicativos Android e iPhone — 0.3.3 / build 33

[Baixar a beta](https://github.com/tavinorama/streets-of-rage-brasa/releases/tag/beta-v33-2026-10-20) · [Compilação](https://github.com/tavinorama/streets-of-rage-brasa/actions/runs/39499358999)

Projetos Capacitor 8.5.3 em android/ e ios/, contendo o modo local no pacote e o endereço do servidor online público. Node.js 22 ou superior: npm ci e npm run native:sync. npm run native:android abre Android Studio; npm run native:ios abre Xcode.

## Arquivos da beta

- APK Android de depuração: instalável para testes.
- AAB Android de release **sem assinatura**: precisa da chave do titular antes de enviar ao Google Play.
- ZIP iOS: aplicativo **para simulador** do Xcode; não instala em iPhone físico.
- SHA256SUMS: integridade dos downloads.

Os módulos web dentro dos pacotes foram comparados ao código da versão; versão e build do iOS também foram conferidos. Preparação de assinatura Android, ficha de loja e processo Apple: [STORE-RELEASE.md](STORE-RELEASE.md) e [store-listing.json](store-listing.json). Nenhuma credencial ou chave de release foi criada ou incluída no repositório.

## Limites da validação

CI compila os projetos; testes de navegador e bots não equivalem a aparelhos físicos ou sessões humanas. Ainda faltam Android/iPhone reais, redes distintas, assinatura/contas de desenvolvedor e revisão das lojas. A indicação 16+ do jogo é editorial. Estado e relatórios: [RELEASE-STATUS.md](RELEASE-STATUS.md), [DEVICE-TESTS.md](DEVICE-TESTS.md) e validation/.
