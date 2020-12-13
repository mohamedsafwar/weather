/* Global Variables */

const temoDiv = document.getElementById("temp");

const contentDiv = document.getElementById("content");


let baseurl = 'http://api.openweathermap.org/data/2.5/weather?zip'
let appkey = '78dbaed6bbc45c7b15ec02e023027301';



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById("generate").addEventListener('click' , perform);


function perform(){
const zip = document.getElementById("zip").value;

const content = document.getElementById("feelings").value;

     getData(baseurl , zip , appkey)

     .then(function(userData){
       postData("/add", {
         date : newDate ,
         temp : userData.main.temp ,
         content : content
       });
     })

     .then(function(){
       updateUI();
     });

    }

    //const zipCode = document.getElementById("zip").value;


    const getData = async () => {
      const request = await fetch(
        baseurl + `?zip = ${zip.value}&appid=${appkey}&units=metric`
      );

      try {
        const response = await request.json();
        console.log(response);
        return response;
        
      } catch (error) {
        console.log(error);
        
      }
    };

    const postData = async (url = '', data = {}) => {
      const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: data.date,
          temp: data.temp,
          content: data.content
        })
      })
    
      try {
        return;
      }
      catch(error) {
        console.log("error", error);
        // appropriately handle the error
      }
    };





    const updateUI = async () => {
      const request = await fetch('/all');
      try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData[0].newDate;
        document.getElementById('temp').innerHTML = allData[0].temoDiv;
        document.getElementById('content').innerHTML = allData[0].contentDiv;
    
      }catch(error){
        console.log("error", error);
      }
    }
































