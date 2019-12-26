'use strict';

let buttonStart = document.getElementById("start"),
    budget = document.querySelector(".budget-value"),
    dayBudget = document.querySelector(".daybudget-value"),
    level = document.querySelector(".level-value"),
    expensesValue = document.querySelector(".expenses-value"),
    optionalExpenses = document.querySelector(".optionalexpenses-value"),
    income = document.querySelector(".income-value"),
    monthSavings = document.querySelector(".monthsavings-value"),
    yearSavings = document.querySelector(".yearsavings-value"),
    expencesInputs = document.querySelectorAll(".expenses-item"),
    expencesOptInputs = document.querySelectorAll(".optionalexpenses-item"),
    buttonApproveNeccessary = document.getElementsByTagName("button")[0],
    buttonApproveOptional = document.getElementsByTagName("button")[1],
    buttonCount = document.getElementsByTagName("button")[2],
    incomeChoice = document.querySelector(".choose-income"),
    savings = document.getElementById("savings"),
    sumValue = document.querySelector(".choose-sum"),
    percentageValue = document.querySelector(".choose-percent"),
    day = document.querySelector(".day-value"),
    month = document.querySelector(".month-value"),
    year = document.querySelector(".year-value");


let money, time;

buttonStart.addEventListener('click', function () {
      time = prompt('Введите дату в формате YYYY-MM-DD');
      money = +prompt('Ваш бюджет на месяц?');

      while(isNaN(money) || money == "" || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
      }

      appData.budjet = money;
      appData.timeData = time;
      budget.textContent = money.toFixed();
      day.value = new Date(Date.parse(time)).getDate();
      month.value = new Date(Date.parse(time)).getMonth() + 1;
      year.value = new Date(Date.parse(time)).getFullYear();

      buttonCount.classList.remove('disabled');
      buttonApproveNeccessary.classList.remove('disabled');
});

buttonApproveNeccessary.addEventListener('click', function() {
  if (appData.budjet != undefined) {
    let sum = 0;

    for (let i = 0; i < expencesInputs.length; i++) {
        let a = expencesInputs[i].value,
            b = expencesInputs[++i].value;

        if (typeof(a) != null && typeof(b) != null && a != '' && b != '' && a.length <= 50) {
          //appData.budget -= +b;
          appData.expenses[a] = b;
          appData.budjet -= +b;
          sum += +b;
        } else {
          i--;
          console.log('error');
        }
    }
    expensesValue.textContent = sum;
  } else {
    alert('Для ввода данных, пожалуйста, запустите программу, нажав кнопку "Начать расчет"');
  }
});

buttonApproveOptional.addEventListener('click', function() {
  for (let i = 0; i < expencesOptInputs.length; i++) {
    let opt = expencesOptInputs[i].value;
    appData.optionalExpenses[i] = opt;
    optionalExpenses.textContent += appData.optionalExpenses[i] + ' ';
  }
});

buttonCount.addEventListener('click', function() {
  if (appData.budjet != undefined) {
    appData.moneyPerDay  = (appData.budjet / 30).toFixed(1);
    dayBudget.textContent = appData.moneyPerDay;
   //+ appData.monthIncome / 30
    if (appData.moneyPerDay < 100) {
      level.textContent = "Минимальный уровень достатка";
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
      level.textContent = "Средний уровень достатка";
    } else if (appData.moneyPerDay > 2000) {
      level.textContent = "Высокий уровень достатка";
    } else {
      level.textContent = "Ошибка";
    }
  } else {
    dayBudget.textContent = 'Произошла ошибка';
    alert('Для ввода данных, пожалуйста, запустите программу, нажав кнопку "Начать расчет"');
  }
});

incomeChoice.addEventListener('input', function () {
  let items = incomeChoice.value;
  appData.income = items.split(",");
  income.textContent = appData.income;
});

savings.addEventListener('click', function() {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
        percentage = +percentageValue.value;

    appData.monthIncome = sum/100/12*percentage;
    appData.yearIncome = sum/100*percentage;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  } else {
    monthSavings.textContent = 'Накопления выключены, проверьте, пожалуйста, чекбокс';
    yearSavings.textContent = 'Накопления выключены, проверьте, пожалуйста, чекбокс';
  }
});

percentageValue.addEventListener('input', function () {
  if (appData.savings == true) {
    let sum = +sumValue.value,
        percentage = +percentageValue.value;

    appData.monthIncome = sum/100/12*percentage;
    appData.yearIncome = sum/100*percentage;

    monthSavings.textContent = appData.monthIncome.toFixed(1);
    yearSavings.textContent = appData.yearIncome.toFixed(1);
  } else {
    monthSavings.textContent = 'Накопления выключены, проверьте, пожалуйста, чекбокс';
    yearSavings.textContent = 'Накопления выключены, проверьте, пожалуйста, чекбокс';
  }
});

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
     savings: false,
     chooseExpences: {},
     detectDayBudjet: {},
     chooseOptExpenses:  {},
     checkSavings: {},
     detectLevel: {},
     chooseIncome: {}
};

if (appData.budjet == undefined) {
  buttonApproveNeccessary.classList.add('disabled');
  buttonCount.classList.add('disabled');
} else {
  buttonCount.classList.remove('disabled');
  buttonApproveNeccessary.classList.remove('disabled');
}

//
console.group("Наша программа включает в себя данные: ");
for (var prop in appData) {
  console.log(prop + " : " + appData[prop]);
}
console.groupEnd();
