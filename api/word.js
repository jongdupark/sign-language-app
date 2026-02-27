// api/word.js (받침 글자 300개 이상 버전)
export default async function handler(req, res) {
    const apiKey = "670F62E9A43F235869D986B520663B61"; 
    
    // [업그레이드] 받침이 있는 다양한 글자들을 포함한 300개 이상의 시작 글자 리스트
    const batchimStarts = 
        "각간갈감갑강객격결겸경곡곤골곰공곶관광교국군굴궁권귀귤그극근글금급긍기긴길김깃" +
        "낙낚난날남납낭낯낱내냉녀녁년념녕노녹논놀놈농높뇌능늦니님닉" +
        "닦단달담답당대댁덕던덜덤덩덮도독돈돌돔동돼된두둑둘둠둥뒤뒷드득든듣들듬등디딜" +
        "락란람랑래랭략량려력련렬렴령로록론롱료룡루류륙륜률륭르른름릉리린림립" +
        "막만말맑망맞매맹머먹먼멀멈멋멍며면멸명몇모목몬몰몸못몽무묵문물뭉밑민밀" +
        "박밖반받발밝밤밥방배백뱀뱅번벌범법벽변별병보복본봄봉부북분불붓붕붙비빈빌빔빙빛" +
        "삭산살삶삼상새색샘생섯석선설섬섭성세셔소속손솔솜송솥수숙순술숨숭숲쉬스슬습승시식신실심십" +
        "악안알암압앙애액야약양어언얼엄업에여역연열염영예오옥온올옴옹와완왕외요욕용우욱운울움웅위유육윤율은을음응의이익인일임입" +
        "작잔잠잡장재쟁저적전절점접정제조족종좌죄주죽준줄중즉즐증지직진질집짓" +
        "착찬찰참창채책처척천철첨첩청체초촉총최추축춘출충측층치칙친칠침칭" +
        "카칸칼캄캅캉캐캔캠캡캉커컨컬컴컵컹코콘콜콤콤콩쿠쿤쿨쿰굽쿵크큰클큼클키킨킬킴킵킹" +
        "탁탄탈탐탑탕태택탱터턱턴털텅토톡톤톨톰톱통퇴투툭툼퉁튀트특튼틈티틱팀팁팅" +
        "팍판팔팜팝팡패팩팬팽퍼퍽펀펄펌펑포폭폰폴폼퐁표푹푼풀품풍피픽핀필핍" +
        "학한할함합항해핵핸행향허헌헐험혁현혈협형혜호혹혼홀홈홍화확환활황회획효후훈훌훔훨휘휴흉히" +
        "꽃꿀꿈끝낟낮낱너넣네넷넥노트눈뉘늄늘능늪뉘님다닫달닭닮담답닷당대댁더덕던덜덤덧덩덮데도독돈돋돌돔돕돗동돝되된될됨두둑둘둠둡둥뒤뒷드득든듣들듬듭등디딕딘딜딤딥딧딩";

    const q = batchimStarts[Math.floor(Math.random() * batchimStarts.length)];

    // 검색 범위를 넓히기 위해 결과 개수를 늘립니다.
    const targetUrl = `https://stdict.korean.go.kr/api/search.do?key=${apiKey}&q=${encodeURIComponent(q)}&advanced=y&method=start&num=100`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/xml, text/xml, */*'
            }
        });

        if (!response.ok) throw new Error(`API 서버 응답 오류`);
        
        const xmlData = await response.text();
        res.setHeader('Content-Type', 'text/xml; charset=utf-8');
        res.status(200).send(xmlData);

    } catch (error) {
        console.error("Vercel Server Error:", error);
        res.status(500).json({ error: error.message });
    }
}
