
I keep hearing about school closings and wonder how I can "encourage" my son and daughter to spend a little less time on social media and more time learning during school hours if their middle school closes.

Original post on reddit..
https://www.reddit.com/r/pihole/comments/fg5fht/how_to_encourage_your_children_to_use_the/

With the awesome per client features of Pi-hole 5.0 beta it will now be possible to add the ability to periodically block sites and unlock them after points are earned on khan academy, typing club or any site that has a web scrapable point system.

Goal:  After 2 hours, block 2 or 3 sites that my 13 year old uses the most.  Unblock those sites once they have earned 1 point on Typing Club or Khan Academy.

I will update this post as I do this tonight.  Look for updates here or on the github project.

https://github.com/1stOctet/YouWillUnderstandWhenYouAreOlder

Setup
- Create an account on typing club or khan academy as a parent. Do not use a LINKED facebook or LINKED google account to log in. 

- For this to work you need to create an "old school" email login. This is important because we will have a nodejs script that will log in as you to check your child's account for points.

- Todo (Explain how to install Linux on a raspberry pi or old computer)

- Todo (Explain how to install pi-hole and upgrade to pi-hole 5.0 beta)

- sudo apt install nodejs npm git

- npm i puppeteer

- npm i get-stdin

- git clone https://github.com/1stOctet/YouWillUnderstandWhenYouAreOlder.git

Currently using this guide https://github.com/pi-hole/docs/blob/release/v5.0/docs/database/gravity/example.md
to understand how to flip a site from blocked to not blocked via the "Raw database instructions"


