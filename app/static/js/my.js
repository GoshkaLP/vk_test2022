$(document).ready(function () {

  // Функция для отключения видимости ненужных элементов на этапе нажатия на кнопку
  function setValInvis() {
    document.getElementById('val5000').style.display = 'none';
    document.getElementById('val2000').style.display = 'none';
    document.getElementById('val1000').style.display = 'none';
    document.getElementById('val500').style.display = 'none';
    document.getElementById('val200').style.display = 'none';
    document.getElementById('val100').style.display = 'none';
    document.getElementById('val_error').style.display = 'none';
  }

  // Функция для проверки, что сумма действительно нам подходит
  function checkAmount(amount) {
    return ((amount % 5000 === 0) || (amount % 2000 === 0) ||
        (amount % 1000 === 0) || (amount % 500 === 0) || (amount % 200 === 0) ||
        (amount % 100 === 0)) && (amount > 0);
  }

  // Функция для получения минимального количества купюр
  let atm = (amountNeed, banknotesRange) => {
  function count(amount, denomination) {
    if (amount === 0) return {};

    if (!denomination.length) return;

    let curDenomination = denomination[0];
    let availableBills = banknotesRange[curDenomination];
    let needBills = Math.floor(amount / curDenomination);
    let amountBills = Math.min(availableBills, needBills);

    for (let i = amountBills; i >= 0; i--) {
      let result = count(amount - i * curDenomination, denomination.slice(1));
      if (result) {
        return i ? {[curDenomination]: i, ...result} : result;
      }
    }
  }
  let amountHave = 0;
  Object.entries(banknotesRange).forEach(([key, value]) => {
              amountHave += key * value;
            });
  if (!checkAmount(amountNeed) || (amountHave < amountNeed)) {
    return {};
  } else {
    let denomination = Object.keys(banknotesRange)
    .map(Number)
    .sort((a, b) => b - a);

    return count(amountNeed, denomination);
  }
  };

  $(document).on('click', '.getMoney', function (event) {
    setValInvis();
    let amount = document.getElementById('amountData').value;
    if (amount) {
      if (parseInt(amount) || parseInt(amount) === 0) {
        let req = $.ajax({
            url: '/api/banknotes/'+parseInt(amount),
            type: 'GET'
        });
        req.done(function(data) {
          // Вывод полученного ответа от сервера
          console.log(data);
          let script_res = atm(data.amount, data.banknotes);
          if (!jQuery.isEmptyObject(script_res)) {
            Object.entries(script_res).forEach(([key, value]) => {
              document.getElementById('val' + key).style.display = 'block';
              document.getElementById('val' + key + '_text').textContent = value;
            });
          } else {
            document.getElementById('val_error').style.display = 'block';
          }
        });
      } else {
        alert('Сумма это число!');
      }
    } else {
      alert('Введите сумму!');
    }

  })
});
