# What the hell am I spending money on?

In the age of plastic, Venmo, and everyone wanting a subscription, it can be pretty easy for lazy people such as myself to lose track of what they're spending money on. I know a few people who use various mobile apps for budgeting & monitoring their finances, but we're also in the age of everything can (& will be) hacked. So I decided to build my own system for visualizing my bank statements. The following is 648 transactions from my checking account where I spent money on something, going back to late 2015.

<TransactionsChart />

One of the key questions I wanted to answer is where am I spending the most money. So the following chart groups relevant transactions together, and adjusts the size based on total spending. To remove some of the noise, I filtered out categories with less than $150 in spending.

<BarChart />

Unfortunately, a few of my top payments are relatively obscure.

- Unmarked Online Payment
- Citibank ATM
- Other? (Banking transaction of some kind)
- Venmo
- Unmarked debit purchase

The others represent me fairly well however,

- Amazon
- Act Blue
- Shake Shack
- Lenwich
- Uniqlo
- New York Times

Uber sits not far behind at #12 (_waiting for Lyft to get popular on Staten Island_), but there is something interesting at #13, _Fraud?_.

No, my banking statement didn't say the words fraud on it, but in doing this experiment I noticed a few highly unusual payments happening pretty consistently.

<TransactionsChart sort="true" defaultHighlight="e983380f-1e31-47dc-8713-3b13659de1d2" />

> (The chart is also interactive - Click to toggle the highlighted items, double click to reset chart)

I've put all of fraudulent transactions in a table below in chronological order, and there are a few things worth pointing out.

| Date      | Transaction name                           | $$  |
| --------- |:------------------------------------------:| ---:|
| 4/7/2016  | SQC*TIM DUGAN 04153753176 CA 16097         | -10 |
| 1/19/2017 | sii*skinflawls 8663763591 FL 17018         | -49 |
| 1/24/2017 | BGTEA855-984-1618 855-9841618 UT 17023     | -49 |
| 3/7/2017  | WWWBITSYMICLLC COM 844-2020515 OR 17063    | -49 |
| 3/21/2017 | GCWB855-600-9771 8556009771 AZ 17077       | -49 |
| 3/21/2017 | FORKONLINEDIETING.COM 8442067737 IA 17079  | -49 |
| 3/21/2017 | GCWD855-600-8116 8556008116 AZ 17079       | -49 |
| 3/21/2017 | HAMPATTEA 8005772152 OR 17079              | -49 |
| 4/21/2017 | FORSKONLINCLEANDIET.CO 8448713198 FL 17110 | -49 |

- Most of the transactions are happening around roughly the same day (19-24) and started in January.
- *4* of them happened on a single day.
- Every fraudulent transaction in 2017 was for the same amount.
- Every fraudulent transaction in 2017 was for a fake dieting, skin care, etc company (Most of these url's don't even work!).

I take full blame for being too lazy to spot this earlier, but Citibank what the fuck is your fraud protection doing?

Anyway, that was a fun experiment. Maybe I change banks after this, but if you're curious how I did it, check out the source code on [Github](https://github.com/deadlybutter/money)! And feel free to follow me on [Twitter](https://twitter.com/itsjoekent).
