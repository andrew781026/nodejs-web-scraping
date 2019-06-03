


/*

  弾：
    <select name="card_prod" id="card_prod">
        <option value="">選択</option>
        <option value="62003">BS01</option>
        <option value="62007">BS02【激翔】</option>
        <option value="62008">BS03【覇闘】</option>
        ....
        <option value="62091">聖剣の乙女</option>
        <option value="62123">コラボスターター 光の巨人たち</option>
        <option value="62125">怪獣王プレミアムカードセット</option>
        <option value="62901">プロモーションカード</option>
    </select>

---------------------------------------------------------------------------------

  レアリティ：
    <select name="card_info_13" id="card_info_13">
        <option value="">選択</option>
        <option value="C">C</option>
        <option value="U">U</option>
        <option value="R">R</option>
        <option value="M">M</option>
        <option value="X">X</option>
        <option value="XX">XX</option>
        <option value="10thX">10thX</option>
        <option value="P">P</option>
        <option value="PX">PX</option>
        <option value="EX">EX</option>
        <option value="SJ">SJ</option>
        <option value="KA">KA</option>
        <option value="KF">KF</option>
        <option value="PB">PB</option>
        <option value="CP">CP</option>
        <option value="LM">LM</option>
    </select>

----------------------------------------------------------------------------------

  カード属性：
    <select name="card_info_4" id="card_info_4">
        <option value="">選択</option>
        <option value="赤">赤</option>
        <option value="緑">緑</option>
        <option value="紫">紫</option>
        <option value="白">白</option>
        <option value="黄">黄</option>
        <option value="青">青</option>
    </select>


----------------------------------------------------------------------------------

  カードコスト：
    <select name="card_info_5" id="card_info_5">
        <option value="">選択</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
    </select>

----------------------------------------------------------------------------------

   カードカテゴリ：
    <select name="card_info_3" id="card_info_3" onchange="cardCategory()">
        <option value="">選択</option>
        <option value="スピリット">スピリット</option>
        <option value="ブレイヴ">ブレイヴ</option>
        <option value="ネクサス">ネクサス</option>
        <option value="マジック">マジック</option>
        <option value="アルティメット">アルティメット</option>
    </select>

----------------------------------------------------------------------------------

  系統：
    <select name="card_info_25" id="card_info_25">
        <option value="">選択</option>
        <option value="道化">道化</option>
        <option value="漂精">漂精</option>
        <option value="戦騎">戦騎</option>
        <option value="龍帝">龍帝</option>
        <option value="竜騎">竜騎</option>
        <option value="虚神">虚神</option>
        ...
        <option value="神装">神装</option>
        <option value="創造">創造</option>
        <option value="天渡">天渡</option>
    </select>

 */

// google translate : https://www.npmjs.com/package/@google-cloud/translate

const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt0102926/?ref_=nv_sr_1';

(async () => {

    const response = await request(URL);

    let $ = cheerio.load(response);

    let title = $('div[class="title_wrapper"] > h1').text();
    let rating = $('span[itemprop="ratingValue"]').text();

    console.log(title, rating);
})();