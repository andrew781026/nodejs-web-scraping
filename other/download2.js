const download = require('download');
const request = require('request-promise');
const cheerio = require('cheerio');

// 取得所有 <a> 中的超連結 url
const getFileUrls = async (url) => {

    const response = await request(url);
    console.log('response back !!! ');

    const $ = cheerio.load(response);
    console.log('start loading...');

    let subFolders = [];

    $('a').each((i, element) => {

        let href = $(element).attr('href');

        if (href === '/') console.log('here has parent directory');
        else if (href.endsWith('/')) subFolders.push(href);
        else if (!href.startsWith('?C')) console.log(href);
    });
};

const root = 'https://awiclass.monoame.com/pianosound/';

// 也許可以製作一個跟 eagleget 相似的軟體
getFileUrls(root);

// https://awiclass.monoame.com/pianosound/

// https://awiclass.monoame.com/pianosound/set/

/*
(async () => {
    // await download('http://unicorn.com/foo.jpg', 'dist');

    // fs.writeFileSync('dist/foo.jpg', await download('http://unicorn.com/foo.jpg'));

    // download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

    await Promise.all([
        'https://awiclass.monoame.com/pianosound/piano001.wav',
        'https://awiclass.monoame.com/pianosound/piano002.wav',
    ].map(url => download(url, 'aa')));

})();
*/
