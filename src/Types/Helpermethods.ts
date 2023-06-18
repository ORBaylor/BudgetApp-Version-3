

interface HelperMethods {

    ReturnHalf(amount: number): number;
    ReturnPercentage(amount: number, dividend: number): number;
    TakeOrAddRent(account: number, option: boolean): number;
    AddSS(amount: number): number;
    CanPayMyself(account: number, amount: number): boolean
    PayCurrentItem(account: number, amount: number): number
    SubtractAmountFromItem(creditCard: number, amount: number): number






}

function ReturnHalf(amount: number): number {

    let halfAmount: number = ((amount / 10) * 2);

    return halfAmount
}

function ReturnPercentage(amount: number, dividend: number): number {

    let returnAmount: number = ((amount / 10) * dividend);

    return returnAmount;
}

function TakeOrAddRent(account: number, option: boolean): number {

    if (option == true) {
        // account = SubtractAmountFromItem(account, 500);
    }
    else {
        account = account + 500;
    }

    return account
}

function AddSS(amount: number): number {

    return (amount + 100);
}


function CanPayMyself(account: number, amount: number): boolean {

    let canPay: boolean = false;

    if (account >= (amount + ReturnPercentage(amount, 1))) {
        canPay = true;
    }
    else {
        canPay = false;
    }

    return canPay;

}


function PayCurrentItem(account: number, amount: number): number {

    account = account - amount;

    return account
}


function SubtractAmountFromItem(creditCard: number, amount: number): number {

    creditCard = creditCard - amount;

    return creditCard;
}








export default HelperMethods
