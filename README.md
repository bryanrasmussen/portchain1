# portchain project

## Requirements

Requirements for viewing in browser - I have not taken the time to put in polyfills etc. 
So this requires a browser that supports 

fetch

furthermore to see it running you need to have port 9001 available as it will use 9001. 

## To Run

to run do 

  npm install

and then 

  npm run start

and then go to localhost:9001

## Assumptions Made

When it says The 5 ports with the most arrivals, and the corresponding number of total port calls for each port. I suppose the most arrivals corresponds to the most portCalls. This is also implied by the next part discussing least portcalls. 

## Things Done
I actually spent more than the suggested time on this due to a couple bugs I had to fix, and I started playing with an idea I have for how to better use hsl colors with css functions and variables - this was not needed for the development but I went with it anyway - although the results are not that impressive right now as I have not yet worked out everything I want to do with the approach.

The Dashboard page has the 5 ports with most arrivals, 5 with least. 
As well as the percentiles of each port call durations. 

I also made an extra Ports and Vessels page with tables displaying what ports and vessels there are. I did not do the percentiles for Vessels basically as I felt I have spent enough time to show some reasonable range of abilities. 

## Issues
There has been more data put into the state of the DataContext than in the end turned out to be necessary. I have not taken the time to remove it. Although I suppose in a real application I would also find ways to use that data so not a big thing. 

Furthermore I have not tested as much as one normally would the correctness of results. My percentile results look correct, great, but I have not done any tests with data where I know what the percentiles should be - so hopefully it is correct. 
