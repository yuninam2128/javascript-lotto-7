import { Console } from "@woowacourse/mission-utils";
import LottoGame from "../src/LottoGame.js";

class App {
  async run() {
    try {
      const lottoGame = new LottoGame();

      //구입금액 입력 
      const inputMoney = await this.getInputMoney();
      const ticketCount = inputMoney / 1000;

      //구입한 로또 출력 
      Console.print(`${ticketCount}개를 구매했습니다.`);
      const winningLotto = lottoGame.creatLotto(ticketCount);
      for (let lotto in winningLotto) {
        Console.print(`[${winningLotto[lotto].join(", ")}]`);
      }

      //당첨번호 입력
      const userLotto = await this.getUserLotto(lottoGame);

      //보너스번호 입력
      const inputBonus = await this.getBonusNumber(userLotto);

      //결과 출력
      const rank = lottoGame.returnRank(userLotto, winningLotto, inputBonus);
      Console.print("당첨 통계");
      Console.print("---");
      Console.print(`3개 일치 (5,000원) - ${rank.fifth}개`);
      Console.print(`4개 일치 (50,000원) - ${rank.fourth}개`);
      Console.print(`5개 일치 (1,500,000원) - ${rank.third}개`);
      Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${rank.second}개`);
      Console.print(`6개 일치 (2,000,000,000원) - ${rank.first}개`);
      const earningRate = lottoGame.earningRate(inputMoney);
      Console.print(`총 수익률은 ${earningRate}%입니다.`);

    } catch (error) {
      Console.print(error.message);
      return Promise.reject(error);
    }
  }

  // 재귀적으로 구입금액 입력 받기
  async getInputMoney() {
    try {
      const inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.');
      const moneyNum = Number(inputMoney);
      if (isNaN(moneyNum) || inputMoney % 1000 !== 0 || !Number.isInteger(moneyNum)) {
        throw new Error("[ERROR] IllegalArgumentException");
      }
      return inputMoney;
    } catch (error) {
      Console.print(error.message);
      return this.getInputMoney(); // 재귀적으로 다시 호출
    }
  }

  // 재귀적으로 당첨번호 입력 받기
  async getUserLotto(lottoGame) {
    try {
      const inputNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
      const userLotto = lottoGame.preprocessUserLotto(inputNumbers);
      return userLotto;
    } catch (error) {
      Console.print(error.message);
      return this.getUserLotto(lottoGame); // 재귀적으로 다시 호출
    }
  }

  // 재귀적으로 보너스 번호 입력 받기
  async getBonusNumber(userLotto) {
    try {
      const inputBonus = await Console.readLineAsync('보너스 번호를 입력해 주세요.');
      if (userLotto.includes(Number(inputBonus))||isNaN(inputBonus)) {
        throw new Error("[ERROR] 보너스 번호는 입력하지 않은 숫자이어야 합니다.");
      }
      return inputBonus;
    } catch (error) {
      Console.print(error.message);
      return this.getBonusNumber(userLotto); // 재귀적으로 다시 호출
    }
  }
}

export default App;
