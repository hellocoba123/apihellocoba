const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
const dateFormat = require('dateformat');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/', (req, res) => {
    res.send(`Listening on ${ PORT }`);
})

app.get('/api/hello',cors(), async (req, res) => {
        
    var day=dateFormat(new Date(), "dd-mm-yyyy");
    var body = await getBody('http://ketqua.net/xo-so-truyen-thong.php?ngay='+day);
    let $ = cheerio.load(body);
            
    let kq=[];
    $('div[id=result_mb] div[class=color333] tbody td[colspan]').each(function(index, element){
        kq.push($(element).text());
    });

    let listCapSo = ListCapSo(kq);
    var capso = [];
    for (var item in listCapSo) {
        var temp = HelloCoBa(listCapSo[item]);
        if (temp)
            capso.push(temp);
    }    

    res.send(capso);
})

async function getBody(url) {
    const options = {
      url: url,
      method: 'GET',
    };
  
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.get(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
}

function ListCapSo(array){
    let listCapso = [];

    let i = 0;
    while (i < 21)
    {
        let ii = i + 1;
        let iii = ii + 1;

        let a=[]
        a.push(array[i]);
        a.push(array[ii]);
        a.push(array[iii]);
        listCapso.push(a);

        i++;
    }            
    return listCapso;
}

function HelloCoBa(capso){
    if (capso.length == 3)
    {
        let n1 = capso[0];
        let n2 = capso[1];
        let n3 = capso[2];
        let b, a, c;

        b = n1.substring(2, 1);
        a = n2.substring(2, 1);
        c = n3.substring(2, 1);
        let d = n2.substring(3, 1);
        if ((b == c) && (c == d))
        {
            return a + b + "'";
        }
        if ((b == c))
        {
            return a + b + "";
        }
    }
    return '';
}