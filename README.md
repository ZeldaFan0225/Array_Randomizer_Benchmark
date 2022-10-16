# Array_Randomizer_Benchmark

## Background for this repos existance:

I recently created a giveaway bot which I needed to pick the first user of a randomized array from.
I googled and the first result was `const random = array.sort(() => Math.random() - 0.5)`
so I used that for randomizing.

Then somebody pointed out that it isn't truly random and suggested I should use the Fisher Yates shuffle,
though I said mine was enough.
I couldn't stop thinking about it so I built myself some kind of benchmarking with result analyzing.

## What this repo does:

The code takes 2 or more functions that return a randomly shuffled array,
runs it for the set amount of iterations with the given arrays on the given probing array.

The results are then temporarily saved in an array.
The object in the array have the randomized array joined as the key and the amount of this exact pattern occuring as the value.

The code then analyzes the results.
It calculates the standard deviation for each functions result, shows how many unique patterns occured (population size) and shows the top 10 patterns.
It also shows a list of the functions sorted by their standard deviation ascending (first is best)

## What you need to watch out for when running the code on your PC:

- the values in the testing array (called probe) need to be unique
(i.e. can not be created from combining the other values in the array in any way, e.g. it can't include "0", "1" and "10" because "10" can be created by putting "1" and "0" after each other)
- don't set the iterations to a too high number, for me it stopped at 8 million iterations and didn't continue

## [Standard deviation](https://en.wikipedia.org/wiki/Standard_deviation)

I calculate the standard deviation the following way:

For each result I take:
- The total amount of unique combinations (the keys of the result object)
- The average which is calculated by reducing the values of the result object to one number and dividing it by the total amount mentioned above
- The Sum of all values (the values are the total amounts a unique pattern appeared) minus the average (reducing a map of values minus the average) (the average is subtracted from each value, not from the sum of all values)

The standard deviation is then calculated with the formula:

`standard_deviation = Math.sqrt(((sum_of_values_minus_average) ** 2)/N)`

## My results:

- I found that the Fisher Yates shuffle has a lower deviation on average than the Math.random way

```
Iterations: 1000000
Test Data length: 10
Amount of functions tested: 2
Functions ranked by deviation:
shuffle1 - 2.694957702569828e-10
shuffle2 - 4.2833342862073473e-10

Function: shuffle1
Standard Deviation: 2.694957702569828e-10
Population Size: 874248
Top random results:
1029784653 - 5
1095864327 - 5
1279840563 - 5
1387925604 - 5
1524876309 - 5
1629875043 - 5
1694273580 - 5
1902863547 - 5
1956720483 - 5
1967238540 - 5


Function: shuffle2
Standard Deviation: 4.2833342862073473e-10
Population Size: 872296
Top random results:
4209751386 - 6
8520947136 - 6
1267439085 - 5
1453679802 - 5
1847963520 - 5
1972805463 - 5
3047862159 - 5
3157924860 - 5
3405976281 - 5
3714296580 - 5
```

This is one example run in which the Fisher Yates has a better standard deviation.

```
Iterations: 1000000
Test Data length: 10
Amount of functions tested: 2
Functions ranked by deviation:
shuffle2 - 2.2385393002921526e-10
shuffle1 - 2.933860427378827e-10

Function: shuffle1
Standard Deviation: 2.933860427378827e-10
Population Size: 874713
Top random results:
1023459678 - 5
1386075942 - 5
1502869473 - 5
1807364295 - 5
1850673429 - 5
2013569478 - 5
2019547683 - 5
2376508914 - 5
2465098731 - 5
2489501736 - 5


Function: shuffle2
Standard Deviation: 2.2385393002921526e-10
Population Size: 872186
Top random results:
0897264531 - 7
3495618720 - 6
1097382546 - 5
1238406975 - 5
1675304829 - 5
1967508423 - 5
2780396154 - 5
3421768059 - 5
3490157268 - 5
3607528491 - 5
```
This is one rare example result of running and the Math.random way being better

I AM NOT RESPONSIBLE FOR ANY FORM OF DAMAGE CAUSED ON YOUR PC BY RUNNING ANY CODE WHICH IS IN THIS REPOSITORY
(e.g. loss of data by a crash of the system, ...)
