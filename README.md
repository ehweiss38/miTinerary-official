# miTinerary-official
*****
NOTE 2 Years Later:

Looking back on this project two years later, I realize how much is wrong with it, and how far I have come as dev since. There are a lot of issues here, especially with scale, application state, cost-management, test coverage, organization etc. However, at the same time, there are some solid ideas that still have further potential.

I have started to redevelop this project, massively overhauling the codebase in an effort to give miTinerary the platform it deserves. When it is done, I will make the new repo public. My main goal is to improve scalability, as well as more efficiently manage the costs associated witth running the application. I think this should be a great learning experience, especially in that it will give me opportunity to reflect on my growth and maturation as a developer. 

I am leaving this repo as is, since I feel it represents a foundational stage in my journey, even if it has some missteps. 

Stay tuned!

*****

Welcome to miTinerary!

This is an algorithmic-travel planning app, inspired by my trying to plan a family-vacation to Europe. I had a decent idea of a few destinations I wanted
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
