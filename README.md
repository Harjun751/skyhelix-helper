# TODOS
## Features
### Excel Sheet Generation
- overwriting?
    - How to set name in sheet at start of day? Clock in/out? HTML form?
### Rides
- Suspending rides
- Early termination
- Editing of the ride?
- Manual generation?

### Setting page
- theme
- default options

## Styles/UX
- check if touch-action:none fixed pull to refresh issues
- remove ugly blue highlight when pressing +/- on seating (check if -webkit-tap-highlight-color: transparent; removed it)

## Algo tweaks
- Huge performance hit with many groups of small n (1-2)
    - significantly improved by sorting by highest score, but still an issue with (albeit unreasonable) high number of groups of n=1

## migrate to indexed db??
- think if this is even required

# SkyHelix Helper
A webapp to help smooth day-to-day operations at my part-time workplace. Get all the gnarly details in [my blog post!](https://harjun751.github.io/blog/2024/05/06/Optimizing-my-job-with-algorithms.html)

(insert a gif/video here)