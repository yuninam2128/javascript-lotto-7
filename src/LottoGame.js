import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "../src/Lotto.js";

class LottoGame{
    constructor(){
        this.winningLottos = []
    }

    //로또 발행
    creatLotto(num){
        for(let i = 0; i < num; i++){
            let numbers = Random.pickUniqueNumbersInRange(1, 45, 6); //중복되지 않는 숫자 6개 
            this.winningLottos.push(new Lotto(numbers).getNumbers());
        }
        this.winningLottos.sort((a,b) => a - b);
        return this.winningLottos
    }
    
    // userLotto 전처리 
    preprocessUserLotto(userNumbers) {
        return userNumbers.split(",").map(num => num.trim()).map(num => Number(num));
    }

    //로또 당첨조건 검사
    checkLottoWinning(userLotto, winningLottos, bonusNumber) {
        
        // 일치하는 번호 개수 구하기 

        // 보너스 번호와 일치 여부 확인 
    }
}

export default LottoGame;