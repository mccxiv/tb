# Tb, the Twitch Chat "Bouncer"

#### It powers [Tc, the Twitch chat client](http://gettc.xyz/) 😊

### Demo
[backlog.gettc.xyz/v1/itshafu](https://backlog.gettc.xyz/v1/itshafu)

### API

`/:channel` - Where channel is a twitch username.  

Query parameters:  
`after` - Get messages after this timestamp in milliseconds. Default: one hour ago  
`before`: Get messages before this timestamp in milliseconds. Default: now  
`limit`: Only grab up to this many messages, removing older ones first. Default: 30

Requirements:
- MongoDB
- Node.js
- Port 6255 available

### Message format
`{user, message, at}` - Where `at` is a timestamp in milliseconds.

```javascript
// A request will produce an array of these
{
  user: {
    badges: "moderator/1",
    color: "#FF0000",
    display-name: "YuukiHatsu",
    emotes: {
      354: [
        "21-25"
      ]
    },
    mod: true,
    room-id: "30777889",
    subscriber: false,
    turbo: false,
    user-id: "51320169",
    user-type: "mod",
    emotes-raw: "354:21-25",
    username: "yuukihatsu",
    message-type: "chat"
  },
  message: "no, imma watch strim 4Head",
  at: 1462385825967
},
```

### Setup and usage
It's currently not very customizable, sorry.

- Make sure MongoDB is up and running, it will use the `/tb` database
- Clone repo
- Cd into it
- Run `npm i`
- Run `npm start`

Tb now handles requests at `http://localhost:6255/v1`. Set up your reverse proxy however you see fit.

### ISC License

Copyright (c) 2016 by Andrea Stella <adr.stella@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND ISC DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

