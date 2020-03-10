#backup sqldb
echo "backing up /etc/pihole/gravity.db to /etc/pihole/gravity.$(date +%F_%R).db"
cp /etc/pihole/gravity.db /etc/pihole/gravity.$(date +%F_%R).db

echo "Running 1 insert statements to add child's ip address"
sqlite3 /etc/pihole/gravity.db <<EOF
INSERT INTO client (id, ip) VALUES (1, '222.222.222.222');
EOF

echo "Done"

# insert statements source
# https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md


