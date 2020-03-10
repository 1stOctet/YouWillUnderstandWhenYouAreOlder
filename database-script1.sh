#backup sqldb
echo "backing up /etc/pihole/gravity.db to /etc/pihole/gravity.$(date +%F_%R).db"
cp /etc/pihole/gravity.db /etc/pihole/gravity.$(date +%F_%R).db

echo "Running 3 insert statements"
sqlite3 /etc/pihole/gravity.db <<EOF
INSERT INTO "group" (id, name) VALUES (1, 'Group 1'); 
INSERT INTO "group" (id, name) VALUES (2, 'Group 2'); 
INSERT INTO "group" (id, name) VALUES (3, 'Group 3'); 
EOF

echo "Done"

# insert statements source
# https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md

