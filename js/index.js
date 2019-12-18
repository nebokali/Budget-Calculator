'use strict';

let buttonStart = document.getElementById("start"),
    budget = document.querySelectorAll(".budget-value"),
    daybudget = document.querySelectorAll(".daybudget-value"),
    level = document.querySelectorAll(".level-value"),
    expenses = document.querySelectorAll(".expenses-value"),
    optionalExpenses = document.querySelectorAll(".optionalexpenses-value"),
    income = document.querySelectorAll(".income-value"),
    monthSavings = document.querySelectorAll(".monthsavings-value"),
    expencesInputs = document.querySelectorAll(".expenses-item"),
    buttonApproveNeccessary = document.getElementsByTagName("button")[0],
    buttonApproveOptional = document.getElementsByTagName("button")[1],
    buttonCount = document.getElementsByTagName("button")[2],
    incomeChoice = document.querySelector(".choose-income"),
    savings = document.getElementById("savings"),
    sum = document.querySelector(".choose-sum"),
    percentage = document.querySelector(".choose-percent"),
    day = document.querySelector(".day-value"),
    month = document.querySelector(".month-value"),
    year = document.querySelector(".year-value");


let money, time;

function start() {
      money = +prompt('Ваш бюджет на месяц?');

      while(isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
      }

      time = prompt('Введите дату в формате YYYY-MM-DD');
}
start();

// function changeData(days) {
//   var appData = {
//     //бюджет
//     budjet: money/30*days,
//     //данные времени
//     timeData: time,
//     //объект с обязательными расходами
//     expenses: {},
//     //объект с необязательными расходами
//     optionalExpenses: {},
//     //массив данных с доп. доходом
//     income: [],
//     //свойство savings (выставляем его как false)
//     savings: false
//   };
//
//   //заполнение объекта обязательных расходов
//   var expensesName = '';
//   var expensesCost = 0;
//   var budgetLimit = appData.budjet;
//
//   function setExpenses() {
//     expensesName = prompt('Введите обязательную статью расходов в этом месяце');
//     expensesCost = prompt('Во сколько обойдется?')/30*days;
//     var newExpenses = { [expensesName]: expensesCost };
//     var oldExpenses = appData.expenses;
//     //учитываем обязательные расходы в бюджете на период
//     budgetLimit = budgetLimit - expensesCost;
//     appData.expenses = Object.assign(oldExpenses, newExpenses);
//     return budgetLimit;
//   }
//
//   //дважды запрашиваем информацию по обяхательным расходам
//   for (var i = 0; i < 2; i++) {
//     setExpenses();
//   }
//
//   alert("Ваш бюджет на " + days + " день составляет: " + appData.budjet + ".  Если вычесть обязательные расходы, то за " + days + " день вы можете потратить: " + budgetLimit + ".");
// }
//
// //выводим на экран бюджет на 1 день
// changeData(1);

//Второй путь

let appData = {
     //бюджет
     budjet: money,
     //данные времени
     timeData: time,
     //объект с обязательными расходами
     expenses: {},
     //объект с необязательными расходами
     optionalExpenses: {},
     //массив данных с доп. доходом
     income: [],
     //свойство savings (выставляем его как false)
     savings: true,
     chooseExpences: function() {
         for (let i = 0; i < 2; i++) {
             let a = prompt('Введите обязательную статью расходов в этом месяце', ''),
                 b = prompt('Во сколько обойдется?', '');

             if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
                 && a != '' && b != '' && a.lenght <= 50) {
               appData.expenses[a] = b; // создание пар ключ - значение
             } else {
               console.log("Ошибка");
             }
         }
     },
     detectDayBudjet: function() {
         appData.moneyPerDay  = (appData.budjet / 30 + appData.monthIncome / 30).toFixed(1);

         alert("Ежедневный бюджет: " + appData.moneyPerDay);
         alert("Доход от накоплений в месяц: " + appData.monthIncome);
     },
     chooseOptExpenses: function() {
           for (let i = 0; i < 3; i++) {
               let a = prompt('Введите необязательную статью расходов в этом месяце', ''),
                   b = prompt('Во сколько обойдется?', '');

               if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
                   && a != '' && b != '' && a.lenght <= 50) {
                 appData.optionalExpenses[a] = b; // создание пар ключ - значение
               } else {
                 console.log("Ошибка");
               }
           }
     },
     checkSavings: function() {
         if (appData.savings == true) {
           let save = +prompt("Какова сумма накоплений?"),
               percent = +prompt("Под какой процент?");

           appData.monthIncome = save/100/12*percent;
         }
     },
     detectLevel: function() {
         if (appData.moneyPerDay < 100) {
           console.log("Минимальный уровень достатка");
         } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
           console.log("Средний уровень достатка");
         } else if (appData.moneyPerDay > 2000) {
           console.log("Высокий уровень достатка");
         } else {
           console.log("Ошибка");
         }
     },
     chooseIncome: function() {
       let items = prompt("Что принесет дополнительный доход? (пожалуйста, перечислите данные через запятую)", "");

       if ((typeof(items)) === 'string' && (typeof(items)) !== null && items.trim().length > 0 && typeof(items) !== 'undefined') {
         appData.income = items.split(",");
         appData.income.push(prompt("Может, что-то еще?"));
         appData.income.sort();
       } else {
         console.log("Ошибка");
       }

       //alert("Способы доп. заработка: " + appData.income);
       let array = [];
       appData.income.forEach (element => array.push((appData.income.indexOf(element)+1) + " способ - " + element));
       alert("Способы доп. заработка: " + array);
     }
};

//Цикл для вопросов
appData.chooseExpences();

appData.chooseOptExpenses();

appData.chooseIncome();

appData.checkSavings();

appData.detectDayBudjet();

appData.detectLevel();

//
console.group("Наша программа включает в себя данные: ");
for (var prop in appData) {
  console.log(prop + " : " + appData[prop]);
}
console.groupEnd();
