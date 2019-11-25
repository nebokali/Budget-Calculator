'use strict';

let money = prompt('Ваш бюджет на месяц?'),
    time = prompt('Введите дату в формате YYYY-MM-DD');

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
     savings: false
};

//Цикл для вопросов
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

appData.moneyPerDay  = appData.budjet / 30;

alert("Ежедневный бюджет: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
  console.log("Минимальный уровень достатка");
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
  console.log("Средний уровень достатка");
} else if (appData.moneyPerDay > 2000) {
  console.log("Высокий уровень достатка");
} else {
  console.log("Ошибка");
}
