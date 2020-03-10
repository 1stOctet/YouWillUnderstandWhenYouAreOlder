 
#backup sqldb
echo "backing up /etc/pihole/gravity.db to /etc/pihole/gravity.$(date +%F_%R).db"
cp /etc/pihole/gravity.db /etc/pihole/gravity.$(date +%F_%R).db

echo "Linking client id to group id by inserting into group table"
sqlite3 /etc/pihole/gravity.db <<EOF
INSERT INTO client_by_group (client_id, group_id) VALUES (1, 1);
EOF

echo "Done"

# insert statement source
# https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md



