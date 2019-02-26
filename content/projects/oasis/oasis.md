---
title: "Oasis"
tags: ["typescript", "oasis", "angular", "javascript", "node"]
date: "2017-04-01"
featuredImage: "./featured.jpg"
liveUrl: "https://www.blakeadams.io/_projects/oasis/"
sourceUrl: "https://github.com/Trepkos01/oasis"
description: "This was a litle pet personal project that I had spinning in my head, born out of my own personal interest in Personal Finance. I wanted to toy with the idea of a calculator of sorts that would allow you to define income streams, buckets,
and other financial entities and you could simulate the timeline of changes and accummulation and make adjustments along the way. Since I hadn't worked with Angular since AngularJS, I used it as an opportunity to learn the new Typescript-based Angular framework."
type: "project"
category: "personal project"
---

This was a litle pet personal project that I had spinning in my head, born out of my own personal interest in Personal Finance. I wanted to toy with the idea of a calculator of sorts that would allow you to define income streams, buckets,
and other financial entities and you could simulate the timeline of changes and accummulation and make adjustments along the way. Since I hadn't worked with Angular since AngularJS, I used it as an opportunity to learn the new Typescript-based Angular framework.

With Oasis, you have two primary entities: streams and buckets. A stream is essentially an income stream which you can constrain to producing the same number by adjusting the upper and lower bound to be the same; otherwise the monthly value produced by a stream will be randomly generated between two provided bounds. 

Buckets are defined in two different manners, their category and their type. The category of the bucket defines at which point the bucket receives the monthly stream amount. Gross buckets receive their contribution percentage first, then tax buckets, then net buckets. The type of bucket can be either spend or save which defines the nature of the bucket. Save buckets can be treated as investment vehicles with expected returns or interest that compounds monthly and spend buckets can start with a debt value and corresponding interest rate that compounds monthly.

Other utilities include the ability to move or transfer bucket amounts and also the ability to adjust buckets amount, possibly to an initial value. You can progress the calculator by one month, one year, or a custom amount of time. You can also preview a history of the bucket's values and statuses after running the simulation for an amount of time.