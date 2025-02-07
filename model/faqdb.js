

const mongoose = require('mongoose')
const axios = require('axios')

const faqSchema = new mongoose.Schema({
    question : {type : String , required : true},
    answer : {type : String , required : true},
    translation :{type : Map ,
        of : new mongoose.Schema({
            question : {type : String},
            answer : {type : String},
        },{_id : false})

    },
    createdAt : {type : Date , default: Date.now}
})


faqSchema.methods.getTranslation = async function(language)
{
    if(this.translation.has(language))
    {
        return {
            question : this.translation.get(language).question ,
            answer : this.translation.get(language).answer ,
        };
    }
    else{
        const gq = await Googletranslation(language,this.question);
        const ga = await Googletranslation(language,this.answer);
        // console.log(ga);
        // console.log(gq);
         this.translation.set(language,{question : gq , answer : ga});
        await this.save();
        return {
            question : gq ,
            answer :ga
        };
    }
}


module.exports = mongoose.model('FAQ',faqSchema);

async function Googletranslation(targetLang, text) {
    try {
        const res = await axios.get("https://api.mymemory.translated.net/get", {
            params: { q: text, langpair: `en|${targetLang}` }
        });

        console.log(res.data.responseData.translatedText);
        return res.data.responseData.translatedText;
    } catch (e) {
        console.error("Translation Error:", e.response?.data || e.message);
        return null;
    }
}

