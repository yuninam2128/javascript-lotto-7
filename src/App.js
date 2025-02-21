import { Console } from "@woowacourse/mission-utils";
import LottoGame from "../src/LottoGame.js";

class App {
  async run() {
    try {
      const lottoGame = new LottoGame();

      //구입금액 입력 
      const inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.');
      if (isNaN(inputMoney) || inputMoney % 1000 !== 0) {
        throw new Error("[ERROR] IllegalArgumentException")
      }
      const moneyNum = inputMoney/1000;

      //구입한 로또 출력 
      Console.print(`${moneyNum}개를 구매했습니다.`);
      const winningLotto = lottoGame.creatLotto(moneyNum)
      for (let lotto in winningLotto){
        Console.print(`[${winningLotto[lotto].join(", ")}]`);
      }
  
      //당첨번호 입력
      const inputNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
      const userLotto = lottoGame.preprocessUserLotto(inputNumbers);
      Console.print(userLotto);
  
      //보너스번호 입력
      const inputBonus = await Console.readLineAsync('보너스 번호를 입력해 주세요.');
      if (userLotto.includes(Number(inputBonus))){
        throw new Error("[Error] 보너스 번호는 입력하지 않은 값이어야 합니다.");
      }
  
      //결과 출력
      const rank = lottoGame.returnRank(userLotto,winningLotto,inputBonus);
      Console.print(`당첨 통계`);
      Console.print(`---`);
      Console.print(`3개 일치 (5,000원) - ${rank.fifth}개`);
      Console.print(`4개 일치 (50,000원) - ${rank.fourth}개`);
      Console.print(`5개 일치 (1,500,000원) - ${rank.third}개`);
      Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rank.second}개`);
      Console.print(`6개 일치 (2,000,000,000원) - ${rank.first}개`);
      const earningRate = lottoGame.earningRate(inputMoney);
      Console.print(`총 수익률은 ${earningRate}%입니다.`);

    } catch (error){
      Console.print(error.message);
      return Promise.reject(error);
    }
  }
}

export default App;
