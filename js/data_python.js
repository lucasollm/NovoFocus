/* ============================================================
   data_python.js — Curso Python do Zero ao Avançado
   Gerado a partir de teoria + exercícios próprios.
   youtubeId = null de propósito: nenhum vídeo é inventado.
   Para ligar um vídeo: abra a aula e cole o link do YouTube
   na caixa que aparece no player.
============================================================ */

const PYTHON_COURSE = {
 "id": "python-completo",
 "title": "Python do Zero ao Avançado",
 "description": "28 aulas com teoria curta e exercícios variados: múltipla escolha, verdadeiro/falso, código e reflexão. Vídeo é opcional.",
 "tag": "Python",
 "tagColor": "#2563EB",
 "tagBg": "#EFF6FF",
 "thumbColor": "linear-gradient(135deg,#3B82F6 0%,#1D4ED8 100%)",
 "thumbIcon": "🐍",
 "modules": [
  {
   "id": "py-m1",
   "title": "Mundo 1 · Fundamentos",
   "lessons": [
    {
     "id": "py-01",
     "code": "0001",
     "title": "O que é Python?",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "História, usos e por que aprender.",
     "theory": "**Python** é uma linguagem de programação criada por **Guido van Rossum** e lançada em 1991. Tem sintaxe limpa, quase como ler inglês.\n\n**Onde é usada?**\n- Web (Django, FastAPI, Flask)\n- Ciência de dados e IA (Pandas, PyTorch)\n- Automação de tarefas e scripts\n- Jogos, segurança e muito mais\n\n**Por que começar por ela?** Pouco símbolo, leitura fácil e uma comunidade gigante para te ajudar.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Quem criou o Python?",
       "options": [
        "Linus Torvalds",
        "Guido van Rossum",
        "James Gosling",
        "Dennis Ritchie"
       ],
       "answer": 1,
       "explanation": "Guido van Rossum criou o Python e o lançou em 1991."
      },
      {
       "type": "truefalse",
       "question": "Python só serve para criar sites.",
       "answer": false,
       "explanation": "Python é de propósito geral: web, IA, automação, jogos, dados e mais."
      },
      {
       "type": "open",
       "question": "Cite 2 coisas que você gostaria de criar com Python.",
       "placeholder": "Eu gostaria de criar..."
      }
     ]
    },
    {
     "id": "py-02",
     "code": "0002",
     "title": "Instalando o Python e o VS Code",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Instalação e primeiro teste no terminal.",
     "theory": "**Windows:** baixe em python.org/downloads, execute o instalador e **marque \"Add python.exe to PATH\"** antes de instalar.\n\n**Testar a instalação** no terminal:\n\n```\npython --version\n```\n\n**Rodar um arquivo:** salve como `ola.py` e execute `python ola.py`.\n\nO **VS Code** com a extensão Python é um editor gratuito e muito usado.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que acontece se você não marcar 'Add to PATH'?",
       "options": [
        "O Python não instala",
        "O terminal não reconhece o comando python",
        "Nada, é opcional",
        "O VS Code não abre"
       ],
       "answer": 1,
       "explanation": "Sem o PATH, o terminal não encontra o comando 'python'."
      },
      {
       "type": "code",
       "question": "Qual comando mostra a versão instalada do Python?",
       "answer": "python --version",
       "placeholder": "digite o comando..."
      },
      {
       "type": "truefalse",
       "question": "Para rodar um arquivo .py você precisa compilar antes manualmente.",
       "answer": false,
       "explanation": "O Python é interpretado: basta rodar `python arquivo.py`."
      }
     ]
    },
    {
     "id": "py-03",
     "code": "0003",
     "title": "print() e comentários",
     "duration": "~8 min",
     "youtubeId": null,
     "description": "Mostrando texto na tela e documentando o código.",
     "theory": "`print()` mostra algo na tela:\n\n```\nprint(\"Olá, mundo!\")\nprint(\"A\", \"B\", sep=\"-\")   # A-B\nprint(\"sem quebra\", end=\"\")\n```\n\n**Comentários** começam com `#` e o Python ignora:\n\n```\n# isto é um comentário\n```\n\nPython diferencia **maiúsculas de minúsculas**: `Print` não existe, `print` sim. Não precisa de ponto e vírgula no fim da linha.",
     "exercises": [
      {
       "type": "code",
       "question": "Escreva o código que mostra 'Aprendendo Python!' na tela.",
       "answer": "print('Aprendendo Python!')",
       "placeholder": "print(...)"
      },
      {
       "type": "quiz",
       "question": "Qual destas linhas causa erro?",
       "options": [
        "print('Olá')",
        "print(\"Mundo\")",
        "Print('erro')",
        "print(123)"
       ],
       "answer": 2,
       "explanation": "'Print' com P maiúsculo não existe. O correto é 'print'."
      },
      {
       "type": "truefalse",
       "question": "Em Python é obrigatório terminar cada linha com ponto e vírgula.",
       "answer": false,
       "explanation": "Não é necessário. A quebra de linha já encerra o comando."
      }
     ]
    },
    {
     "id": "py-04",
     "code": "0004",
     "title": "Variáveis e tipos",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "int, float, str e bool.",
     "theory": "**Variável** guarda um valor com um nome:\n\n```\nnome = \"Lucas\"\nidade = 25\naltura = 1.75\nestudando = True\n```\n\n**Tipos básicos:**\n- `int`: inteiros (42)\n- `float`: decimais (3.14)\n- `str`: texto (\"oi\")\n- `bool`: `True` ou `False`\n\n`type(x)` mostra o tipo. Use nomes em **snake_case**: `nome_completo`.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual o tipo de nota = 9.5 ?",
       "options": [
        "int",
        "float",
        "str",
        "bool"
       ],
       "answer": 1,
       "explanation": "Tem casas decimais, então é float."
      },
      {
       "type": "code",
       "question": "Crie a variável cidade com o valor 'São Paulo'.",
       "answer": "cidade = 'São Paulo'",
       "placeholder": "cidade = ..."
      },
      {
       "type": "truefalse",
       "question": "Em Python se escreve True e False com inicial maiúscula.",
       "answer": true,
       "explanation": "São palavras reservadas: 'true' minúsculo dá erro."
      },
      {
       "type": "open",
       "question": "Explique com suas palavras a diferença entre int e float.",
       "placeholder": "int é... float é..."
      }
     ]
    },
    {
     "id": "py-05",
     "code": "0005",
     "title": "Operadores aritméticos",
     "duration": "~8 min",
     "youtubeId": null,
     "description": "Contas com Python.",
     "theory": "- `+` soma, `-` subtração, `*` multiplicação\n- `/` divisão (sempre dá float): `10 / 4` → `2.5`\n- `//` divisão inteira: `10 // 4` → `2`\n- `%` resto: `10 % 4` → `2`\n- `**` potência: `2 ** 8` → `256`\n\n**Ordem:** parênteses, depois `**`, depois `* / // %`, depois `+ -`.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Resultado de 17 % 5 ?",
       "options": [
        "3",
        "2",
        "1",
        "4"
       ],
       "answer": 1,
       "explanation": "17 dividido por 5 dá 3 e sobra 2."
      },
      {
       "type": "quiz",
       "question": "Resultado de 7 // 2 ?",
       "options": [
        "3.5",
        "4",
        "3",
        "2"
       ],
       "answer": 2,
       "explanation": "// é divisão inteira, descarta a parte decimal."
      },
      {
       "type": "code",
       "question": "Escreva o código que imprime 2 elevado a 10.",
       "answer": "print(2 ** 10)",
       "placeholder": "print(...)"
      }
     ]
    },
    {
     "id": "py-06",
     "code": "0006",
     "title": "input() e conversão de tipos",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Recebendo dados do usuário.",
     "theory": "`input()` pausa o programa e espera o usuário digitar. **Sempre devolve texto (str).**\n\n```\nnome = input(\"Seu nome: \")\nidade = int(input(\"Sua idade: \"))\nprint(f\"{nome} tem {idade} anos\")\n```\n\n**Conversões:** `int()`, `float()`, `str()`.\n\nO `f\"...\"` é a **f-string**: coloca variáveis dentro do texto com `{}`.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Se o usuário digitar 25 no input(), qual o tipo retornado?",
       "options": [
        "int",
        "float",
        "str",
        "number"
       ],
       "answer": 2,
       "explanation": "input() sempre retorna str. Converta com int() ou float()."
      },
      {
       "type": "quiz",
       "question": "Qual o resultado de '5' + '3' ?",
       "options": [
        "8",
        "53",
        "Erro",
        "'8'"
       ],
       "answer": 1,
       "explanation": "Com textos, + junta (concatena): '53'."
      },
      {
       "type": "code",
       "question": "Peça a idade do usuário e guarde como número inteiro.",
       "answer": "idade = int(input('Idade: '))",
       "placeholder": "idade = ..."
      }
     ]
    },
    {
     "id": "py-07",
     "code": "0007",
     "title": "Comparações e operadores lógicos",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "==, !=, >, <, and, or, not.",
     "theory": "**Comparação** devolve `True` ou `False`: `==`, `!=`, `>`, `<`, `>=`, `<=`.\n\n**Lógicos:**\n- `and`: verdadeiro só se os dois forem verdadeiros\n- `or`: verdadeiro se pelo menos um for\n- `not`: inverte\n\n```\nidade >= 18 and tem_carteira\ndia == \"sábado\" or dia == \"domingo\"\n```\n\nCuidado: `=` **guarda** um valor, `==` **compara**.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Resultado de 10 != 10 ?",
       "options": [
        "True",
        "False",
        "0",
        "Erro"
       ],
       "answer": 1,
       "explanation": "10 é igual a 10, então 'diferente' é False."
      },
      {
       "type": "quiz",
       "question": "Resultado de True and False ?",
       "options": [
        "True",
        "False",
        "None",
        "Erro"
       ],
       "answer": 1,
       "explanation": "and exige os dois lados verdadeiros."
      },
      {
       "type": "truefalse",
       "question": "= e == fazem a mesma coisa.",
       "answer": false,
       "explanation": "= atribui valor; == compara valores."
      },
      {
       "type": "open",
       "question": "Escreva uma condição que verifique se alguém pode dirigir (18 anos ou mais E tem carteira).",
       "placeholder": "idade >= 18 and ..."
      }
     ]
    },
    {
     "id": "py-08",
     "code": "0008",
     "title": "if, elif e else",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Tomando decisões.",
     "theory": "```\nnota = float(input(\"Nota: \"))\n\nif nota >= 7:\n    print(\"Aprovado\")\nelif nota >= 5:\n    print(\"Recuperação\")\nelse:\n    print(\"Reprovado\")\n```\n\nPython usa **indentação** (4 espaços) para marcar o bloco. Não usa chaves.\n\nO Python testa de cima para baixo e executa **só o primeiro bloco verdadeiro**.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Como o Python delimita um bloco de código?",
       "options": [
        "Chaves {}",
        "Parênteses ()",
        "Indentação",
        "Ponto e vírgula"
       ],
       "answer": 2,
       "explanation": "A indentação é obrigatória e define o bloco."
      },
      {
       "type": "truefalse",
       "question": "O else é obrigatório quando se usa if.",
       "answer": false,
       "explanation": "else é opcional."
      },
      {
       "type": "code",
       "question": "Se numero > 0 imprima 'Positivo', senão 'Zero ou negativo'.",
       "answer": "if numero > 0:\n    print('Positivo')\nelse:\n    print('Zero ou negativo')",
       "placeholder": "if numero > 0:\n    ..."
      }
     ]
    },
    {
     "id": "py-09",
     "code": "0009",
     "title": "match/case (Python 3.10+)",
     "duration": "~8 min",
     "youtubeId": null,
     "description": "O 'switch' moderno do Python.",
     "theory": "Disponível desde o **Python 3.10**:\n\n```\ncomando = input(\"Comando: \")\n\nmatch comando:\n    case \"iniciar\":\n        print(\"Começando...\")\n    case \"parar\" | \"sair\":\n        print(\"Encerrando\")\n    case _:\n        print(\"Não entendi\")\n```\n\nO `_` é o caso padrão (qualquer outro valor). O `|` junta várias opções num caso só.",
     "exercises": [
      {
       "type": "quiz",
       "question": "A partir de qual versão existe match/case?",
       "options": [
        "3.6",
        "3.8",
        "3.10",
        "2.7"
       ],
       "answer": 2,
       "explanation": "match/case chegou no Python 3.10."
      },
      {
       "type": "truefalse",
       "question": "O `case _` serve como caso padrão, quando nenhum outro bate.",
       "answer": true,
       "explanation": "O underscore captura qualquer valor restante."
      },
      {
       "type": "open",
       "question": "Em que situação match/case seria mais limpo que vários elif?",
       "placeholder": "Quando eu precisar..."
      }
     ]
    },
    {
     "id": "py-10",
     "code": "0010",
     "title": "Laço for e range()",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Repetindo ações.",
     "theory": "```\nfor i in range(5):\n    print(i)        # 0 1 2 3 4\n```\n\n- `range(5)` → 0 a 4\n- `range(1, 6)` → 1 a 5\n- `range(0, 10, 2)` → 0, 2, 4, 6, 8\n\nTambém percorre textos e listas:\n\n```\nfor letra in \"Python\":\n    print(letra)\n```",
     "exercises": [
      {
       "type": "quiz",
       "question": "Quantas vezes executa 'for i in range(3):' ?",
       "options": [
        "2",
        "3",
        "4",
        "1"
       ],
       "answer": 1,
       "explanation": "range(3) gera 0, 1 e 2: três voltas."
      },
      {
       "type": "code",
       "question": "Escreva um for que imprime os números de 1 a 5.",
       "answer": "for i in range(1, 6):\n    print(i)",
       "placeholder": "for i in range(...):"
      },
      {
       "type": "truefalse",
       "question": "range(0, 10, 2) gera 0, 2, 4, 6, 8.",
       "answer": true,
       "explanation": "Começa em 0, vai até 10 (sem incluir) pulando de 2 em 2."
      }
     ]
    },
    {
     "id": "py-11",
     "code": "0011",
     "title": "Laço while, break e continue",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Repetir enquanto a condição for verdadeira.",
     "theory": "```\ncontador = 0\nwhile contador < 3:\n    print(contador)\n    contador += 1\n```\n\n- `break` sai do laço na hora\n- `continue` pula para a próxima volta\n\n```\nwhile True:\n    r = input(\"Sair? (s/n) \")\n    if r == \"s\":\n        break\n```\n\nUse **for** quando sabe quantas voltas; **while** quando depende de uma condição.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que o break faz?",
       "options": [
        "Pausa 1 segundo",
        "Pula para a próxima volta",
        "Encerra o laço imediatamente",
        "Reinicia o laço"
       ],
       "answer": 2,
       "explanation": "break sai do laço. continue é que pula para a próxima volta."
      },
      {
       "type": "truefalse",
       "question": "while True: cria um laço infinito que só termina com break.",
       "answer": true,
       "explanation": "True nunca vira False, então é preciso um break (ou return)."
      },
      {
       "type": "code",
       "question": "Escreva um while que imprime 0, 1 e 2.",
       "answer": "i = 0\nwhile i < 3:\n    print(i)\n    i += 1",
       "placeholder": "i = 0\nwhile ...:"
      }
     ]
    }
   ]
  },
  {
   "id": "py-m2",
   "title": "Mundo 2 · Dados e funções",
   "lessons": [
    {
     "id": "py-12",
     "code": "0012",
     "title": "Strings: métodos e fatiamento",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Trabalhando com texto.",
     "theory": "```\nt = \"Python é legal\"\nt.upper()            # \"PYTHON É LEGAL\"\nt.lower()\nt.replace(\"legal\", \"incrível\")\nt.split(\" \")         # [\"Python\", \"é\", \"legal\"]\nt.strip()            # tira espaços das pontas\nlen(t)               # 14\n```\n\n**Fatiamento** `[início:fim:passo]`:\n\n```\nnome = \"Python\"\nnome[0]      # \"P\"\nnome[0:3]    # \"Pyt\"\nnome[::-1]   # \"nohtyP\"\n```",
     "exercises": [
      {
       "type": "quiz",
       "question": "Resultado de 'Python'[::-1] ?",
       "options": [
        "Python",
        "nohtyP",
        "Py",
        "Erro"
       ],
       "answer": 1,
       "explanation": "Passo -1 percorre de trás para frente."
      },
      {
       "type": "code",
       "question": "Converta a string 'oi' para maiúsculas.",
       "answer": "'oi'.upper()",
       "placeholder": "'oi'..."
      },
      {
       "type": "quiz",
       "question": "Resultado de len('Olá') ?",
       "options": [
        "2",
        "3",
        "4",
        "Erro"
       ],
       "answer": 1,
       "explanation": "Conta os caracteres: O, l, á = 3."
      }
     ]
    },
    {
     "id": "py-13",
     "code": "0013",
     "title": "Listas",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Coleções ordenadas e mutáveis.",
     "theory": "```\nfrutas = [\"maçã\", \"banana\", \"laranja\"]\nfrutas[0]        # \"maçã\"\nfrutas[-1]       # \"laranja\" (último)\nfrutas.append(\"uva\")\nfrutas.remove(\"banana\")\nfrutas.pop()     # remove e devolve o último\nlen(frutas)\nfrutas.sort()\n```\n\nO índice começa em **0**. Listas podem ser alteradas depois de criadas (são **mutáveis**).",
     "exercises": [
      {
       "type": "quiz",
       "question": "Em uma lista de 5 itens, qual índice acessa o último?",
       "options": [
        "5",
        "4 ou -1",
        "0",
        "6"
       ],
       "answer": 1,
       "explanation": "Índices vão de 0 a 4; o -1 também aponta para o último."
      },
      {
       "type": "code",
       "question": "Adicione 'manga' ao final da lista frutas.",
       "answer": "frutas.append('manga')",
       "placeholder": "frutas...."
      },
      {
       "type": "truefalse",
       "question": "Listas podem ser alteradas depois de criadas.",
       "answer": true,
       "explanation": "Listas são mutáveis."
      }
     ]
    },
    {
     "id": "py-14",
     "code": "0014",
     "title": "Tuplas e conjuntos (set)",
     "duration": "~8 min",
     "youtubeId": null,
     "description": "Dados fixos e valores únicos.",
     "theory": "**Tupla**: parecida com lista, mas **imutável**.\n\n```\nponto = (3, 7)\nx, y = ponto      # desempacotamento\n```\n\n**Set (conjunto)**: não guarda repetidos e não tem ordem.\n\n```\nletras = {\"a\", \"b\", \"a\"}   # {\"a\", \"b\"}\nset([1, 1, 2, 3])          # {1, 2, 3}\n```\n\nTruque comum: `list(set(lista))` remove duplicados.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual o resultado de set([1, 1, 2]) ?",
       "options": [
        "{1, 1, 2}",
        "{1, 2}",
        "[1, 2]",
        "Erro"
       ],
       "answer": 1,
       "explanation": "O set descarta repetidos."
      },
      {
       "type": "truefalse",
       "question": "Dá para trocar um elemento dentro de uma tupla depois de criada.",
       "answer": false,
       "explanation": "Tuplas são imutáveis (TypeError)."
      },
      {
       "type": "open",
       "question": "Dê um exemplo de dado que combina com tupla e um que combina com set.",
       "placeholder": "Tupla: ... Set: ..."
      }
     ]
    },
    {
     "id": "py-15",
     "code": "0015",
     "title": "Dicionários",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Pares chave: valor.",
     "theory": "```\npessoa = {\"nome\": \"Ana\", \"idade\": 30}\n\npessoa[\"nome\"]              # \"Ana\"\npessoa[\"cidade\"] = \"Rio\"    # adiciona\npessoa.get(\"email\")         # None (não dá erro)\n\"idade\" in pessoa           # True\n\nfor chave, valor in pessoa.items():\n    print(chave, valor)\n```\n\n`pessoa[\"email\"]` sem a chave existir causa **KeyError**; o `.get()` evita isso.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Como ler o valor da chave 'nome' em dados = {'nome': 'Ana'} ?",
       "options": [
        "dados.nome",
        "dados[0]",
        "dados['nome']",
        "dados(nome)"
       ],
       "answer": 2,
       "explanation": "Dicionários são acessados pela chave entre colchetes."
      },
      {
       "type": "code",
       "question": "Verifique se a chave 'email' existe no dicionário dados.",
       "answer": "'email' in dados",
       "placeholder": "... in dados"
      },
      {
       "type": "quiz",
       "question": "O que dados.get('x') devolve se 'x' não existir?",
       "options": [
        "Erro",
        "None",
        "0",
        "''"
       ],
       "answer": 1,
       "explanation": "get devolve None (ou um valor padrão que você passar)."
      }
     ]
    },
    {
     "id": "py-16",
     "code": "0016",
     "title": "Funções",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Reaproveitando código com def.",
     "theory": "```\ndef saudar(nome, tom=\"amigável\"):\n    return f\"Olá, {nome}! ({tom})\"\n\nmsg = saudar(\"Lucas\")\nprint(msg)\n```\n\n- `def` cria a função\n- `return` devolve um valor (sem return, devolve `None`)\n- parâmetros podem ter **valor padrão**\n\nFunções evitam repetição e deixam o código organizado.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual palavra cria uma função?",
       "options": [
        "function",
        "func",
        "def",
        "fn"
       ],
       "answer": 2,
       "explanation": "Em Python é 'def'."
      },
      {
       "type": "code",
       "question": "Crie a função dobro(n) que devolve n vezes 2.",
       "answer": "def dobro(n):\n    return n * 2",
       "placeholder": "def dobro(n):\n    ..."
      },
      {
       "type": "truefalse",
       "question": "Uma função sem return devolve None.",
       "answer": true,
       "explanation": "Sem return explícito, o resultado é None."
      }
     ]
    },
    {
     "id": "py-17",
     "code": "0017",
     "title": "Escopo, *args e **kwargs",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Onde as variáveis vivem e argumentos flexíveis.",
     "theory": "**Escopo:** variável criada dentro da função é **local**; fora dela dá `NameError`.\n\n```\ndef somar(*numeros):        # qualquer quantidade\n    return sum(numeros)\n\nsomar(1, 2, 3)              # 6\n\ndef mostrar(**dados):       # argumentos nomeados\n    for k, v in dados.items():\n        print(k, v)\n\nmostrar(nome=\"Ana\", idade=30)\n```\n\n`*args` vira uma **tupla**; `**kwargs` vira um **dicionário**.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que *args permite?",
       "options": [
        "Argumentos nomeados",
        "Quantidade variável de argumentos posicionais",
        "Retornar vários valores",
        "Criar função anônima"
       ],
       "answer": 1,
       "explanation": "*args reúne os argumentos extras numa tupla."
      },
      {
       "type": "truefalse",
       "question": "Uma variável criada dentro da função pode ser usada fora dela.",
       "answer": false,
       "explanation": "Fora da função ela não existe (NameError)."
      },
      {
       "type": "open",
       "question": "Explique com suas palavras variável local x global.",
       "placeholder": "Local é... Global é..."
      }
     ]
    },
    {
     "id": "py-18",
     "code": "0018",
     "title": "Tratamento de erros",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "try, except, else e finally.",
     "theory": "```\ntry:\n    n = int(input(\"Número: \"))\n    print(10 / n)\nexcept ValueError:\n    print(\"Isso não é número\")\nexcept ZeroDivisionError:\n    print(\"Não divide por zero\")\nelse:\n    print(\"Deu tudo certo\")\nfinally:\n    print(\"Sempre executa\")\n```\n\nErros comuns: `ValueError`, `ZeroDivisionError`, `IndexError`, `KeyError`, `TypeError`.\n\nCapture erros **específicos**; evite um `except:` solto que esconde bugs.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O bloco finally executa quando?",
       "options": [
        "Só sem erro",
        "Só com erro",
        "Sempre",
        "Nunca"
       ],
       "answer": 2,
       "explanation": "finally roda sempre, com ou sem erro."
      },
      {
       "type": "quiz",
       "question": "Qual erro int('abc') provoca?",
       "options": [
        "TypeError",
        "ValueError",
        "KeyError",
        "NameError"
       ],
       "answer": 1,
       "explanation": "O texto não pode virar inteiro: ValueError."
      },
      {
       "type": "open",
       "question": "Por que tratar erros em programas reais? Dê um exemplo.",
       "placeholder": "Porque... por exemplo..."
      }
     ]
    },
    {
     "id": "py-19",
     "code": "0019",
     "title": "Arquivos com with open()",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Lendo e escrevendo arquivos.",
     "theory": "```\nwith open(\"dados.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Linha 1\\n\")\n\nwith open(\"dados.txt\", \"r\", encoding=\"utf-8\") as f:\n    for linha in f:\n        print(linha.strip())\n```\n\n**Modos:** `\"r\"` lê, `\"w\"` escreve (apaga o que havia), `\"a\"` adiciona no final.\n\nO `with` fecha o arquivo sozinho, mesmo se acontecer um erro.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual modo adiciona ao final sem apagar o conteúdo?",
       "options": [
        "\"w\"",
        "\"r\"",
        "\"a\"",
        "\"x\""
       ],
       "answer": 2,
       "explanation": "'a' é append. 'w' apagaria tudo."
      },
      {
       "type": "truefalse",
       "question": "O with open() fecha o arquivo automaticamente.",
       "answer": true,
       "explanation": "O with garante o fechamento, mesmo com erro."
      },
      {
       "type": "code",
       "question": "Abra 'dados.txt' para leitura usando with e guarde em arquivo.",
       "answer": "with open('dados.txt', 'r') as arquivo:\n    conteudo = arquivo.read()",
       "placeholder": "with open(...) as arquivo:"
      }
     ]
    }
   ]
  },
  {
   "id": "py-m3",
   "title": "Mundo 3 · Python avançado",
   "lessons": [
    {
     "id": "py-20",
     "code": "0020",
     "title": "Comprehensions",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Listas e dicionários em uma linha.",
     "theory": "Forma: `[expressão for item in sequência if condição]`\n\n```\nquadrados = [x**2 for x in range(1, 6)]     # [1, 4, 9, 16, 25]\npares = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]\ndobro = {x: x*2 for x in range(3)}            # {0: 0, 1: 2, 2: 4}\n```\n\nSe a comprehension ficar difícil de ler, use um `for` normal. Clareza vem primeiro.",
     "exercises": [
      {
       "type": "code",
       "question": "Crie com comprehension a lista dos cubos de 1 a 5.",
       "answer": "[x**3 for x in range(1, 6)]",
       "placeholder": "[... for x in range(1, 6)]"
      },
      {
       "type": "quiz",
       "question": "O que gera [x for x in range(10) if x % 2 == 0] ?",
       "options": [
        "[1,3,5,7,9]",
        "[0,2,4,6,8]",
        "[2,4,6,8,10]",
        "[0,1,2,3,4]"
       ],
       "answer": 1,
       "explanation": "Filtra só os pares de 0 a 9."
      },
      {
       "type": "truefalse",
       "question": "Comprehension só funciona com listas.",
       "answer": false,
       "explanation": "Existem também para dicionários e sets."
      }
     ]
    },
    {
     "id": "py-21",
     "code": "0021",
     "title": "lambda, map, filter e sorted",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Funções curtas e funcionais.",
     "theory": "```\ndobro = lambda x: x * 2\n\nnumeros = [1, 2, 3, 4]\nlist(map(lambda x: x ** 2, numeros))        # [1, 4, 9, 16]\nlist(filter(lambda x: x % 2 == 0, numeros)) # [2, 4]\n\nnomes = [\"Carlos\", \"Ana\", \"Bruno\"]\nsorted(nomes, key=len)                      # [\"Ana\", \"Bruno\", \"Carlos\"]\n```\n\n`map` transforma cada item, `filter` mantém só quem passa no teste e `sorted(key=...)` ordena por um critério.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que map() faz?",
       "options": [
        "Cria um dicionário",
        "Aplica uma função a cada item",
        "Filtra itens",
        "Ordena a lista"
       ],
       "answer": 1,
       "explanation": "map aplica a função em cada elemento."
      },
      {
       "type": "code",
       "question": "Escreva uma lambda que recebe a e b e devolve a soma.",
       "answer": "lambda a, b: a + b",
       "placeholder": "lambda a, b: ..."
      },
      {
       "type": "quiz",
       "question": "O que sorted(nomes, key=len) usa para ordenar?",
       "options": [
        "Ordem alfabética",
        "O tamanho de cada nome",
        "O último caractere",
        "Nada"
       ],
       "answer": 1,
       "explanation": "key=len ordena pelo tamanho."
      }
     ]
    },
    {
     "id": "py-22",
     "code": "0022",
     "title": "Geradores e yield",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Valores sob demanda, com pouca memória.",
     "theory": "```\ndef contar(ate):\n    n = 1\n    while n <= ate:\n        yield n\n        n += 1\n\nfor x in contar(3):\n    print(x)      # 1, 2, 3\n```\n\n`yield` entrega um valor e **pausa** a função até o próximo pedido.\n\nExpressão geradora: `(x**2 for x in range(1_000_000))`. Não cria a lista toda na memória.",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual palavra transforma uma função em gerador?",
       "options": [
        "return",
        "yield",
        "generate",
        "next"
       ],
       "answer": 1,
       "explanation": "yield pausa e entrega valores um a um."
      },
      {
       "type": "truefalse",
       "question": "Um gerador guarda todos os valores na memória de uma vez.",
       "answer": false,
       "explanation": "Ele produz um valor por vez (lazy)."
      },
      {
       "type": "open",
       "question": "Quando um gerador é melhor que uma lista?",
       "placeholder": "Quando..."
      }
     ]
    },
    {
     "id": "py-23",
     "code": "0023",
     "title": "Decoradores",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Adicionando comportamento a funções.",
     "theory": "```\nimport time\n\ndef cronometrar(func):\n    def wrapper(*args, **kwargs):\n        ini = time.perf_counter()\n        r = func(*args, **kwargs)\n        print(f\"{time.perf_counter() - ini:.4f}s\")\n        return r\n    return wrapper\n\n@cronometrar\ndef somar():\n    return sum(range(1_000_000))\n```\n\nO `@cronometrar` equivale a `somar = cronometrar(somar)`. O decorador **envolve** a função sem mexer no código dela.\n\nExemplos prontos: `@property`, `@staticmethod`, `@functools.cache`.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que um decorador faz?",
       "options": [
        "Apaga a função",
        "Copia a função",
        "Envolve a função adicionando comportamento",
        "Vira método de classe"
       ],
       "answer": 2,
       "explanation": "Ele recebe a função, devolve uma nova com algo a mais."
      },
      {
       "type": "open",
       "question": "Cite um caso real onde um decorador ajudaria (log, tempo, permissão...).",
       "placeholder": "Eu usaria um decorador para..."
      }
     ]
    },
    {
     "id": "py-24",
     "code": "0024",
     "title": "Módulos, pip e ambientes virtuais",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Usando bibliotecas e organizando projetos.",
     "theory": "```\nimport math\nfrom random import randint\n\nmath.sqrt(16)       # 4.0\nrandint(1, 10)\n```\n\n**Instalar pacotes de terceiros:**\n\n```\npip install requests\n```\n\n**Ambiente virtual** isola as dependências de cada projeto:\n\n```\npython -m venv .venv\n.venv\\Scripts\\activate     # Windows\nsource .venv/bin/activate   # Linux/Mac\n```",
     "exercises": [
      {
       "type": "quiz",
       "question": "Qual comando instala uma biblioteca?",
       "options": [
        "python install",
        "import install",
        "pip install",
        "get install"
       ],
       "answer": 2,
       "explanation": "pip é o gerenciador de pacotes."
      },
      {
       "type": "code",
       "question": "Importe só a função randint do módulo random.",
       "answer": "from random import randint",
       "placeholder": "from random import ..."
      },
      {
       "type": "quiz",
       "question": "Para que serve um ambiente virtual (venv)?",
       "options": [
        "Deixar o Python mais rápido",
        "Isolar as dependências de cada projeto",
        "Compilar o código",
        "Proteger o código com senha"
       ],
       "answer": 1,
       "explanation": "Cada projeto tem seus próprios pacotes e versões."
      }
     ]
    },
    {
     "id": "py-25",
     "code": "0025",
     "title": "Classes e objetos (POO)",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Modelando coisas do mundo real.",
     "theory": "```\nclass Cachorro:\n    def __init__(self, nome):\n        self.nome = nome\n\n    def latir(self):\n        print(f\"{self.nome}: Au au!\")\n\nrex = Cachorro(\"Rex\")\nrex.latir()\n```\n\n**Classe** é o molde; **objeto** é o que sai do molde. `__init__` roda ao criar o objeto e `self` é o próprio objeto.",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que é __init__ ?",
       "options": [
        "Método que apaga o objeto",
        "O construtor, roda ao criar o objeto",
        "Um método privado",
        "A classe principal"
       ],
       "answer": 1,
       "explanation": "Ele inicializa os atributos do novo objeto."
      },
      {
       "type": "quiz",
       "question": "O que representa self?",
       "options": [
        "A classe",
        "O próprio objeto",
        "O módulo",
        "Uma variável global"
       ],
       "answer": 1,
       "explanation": "self é a instância que está executando o método."
      },
      {
       "type": "open",
       "question": "Explique com uma analogia a diferença entre classe e objeto.",
       "placeholder": "Classe é como... objeto é como..."
      }
     ]
    },
    {
     "id": "py-26",
     "code": "0026",
     "title": "Herança e métodos especiais",
     "duration": "~10 min",
     "youtubeId": null,
     "description": "Reaproveitando classes e controlando como o objeto aparece.",
     "theory": "```\nclass Animal:\n    def __init__(self, nome):\n        self.nome = nome\n    def __str__(self):\n        return f\"Animal({self.nome})\"\n\nclass Gato(Animal):\n    def __init__(self, nome, cor):\n        super().__init__(nome)\n        self.cor = cor\n\nprint(Gato(\"Mia\", \"preto\"))   # Animal(Mia)\n```\n\n- `Gato(Animal)`: Gato **herda** de Animal\n- `super()` acessa a classe pai\n- `__str__` define o texto do `print(objeto)`",
     "exercises": [
      {
       "type": "quiz",
       "question": "O que super().__init__() faz?",
       "options": [
        "Cria objeto novo",
        "Chama o __init__ da classe pai",
        "Apaga o objeto",
        "Copia métodos"
       ],
       "answer": 1,
       "explanation": "Inicializa a parte herdada da classe pai."
      },
      {
       "type": "truefalse",
       "question": "Uma classe filha usa os métodos da classe pai sem reescrevê-los.",
       "answer": true,
       "explanation": "É o principal ganho da herança."
      },
      {
       "type": "quiz",
       "question": "Para que serve __str__ ?",
       "options": [
        "Converter para int",
        "Definir o texto exibido no print do objeto",
        "Apagar atributos",
        "Criar atributos privados"
       ],
       "answer": 1,
       "explanation": "print(objeto) usa o texto retornado por __str__."
      }
     ]
    },
    {
     "id": "py-27",
     "code": "0027",
     "title": "Type hints e dataclasses",
     "duration": "~12 min",
     "youtubeId": null,
     "description": "Código mais claro no Python moderno.",
     "theory": "**Type hints** documentam os tipos esperados (o Python não obriga, mas editores e ferramentas aproveitam):\n\n```\ndef somar(a: int, b: int) -> int:\n    return a + b\n```\n\n**dataclass** cria `__init__`, `__repr__` e comparação automaticamente:\n\n```\nfrom dataclasses import dataclass\n\n@dataclass\nclass Aluno:\n    nome: str\n    nota: float = 0.0\n\na = Aluno(\"Ana\", 9.5)\nprint(a)      # Aluno(nome='Ana', nota=9.5)\n```",
     "exercises": [
      {
       "type": "truefalse",
       "question": "O Python bloqueia a execução se o tipo passado não bate com o type hint.",
       "answer": false,
       "explanation": "Type hints não são verificados na execução; servem para editores e ferramentas como mypy."
      },
      {
       "type": "quiz",
       "question": "O que o @dataclass gera automaticamente?",
       "options": [
        "Só o __init__",
        "__init__, __repr__ e comparação",
        "Nada",
        "Um banco de dados"
       ],
       "answer": 1,
       "explanation": "Reduz muito código repetitivo."
      },
      {
       "type": "code",
       "question": "Escreva a assinatura de uma função dobro que recebe int e devolve int.",
       "answer": "def dobro(n: int) -> int:",
       "placeholder": "def dobro(...) -> ...:"
      }
     ]
    },
    {
     "id": "py-28",
     "code": "0028",
     "title": "Próximos passos",
     "duration": "~8 min",
     "youtubeId": null,
     "description": "Onde ir depois do básico.",
     "theory": "Escolha **uma** área e vá fundo:\n\n- **Web/APIs:** FastAPI, Django\n- **Dados:** Pandas, NumPy, Matplotlib\n- **IA:** scikit-learn, PyTorch\n- **Automação:** requests, BeautifulSoup, Selenium\n- **Jogos:** Pygame\n\n**Método que funciona:** aprendeu algo? Aplique em até 3 dias num mini projeto. Quem pratica, fixa.",
     "exercises": [
      {
       "type": "open",
       "question": "Qual área mais te interessa e o que você quer construir primeiro?",
       "placeholder": "Quero construir..."
      },
      {
       "type": "quiz",
       "question": "Qual framework é muito usado hoje para criar APIs modernas?",
       "options": [
        "FastAPI",
        "Pygame",
        "NumPy",
        "Tkinter"
       ],
       "answer": 0,
       "explanation": "FastAPI é rápido, usa type hints e gera documentação automática."
      }
     ]
    }
   ]
  }
 ]
};

if (typeof COURSES_DATA !== 'undefined' && !COURSES_DATA.find(c => c.id === PYTHON_COURSE.id)) {
  COURSES_DATA.push(PYTHON_COURSE);
}
