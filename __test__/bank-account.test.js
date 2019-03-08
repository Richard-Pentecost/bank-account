const Account = require('../src/bank-account');

describe('Account', () => {
  let account = new Account('Richard');

  it('returns an object when instantiated', () => {
    expect(account).toBeInstanceOf(Object);
  });

  it('account has a name', () => {
    expect(account.holder).toEqual('Richard');
  });

  it('account has a balance of 0', () => {
    expect(account.balance).toEqual(0);
  });

  it('account has an empty transactions arrays', () => {
    expect(account.transactions).toEqual([]);
  });
});

describe('Deposit', () => {
  let account; 

  beforeEach(() => {
    account = new Account('Richard');
    account.deposit(100);
  });

  it('increases the balance by the deposit amount', () => {
    expect(account.balance).toEqual(100);
  });

  it('puts a positive transaction in the transactions array', () => {
    expect(account.transactions[0]).toEqual(100);
  });

  it('can\'t use deposit with a negative number', () => {
    expect(() => account.deposit(-10)).toThrow('Must deposit a positive amount');
  });
});

describe('Withdraw', () => {
  let account;

  beforeEach(() => {
    account = new Account('Richard');
    account.balance = 100;
  });

  it('decreases the balance by the withdraw amount', () => {
    account.withdraw(10);
    expect(account.balance).toEqual(90);
  });

  it('puts a negative transaction in the transactions array', () => {
    account.withdraw(10)
    expect(account.transactions[0]).toEqual(-10);
  });

  it('can\'t use withdraw with a negative number', () => {
    expect(() => account.withdraw(-10)).toThrow('Must withdraw a positive amount');
  });

  it('can\'t make a withdrawal that makes the balance negative', () => {
    expect(() => account.withdraw(110)).toThrow('Insufficient funds to make this withdrawal')
  });
});

describe('Check balance', () => {
  let account;

  beforeEach(() => {
    account = new Account('Richard');
    account.balance = 100;
  });

  it('returns a balance when called', () => {
    expect(account.checkBalance()).toEqual('Your balance is 100');
  });

  it('returns a different amount after a deposit', () => {
    account.deposit(50);
    expect(account.checkBalance()).toEqual('Your balance is 150'); 
  });

  it('returns a different amount after a withdrawal', () => {
    account.withdraw(30);
    expect(account.checkBalance()).toEqual('Your balance is 70');
  });
});

describe('View transactions', () => {
  let account;

  beforeEach(() => {
    account = new Account('Richard');
    account.transactions = [50, 100, -60];
  });

  it('returns an array of transactions', () => {
    expect(account.viewStatement()).toEqual('50, 100, -60');
  });

  it('returns a different statement after another transaction', () => {
    account.deposit(80);
    expect(account.viewStatement()).toEqual('50, 100, -60, 80');
  });
});

describe('View just deposits or withdrawals', () => {
  let account;

  beforeEach(() => {
    account = new Account('Richard');
    account.transactions = [100, 50, -30, -20, 10, -5];
  });

  it('returns the transactions that were deposits', () => {
    expect(account.viewDeposits()).toEqual('Deposits: 100, 50, 10');
  });

  it('adding a new deposit returns a different list', () => {
    account.deposit(5);
    expect(account.viewDeposits()).toEqual('Deposits: 100, 50, 10, 5');
  });

  it('returns the transactions that were withdrawals', () => {
    expect(account.viewWithdrawals()).toEqual('Withdrawals: -30, -20, -5');
  });

  it('adding a new withdrawal return different list', () => {
    account.balance = 100;
    account.withdraw(10);
    expect(account.viewWithdrawals()).toEqual('Withdrawals: -30, -20, -5, -10');
  })
});