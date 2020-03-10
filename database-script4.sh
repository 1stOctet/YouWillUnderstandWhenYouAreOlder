
 
#backup sqldb
echo "backing up /etc/pihole/gravity.db to /etc/pihole/gravity.$(date +%F_%R).db"
cp /etc/pihole/gravity.db /etc/pihole/gravity.$(date +%F_%R).db

echo "adding 8 domains to blocklist"
sqlite3 /etc/pihole/gravity.db <<EOF
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'googlevideo.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'youtu.be', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'youtube-nocookie.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'youtube.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'youtube.googleapis.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'youtubei.googleapis.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'ytimg.com', 'Blacklisted for members of group 1');
INSERT INTO domainlist (type, domain, comment) VALUES (1, 'ytimg.l.google.com ', 'Blacklisted for members of group 1');
EOF

echo "Done"


# https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md

# source for blocking youtube.  Needs to be tested.
# https://www.d7xtech.com/blocking-youtube-for-the-kids-on-all-devices-as-well-as-other-undesirable-content/
