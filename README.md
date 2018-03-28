# latex2pdf


Run it with

```
npm install
node main.js
```

Send a latex file to the server and it will send back the bits for a pdf. An example latex file is included. The script below will convert `proposal.tex` into `proposal.pdf`.

```
curl http://127.0.0.1:3000 -X POST --data-binary "@proposal.tex" -H "Content-Type: text/plain" > proposal.pdf
```
