#
# Atualiza a versÃ£o da cache
#
lv=$(sed '2!d' /servidor_html/projeto/nome.appcache)
uv=$(echo $lv | tail -c 4)
pv=$(echo $lv | cut -c1-14)
#retira o zero Ã  esquerda para converter em decimal
uv=${uv#0} 
#retira o zero Ã  esquerda para converter em decimal
uv=${uv#0}
#incrementa 1
nuv=$((uv+1))
nuv=$(printf "%03d\n" $nuv)
pv=$pv$nuv
echo "A atualizar o nome.appcache para da versÃ£o ${uv} para ${nuv}"
#substitui a linha 2.
sed -i "2s/.*/$pv/" /servidor_html/projeto/nome.appcache


echo "A limpar otimizaÃ§Ã£o existente...\n"
rm /servidor_html/projeto/otimizado/publico/* -R
rm /servidor_html/projeto/otimizado/servidor/* -R

echo "A copiar ficheiros...\n"
cp -a /servidor_html/projeto/publico/. /servidor_html/projeto/otimizado/publico/
cp -a /servidor_html/projeto/servidor/. /servidor_html/projeto/otimizado/servidor/

echo "Vou comprimir JS\n"

echo ".. diretÃ³rio /servidor_html/projeto/publico/\n"

cd /servidor_html/projeto/publico/
echo "f1.js\n"
 yui-compressor -v --charset utf-8  f1.js -o /servidor_html/projeto/otimizado/publico/f1.js 

echo ".. diretÃ³rio /servidor_html/projeto/servidor\n"

cd /servidor_html/projeto/servidor
echo "f1.js\n"
 yui-compressor -v --charset utf-8  f1.js -o /servidor_html/projeto/otimizado/servidor/f1.js 

echo "Vou comprimir CSS\n"

cd /servidor_html/projeto/publico/grafismo
echo "f1.css\n"
 yui-compressor -v --charset utf-8  f1.css -o /servidor_html/projeto/otimizado/publico/grafismo/f1.css 


echo "Vou comprimir HTML\n"
java -jar /servidor_html/projeto/ferramentas/htmlcompressor-1.5.3.jar /servidor_html/projeto/publico/diversos/*.html -o /servidor_html/projeto/otimizado/publico/ --remove-intertag-spaces 


echo "A montar o diretÃ³rio remoto no disco local em /servidor_html/projeto/remoto/\n"
#sshfs ole@100.100.100.007:/servidor_html/projeto /servidor_html/projeto/remoto -p190 -o IdentityFile=/root/.ssh/servidor1_id_rsa

echo "A atualizar o servidor remoto com os novos ficheiros\n"

echo "/publico/\n"
cp -u /servidor_html/projeto/otimizado/publico/* /servidor_html/projeto/prod/publico/

echo "/servidor/\n"
cp -u /servidor_html/projeto/otimizado/servidor/* /servidor_html/projeto/prod/servidor/

echo "A desmontar o diretÃ³rio remoto\n"
#umount /servidor_html/projeto/remoto
