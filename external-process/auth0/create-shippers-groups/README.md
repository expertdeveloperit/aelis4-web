# Aelis4 Create Groups Into Authorization Extension.

## This is a manual process to migrate this groups.

```bash 
# Start With Node:
auth0_client_secret= aelis4_db_host= aelis4_db_user=  aelis4_db_password= aelis4_db_database= node index.js

# Start With Pm2:
auth0_client_secret= aelis4_db_host= aelis4_db_user= aelis4_db_password= aelis4_db_database=  pm2 start index.js --name createGroups
