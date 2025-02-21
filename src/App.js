import { Console } from "@woowacourse/mission-utils";
import LottoGame from "../src/LottoGame.js";

class App {
  async run() {
    const lottoGame = new LottoGame();

    //구입금액 입력 
    const inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.');
    const moneyNum = inputMoney/1000;
    Console.print(`${moneyNum}개를 구매했습니다.`);
    for (const lotto in lottoGame.creatLotto(moneyNum)) {
      Console.print(lottoGame.creatLotto(moneyNum)[lotto]);
    }

    //당첨번호 입력
    const inputNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
    const userLotto = lottoGame.preprocessUserLotto(inputNumbers);
    Console.print(userLotto);

    const inputBonus = await Console.readLineAsync('보너스 번호를 입력해 주세요.');
  }
}

export default App;
