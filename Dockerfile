FROM quay.io/lyfe00011/bot:beta
RUN git clone https://github.com/idkheh123/idkheh1 /root/pepesir
WORKDIR /root/pepesir
npm install forever -g
RUN npm install && npm install pm2 -g 
CMD ["npm", "start"]

