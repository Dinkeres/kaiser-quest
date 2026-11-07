# Kaiser Quest

Kaiser Quest is a modernization and expansion of Mozilla's BrowserQuest HTML5 multiplayer game experiment.


Documentation
-------------

See [DEVELOPMENT.md](DEVELOPMENT.md) to install and run the game locally, [ARCHITECTURE.md](ARCHITECTURE.md) for the technical design, and [ROADMAP.md](ROADMAP.md) for planned development.

## Play with friends

GitHub hosts the source code but cannot run the Node.js/WebSocket game server. This repository includes `render.yaml` for a one-click [Render Blueprint](https://render.com/docs/blueprint-spec) deployment: create a Render account, select **New +** → **Blueprint**, connect this repository and deploy the `reborn-development` branch. Render assigns a public HTTPS URL; share that URL with friends. The client automatically uses the page's host and secure WebSocket connection.


License
-------

Kaiser Quest retains BrowserQuest code under MPL 2.0. Content is licensed under CC-BY-SA 3.0.
See the LICENSE file for details.


Credits
-------
Created by [Little Workshop](http://www.littleworkshop.fr):

* Franck Lecollinet - [@whatthefranck](http://twitter.com/whatthefranck)
* Guillaume Lecollinet - [@glecollinet](http://twitter.com/glecollinet)
