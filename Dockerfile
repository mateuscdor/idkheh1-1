FROM quay.io/lyfe00011/bot:beta
RUN git clone https://github.com/idkheh123/idkheh1 /root/pepesir
WORKDIR /root/pepesir
RUN npm install forever -g
RUN npm install && npm install pm2 -g 
RUN npm install agentkeepalive --save
RUN npm install -g npm@8.11.0
CMD ["npm", "start"]

