
const express = require('express')
const router = express.Router();

const Faq = require('../model/faqdb');
const Redis = require('redis');
const redisClient = Redis.createClient()
redisClient.on('connect', () => console.log(' Connected to Redis'));
redisClient.on('Error', () => console.log(' Errored to Redis'));
(async () => {
    try {
      await redisClient.connect(); 
      console.log("Redis Client Connected Successfully");
    } catch (error) {
      console.error(" Redis Connection Failed:", error);
    }
  })();
const DEFAULT_EXPIRATION = 3600;
router.get('/faq',async (req,res)=>{
    try{
        const faqs = await Faq.find({},{ translation:0 });
        res.status(200).json({faqs});

    }
    catch(e)
    {
        console.error(e);
        res.status(500).json({msg:"error finding faqs"});
    }
})



router.get('/faq/:lang', async (req, res) => {
    try {
        const faqs = await Faq.find({});
        const language = req.params.lang;
        redisClient.get(language , (e,lang)=>{
            if(e)
            {
                console.error(e);
            }
            if(lang != null)
            {
                return res.status(200).json(JSON.parse(lang));
            }
        })
        console.log(language);
        const translatedFaqs = await Promise.all(
            faqs.map(async (faq) => {
                const translation = await faq.getTranslation(language);
                return {
                    id: faq.id,
                    question: translation.question,
                    answer: translation.answer,
                };
            })
        );

        redisClient.setEx(language,DEFAULT_EXPIRATION , JSON.stringify(translatedFaqs));

        res.status(200).json({ faqs: translatedFaqs });
    } catch (e) {
        console.error(e);
        res.status(400).json({ msg: "Error in translating" });
    }
});


module.exports = router;