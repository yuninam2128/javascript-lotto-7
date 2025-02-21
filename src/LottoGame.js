import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "../src/Lotto.js";

class LottoGame{
    constructor(){
        this.lottoList = []
    }

    //로또 발행
    creatLotto(num){
        for(let i = 0; i < num; i++){
            let numbers = Random.pickUniqueNumbersInRange(1, 45, 6);
            this.lottoList.push(new Lotto(numbers).getNumbers());
        }
        return this.lottoList
    }
}

export default LottoGame;