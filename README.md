# Migrações do Banco de Dados

## Pré-requisitos

ter instalado o mysql:

- [MySQL](https://dev.mysql.com/downloads/) (ou MariaDB)

## Configuração do Banco de Dados

1. **Instale o MySQL:**
    - Siga as instruções para instalar o MySQL.

2. **Crie um banco de dados:**
    - Crie um banco de dados com o nome `beysic`.

   ```bash
   mysql -u root -p
   CREATE DATABASE beysic;
    ```
3. **Ajuste a configuracao do TypeORM**
    - Configure o src/data-source.ts apontando para o seu banco 

## Rodar as Migrations
   ```bash
   npm install
   
   npm run migration:run
   ```

## Criando uma nova MIGRATION

   ```bash
     npm run typeorm -- migration:generate src/migrations/<NOMEDACLASSE> -d src/data-source.ts
   ```

## RODANDO A BOSTA DA MIGRATION

   ```bash
     npm run typeorm -- migration:generate src/migrations/<NOMEDACLASSE> -d src/data-source.ts
   ```