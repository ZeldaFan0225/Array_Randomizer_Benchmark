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

I AM NOT RESPONSIBLE FOR ANY FORM OF DAMAGE CAUSED ON YOUR PC BY RUNNING ANY CODE WHICH IS IN THIS REPOSITORY
(e.g. loss of data by a crash of the system, ...)
