#
# Atualiza a versãoo da cache
#
JAVA_CMD="/usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java";
export JAVA_CMD;

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

echo "A limpar otimização existente..."
rm  -r ${path_oti}
mkdir ${path_oti}

echo "\nA copiar ficheiros..."
cp -a ${path_raiz}/dev/p/ ${path_oti}
cp -a ${path_raiz}/dev/servidor/ ${path_oti}
cp -a ${path_raiz}/dev/r/ ${path_oti}
cp -a ${path_raiz}/dev/f/init/ ${path_oti}

echo "\nVou comprimir JS"
echo ".. diretório ${path_raiz}/dev/p/\n"
cd ${path_raiz}/dev/p/

echo "yui-compressor ${path_oti}/p/*/*.js"
yui-compressor -v --charset utf-8  d/*.js -o ${path_oti}/p/d/*.js
yui-compressor -v --charset utf-8  j/*.js -o ${path_oti}/p/j/*.js

## yui rebenta

echo ".. diretório ${path_raiz}/dev/servidor"
cd ${path_raiz}/dev/servidor/
echo "node_arranque.js"
yui-compressor -v --charset utf-8 node_arranque.js -o ${path_oti}/servidor/node_arranque.js
yui-compressor -v --charset utf-8 pedidos.js -o ${path_oti}/servidor/pedidos.js
#yui-compressor -v --charset utf-8 node_servidor.js -o ${path_oti}/servidor/node_servidor.js
yui-compressor -v --charset utf-8 _liv.js -o ${path_oti}/servidor/_liv.js
yui-compressor -v --charset utf-8 _interface_couchdb.js -o ${path_oti}/servidor/_interface_couchdb.js

#echo "Todos os fichiros javascript na pasta servidor *.js\n"
#yui-compressor -v --charset utf-8  */*.js -o ${path_oti}/servidor/*/*.js

echo "\nVou comprimir CSS"
cd ${path_raiz}/dev/p/c
echo "m.css"
yui-compressor -v --charset utf-8  m.css -o ${path_oti}/p/c/m.css
echo "c.css"
yui-compressor -v --charset utf-8  c.css -o ${path_oti}/p/c/c.css

echo "\nVou comprimir HTML"
java -jar ${path_raiz}/dev/f/htmlcompressor-1.5.3.jar ${path_raiz}/dev/p/d/*.html -o ${path_oti}/p/d/ --remove-intertag-spaces

echo "A montar o diretório remoto no disco local em /home/pi/Public/ em /home/nuno/remotePublic\n"
sshfs pi@baapp.duckdns.org:/home/pi/Public /home/nuno/remotePublic -o nonempty
#sshfs ole@100.100.100.007:/servidor_html/projeto /servidor_html/projeto/remoto -p190 -o IdentityFile=/root/.ssh/servidor1_id_rsa

echo "A atualizar o servidor remoto com os novos ficheiros\n"
mkdir /home/nuno/remotePublic/webApp
mkdir /home/nuno/remotePublic/webApp/p
mkdir /home/nuno/remotePublic/webApp/r
mkdir /home/nuno/remotePublic/webApp/servidor
mkdir /home/nuno/remotePublic/webApp/init

echo "/publico/\n"
cp -uR ${path_oti}/p/* /home/nuno/remotePublic/webApp/p

echo "/servidor/\n"
cp -uR ${path_oti}/servidor/* /home/nuno/remotePublic/webApp/servidor

echo "/resources/\n"
cp -uR ${path_oti}/r/* /home/nuno/remotePublic/webApp/r

echo "/init/\n"
cp -uR ${path_oti}/init* /home/nuno/remotePublic/webApp/

echo "A desmontar o diretório remoto\n"
umount /home/nuno/remotePublic
