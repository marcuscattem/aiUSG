# GUST - Grayscale Ultrasound System Technology

Documento tecnico para apoio a redacao de artigo cientifico sobre o desenvolvimento da ferramenta GUST.

Versao documentada: estado local com novo design, suporte a DICOM JPEG Lossless/JPEG Baseline e escala em JPEG convertido
Data do documento: 2026-06-22
Repositorio/projeto: `aiUSG`
Aplicacao publicada: https://marcuscattem.github.io/aiUSG/

## 1. Visao geral

GUST, sigla para Grayscale Ultrasound System Technology, e uma ferramenta web para analise de imagens ultrassonograficas em escala de cinza. A aplicacao permite carregar uma ou mais imagens de uma mesma pessoa, delimitar regioes de interesse (ROIs), calcular automaticamente a distribuicao de pixels em escala 0-255, obter metricas de ecointensidade (EI), sumarizar bandas de EI e exportar os resultados em arquivo Excel.

A proposta funcional se aproxima de fluxos de trabalho tradicionalmente feitos em softwares de analise de imagem, como ImageJ, mas com foco em ultrassonografia musculoesqueletica e calculo imediato de EI apos a marcacao da ROI.

O processamento e realizado no navegador, sem backend. As imagens sao lidas localmente pelo browser, convertidas para estruturas internas de pixels e analisadas no cliente.

## 2. Objetivo do software

O objetivo do GUST e facilitar a quantificacao de ecointensidade em imagens de ultrassonografia por meio de:

- carregamento de imagens convencionais, DICOM nao comprimido, DICOM JPEG Lossless e DICOM JPEG Baseline;
- tentativa de captura automatica de escala em JPEG/JPG convertido de DICOM quando os metadados sao preservados;
- desenho e edicao de ROIs;
- contagem de pixels por nivel de cinza de 0 a 255;
- calculo de estatisticas descritivas da EI;
- agrupamento dos pixels em bandas configuraveis de EI;
- medidas geometricas complementares;
- exportacao padronizada para planilhas.

## 3. Arquitetura geral

A ferramenta foi desenvolvida como uma aplicacao web estatica composta por tres arquivos principais:

| Arquivo | Papel |
|---|---|
| `index.html` | Estrutura da interface, botoes, paineis, inputs, canvas e containers de resultados |
| `styles.css` | Estilizacao visual, layout responsivo, paineis laterais, listas, botoes, histogramas e janelas flutuantes |
| `app.js` | Logica da aplicacao: leitura de arquivos, processamento de pixels, ROI, medidas, DICOM, exportacao e interacao |

Nao ha servidor de aplicacao, banco de dados ou API externa. A publicacao e feita via GitHub Pages.

## 4. Linguagens de programacao e tecnologias utilizadas

### Linguagens

- HTML5: estrutura da aplicacao.
- CSS3: layout, responsividade e apresentacao visual.
- JavaScript puro (Vanilla JavaScript): toda a logica funcional, processamento de imagem, calculos, interacoes e exportacao.

### APIs nativas do navegador

- Canvas API: renderizacao da imagem, desenho de ROIs, medidas e histograma.
- File API: abertura local de arquivos de imagem e DICOM.
- Blob API e URL.createObjectURL: geracao e download de arquivos exportados.
- Pointer Events: desenho, selecao, movimentacao e redimensionamento de formas.
- DOM API: atualizacao dinamica de interface.
- TextEncoder/TextDecoder, DataView e Typed Arrays: leitura binaria de DICOM e geracao de XLSX/ZIP.

### Bibliotecas externas

O GUST nao utiliza frameworks de interface, como React, Vue, Angular, jQuery ou Bootstrap. A maior parte do processamento foi implementada em JavaScript puro com APIs nativas do navegador.

A partir do suporte a DICOM JPEG Lossless, a aplicacao passou a incluir uma biblioteca JavaScript vendorizada:

- `jpeg-lossless-decoder-js` versao `2.1.2`, licenca MIT, usada para decodificar pixel data DICOM nas Transfer Syntaxes JPEG Lossless `1.2.840.10008.1.2.4.57` e `1.2.840.10008.1.2.4.70`.

A decodificacao de DICOM JPEG Baseline (`1.2.840.10008.1.2.4.50`) usa o decodificador JPEG nativo do navegador por meio de `Blob` e `createImageBitmap` ou `Image`.

A geracao do arquivo XLSX continua implementada diretamente em JavaScript, montando XML e ZIP no proprio navegador, sem biblioteca externa de planilhas.

## 5. Formatos de entrada

### Imagens raster suportadas pelo navegador

A aplicacao aceita:

- PNG;
- JPEG/JPG;
- WebP;
- BMP.

Esses formatos sao lidos por `FileReader`, carregados como `Image` e desenhados em um canvas auxiliar. Em seguida, os dados RGBA sao convertidos para arrays internos de RGB e escala de cinza.

Para JPEG/JPG, a ferramenta tambem percorre metadados embutidos nos segmentos do arquivo, procurando informacoes de escala que possam ter sido preservadas por conversores DICOM. Sao consideradas descricoes EXIF, XMP e comentarios JPEG com padroes como `Pixel Spacing`, `Physical Delta X/Y`, `mm/px`, `px/mm` e tags DICOM textuais. Quando nao ha metadado DICOM textual, a ferramenta pode usar a densidade EXIF/JFIF como fallback, marcando a origem da escala para revisao.

### DICOM

A aplicacao aceita arquivos:

- `.dcm`;
- `.dicom`;
- MIME type `application/dicom`;
- arquivos sem extensao quando possuem assinatura DICOM `DICM` no preambulo.

Suporte DICOM atual:

- DICOM monocromatico;
- DICOM RGB;
- 8 ou 16 bits alocados;
- transfer syntaxes alvo:
  - Implicit VR Little Endian (`1.2.840.10008.1.2`);
  - Explicit VR Little Endian (`1.2.840.10008.1.2.1`);
  - JPEG Baseline Process 1 (`1.2.840.10008.1.2.4.50`);
  - JPEG Lossless, Nonhierarchical (`1.2.840.10008.1.2.4.57`);
  - JPEG Lossless, Nonhierarchical, First-Order Prediction/Selection 1 (`1.2.840.10008.1.2.4.70`);
- `MONOCHROME1` com inversao para escala visual correta;
- aplicacao de `Rescale Slope` e `Rescale Intercept`;
- aplicacao de janela por `Window Center` e `Window Width` quando disponiveis.

Limitacoes atuais do DICOM:

- DICOM comprimido por outros algoritmos alem de JPEG Baseline e JPEG Lossless nao e suportado;
- Deflated Explicit VR Little Endian nao possui etapa de descompressao dedicada nesta versao;
- Big Endian nao e suportado;
- DICOM multiframe nao e suportado;
- a leitura DICOM e propositalmente simples, implementada para prototipo e validacao inicial.

## 6. Captura automatica de escala metrica via DICOM e JPEG

Quando possivel, o GUST tenta extrair a escala espacial do DICOM ou de JPEG/JPG convertido de DICOM e preencher automaticamente a escala em mm/px. A escala e armazenada por imagem, permitindo que diferentes imagens do mesmo paciente tenham calibracoes distintas.

Tags/estruturas consideradas:

- `Pixel Spacing` `(0028,0030)`;
- `Imager Pixel Spacing` `(0018,1164)`;
- `Nominal Scanned Pixel Spacing` `(0018,2010)`;
- `Ultrasound Region Calibration` via `Sequence of Ultrasound Regions` `(0018,6011)`, usando unidades fisicas em centimetros quando presentes.

Quando os valores X e Y diferem, a interface principal utiliza a media dos dois valores como `mm/px`, mas os valores X e Y sao preservados na estrutura da imagem e nas exportacoes de medidas.

Campos exportados relacionados a escala:

- `pixelSpacingMm`;
- `pixelSpacingXmm`;
- `pixelSpacingYmm`;
- `scaleSource`.

Em JPEG/JPG, a origem da escala pode aparecer como:

- `JPEG metadata Pixel Spacing`;
- `JPEG metadata Physical Delta`;
- `JPEG metadata mm/px`;
- `JPEG EXIF resolution`;
- `JPEG JFIF density`.

## 7. Modelo de dados interno

Cada imagem carregada e armazenada como um objeto contendo:

- identificador interno;
- nome do arquivo;
- fonte (`image` ou `dicom`);
- largura e altura em pixels;
- canvas original;
- array de tons de cinza;
- array RGB;
- escala espacial em mm/px;
- escala X e Y quando disponiveis;
- origem da escala;
- nome e ID do paciente quando presentes nos metadados DICOM;
- lista de ROIs;
- lista de medidas;
- ROI e medida selecionadas.

Essa separacao garante que as sobreposicoes desenhadas no canvas visual nao alterem os pixels usados para analise. Os calculos sao feitos sobre os arrays originais extraidos da imagem, nao sobre o canvas com marcadores.

## 8. Conversao para escala de cinza

Para imagens raster coloridas, cada pixel e convertido para escala de cinza pela combinacao ponderada:

```text
gray = round(0.299 * R + 0.587 * G + 0.114 * B)
```

O resultado e armazenado como inteiro no intervalo 0-255.

Para DICOM, os valores brutos sao convertidos para uma representacao visual 0-255 apos aplicacao de slope/intercept, window center/window width ou faixa min-max quando a janela nao esta disponivel.

## 9. Ferramentas de ROI

O GUST possui as seguintes ferramentas de ROI:

- Retangulo;
- Circulo;
- Circulo com raio fixo configuravel;
- Elipse;
- Forma livre/mao livre.

Funcionalidades associadas:

- selecao de ROI ja desenhada;
- movimentacao de ROI selecionada;
- redimensionamento de retangulos, circulos e elipses por alcas;
- exclusao de ROI selecionada;
- desfazer acoes de criacao, edicao e exclusao;
- lista lateral de ROIs com tipo, pixels validos e EI media;
- painel flutuante de ROI rapido com EI e percentuais das primeiras bandas;
- opcao "Desativar ROI rapido" para impedir a abertura automatica da janela flutuante.

As formas livres sao utilizadas para analise de ROI, mas nesta versao nao possuem edicao por alcas apos o desenho.

## 10. Analise de ROI

Para cada ROI, o software:

1. determina o retangulo delimitador da forma;
2. percorre os pixels dentro desse retangulo;
3. testa se o centro do pixel pertence a ROI;
4. aplica filtros de cor quando ativados;
5. acumula o histograma de tons de cinza de 0 a 255;
6. calcula estatisticas e bandas de EI.

Metricas calculadas por ROI:

- total de pixels analisados;
- pixels ignorados por filtro de cor;
- EI media;
- mediana;
- desvio padrao;
- valor minimo;
- valor maximo;
- histograma completo 0-255;
- pixels e percentual por banda de EI.

Formula da EI media:

```text
EI media = soma(valor_do_pixel * frequencia_do_pixel) / total_de_pixels_validos
```

Formula do percentual por banda:

```text
percentual_da_banda = pixels_da_banda / total_de_pixels_validos * 100
```

## 11. Bandas de ecointensidade

O GUST permite visualizar e exportar bandas de EI.

Modos disponiveis:

- bandas de 50 em 50;
- bandas de 25 em 25;
- segmentacao personalizada por valor definido pelo usuario.

Exemplo no modo 50:

- 0-50;
- 51-100;
- 101-150;
- 151-200;
- 201-255.

Tambem ha configuracao de cores por banda. As cores sao usadas de forma consistente:

- legenda de bandas;
- histograma;
- barras de percentuais;
- painel rapido de ROI.

## 12. Histograma

O histograma mostra a distribuicao dos pixels da ROI selecionada nos 256 niveis de cinza. Cada barra representa um valor de pixel de 0 a 255.

Caracteristicas:

- eixo X com marcacoes baseadas no modo de banda selecionado;
- barras coloridas conforme a banda de EI correspondente;
- atualizacao automatica ao selecionar outra ROI, mudar bandas ou aplicar filtros.

## 13. Ferramentas de medida

O GUST possui ferramentas independentes de medida:

- distancia;
- area retangular;
- area circular;
- area elipsoide;
- area livre;
- angulo.

Unidades disponiveis:

- `px` para medidas em pixels;
- `mm` para medidas lineares e areas convertidas;
- `cm` para medidas lineares e areas convertidas;
- graus para angulos.

Conversoes:

```text
distancia_mm = distancia_px * pixelSpacingMm
distancia_cm = distancia_mm / 10
area_mm2 = area_px2 * pixelSpacingMm^2
area_cm2 = area_mm2 / 100
```

Para areas:

- retangulo: `largura * altura`;
- circulo: `pi * r^2`;
- elipse: `pi * semi_eixo_x * semi_eixo_y`;
- forma livre: formula do poligono pelo metodo do "shoelace".

Para angulos, o software calcula o angulo entre dois vetores definidos por tres pontos.

## 14. Navegacao e interacao

Funcionalidades de navegacao e edicao:

- pan/arraste da imagem;
- zoom com roda do mouse;
- ajuste automatico da imagem ao viewport;
- selecao de imagens em lista;
- suporte a multiplas imagens carregadas simultaneamente;
- selecao de ROI/medida por clique na lista ou na imagem;
- delete/backspace para remover ROI ou medida selecionada;
- Ctrl+Z ou Cmd+Z para desfazer.

O historico de desfazer armazena ate 80 estados.

## 15. Filtro de pixels coloridos

O GUST inclui filtros para ignorar pixels coloridos que nao pertencem a escala de cinza da imagem analisada.

Recursos:

- ignorar automaticamente pixels coloridos fora da escala de cinza;
- tolerancia ajustavel;
- escolha manual de cor especifica a ignorar;
- conta-gotas para selecionar uma cor diretamente na imagem;
- lista de cores ignoradas;
- remocao individual ou limpeza das cores selecionadas.

Criterio de pixel colorido:

```text
max(R,G,B) - min(R,G,B) > tolerancia
```

Criterio de cor especifica:

```text
distancia = max(|R1-R2|, |G1-G2|, |B1-B2|)
ignorar se distancia <= tolerancia
```

## 16. Painel rapido de ROI

Ao finalizar ou selecionar uma ROI, a ferramenta pode exibir uma janela flutuante com:

- nome da ROI;
- EI media;
- percentual e pixels da primeira banda;
- percentual e pixels da segunda banda;
- percentual e pixels do restante das bandas.

O painel e movel, fechavel e pode ser desativado por meio da caixa "Desativar ROI rapido".

## 17. Multiplas imagens por paciente

A aplicacao permite carregar varias imagens simultaneamente. A lista de imagens mostra:

- nome do arquivo;
- tipo de origem (`IMG` ou `DICOM`);
- dimensoes;
- escala automatica quando disponivel;
- numero de ROIs;
- EI media ponderada das ROIs da imagem.

No painel "Paciente", o software resume:

- numero de imagens;
- numero total de ROIs;
- EI media agregada;
- total de pixels analisados.

A EI media agregada e ponderada pelo numero de pixels validos de cada ROI.

## 18. Internacionalizacao

A interface possui seletor de idioma com suporte a:

- portugues;
- ingles;
- espanhol.

As traducoes sao aplicadas dinamicamente por dicionarios internos em JavaScript.

## 19. Exportacao de dados

A exportacao principal e feita por um botao Excel. O usuario pode escolher, por caixas de selecao, quais abas exportar:

- Bandas EI;
- ROIs;
- Histograma 0-255;
- Medidas.

O arquivo gerado possui extensao `.xlsx` e e construido no navegador sem biblioteca externa.

### Aba Bandas EI

Inclui tabela agregada do paciente e tabelas por ROI, com:

- ID e nome do paciente quando disponiveis;
- total de pixels;
- total de pixels por banda;
- percentual por banda;
- pixels ignorados, quando houver.

### Aba ROIs

Campos:

- ID do paciente;
- nome do paciente;
- imagem;
- origem da imagem;
- ROI;
- tipo;
- total de pixels;
- pixels ignorados;
- EI media;
- mediana;
- desvio padrao;
- minimo;
- maximo.

### Aba Histograma

Campos:

- ID do paciente;
- nome do paciente;
- imagem;
- origem da imagem;
- ROI;
- tipo;
- total de pixels;
- valor do pixel;
- contagem do pixel;
- percentual do pixel.

Essa aba contem a contagem para cada nivel de 0 a 255.

### Aba Medidas

Campos:

- ID do paciente;
- nome do paciente;
- imagem;
- origem da imagem;
- medida;
- tipo;
- valor base em px ou px2;
- valor exibido;
- unidade exibida;
- escala `pixel_spacing_mm`;
- escala X `pixel_spacing_x_mm`;
- escala Y `pixel_spacing_y_mm`;
- origem da escala.

## 20. Exportacoes auxiliares implementadas no codigo

O codigo contem funcoes para exportar:

- CSV de EI por bandas;
- CSV de histograma 0-255;
- CSV de medidas;
- JSON estruturado com imagens, ROIs, medidas, escala, filtros e resumo do paciente.

No estado atual da interface, o fluxo principal exposto ao usuario e o botao Excel com seletores de abas.

## 21. Privacidade e processamento local

O processamento ocorre no navegador do usuario. As imagens sao abertas localmente e nao ha envio para servidor na implementacao atual. A ferramenta tambem nao possui autenticacao, banco de dados, armazenamento remoto ou rastreamento.

## 22. Bibliotecas, dependencias e frameworks

Dependencias externas em runtime:

- `jpeg-lossless-decoder-js@2.1.2`, licenca MIT, vendorizada no diretorio `vendor/`.

Frameworks: nenhum.

Bibliotecas de imagem: nenhuma externa para JPEG Baseline; a decodificacao JPEG Baseline usa APIs nativas do navegador.

Bibliotecas DICOM:

- nao ha parser DICOM externo; o parser de metadados foi implementado no proprio `app.js`;
- ha decodificador externo apenas para o fluxo de pixel data JPEG Lossless.

Bibliotecas Excel/XLSX: nenhuma.

O restante do software usa JavaScript e APIs nativas do navegador.

## 23. Verificacao e hash

Hashes SHA-256 dos arquivos principais na versao documentada:

| Arquivo | SHA-256 |
|---|---|
| `index.html` | `5c9bf9709daf63d145570b06b8f6e0e357c9581092051a8496a9f76e54616df2` |
| `app.js` | `cdeb0cd05d01e94dce62302ad1bfebe789c87d174668f264699eadeea63af282` |
| `styles.css` | `bc358b64f0402f136afa25af13c87b126c818e5b7aa3abb76f1ac52b46be67fe` |
| `vendor/jpeg-lossless-decoder-js-2.1.2.global.js` | `7737a3dde1d89ab8de76e0dc3bde4a2abe0e1146d62cfcc48bc86d8f2d4fcbef` |
| `vendor/jpeg-lossless-decoder-js-LICENSE.txt` | `35d89c5827cb1f9685ffc3fb6ebcc9532f75663554ed6efddadad95071bae5c9` |

Tamanho aproximado dos arquivos:

| Arquivo | Tamanho aproximado |
|---|---|
| `index.html` | 18 KB |
| `app.js` | 126 KB |
| `styles.css` | 17 KB |
| `vendor/jpeg-lossless-decoder-js-2.1.2.global.js` | 32 KB |
| `vendor/jpeg-lossless-decoder-js-LICENSE.txt` | 4 KB |

## 24. Limitacoes atuais

- Nao ha validacao clinica formal documentada neste arquivo.
- Nao ha comparacao automatizada contra ImageJ no codigo atual.
- DICOM comprimido por algoritmos diferentes de JPEG Baseline e JPEG Lossless nao e suportado.
- DICOM multiframe e Big Endian nao sao suportados.
- Em DICOM encapsulado, a versao atual abre o primeiro frame/fragmento de imagem.
- JPG/JPEG convertido de DICOM so permite escala automatica quando o conversor preserva metadados de escala ou densidade; valores EXIF/JFIF podem representar densidade de exibicao/impressao e devem ser conferidos pelo usuario.
- Nao ha segmentacao automatica por inteligencia artificial ativa; a funcionalidade de IA foi removida em versoes anteriores a pedido do usuario.
- ROIs livres nao possuem edicao por alcas apos marcadas.
- A escala espacial usa um unico valor medio de mm/px para exibicao principal quando X e Y diferem, embora X e Y sejam preservados nas exportacoes.
- A ferramenta deve ser descrita como prototipo ou ferramenta em desenvolvimento ate que haja validacao formal de acuracia, reprodutibilidade e confiabilidade.

## 25. Possiveis pontos para metodologia do artigo

Sugestoes de elementos a descrever na metodologia:

- desenvolvimento de aplicacao web estatica client-side;
- processamento local de imagens por Canvas API;
- conversao para escala de cinza por combinacao ponderada RGB;
- leitura de metadados DICOM por parser proprio;
- decodificacao de DICOM JPEG Lossless por biblioteca JavaScript MIT vendorizada;
- decodificacao de DICOM JPEG Baseline por APIs nativas do navegador;
- extracao de escala espacial por metadados DICOM;
- tentativa de extracao de escala espacial em JPEG convertido de DICOM por metadados EXIF/XMP/JFIF/comentarios;
- extracao de nome e ID do paciente quando presentes no DICOM;
- desenho manual e edicao de ROIs;
- calculo de histograma de 256 niveis;
- calculo de EI media, mediana, desvio padrao, minimo e maximo;
- calculo de percentuais por bandas de EI;
- exportacao estruturada em planilhas XLSX;
- possibilidade de analise de multiplas imagens por paciente;
- preservacao dos pixels originais para analise, sem interferencia dos marcadores visuais.

## 26. Sugestao de descricao curta

O GUST e uma aplicacao web estatica, desenvolvida em HTML5, CSS3 e JavaScript, destinada a quantificacao de ecointensidade em imagens ultrassonograficas. A ferramenta permite carregar imagens raster, DICOM nao comprimido, DICOM JPEG Baseline e DICOM JPEG Lossless, delimitar ROIs por formas geometricas ou livres, calcular histogramas de intensidade de cinza de 0 a 255, obter estatisticas de EI, extrair escala metrica e identificacao do paciente quando disponiveis no DICOM, tentar recuperar escala em JPEG convertido de DICOM quando ha metadados preservados e exportar resultados em planilhas XLSX. O processamento ocorre localmente no navegador, sem envio de imagens a servidores.
