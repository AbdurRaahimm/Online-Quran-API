# Online Quran API 
## Introduction
This is a simple API that provides the Quran in json format. The API is written in Node Js using the expressJs framework. The API is hosted on vercel and can be accessed at https://online-quran-api.vercel.app/. The API is free to use and does not require any authentication. The API is currently in beta and is subject to change.


## Endpoints
The API provides the following endpoints:
- /surahs
- /surahs/{name}

### /surahs
This endpoint returns the entire Quran in JSON format. The response is a list of chapters. Each chapter is an array in Object with the following keys:

- number: The Total chapter number

Each surah as List is an array in Object with the following keys:
- number: The surah number
- name: The surah name
- bangla: The surah name in Bangla
- source: the link where I get the data


### /surahs/{name}
This endpoint returns a specific chapter of the Quran in JSON format. The response is an array in Object with the following keys:

- surahName: The surah name with Translation English and Bangla
- verse: Total verse of surah
- audio: audio link to listen full surah
- bismillah: start to read quraan name of Allah

Each surah of verse is an array in Object with the following keys:
- verse: The verse of surah
- arabic: The ayah of verse in Arabic
- bangla: The translation of verse in Bangla
- english: The translation of verse in English


## Base URL
The base URL for the API is https://online-quran-api.vercel.app/

## Examples
- GET /surahs
- GET /surahs/Surah-Al-Baqara


## Installation
To run the API locally, you will need to install NodeJs v18.15.0 or higher. You will also need to install the following packages:
- express
- cheerio
- axios
- cors

## Author 
- Github: [@AbdurRahim](https://github.com/AbdurRaahimm)
- Linkedin: [@AbdurRahim](https://www.linkedin.com/in/abdur-rahim4g/)
- Twitter: [@AbdurRahim](https://twitter.com/AbdurRahim4G)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests

