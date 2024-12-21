# DocsBR - Processador de Documentos com IA

## Sobre o Projeto

DocsBR é uma aplicação web moderna para processamento e análise de documentos usando Inteligência Artificial. O sistema utiliza GPT-4 para extrair, estruturar e organizar informações de documentos em formato JSON padronizado.

## Funcionalidades Principais

- Upload de documentos via interface drag-and-drop
- Processamento automático com GPT-4
- Extração estruturada de informações
- Armazenamento otimizado em formato JSON
- Visualização e gerenciamento de documentos processados
- Interface responsiva e moderna

## Arquitetura

### Frontend
- React + TypeScript
- Vite para build e desenvolvimento
- TailwindCSS para estilização
- React Router para navegação
- React Dropzone para upload

### Backend
- Supabase para backend serverless
- Edge Functions para processamento
- Storage para arquivos
- Banco de dados PostgreSQL

### Processamento
- OpenAI GPT-4 para análise
- Processamento assíncrono
- Estruturação em JSON padronizado
- Sistema de filas para documentos

## Fluxo de Processamento

1. Upload do documento
2. Extração de texto
3. Análise com GPT-4
4. Estruturação em JSON
5. Armazenamento otimizado
6. Disponibilização para consulta

## Tecnologias

- React 18
- TypeScript
- Vite
- TailwindCSS
- Supabase
- OpenAI GPT-4
- PostgreSQL