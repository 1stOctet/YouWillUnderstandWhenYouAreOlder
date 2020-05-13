Goal:  After 3 hours, block 1 or 2 sites that my 13 year old uses the most.  Unblock those sites once they have earned 1 point on Typing Club or Khan Academy.  Requires Pi-hole DNS software.  Pi-hole 5.0 is official as of May 10, 2020.  

With the awesome per client features of Pi-hole 5.0 beta it will now be possible to add the ability to periodically block sites and unlock them after points are earned on khan academy, typing club or any site that has a web scrapable point system.

Create an issue if you run into any problems.  Happy to help everyone get up and running.  Note some familiarity with the linux command line will be required.

License to learn: Code can be used however you wish with no restrictions.  






Setup
- Create an account on typing club or khan academy as a parent. Do not use a LINKED facebook or LINKED google account to log in. 

- For this to work you need to create an "old school" email login. This is important because we will have a nodejs script that will log in as you to check your child's account for points.

- After you create an account as a parent, create a sub account for the child.  Note typing club doesn't have a parent and a child account.  

- Todo (Explain how to install Linux on a raspberry pi or old computer)

- Todo (Explain how to install pi-hole and upgrade to pi-hole 5.0 beta)

- sudo apt install nodejs npm git

- npm i puppeteer

- npm i get-stdin

- git clone https://github.com/1stOctet/YouWillUnderstandWhenYouAreOlder.git

Currently using this guide https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md
to understand how to flip a site from blocked to not blocked via the "Raw database instructions"

Look at database-script1.sh first before running. Trust but verify.
- sudo bash database-script1.sh 

- Todo (Explain how to figure out what your child's ip address is using the pi-hole web interface)

Please first modify the database-script2.sh file and change 222.222.222.222 ip to your child's ip address.
- sudo bash database-script2.sh 

Look at database-script3.sh first before running. Trust but verify.
- sudo bash database-script3.sh 

Please first modify the database-script3.sh to include the domains you want to block.
- sudo bash database-script4.sh 

This script is unecessary if you use the pi-hole web interface to link the domains to a group.
If it doesn't make sense to you, please use the pi-hole gui.
Be sure to edit this file for the number of domains you are blocking periodically to ensure your child goes to Harvard.
- sudo bash database-script5.sh 

-Todo (add database-script6.sh to disable the blacklisted domains so that they work until the cronjob enables them)

- Run a cronjob every 4 hours that enables the blacklisted domains.  After sleeping for 20 seconds, do a point check to create user-typingclub-last.txt file and user-khanacademy-last.txt files.  Create a file user-YouWillUnderstandWhenYouAreOlder.txt to signal to the other cronjob that sites are being blocked for that user(s).

- If user-YouWillUnderstandWhenYouAreOlder.txt exists, this means the sites are blocked.  We need to frequently check khan academy and typing club to see if 1 point has been earned.  

- When the point checking cronjob runs every minute, it will output a user-typingclub-current.txt file and a user-khanacademy-current.txt file.  Using bash it will check if those files are diffent than user-typingclub-last.txt file and user-khanacademy-last.txt file.  If they are different, this means the child has earned at least 1 point.  Disable the blocking.  If the files are the same, delete user-typingclub-current.txt and user-khanacademy-current.txt 

- Todo (It is unecessary to frequently check for points if the user's ip address has not sent a DNS request in the last 15 minutes.  Some education sites will not like so many logins to check points all night.  Figure out the table to determine if the user has sent a DNS query in the last 15 minutes.  Ignore the apple / google domains that run often at night.

Notes
after running node khanacademy.js take the output and use this awk to put the point value in the variable $currentpoints
currentpoints=(awk -F 'points earned\\\\\\t' 'print $2}' out.txt | awk -F '\' '{print $1}'
