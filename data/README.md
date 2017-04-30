# format scripts

These scripts will interpret bank data & output a format used for the visualization. Here is an example of what the bank csv should contain,

```
"status","date","c","type","transaction","amount","g","account","i"
cleared,04-26-2017,,"Debit Card Purchase 04/24 11:36a #8072","SHAKE SHACK 1101       646-747-7200  NY 17115","-9.30","",'XXXXXX6304',1
```

I only use one bank, so I cannot vouch for how this works across the spectrum!

## setup

```sh
# Download your transactions into the /raw folder, update the file name in the parse.js script
$ npm install
$ node parse.js
```

This outputs a file `polished/data.csv`. This file probably isn't perfect, and you might have to spend a few minutes fixing some of the group identifiers to match (or dismatch).

Additionally, the transaction names aren't very intutive to read, so add another column titled "display". Just fill in the display property once on the first instance of the transaction group. For example,

```
date,id,groupId,title,amount,display
4/12/2017,af625397-4b2a-4155-b72f-6cc5e38f47ee,fe6059e7-01e6-4bfc-a1d8-1798cbfd964b,AMAZON MKTPLACE PMTS   AMZN.COM/BILL WA 17101,-195,Amazon
3/21/2017,49aecd34-3644-4c6a-b719-886bf00bfd6e,fe6059e7-01e6-4bfc-a1d8-1798cbfd964b,AMAZON MKTPLACE PMTS   AMAZON MKTPLA WA 17079,-286,
3/2/2017,6c67bede-23cd-46e5-8ea9-8858f3e453ac,fe6059e7-01e6-4bfc-a1d8-1798cbfd964b,AmazonPrime Membership 8665572820    WA 17060,-107,
...
```

Then drop your edited file back into the raw folder as `transactions-data.csv`. You can then run the following command to set the display value for every row,

```sh
$ node fill.js
```

Your final csv is again `polished/data.json`.
