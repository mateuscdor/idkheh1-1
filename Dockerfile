FROM quay.io/lyfe00011/bot:beta
RUN git clone https://github.com/pepesir/Lisa-md /root/pepesir
WORKDIR /root/pepesir
RUN npm install && npm install pm2 -g 
CMD ["npm", "start"]

