export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return null;

  try {
    const parsedData = JSON.parse(data);
    if (key === "budgets" && parsedData) {
      const updatedData = parsedData.map(budget => ({
        ...budget,
        currency: budget.currency || 'USD'
      }));
      localStorage.setItem(key, JSON.stringify(updatedData));
      return updatedData;
    }
    return parsedData;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage:`, e);
    localStorage.removeItem(key);
    return null;
  }
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const createBudget = ({ name, amount, currency }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
    currency: currency || 'USD',
  };
  const existingBudgets = fetchData("budgets") ?? [];
  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newItem]),
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: budgetId,
  })[0];
  
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
    currency: budget.currency,
  };
  const existingExpenses = fetchData("expenses") ?? [];
  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newItem]),
  );
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatCurrency = (amt, currency = 'USD') => {
  const currencyMap = {
    USD: { style: "currency", currency: "USD" },
    RUB: { style: "currency", currency: "RUB" },
    KZT: { style: "currency", currency: "KZT", minimumFractionDigits: 0 },
    EUR: { style: "currency", currency: "EUR" }
  };

  return amt.toLocaleString(undefined, currencyMap[currency] || currencyMap.USD);
};