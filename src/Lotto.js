import { Random } from "@woowacourse/mission-utils";

//로또 번호 저장, 검증, 반환 
class Lotto {
  #numbers; //받은 로또 번호리스트

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  getNumbers(){
    return this.#numbers
  }
}

export default Lotto;
