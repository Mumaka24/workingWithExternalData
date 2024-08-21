import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "";

/**
 * 1. Create an async function "initialLoad" that does the following:
 as
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.*//

 
async function initialLoad() {
const response = await fetch('https://api.thecatapi.com/v1/breeds');
const breeds = await response.json();
const breedSelect = document.getElementById('breedSelect');
breeds.forEach(breed => {const option = document.createElement('option');
option.value = breed.id;
option.textcontent = breed.name;

breedSelect.appendChild(option);
});

try {
  // Fetch and process breeds
  } catch (error) {
    console.error('Error fetching breeds:', error);
  }
}
// Execute the function immediately
initialLoad();


 /* 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.*//
 */
document.getElementById('breedSelect').addEventListnener('change', handleBreedSelect);

async function handleBreedSelect(event) {
  const breedId = event.target.value;
  const response = awaitfetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=5`);
  const data = await response.json();

  Carousel.innerHTML = ''; // Clear the carousel

  data.forEach(item => {
    const img = document.createElement('img');
    img.src = item.url;
    Carousel.appendChild(img);
  });

  const infoDump = document.getElementsById('infoDump');
      infoDump.innerHTML = '';// Clear the info section
      const breedInfo = data[0].breeds[0];
      const info = document.createElement('div');
      info.innerHTML = '<h2>${breedInfo.name}</h2><p>${breedInfo.description}</p>
      <p>Temperament:${breedInfo.temperament} </p>';
      infoDump.appendChild(info);
} 

initialLoad();
document.getElementById('breedSelect').addEventListner('change',handleBreedSelect);


 //* 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 
 fetch('https://api.thecatapi.com/v1/breeds')
 .then(response => response.json())
 .then(data => console.log(data));
/** 
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
*/

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'YOUR_API_KEY';

async function initialLoad() {
try{
  const response = await axios.get('/breeds');
  const breedSelect = document.getElementById('breedSelect');

  breeds.forEach(breed => {
    const option = document.createdElement('option');
    option. value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
        });
 }catch (error) {
  console.error('Error fetching breeds:', error);
 }
}

initialLoad();
/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios. defaults.baseURL = 'https://api.thecatapi.com/v1';
axios.defaults.headers.common['x-api-key'] = 'YOUR_API_KEY';

//add requeste interceptor
axios.interceptor.request.use(response =>{
  const endTime = new Date();
  const startTime = response.config.metadata.startTime;
  const duration = endTime - startTime;
  console.log('Request completed in:', duration, 'ms');
  return response;
}, error =>{
  return Promise.reject(error);
});
  

/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

axios.interceptor.request.use(config => {
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = '0%';
  //Reset the progress bar
  return config;
}, error =>{
  return Promise.reject(error);
});

function updateProgress(event) {
  console.log(event);//Log the ProgressEvent object to see its structure

  if(event.lengthComputable) {
    const percentComplete = (event.loaded /event.total) * 100;
    const progressBar = document.getElementById('progressBar');

    progressBar.style.width = percentComplete + '%'; // Update the progress bar
  }
}
async function handleBreedSelect(event) { 
  const breedId = event.target.value;
  const response = await axios.get(`/images/search?breed_ids=${breedId}&limit=5`, {
    onDownloadProgress: updateProgress
    });
    const data = response.data;

    const carousel = document.getElementById('carousel');
      carousel.innerHTML = '';// clear the carousel

      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.url;
        carousel.appendChild(img);
     });
     const infoDump = document.getElementById('infoDump');
    infoDump.innerHTML = ''; // Clear the info section

    const breedInfo = data[0].breeds[0];
    const info = document.createElement('div');
    info.innerHTML = `
        <h2>${breedInfo.name}</h2>
        <p>${breedInfo.description}</p>
        <p>Temperament: ${breedInfo.temperament}</p>
    `;
    infoDump.appendChild(info);
}




/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
