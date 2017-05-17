# Easily serve a directory's contents over the internet using ngrok and nodejs

It's as easy as

```bash
$ ngrok-serve
```

<img src="https://cl.ly/3W1E3H183517/Screen%20Recording%202017-05-17%20at%2008.47%20AM.gif" width="500"/> <img src="https://cl.ly/0S111S1k0U2y/Screen%20Shot%202017-05-17%20at%208.57.59%20AM.png" width="350"/> 

## Setup

```bash
$ npm install -g ngrok-serve-dir
```

## Usage

```
Usage
  $ ngrok-serve <path/to/directory>
  $ ngrok-serve <path/to/directory> --port=<PORT>

Options
  -p, --port Sets the desired port 

Examples
  $ ngrok-serve .
  $ ngrok-serve ./public/static
  $ ngrok-serve ./public/static --port=4000
```
