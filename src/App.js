import { Console } from "@woowacourse/mission-utils";

class App {
  async run() {
    //구입금액 입력 
    const inputMoney = await Console.readLineAsync('구입금액을 입력해 주세요.');
    const inputNumbers = await Console.readLineAsync('당첨 번호를 입력해 주세요.');
    const inputBonus = await Console.readLineAsync('보너스 번호를 입력해 주세요.');

    //출력 
    Console.print(inputMoney);
    Console.print(inputNumbers);
    Console.print(inputBonus);

  }
}

export default App;
