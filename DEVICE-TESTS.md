# Validação em aparelhos e sessões de jogo

## Estado real

Os testes automatizados validam física, regras, persistência, protocolo online e geometria de telas. Conferências no navegador desktop não equivalem a teste em Android/iPhone físico. Nenhum resultado de aparelho físico é marcado como aprovado sem execução nesse aparelho.

## Roteiro por aparelho

Registrar modelo, sistema, navegador/versão, orientação e qualidade visual. Abrir cada jogo em HTTPS; jogar por 15 minutos e repetir em modo instalado/PWA e, quando disponível, APK/aplicativo de teste.

1. Entrar, escolher personagem, dificuldade e fase; pausar e continuar.
2. Manter dois dedos no direcional e atacar, saltar e defender com outro. Cancelar toque arrastando, trocar orientação e voltar do segundo plano: nenhum comando deve ficar preso.
3. Expandir/recolher a área de jogo; verificar saída, pausa, áreas seguras e barras do navegador em retrato/paisagem.
4. Abrir Configurações → Medir por 20 segundos. Baixar o JSON, anotar FPS médios e percentil 95. Comparar qualidade automática/econômica. Medir aquecimento e memória pelo inspetor do aparelho quando disponível.
5. Ajustar música e efeitos, bloquear tela, voltar ao jogo; nenhum áudio deve continuar no segundo plano.
6. Avançar uma onda, fechar o jogo e usar Continuar campanha. Confirmar vidas, Brasa, inimigos, lado, dupla e pontuação.
7. Carregar uma fase, instalar a PWA, desconectar a internet e reabrir. Testar quais assets foram guardados; arquivos ainda não visitados podem requerer rede. O pacote nativo inclui os arquivos do modo local.
8. Conectar duas pessoas/dispositivos em uma sala; mover e atacar em ambos. Testar latência real, sair, perder rede, retomar e impedir entrada de uma terceira pessoa.
9. Conferir alto contraste, texto ampliado, movimento reduzido e foco do teclado. No leitor de tela, verificar menus e avisos de fase/vida; o combate em Canvas continua sendo uma experiência visual.

## Matriz pendente de aparelhos físicos

| Plataforma | Navegador/Pacote | Estado |
|---|---|---|
| Android intermediário | Chrome + PWA + APK | Não executado em aparelho físico |
| Android de entrada | Chrome + APK, qualidade econômica | Não executado em aparelho físico |
| iPhone | Safari + PWA | Não executado em aparelho físico |
| iPhone/iPad | TestFlight/app assinado | Depende de assinatura e aparelho |

## Balanceamento com jogadores

Os níveis História/Padrão/Arcade possuem multiplicadores explícitos de dano, resistência, velocidade, cadência e número de atacantes simultâneos. A CPU usa tempos de reação por dificuldade. A campanha limita ataques simultâneos e sinaliza golpes. Os testes verificam esses efeitos e a estabilidade do combate; ainda é necessário colher retorno de jogadores sobre diversão, clareza dos golpes e dificuldade. Registrar personagem, fase, dificuldade, duração, mortes e motivo de desistência. Não tratar bots como sessões humanas de teste.
