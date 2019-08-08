I use Ubuntu 18.04 in AWS EC2

1. You must install npm, mysql and nginx packet.
2. npm need express, cors, mysql and (pm2 global)
3. After installed mysql, you must create database with file data/mysql-base.sql
4. Run daemon nodejs:
    cd hotdog-server
    pm2 start index.js
5. Run react daemon
    cd hotdog-react
    pm2 start node_modules/react_scripts/scripts/start.js --name "hotdog-react"
6. Move default configuration file nginx
    sudo mv data/nginx/sites-available/default /etc/nginx/sites-available/default
    sudo /etc/init.d/nginx restart

You must use ip_address in file hotdog-react/src/App.js. If you use localhost, the apllication will not work.
