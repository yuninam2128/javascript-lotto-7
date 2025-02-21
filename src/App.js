import { Console } from "@woowacourse/mission-utils";
import LottoGame from "../src/LottoGame.js";

class App {
  async run() {
    const lottoGame = new LottoGame();

    //구입금액 입력 
    const inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.');
    const moneyNum = inputMoney/1000;
    Console.print(`${moneyNum}개를 구매했습니다.`);
    const winningLotto = lottoGame.creatLotto(moneyNum)
    for (const lotto in winningLotto) {
      Console.print(winningLotto[lotto]);
    }

    //당첨번호 입력
    const inputNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
    const userLotto = lottoGame.preprocessUserLotto(inputNumbers);
    Console.print(userLotto);

    //보너스번호 입력
    const inputBonus = await Console.readLineAsync('보너스 번호를 입력해 주세요.');

    //결과 출력
    const rank = lottoGame.returnRank(userLotto,winningLotto,inputBonus);
    Console.print(`당첨 통계`);
    Console.print(`---`);
    Console.print(`3개 일치 (5,000원) - ${rank.fifth}개`);
    Console.print(`4개 일치 (50,000원) - ${rank.fourth}개`);
    Console.print(`5개 일치 (1,500,000원) - ${rank.second + rank.third}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rank.third}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${rank.first}개`);
    const earningRate = lottoGame.earningRate(inputMoney);
    Console.print(`총 수익률은 ${earningRate}%입니다.`);
  }
}

export default App;
