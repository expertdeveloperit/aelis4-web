# Aelis4 Express static server.

## Dist

```bash 
# Generation distribution folder.
sh dist.sh [type: prod, test, uat]

# Copy dist folder to Instance
scp -i aelis.pem -rp /Users/{user}/aelis4-web/dist/. ec2-user@ec2-34-201-218-105.compute-1.amazonaws.com:/home/ec2-user/aelis4-web

# Go to Instance
ssh -i aelis.pem ec2-user@ec2-34-201-218-105.compute-1.amazonaws.com

# Go to aelis-node decompressed directory and npm install
cd aelis4-web
npm install

# If process is running, then restart:
pm2 restart aelisWeb

# Else, in aelis4-web directory :
pm2 start ./bin/www --name aelisWeb

```

## License
All rights reserved kometsales
Copyright (c) 2019-present komet sales
