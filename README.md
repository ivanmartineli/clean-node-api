 nodejs com typescript setup inicial: 

    - git init
    - npm init -y (cria o package.json)
    - npm add express && npm add -D @types/express
    - npm add typescript -D
    - tsc --init (add o arquivo tsconfig.json : e ele converter para Javascript quando iremos fazer uma compilação (buildar) e deixar nossa aplicação na    linguagem que o servidor entenda que no caso é o Javascript.)


obs: 
 quando utilizar a tag dev no package.json em scripts, para executar o projeto faça: 
  ex: "dev": "nodemon src/server.ts",
    - npm run dev 

 caso contrario, cria um 'start' e faz um 'npm start' e já vai executar: 
    - "start": "nodemon src/server.ts",


 problemas nos modulos? Execute: 
   - rm -rf node_modules
   - rm -f package-lock.json
   - npm cache clean --force
   - npm i


====================================================================================

  Quando utilizar o nodemon, cria o arquivo nodemon.json para ignorar
    todos os arquivos que estão na pasta node_modules, isso ganhamos performance e 
    também não há necessidade de alterarmos esses arquivos. 

  Caso so contrário, apenas add o nodemon diretamente no 
    objeto scripts do package.json { dev/start :  nodemon src/server.ts }

====================================================================================