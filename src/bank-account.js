function Account(name) {
  this.holder = name;
  this.balance = 0;
  this.transactions = [];
}

Account.prototype.deposit = function deposit(depositAmount) {
  if(depositAmount < 0) { throw new Error('Must deposit a positive amount'); }
  this.balance += depositAmount;
  this.transactions.push(depositAmount);
}

Account.prototype.withdraw = function withdraw(withdrawAmount) {
  if(withdrawAmount < 0) { throw new Error('Must withdraw a positive amount'); }
  if(this.balance - withdrawAmount < 0) { throw new Error('Insufficient funds to make this withdrawal'); }
  this.balance -= withdrawAmount; 
  this.transactions.push(-withdrawAmount); 
}

Account.prototype.checkBalance = function checkBalance() {
  return `Your balance is ${this.balance}`;
}

Account.prototype.viewStatement = function viewStatement() {
  return this.transactions.join(', ');
}

Account.prototype.viewDeposits = function viewDeposits() {
  const deposits = this.transactions.filter((transaction) => transaction > 0).join(', ');
  return `Deposits: ${deposits}`;
}

Account.prototype.viewWithdrawals = function viewWithdrawals() {
  const withdrawals = this.transactions.filter((transaction) => transaction < 0).join(', ');
  return `Withdrawals: ${withdrawals}`;
}

module.exports = Account;
