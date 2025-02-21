import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "../src/Lotto.js";

class LottoGame{
    constructor(){
        this.winningLottos = []
        this.counts = {first : 0, second : 0, third: 0, fourth: 0, fifth: 0};
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
        userNumbers = userNumbers.split(",").map(num => num.trim()).map(num => Number(num));
        const userLotto = new Lotto(userNumbers);
        return userLotto.getNumbers().sort((a,b) => a - b);
    }

    // 일치하는 숫자 개수 계산
    calculateMatchingCount(userLotto, winningLotto) {
        return userLotto.filter(num => winningLotto.includes(num)).length;
    }

    // 등수 판별
    getRank(matchingCount, bonusMatch) {
        switch (matchingCount) {
            case 6: return 'first';
            case 5: return bonusMatch ? 'third' : 'second';
            case 4: return 'fourth';
            case 3: return 'fifth';
            default: return null;
        }
    }

    // 등수 반환 
    returnRank(userLotto, winningLottos, bonusNumber){
        let matchingCount = 0;
        let bonusMatch = userLotto.includes(bonusNumber);

        for (let i = 0; i < winningLottos.length; i++) {
            // 일치하는 번호 개수 계산
            matchingCount = this.calculateMatchingCount(userLotto, winningLottos[i]);
            
            // 등수 판별
            let rank = this.getRank(matchingCount, bonusMatch);
            if (rank) {
                this.counts[rank] += 1;
            }
        }

        return this.counts;
    }

    //수익률 계산  (벌어들인 금액/구매 금액)
    earningRate(money){
        const earnings = (this.counts.fifth * 5000) + 
        (this.counts.fourth * 50000) + 
        (this.counts.second * 1500000) + 
        (this.counts.third * 30000000) + 
        (this.counts.first * 2000000000);
        
        const earningsRate = (earnings / money) * 100 ;
        const roundedearningsRate = parseFloat(earningsRate.toFixed(1));
        return roundedearningsRate;
    }
}

export default LottoGame;