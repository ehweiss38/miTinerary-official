# miTinerary-official

Welcome to miTinerary!

This is an algorithmic-travel planning app, inspired by me trying to plan a family-vacation to Europe. I had a decent idea of a few destinations I wanted
to visit, but was overwhelmed by the number of countries and cities we could stop at.

The idea of this app, is that by providing two endpoints, a trip (or itinerary) will be generated between them. Users are able to specify however many stops they
would like to make, or if there are any specific cities they would like to visit. miTinerary generates the trip, presents it on a map with up-to-the-minute routes
and travel times, and allows users the ability to save it. Users can also browse hotels, restaurants, and attractions at each stop and plot them as custom pins.

To optimize space and run-times, the core algorithm is greedy in nature. After sorting the cities with a calculated radius by size, it chooses the best stop
based on a combination of population size, distance from current location, and distance to the next planned stop (detour). While initially it priviledges high populations
and low detours, if necessary, the app will automatically adjust to find the best city, even if it does not meet the initial validation criteria. In general,
this algorithm strives for balanced trip-legs, aiming for all of the stops to be as equidistant as possible

I also recently launched a beta-test of a new feature enabling an alternate generation method, privileging large cities above equidistant ones. While miTinerary
is based on the idea of travelling off of the beaten path, this featue allows users to generate more traditional route.

I have a lot of plans for miTinerary, and hope to add consideration for geographic features soon, both to better calculate routes and allow users more specification
over their trips. I also aim to add support for rail-based travel.

If you would like to give miTineray a try, head to https://mitinerary.netlify.app/ ! Use it to plan a trip, look for new restaurants, or just explore!

Note: Improved REST API branch should be live very shortly. Improves volume of traffic app can accomodate, as well as detailed comments. Give it a look!
