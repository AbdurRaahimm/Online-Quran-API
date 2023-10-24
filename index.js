const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const data ={
    welcome:"Welcome to Quran API",
    message: "Type as parameter {surahs} in url to see Surah List",
    name: "Online Quran API",
    version: "1.0.0",
    author: "@AbdurRahim",
    github: "https://github.com/AbdurRaahimm",
    facebook: "https://www.facebook.com/AbdurRahim1996",
    description: "API for Quran with meanning English and Bangla and audio telwath",
  }
  res.json(data);
  }
);

app.get('/surahlist', async(req, res) => {
    try {
        const response = await axios.get('https://quran.com');
        const $ = cheerio.load(response.data);
        const surahList = [];
    
        // Extract surah list from the webpage
        $('.ChapterAndJuzList_chapterContainer__uVZ3E').each((index, element) => {
          const id = index+1;  
          const name = $(element).find('.SurahPreviewRow_surahName__jrca5').text().trim();
          const arabicName = $(element).find('.ChapterIconContainer_iconContainer__5umYV span').text().trim();
          const englishName = $(element).find('.SurahPreviewRow_translatedSurahName__SHzIe').text().trim();
          const verse = $(element).find('.SurahPreviewRow_description__78w9M').text().trim();
    
          surahList.push({
            id,
            name,
            arabicName,
            englishName,
            verse
          });
        });
    
        res.json(surahList);
      } catch (error) {
        res.status(500).json({ error: 'Unable to fetch surah list' });
      }
});

app.get('/surahs', async(req, res) =>{
    try {
        const response = await axios.get('https://www.quraanshareef.org/');
        const $ = cheerio.load(response.data);
        const surahList = [];
        const data = {};
    
        // Extract surah list from the webpage
        $('.snamecell').each((index, element) => {
            const number = index+1;  
            const name = `Surah-`+$(element).find('.snameE').text().trim().replace(/^\d+\.\s*/, '');
            // let urls = $("a", element).attr("href");
            const source = $(element).find('a').attr('href');
            const bangla = $(element).find('.snameB a').text().trim();
    
          surahList.push({
            number,
            name,
            bangla,
            source
          });
        });
        data.message = 'see details of Surah.. Type as parameter {name} value';
        data.number = surahList.length;
        data.surahList = surahList;
    
        res.json(data);
        
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch surah list' });
    }
})

app.get('/surahs/:surahName', async(req, res) => {
    try {
        const response = await axios.get(`https://www.quraanshareef.org/${req.params.surahName}`);
        const $ = cheerio.load(response.data);
        // console.log(response.data)
        const surah = [];
        const data = {};
    
        // Extract surah list from the webpage
        const head = $(".sheader").text().trim();
        const bismillah = $(".subheaderA").text().trim();
        $('.ayah').each((index, element) => {
          const verse = index +1
          const arabic = $(element).find('.ayahA').text().trim();
          const bangla = $(element).find('.ayahB').text().trim();
          const english = $(element).find('.ayahE').text().trim();
          const audioSrc = $("audio source").attr("src");

            surah.push({
                verse,
                arabic,
                bangla,
                english,
            });
            data.surahName = head
            data.verse = surah.length
            data.audio = audioSrc
            data.bismillah = bismillah
            data.surah = surah
        });
        res.json(data);

    }catch (error) {
        res.status(500).json({ error: 'Unable to fetch surah details' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));


