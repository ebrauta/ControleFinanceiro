const transactionsUl = document.querySelector("#transactions");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const balanceDisplay = document.querySelector("#balance");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

const transformInMoneyFormat = (value) =>
  Number(value).toLocaleString("pt-br", { style: "currency", currency: "BRL" });

const removeTransaction = (ID) => {
  transactions = transactions.filter((transactions) => transactions.id !== ID);
  updateLocalStorage();
  init();
};

const addTransactionIntoDOM = ({ id, name, amount }) => {
  const operator = amount < 0 ? "-" : "+";
  const CSSClass = amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(amount);

  const li = document.createElement("li");
  li.classList.add(CSSClass);
  li.innerHTML = `
  ${name}
  <span>${operator} ${transformInMoneyFormat(amountWithoutOperator)}</span>
  <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
  `;
  transactionsUl.append(li);
};

const getExpenses = (transactionsAmount) => {
  return Math.abs(
    transactionsAmount
      .filter((value) => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0)
  );
};

const getIncome = (transactionsAmount) => {
  return transactionsAmount
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0);
};

const getTotal = (transactionsAmount) => {
    return transactionsAmount.reduce(
    (accumulator, transaction) => accumulator + transaction,
    0
    );
};

const updateBalanceValues = () => {
    const transactionsAmount = transactions.map(({ amount }) => amount);
    const total = getTotal(transactionsAmount);
    const income = getIncome(transactionsAmount);
  const expense = getExpenses(transactionsAmount);

  balanceDisplay.textContent = `${transformInMoneyFormat(total)}`;
  incomeDisplay.textContent = `${transformInMoneyFormat(income)}`;
  expenseDisplay.textContent = `${transformInMoneyFormat(expense)}`;
};

const init = () => {
  transactionsUl.innerHTML = "";
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};

init();

const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const generateID = () => Math.round(Math.random() * 1000);

const addTransactionArray = (transactionName, transactionAmount) => {
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount),
  });
};

const cleanInputs = () => {
  inputTransactionName.value = "";
  inputTransactionAmount.value = "";
};

const handleFormSubmit = (event) => {
  event.preventDefault();

  const transactionName = inputTransactionName.value.trim();
  const transactionAmount = inputTransactionAmount.value.trim();

  const isSomeInputEmpty = transactionName === "" || transactionAmount === "";
  if (isSomeInputEmpty) {
    alert("Por favor preencha tanto o nome quanto o valor da transação!");
    return;
  }

  addTransactionArray(transactionName, transactionAmount);
  init();
  updateLocalStorage();
  cleanInputs();
};

form.addEventListener("submit", handleFormSubmit);
