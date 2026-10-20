# Salas online

Abra o jogo, escolha os dois personagens e as opções e clique em **Criar sala**. Compartilhe o convite com uma pessoa. A outra pessoa abre o mesmo jogo e entra com o código. Cada pessoa usa os comandos de jogador 1 do seu aparelho. O criador simula a partida; o convidado controla o segundo personagem. Fechar ou trocar de aba pausa a partida. Não há contas, chat ou ranking.

A publicação do servidor ainda depende de autorização Workers na conta Cloudflare; o modo local continua funcionando. O endereço configurado fica em `dist/online-config.json`. Salas expiram após inatividade e o estado não é mantido para retomada depois que todos saem.

O backend compartilhado está na pasta `online/` do repositório Streets of Rage Brasa. Para testar: `cd online`, `npm ci`, `npm run dev`; em outro terminal, `ONLINE_TEST_URL=http://localhost:8790 npm test`. Os sites em localhost usam esse endereço automaticamente.

Para publicar, autorize Wrangler com permissão Workers, execute `npm run deploy` na pasta `online/`, atualize o endpoint HTTPS nos dois jogos e publique novamente os sites. O Worker usa Durable Objects e WebSockets; custos e limites dependem do plano da conta Cloudflare.

São partidas casuais entre convidados. Latência e desempenho dependem dos dois aparelhos e da conexão do criador. Testes locais com dois clientes foram concluídos; testes em redes e aparelhos físicos diferentes seguem pendentes.
