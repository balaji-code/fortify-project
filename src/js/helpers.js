import {async} from 'regenerator-runtime';
import {TIMEOUT_SEC} from './config.js';

 

const timeout = function (TIMEOUT_SEC) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${TIMEOUT_SEC} second`));
      }, TIMEOUT_SEC * 1000);
    });
  };

export const getJSON = async function(url){
    try{
    const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if(!res.ok) throw new Error(`${data.message}(${res.status})`);
    return data;
    }catch(err){
      throw err;
    }

}