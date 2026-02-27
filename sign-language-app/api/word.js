// api/word.js
export default async function handler(req, res) {
    const apiKey = "670F62E9A43F235869D986B520663B61"; 
    const commonStarts = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후기니디리미비시이지치키티피히";
    const q = commonStarts[Math.floor(Math.random() * commonStarts.length)];

    const targetUrl = `https://stdict.korean.go.kr/api/search.do?key=${apiKey}&q=${encodeURIComponent(q)}&advanced=y&method=start&num=50`;

    try {
        // 내 서버가 국립국어원으로 직접 요청을 보냅니다. (CORS 문제 없음)
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error("국립국어원 응답 오류");
        
        const xmlData = await response.text();
        
        // 가져온 데이터를 내 웹앱(HTML)으로 성공적으로 전달(200)합니다.
        res.status(200).send(xmlData);
    } catch (error) {
        // 에러가 나면 500 에러를 반환합니다.
        res.status(500).json({ error: error.message });
    }
}