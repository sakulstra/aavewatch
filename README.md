## Aavewatch
Avvewatch is meant to be the successor of https://lendwatch.now.sh
For now this repository is just collecting feature requests.
Will try to move code and deployments to this repo in the upcoming weeks - after all that's just a hobby / side project.

### Contribute
Feel free to contribute code & feature requests (data you'd like to see plotted/dsplayed).

### History
In the beginning of 2020 https://aave.com launched their decentralized lending platform bringing some cool features like flash-loans and decentralized governance.
As this was in the personal top 10 of the most intresting blockchain projects i've seen so far I decided to finally spend some time with exploring https://etherscan.io to understand some basics about how all this transaction stuff works.
Avve seemed to get quite some traction but (as for now) provides just very basic analytics about the current state of it's smart contracts so I created a very cheesy(~8h of work) web application which fetches transactions from etherscan -> writes them to mongodb -> aggregates them and makes them available via a public api.
To my surprise, people were actually using this app and spotting erros, so I decided to rewrite it as open source project without a centralized mongodb in the middle.
Here we are.
