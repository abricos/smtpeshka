# smtpeshka

Virtual SMTP-server for debugging mail messages third-party applications

## Overview

Virtual SMTP-server based on [Haraka Mail Server](https://haraka.github.io/) using plug-ins.
E-mail messages sent by third-party applications are not sent to
the address. E-mail message are written to JSON file.

## Installation

Installation is fairly straightforward, just install the npm module:

    $ npm install -g smtpeshka

## Running smtpeshka

Create a project for to store your sent messages and config files.

    $ mkdir my-smtp-test
    $ cd my-smtp-test
    $ smtpeshka

Now configure your mail application to send emails via SMTP:

    SMTP host: localhost
    SMTP port: 2525

Start your application with these settings and send any e-mail message.
Your message will not be sent to the address.
This message is saved in the folder `sent-emails` your project `my-smtp-test`.

## Web

Sent messages can be viewed in a browser at http://localhost:2580

## API

### GET localhost:2580/api

E-mail list

    [
      {
        "html": <p>Hello World!</p>",
        "text": "Hello World!",
        "headers": {
          "received": "from person.local (ip6-localhost [::1]) by Server ...",
          "date": "Thu, 22 Jan 2015 23:09:13 +0300",
          "to": "user@example.com",
          "from": "E-mail Tester <>",
          "subject": "Hello",
          "message-id": "5684b0c0bd9a38962535083a3d5c79dc",
          "x-priority": "normal"
        },
        "subject": "Hello",
        "messageId": "5684b0c0bd9a38962535083a3d5c79dc",
        "priority": "normal",
        "from": [
          {
            "address": "info@localhost",
            "name": "Local Server"
          }
        ],
        "to": [
          {
            "address": "user@example.com",
            "name": "User"
          }
        ],
        "date": "2015-01-22T20:09:13.000Z"
      }
    ]


### GET localhost:2580/api/email/:messageId

E-mail by message-id

    {
        "html": <p>Hello World!</p>",
        "text": "Hello World!",
        "headers": {
          "received": "from person.local (ip6-localhost [::1]) by Server ...",
          "date": "Thu, 22 Jan 2015 23:09:13 +0300",
          "to": "user@example.com",
          "from": "E-mail Tester <>",
          "subject": "Hello",
          "message-id": "5684b0c0bd9a38962535083a3d5c79dc",
          "x-priority": "normal"
        },
        "subject": "Hello",
        "messageId": "5684b0c0bd9a38962535083a3d5c79dc",
        "priority": "normal",
        "from": [
          {
            "address": "info@localhost",
            "name": "Local Server"
          }
        ],
        "to": [
          {
            "address": "user@example.com",
            "name": "User"
          }
        ],
        "date": "2015-01-22T20:09:13.000Z"
      }

### GET localhost:2580/api/status

Status SMTPeshka


    {
      "web": {
        "port": 2580
      },
      "SMTP": {
        "port": 2525
      },
      "transport": {
        "json": {
          "saveto": "/home/user/my-smtp-test/sent-emails"
        }
      },
      "haraka": {
        "prog": {
            "dir": "/usr/local/lib/node_modules/smtpeshka/node_modules/Haraka"
         },
        "config": {
          "source": {
            "dir": "/usr/local/lib/node_modules/smtpeshka/haraka-def"
          },
          "build": {
            "dir": "/tmp/smtpeshka/haraka"
          }
        }
      }
    }

## License
MIT


