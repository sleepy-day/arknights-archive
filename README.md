# Arknights Archive

Live version hosted at https://ak.sleepy.day, it's being hosted on an Ubuntu VPS using Nginx to serve the static files (some images may be missing as there were some I didn't rip yet, some content may not be the latest available as well)

Json files used are from https://github.com/Kengxxiao/ArknightsGameData

A site for the mobile game Arknights made in Angular/Typescript, so far it has functionality implemented for the character information pages though it requires more polish. All the information is pulled from the games extracted .json files with no modifications.

Additional features and optimization are planned as well, a showcase of some of the functionality is shown below.

![image](https://user-images.githubusercontent.com/115065839/204116373-8e629cda-f2ee-42c5-81ac-7f2830d15147.png)

* Display character art with a toggle for alternate artworks

![brave_9mgThdH3tR](https://user-images.githubusercontent.com/115065839/204116516-bb86f1e1-e813-4b29-8f6c-cdc25aa29a1e.gif)

* Display character info with appropriate toggles to display additional info

![brave_NtwTpmUnAb](https://user-images.githubusercontent.com/115065839/204116592-874af088-2ff3-4d9b-9daf-c028aabc60ad.gif)

* Parse game text to make it more HTML appropriate, toggles to show additional information including the direct values used for descriptions. Tooltips are also added to match the in game tooltips.

![brave_gc3Z8Sb3UU](https://user-images.githubusercontent.com/115065839/204116611-58ddf93c-12e4-4bb6-b467-746e063d4860.gif)

* Character stats displayed using a min/max value and an interpolation library to determine values for each level

![brave_g3Ao0cpDpz](https://user-images.githubusercontent.com/115065839/204116731-b697824f-8f0e-4a1e-b212-44b9d77ef5f7.gif)

