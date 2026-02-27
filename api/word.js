export default async function handler(req, res) {
    const apiKey = "670F62E9A43F235869D986B520663B61"; 
    const commonStarts = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호구누두루무부수우주추쿠투푸후기니디리미비시이지치키티피히";
    const q = commonStarts[Math.floor(Math.random() * commonStarts.length)];

    const targetUrl = `https://stdict.korean.go.kr/api/search.do?key=${apiKey}&q=${encodeURIComponent(q)}&advanced=y&method=start&num=50`;

    try {
        // [핵심 해결책] 국립국어원 서버가 봇(Bot)으로 인식해 차단하지 못하도록, 크롬 브라우저인 척 위장합니다.
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/xml, text/xml, */*'
            }
        });

        if (!response.ok) {
            throw new Error(`국립국어원 서버 접근 거부 (상태 코드: ${response.status})`);
        }
        
        const xmlData = await response.text();
        
        // 내 웹앱이 XML 데이터를 정확히 인식하도록 응답 형식 지정
        res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        res.status(200).send(xmlData);

    } catch (error) {
        console.error("Vercel 서버 내부 에러:", error);
        res.status(500).json({ error: error.message });
    }
}
