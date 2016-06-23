#
# Atualiza a versãoo da cache
#
path_raiz=/home/nuno/Projecto_WebApp/webApp
path_oti=${path_raiz}/otimizado
manifest=${path_raiz}/nome.appcache

lv=$(sed '2!d' ${manifest})
uv=$(echo $lv | tail -c 4)
pv=$(echo $lv | cut -c1-14)
#retira o zero à esquerda para converter em decimal
uv=${uv#0} 
#retira o zero à esquerda para converter em decimal
uv=${uv#0}
#incrementa 1
nuv=$((uv+1))
nuv=$(printf "%03d\n" $nuv)
pv=$pv$nuv
echo "A atualizar o nome.appcache para da versão ${uv} para ${nuv}"
#substitui a linha 2.
sed -i "2s/.*/$pv/" ${manifest}

echo "A limpar otimização existente...\n"
rm -rf ${path_oti}/p/
rm -rf ${path_oti}/f/
rm -rf ${path_oti}/servidor/
rm -rf ${path_oti}/sessoes/
rm -rf ${path_oti}/logs/


mkdir ${path_oti}/logs/
mkdir ${path_oti}/f/

echo "A copiar ficheiros...\n"
cp -a ${path_raiz}/dev/p/ 	 ${path_oti}/p
cp -a ${path_raiz}/dev/servidor/ ${path_oti}/servidor
cp -a ${path_raiz}/dev/sessoes/  ${path_oti}/sessoes
cp  ${path_raiz}/dev/f/development.json ${path_oti}/f
cp  ${path_raiz}/dev/f/iniciar_servidor.sh ${path_oti}/f


echo "Vou comprimir JS\n"
echo ".. diretório ${path_raiz}/dev/publico/\n"

cd ${path_raiz}/dev/p/

echo "javascript geral.js\n"
yui-compressor -v --charset utf-8  d/geral.js -o ${path_oti}/p/d/geral.js 

#echo "Todos os fichiros javascript na pasta publico *.js\n"
#yui-compressor -v --charset utf-8  */*.js -o ${path_oti}/p/*/*.js 

## yui rebenta
#echo ".. diretório ${path_raiz}/dev/servidor\n"
#cd ${path_raiz}/dev/servidor/
#echo "node_arranque.js\n"
# yui-compressor -v --charset utf-8 node_arranque.js -o ${path_oti}/servidor/node_arranque.js 

#echo "node_servidor.js\n"
# yui-compressor -v --charset utf-8 node_servidor.js -o ${path_oti}/servidor/node_servidor.js 

#echo "Todos os fichiros javascript na pasta servidor *.js\n"
#yui-compressor -v --charset utf-8  */*.js -o ${path_oti}/servidor/*/*.js 

echo "Vou comprimir CSS\n"

cd ${path_raiz}/dev/p/c
echo "m.css"
 yui-compressor -v --charset utf-8  m.css -o ${path_oti}/p/c/m.css 

echo "c.css"
 yui-compressor -v --charset utf-8  c.css -o ${path_oti}/p/c/c.css 


echo "\nVou comprimir HTML\n"
java -jar ${path_raiz}/dev/f/htmlcompressor-1.5.3.jar ${path_raiz}/dev/p/d/*.html -o ${path_oti}/p/d/ --remove-intertag-spaces 

### to be done ###
echo "A montar o diretório remoto no disco local em /servidor_html/projeto/remoto/\n"
#sshfs ole@100.100.100.007:/servidor_html/projeto /servidor_html/projeto/remoto -p190 -o IdentityFile=/root/.ssh/servidor1_id_rsa

echo "A atualizar o servidor remoto com os novos ficheiros\n"

echo "/publico/\n"
#cp -u /servidor_html/projeto/otimizado/publico/* /servidor_html/projeto/prod/publico/

echo "/servidor/\n"
#cp -u /servidor_html/projeto/otimizado/servidor/* /servidor_html/projeto/prod/servidor/

echo "A desmontar o diretório remoto\n"
#umount /servidor_html/projeto/remoto



