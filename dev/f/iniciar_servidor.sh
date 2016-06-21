#!/bin/bash

echo "Iniciar Servidor"
echo "Definir directorias"

path_projecto=./webApp/dev
path_servidor=$path_projecto/servidor/
path_forever_logs=$path_projecto/logs/forever.log
path_saida_logs=$path_projecto/logs/saida.log
path_erros_logs=$path_projecto/logs/erros.log

echo "Iniciar forever"

forever start development.json
echo "Done!"
