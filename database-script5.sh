
#backup sqldb
echo "backing up /etc/pihole/gravity.db to /etc/pihole/gravity.$(date +%F_%R).db"
cp /etc/pihole/gravity.db /etc/pihole/gravity.$(date +%F_%R).db

echo "link domains to group 1 and DELETE the unassociated type"
sqlite3 /etc/pihole/gravity.db <<EOF
DELETE FROM domainlist_by_group WHERE group_id = 0;
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (1, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (2, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (3, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (4, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (5, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (6, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (7, 1);
INSERT INTO domainlist_by_group (domainlist_id, group_id) VALUES (8, 1);
EOF

echo "Done"
# https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md
