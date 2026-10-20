# Sete bairros, cinco regiões — campanha regional

Pesquisa consultada em 20 de outubro de 2026. A campanha usa uma seleção editorial de locais com violência documentada e identidade reconhecível; **não existe, nas fontes consultadas, um ranking nacional comparável que permita afirmar que estes são os sete bairros mais violentos do Brasil**. As diferenças entre contagens, taxas, períodos, municípios e regiões administrativas impedem essa afirmação. A dificuldade das fases é uma decisão de jogo.

| Fase | Local | Região | Base consultada | Figurino do cenário |
| --- | --- | --- | --- | --- |
| 1 | Jorge Teixeira, Manaus/AM | Norte | [SSP-AM, anuário 2026](https://www.ssp.am.gov.br/wp-content/uploads/2026/03/Anuario_do_Amazonas_de_Seguranca_Publica_2026-1.pdf) e [estudo sobre 2019–2023](https://journalppc.com/RPPC/article/view/2626) | Calor úmido: bermudas, sandálias, camiseta leve e variação sem camisa |
| 2 | Bom Jardim, Fortaleza/CE | Nordeste | [Governo do Ceará, contexto territorial e cultural](https://www.ce.gov.br/2024/10/28/politicas-culturais-como-o-centro-cultural-bom-jardim-apresentam-caminho-alternativo-a-violencia/) | Algodão, regatas, bermudas, chinelos e tênis |
| 3 | Pernambués, Salvador/BA | Nordeste | [Anuário da Polícia Civil da Bahia](https://www.ba.gov.br/policiacivil/sites/site-pcba/files/2025-09/Anuario%20PCBA.pdf), mapa 14/gráfico 9, recorte 2024: 30 ocorrências de CVLI | Roupa leve, bermudas e sandálias; referência visual às ladeiras |
| 4 | Valéria, Salvador/BA | Nordeste | Mesmo anuário, recorte 2024: 27 ocorrências de CVLI | Roupa leve e peças de oficina; bota para o personagem mecânico |
| 5 | Sol Nascente, Brasília/DF | Centro-Oeste | [Dados por RA da SSP-DF](https://www.ssp.df.gov.br/dados-por-regiao-administrativa/) e [agregação secundária](https://crimebrasil.com.br/bairro/df/brasilia/sol-nascente-por-do-sol) | Algodão e bermudas; roupa de trabalho e camada leve ao anoitecer |
| 6 | Restinga, Porto Alegre/RS | Sul | [GZH: levantamento de homicídios de 2024](https://gauchazh.clicrbs.com.br/seguranca/noticia/2025/02/confira-o-numero-de-homicidios-e-de-jovens-assassinados-por-bairro-de-porto-alegre-em-2024-cm752j9gp00on015adyhsnb5m.html); [referência da Esplanada e cultura local](https://www.prefeitura.poa.br/smgov/noticias/semana-da-restinga-comeca-nesta-sexta-com-atracoes-culturais-e-sociais) | Noite fria: moletons, corta-ventos, jaquetas e calçados fechados |
| 7 | Complexo do Alemão, Rio de Janeiro/RJ | Sudeste | [UNICEF, Fogo Cruzado e GENI/UFF: efeitos da violência armada sobre mobilidade](https://fogocruzado.org.br/wp-content/uploads/2026/03/Relatorio-completo-Percursos-interrompidos-Fogo-Cruzado-UNICEF-e-GENI.pdf) | Noite quente: bermudas, chinelos, regatas, alguns personagens sem camisa ou descalços |

O número de 58 vítimas publicado pela GZH reúne Restinga e outros três bairros; não foi atribuído apenas à Restinga. O recorte secundário do DF informa 311 ocorrências de crimes cobertos entre setembro de 2025 e agosto de 2026 e 13ª posição entre 33 RAs; **não sustenta classificá-lo entre os maiores totais do DF ou do país**. Sol Nascente foi incluído pela identidade urbana e cobertura do Centro-Oeste. Os PDFs antigos do anuário do DF não abriram; não foram usados para inventar contagens. PDFs grandes da Bahia e Amazonas foram consultados por trechos indexados, com limites registrados no arquivo de fontes.

Os nomes dos bairros, cidades, UFs e regiões aparecem no jogo, nas placas do cenário e na seleção. As panorâmicas foram geradas por IA com referências arquitetônicas territoriais. Não são fotografias ou reconstruções topográficas exatas. Figurinos representam o clima e o horário escolhidos para a fase, sem pretender descrever todos os moradores.

## Chefões por lado

| Fase | Jogando pela esquerda: chefão de direita | Jogando pela direita: chefão de esquerda |
| --- | --- | --- |
| Jorge Teixeira | Anselmo da Feira | Íris do Mutirão |
| Bom Jardim | Dante do Comércio | Lia da Cultura |
| Pernambués | Vera da Ordem | Bento da Ladeira |
| Valéria | César da Rodovia | Nara da Oficina |
| Sol Nascente | Raul do Cerrado | Dora da Quadra |
| Restinga | Helena do Sul | Caio da Esplanada |
| Complexo do Alemão | **Flávio Bolsonaro — master** | **Lula — master** |

Os doze chefões regionais são originais de ficção, não pessoas reais ou lideranças locais. Lula e Flávio são personagens satíricos com figurinos próprios de verão para a fase no Rio. A presença de chefões políticos não atribui controle territorial ou ligação com crime a ninguém. Equipamentos culturais e moradores não são apresentados como facções.

## Implementação e arquivos

- Sete cenários e sete folhas de quatro adversários em `dist/assets/neighborhoods/`.
- Chefões regionais em `dist/assets/chefes-regionais-clima.png` e masters em `dist/assets/chefes-master-rio.png`.
- `REGIONAL-ART-PROMPTS.json`: caminhos, prompts completos e referências de cada geração, via ferramenta integrada Imagegen.
- `dist/neighborhood-sources.json`: evidências, períodos, recortes e limitações exibidos no painel **Bairros & Fontes**.
- `dist/campaign.js`: bairros, lados, elenco compatível e chefões.
