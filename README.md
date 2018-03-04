# Meetup Finder
View the version online at [meetupfinder.com](http://meetupfinder.com)

# Run Locally
This application was built using [Rekit](https://github.com/supnate/rekit). To run it locally:

```bash

> git clone https://github.com/joellord/meetupfinder
> cd meetupfinder
> npm install && npm start
```

Then point your browser to [http://localhost:6075/](http://localhost:6075/) to view the app and [http://localhost:6076/](http://localhost:6076/) to run the IDE.

# Backend
The server runs on  [Webtask](http://webtask.io) so that my Meetup.com API key is not exposed.  The code that is run on
the server is in this respository under the webtask folder.