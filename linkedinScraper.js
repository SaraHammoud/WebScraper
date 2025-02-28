const axios = require('axios');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');
 
linkedinJobs = [];
 
for (let pageNumber = 0; pageNumber < 1000; pageNumber += 25) {
let url = `https://it.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=email%20developer&location=United%20States&geoId=103644278&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0&start=${pageNumber}`;
axios(url)
.then (response => {
const html = response.data;
const $ = cheerio.load(html);
const jobs = $('li')
jobs.each((index, element) => {
const jobTitle = $(element).find('h3.base-search-card__title').text().trim()
const company = $(element).find('h4.base-search-card__subtitle').text().trim()
const location = $(element).find('span.job-search-card__location').text().trim()
const link = $(element).find('a.base-card__full-link').attr('href')
linkedinJobs.push({
    'Title': jobTitle,
    'Company': company,
    'Location': location,
    'Link': link,
})
});
console.log(linkedinJobs)
const csv = new ObjectsToCsv(linkedinJobs)
csv.toDisk('./linkedInJobs.csv', { append: true })
})
.catch(console.error);
}
