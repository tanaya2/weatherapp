# Rationale - Weather App

### Purpose of Project
Weather apps are often over-complicated and require users to navigate several menus in order to find the information they require. The purpose of this app was to develop a page where all necessary information was present, from current weather, to hourly weather, to daily weather overviews. The aim of this weather app was to showcase a large range of data in an easy to follow way.


### Three Sections

This app is broken up into three main sections: current weather, daily weather and hourly weather.

The first section showcases the current weather in terms of temperature and a visual summary. The inclusion of an icon at the top of the page serves as a visual symbol of the data collected by a ‘current summary’ from the Dark Sky API. Not only does this symbol convey the weather, it is also visually appealing to open the webpage to. Below this is the current temperature. When looking at a weather app, the overall summary and current temperature are two of the main elements users want to see.

![alt text](markdown_sectionone.jpg "Section One")

The first of two tables on this webpage is the daily forecast table. This table retrieves and shows information from the API including icon summary, date, temperature low, temperature high, written summary, wind and rain chance. The design of this table was minimalistic, developed to show information in a clear and accurate manner. By creating a hover, each row on the table can be viewed in its own singular capacity, enhancing the usability of the table to observe daily weather. Originally, the information on this table was shown in black and white, with no css styles or interactivity. As the project progressed, css styles and icons were utilised to bring the table to life and ensure it sat seamlessly within the page. 

One of the biggest issues with the informed displayed within this table and other parts of the app was the default metrics. For example, wind was shown as a decimal instead of a percentage, rendering this element unreadable by a user. By using Math.round and * numbers to create accurate percentages and metrics, these elements were converted to a reader-friendly format. The addition of signs such as percentage (%), kilometers per hour (km/h), and degrees celsius (⁰C) ensured that these elements were read in the correct format.

The final section of this webpage was a second table displaying the hourly data for the next 48 hours in the forecast. This table is long, hence why it was positioned at the bottom of the page so that users were not required to scroll through all the hourly data to get to the daily data. It was considered to have the table collapse and users expand the table to see hourly data after 12 hours. However, this idea was abandoned as it adds another step required by the user that was unnecessary for a single webpage in this order. The hourly table runs through an icon summary, time, temperature, written summary, feels like temperature, wind and rain chance for every hour over the next 48-hour period. CSS formatting of this table is the same as the one in section two and was developed in a similar was in both JS and HTML files as the former table.

### Other Considerations
This webpage utilises the Dark Sky API to retrieve weather results and geocode location services from Open Caged Data. Both functions are coded within the JS document and are used with permission from both the services and the user. By using location services and real-time data, this weather app portrays accurate data suited to the users needs. 

The overall aesthetic of the webpage is minimalistic with an animated gradient background to add a sense of calm. The pink-hued colour scheme was chosen to reflect a sense of grounding, and to differentiate from the majority blue weather apps on the market. Skeleton Frameworks are used to set the page up into a grid format which is then manipulated in order to suit icon sizes. There is also a favicon suited to the content theme of the page to add customization and a professional finish. 