#!/usr/bin/env node

import chalk from "chalk"; //version 4.1.2 //external package
import inquirer from "inquirer"; //version 9.3.5 //external package

//class Customer
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNo: number;
  accountNo: number;
  pin: number;

  constructor(
    fName: string,
    lName: string,
    age: number,
    gender: string,
    mobNo: number,
    accNo: number,
    pin: number
  ) {
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.gender = gender;
    this.mobileNo = mobNo;
    this.accountNo = accNo;
    this.pin = pin;
  }
}
// interface BankAccount
interface BankAcc {
  accNo: number;
  Balance: number;
}

// class BankAccount
class BankAccount {
  customers: Customer[] = [];
  bankAccs: BankAcc[] = [];

  //method to add customers
  addCus(customer: Customer) {
    this.customers.push(customer);
  }

  // method to add bank account at the time of adding new customers
  addBankAcc(customer: Customer) {
    this.bankAccs.push({ accNo: customer.accountNo, Balance: 0 });
  }

  //method to check balance
  checkBalance(cus: Customer, cusBankAcc: BankAcc) {
    console.log(
      `DEAR ${chalk.green.bold.italic(cus.firstName)} ${chalk.green.bold.italic(
        cus.lastName
      )}, YOUR BALANCE IS:${chalk.bold.magenta(`${cusBankAcc.Balance}$`)}`
    );
  }

  // method to view balance
  viewDetails(customer: Customer, bankAcc: BankAcc) {
    console.log(
      `NAME: ${chalk.green.bold.italic(
        customer.firstName
      )} ${chalk.green.bold.italic(customer.lastName)}`
    );
    console.log(`AGE: ${chalk.green.bold.italic(customer.age)}`);
    console.log(`GENDER: ${chalk.green.bold.italic(customer.gender)}`);
    console.log(
      `WHATSAPP NUMBER: ${chalk.green.bold.italic(customer.mobileNo)}`
    );
    console.log(
      `ACCOUNT NUMBER: ${chalk.green.bold.italic(customer.accountNo)}`
    );
    console.log(`PIN: ${chalk.green.bold.italic(customer.pin)}`);
  }

  // method to debit(withdraw)
  debit(customer: Customer, cusBankAcc: BankAcc, amount: number) {
    cusBankAcc.Balance -= amount;
    console.log(
      `DEAR ${chalk.green.bold.italic(
        customer.firstName
      )} ${chalk.green.bold.italic(customer.lastName)}, ${chalk.magenta(
        amount
      )}$ HAS BEEN DEBITED FROM YOUR BANK ACCOUNT. YOUR NEW BALANCE IS ${chalk.magenta(
        cusBankAcc.Balance
      )}$`
    );
  }
  
  // method to debit more than 100$
  debitMore(customer: Customer, cusBankAcc: BankAcc, amount: number) {
    cusBankAcc.Balance -= amount + 1;
    console.log(
      `DEAR ${chalk.green.bold.italic(
        customer.firstName
      )} ${chalk.green.bold.italic(customer.lastName)}, ${chalk.magenta(
        amount
      )}$ HAS BEEN DEBITED FROM YOUR BANK ACCOUNT. YOUR NEW BALANCE IS ${chalk.magenta(
        cusBankAcc.Balance
      )}$`
    );
  }
  
  // method to credit(deposit) money 
  credit(customer: Customer, cusBankAcc: BankAcc, amount: number) {
    cusBankAcc.Balance += amount;
    console.log(
      `DEAR ${chalk.green.bold.italic(
        customer.firstName
      )} ${chalk.green.bold.italic(customer.lastName)}, ${chalk.magenta(
        amount
      )}$ HAS BEEN CREDITED FROM YOUR BANK ACCOUNT. YOUR NEW BALANCE IS ${chalk.magenta(
        cusBankAcc.Balance
      )}$`
    );
  }

}

//creating instanse of BankAccount
let bank = new BankAccount();

// Bank Functionality
async function Bank() {
  console.log(chalk.green("-".repeat(50)),chalk.magenta.bold("OOP MY BANK PROJECT"),chalk.green("-".repeat(50)))
  console.log(chalk.green("-".repeat(46)),chalk.magenta.bold("MADE BY:"),chalk.magenta.bold.italic("ALIYAN JABBAR KHAN"),chalk.green("-".repeat(46)))
  do {
    let user = await inquirer.prompt({
      name: "input",
      type: "list",
      message: chalk.bold.yellow("SELECT ONE OF THE OPERATIONS TO PROCEED..."),
      choices: [
        "CREATE BANK ACCOUNT",
        "CHECK YOUR DETAILS",
        "CHECK BALANCE",
        "DEBIT(WITHDRAW)",
        "CREDIT(DEPOSIT)",
        "EXIT",
      ],
    });

    //Create Bank Account
    if (user.input === "CREATE BANK ACCOUNT") {
      let user = await inquirer.prompt([
        {
          name: "fName",
          type: "input",
          message: chalk.yellow("ENTER YOUR FIRST NAME:"),
          validate: (val: string) => {
            if (val.trim() !== "") {
              return true;
            } else {
              return chalk.red.bold("PLEASE ENTER A VALID NAME!");
            }
          },
        },
        {
          name: "lName",
          type: "input",
          message: chalk.yellow("ENTER YOUR LAST NAME:"),
          validate: (val: string) => {
            if (val.trim() !== "") {
              return true;
            } else {
              return chalk.red.bold("PLEASE ENTER A VALID NAME!");
            }
          },
        },
        {
          name: "age",
          type: "number",
          message: chalk.yellow("ENTER YOUR AGE:"),
          validate: (val: number) => {
            if (Number.isNaN(val)) {
              return chalk.red.bold("PLEASE ENTER A VALID AGE!");
            }
            if (val < 0) {
              return chalk.red.bold("PLEASE ENTER A VALID AGE!");
            } else {
              return true;
            }
          },
        },
        {
          name: "gender",
          type: "list",
          message: chalk.yellow("SELECT YOUR GENDER:"),
          choices: ["MALE", "FEMALE"],
        },
        {
          name: "mobNo",
          type: "number",
          message: chalk.yellow(
            "ENTER YOUR WHATSAPP NUMBER(fake number is allowed!):"
          ),
          validate: (val) => {
            if (Number.isNaN(val)) {
              return chalk.red("ENTER A VALID NUMBER!");
            } else {
              return true;
            }
          },
        },
        {
          name: "pin",
          type: "number",
          message: chalk.yellow("MAKE A PIN(number) FOR YOUR BANK ACCOUNT:"),
          validate: (val) => {
            if (Number.isNaN(val)) {
              return chalk.red("ENTER A VALID PIN IN NUMBER!");
            } else {
              return true;
            }
          },
        },
      ]);

      //converting first and last name to uppercase
      let firstName = user.fName.toUpperCase();
      let lastName = user.lName.toUpperCase();

      //generating random account number of five digits each
      let accNo = Math.floor(Math.random() * 89000 + 10000);

      let customer = new Customer(
        firstName,
        lastName,
        user.age,
        user.gender,
        user.mobNo,
        accNo,
        user.pin
      );
      bank.addCus(customer);
      bank.addBankAcc(customer);
      console.log(
        chalk.green.bold.italic("YOUR BANK ACCOUNT HAS BEEN CREATED SUCCESFULLY!")
      );
      console.log(chalk.green("-".repeat(121)))   

      //finding customer through account number because it will be unique
      let findCus = bank.customers.find(
        (cus) => cus.accountNo === customer.accountNo
      );
      console.table(findCus);
      console.log(chalk.green("-".repeat(121)))
    }

    //Check Balance
    if (user.input === "CHECK BALANCE") {
      let user = await inquirer.prompt({
        name: "input",
        type: "number",
        message: chalk.yellow("INPUT ACCOUNT NUMBER TO PROCEED:"),
      });

      let findCus = bank.customers.find((Cus) => Cus.accountNo === user.input);

      if (findCus) {
        let user2 = await inquirer.prompt({
          name: "pin",
          type: "number",
          message: chalk.yellow("INPUT YOUR ACCOUNT'S PIN TO SEE BALANCE..."),
        });
        if (findCus.pin === user2.pin) {
          let findAcc = bank.bankAccs.find(
            (bankAcc) => bankAcc.accNo === user.input
          );
          findAcc && bank.checkBalance(findCus, findAcc);
          console.log(chalk.green("-".repeat(121)))
        } else {
          console.log(chalk.red.bold("INVALID PIN!"));
          console.log(chalk.green("-".repeat(121)))
        }
      } else {
        console.log(chalk.red.bold("INVALID ACCOUNT NUMBER!"));
        console.log(chalk.green("-".repeat(121)))
      }
    }

    //Your Details
    if (user.input === "CHECK YOUR DETAILS") {
      let user = await inquirer.prompt({
        name: "input",
        type: "number",
        message: chalk.yellow("INPUT ACCOUNT NUMBER TO PROCEED:"),
      });
      let findCus = bank.customers.find((Cus) => Cus.accountNo === user.input);
      if (findCus) {
        let user2 = await inquirer.prompt({
          name: "pin",
          type: "number",
          message: chalk.yellow(
            "INPUT YOUR ACCOUNT'S PIN TO SEE YOUR DETAILS..."
          ),
        });
        if (findCus.pin === user2.pin) {
          let findAcc = bank.bankAccs.find(
            (bankAcc) => bankAcc.accNo === user.input
          );
          findAcc && bank.viewDetails(findCus, findAcc);
          console.log(chalk.green("-".repeat(121)))
        } else {
          console.log(chalk.red.bold("INVALID PIN!"));
          console.log(chalk.green("-".repeat(121)))
        }
      } else {
        console.log(chalk.red.bold("INVALID ACCOUNT NUMBER!"));
        console.log(chalk.green("-".repeat(121)))
      }
    }

    //Withdraw Cash
    if (user.input === "DEBIT(WITHDRAW)") {
      let user = await inquirer.prompt({
        name: "input",
        type: "number",
        message: chalk.yellow("INPUT ACCOUNT NUMBER TO PROCEED:"),
      });
      let findCus = bank.customers.find((Cus) => Cus.accountNo === user.input);
      let findAcc = bank.bankAccs.find(
        (bankAcc) => bankAcc.accNo === user.input
      );
      if (findCus) {
        let user2 = await inquirer.prompt({
          name: "pin",
          type: "number",
          message: chalk.yellow("INPUT YOUR ACCOUNT'S PIN TO WITHDRAW CASH..."),
        });
        if (findCus.pin === user2.pin) {
          let user3 = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.yellow(
              `HOW MUCH AMOUNT DO YOU WANT TO WITHDRAW? ${chalk.red.bold(
                "NOTE:"
              )} ${chalk.red.italic(
                "$1 WILL BE CHARGED IF YOU WITHDRAW 100$ OR MORE"
              )}`
            ),
          });
          // assuring that findAcc has some value in the form of object
          if (!findAcc) {
            console.log(chalk.red("ACCOUNT NOT FOUND!"));
            console.log(chalk.green("-".repeat(121)))
          } else {
            if (user3.amount >= 100) {
              if (user3.amount + 1 <= findAcc.Balance) {
                bank.debitMore(findCus, findAcc, user3.amount);
                console.log(chalk.green("-".repeat(121)))
              }else{
                console.log(chalk.red.bold("INSUFFICIENT BALANCE!"))
                console.log(chalk.green("-".repeat(121)))
              }
            }else{
              if (user3.amount <= findAcc.Balance) {
                bank.debit(findCus,findAcc,user3.amount)
                console.log(chalk.green("-".repeat(121)))
              }else{
                console.group(chalk.red.bold("INSUFFICIENT BALANCE"))
                console.log(chalk.green("-".repeat(121)))
              }
            }
          }
        } else {
          console.log(chalk.red.bold("INVALID PIN!"));
          console.log(chalk.green("-".repeat(121)))
        }
      } else {
        console.log(chalk.red.bold("INVALID ACCOUNT NUMBER!"));
        console.log(chalk.green("-".repeat(121)))
      }
    }

    //Deposit Cash
    if (user.input === "CREDIT(DEPOSIT)") {
      let user = await inquirer.prompt({
        name: "input",
        type: "number",
        message: chalk.yellow("INPUT ACCOUNT NUMBER TO DEPOSIT CASH:"),
      });
      let findCus = bank.customers.find((Cus) => Cus.accountNo === user.input);
      let findAcc = bank.bankAccs.find( (bankAcc) => bankAcc.accNo === user.input);
      if (findCus) {
          let user3 = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.yellow("HOW MUCH AMOUNT DO YOU WANT TO DEPOSIT?"),
          });

          // assuring that findAcc has some value in the form of object
          if (!findAcc) {
            console.log(chalk.red("ACCOUNT NOT FOUND!"));
            console.log(chalk.green("-".repeat(121)))
          } else {
            bank.credit(findCus,findAcc,user3.amount)
            console.log(chalk.green("-".repeat(121)))
          }

      } else {
        console.log(chalk.red.bold("INVALID ACCOUNT NUMBER!"));
        console.log(chalk.green("-".repeat(121)))
      }
    }

    //Exit
    if (user.input === "EXIT") {
      console.log(chalk.red.bold.italic("EXITING..."));
      process.exit();
    }
  } while (true);
}
Bank();
