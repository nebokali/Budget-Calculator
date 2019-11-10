'use strict';

let money = prompt('Ваш бюджет на месяц?'),
    time = prompt('Введите дату в формате YYYY-MM-DD');

function changeData(days) {
  var appData = {
    //бюджет
    budjet: money/30*days, 
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
  }

  //заполнение объекта обязательных расходов
  var expensesName = '';
  var expensesCost = 0;
  var budgetLimit = appData.budjet;

  function setExpenses() {
    expensesName = prompt('Введите обязательную статью расходов в этом месяце');
    expensesCost = prompt('Во сколько обойдется?')/30*days;
    var newExpenses = { [expensesName]: expensesCost };
    var oldExpenses = appData.expenses;
    //учитываем обязательные расходы в бюджете на период
    budgetLimit = budgetLimit - expensesCost;
    appData.expenses = Object.assign(oldExpenses, newExpenses);
    return budgetLimit;
  }

  //дважды запрашиваем информацию по обяхательным расходам
  for (var i = 0; i < 2; i++) {
    setExpenses();
  }

  alert("Ваш бюджет на " + days + " день составляет: " + appData.budjet + ".  Если вычесть обязательные расходы, то за " + days + " день вы можете потратить: " + budgetLimit + ".");
}

//выводим на экран бюджет на 1 день
changeData(1);
