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
cp -af ${path_raiz}/dev/f/init/*prod* ${path_oti}


echo "A montar o diretório remoto no disco local em /home/pi/Public/ em /home/nuno/remotePublic\n"
sshfs pi@baapp.duckdns.org:/home/pi/Public /home/nuno/remotePublic -o nonempty
#sshfs ole@100.100.100.007:/servidor_html/projeto /servidor_html/projeto/remoto -p190 -o IdentityFile=/root/.ssh/servidor1_id_rsa

echo "A atualizar o servidor remoto com os novos ficheiros\n"
mkdir /home/nuno/remotePublic/webApp
mkdir /home/nuno/remotePublic/webApp/p
mkdir /home/nuno/remotePublic/webApp/r
mkdir /home/nuno/remotePublic/webApp/servidor
mkdir /home/nuno/remotePublic/webApp/logs

touch /home/nuno/remotePublic/webApp/logs/forever.logs
touch /home/nuno/remotePublic/webApp/logs/erros.logs
touch /home/nuno/remotePublic/webApp/logs/saida.logs
touch /home/nuno/remotePublic/webApp/logs/erro.logs

echo "/publico/\n"
cp -R ${path_oti}/p/* /home/nuno/remotePublic/webApp/p

echo "/servidor/\n"
cp -R ${path_oti}/servidor/* /home/nuno/remotePublic/webApp/servidor

echo "/resources/\n"
cp -R ${path_oti}/r/* /home/nuno/remotePublic/webApp/r

echo "/init/\n"
cp -R ${path_oti}/* /home/nuno/remotePublic/webApp/

echo "A desmontar o diretório remoto\n"
umount /home/nuno/remotePublic
