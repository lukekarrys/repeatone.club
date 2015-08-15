# repeatone

http://repeatone.lukekarrys.com

See if a last.fm user is listening to a song on repeat.

![screenshot](https://cldup.com/UjR_z73vH5.png)


## Usage

### Dev

```
npm install
npm start
```

### Prod

Hosted on [surge.sh](https://surge.sh/).

```
npm run build
npm run deploy
```

### API

Deployed on [webtask.io](https://webtask.io/).

Check out the [`repeatone-webtask`](https://github.com/lukekarrys/repeatone-webtask) for instructions on how to deploy it.



## TODO

- Try react-blur now that api image is base64 str
- Move to all radium for all component styles
- Flux to communicate footer icon color light/dark
- Fetch track duration and setup re-fetch on that duration
