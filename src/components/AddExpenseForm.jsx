import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "../hooks/useTranslation";

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const t = useTranslation();

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        {t('expenseForm.title')}{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">{t('expenseForm.nameLabel')}</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder={t('expenseForm.namePlaceholder')}
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">{t('expenseForm.amountLabel')}</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder={t('expenseForm.amountPlaceholder')}
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">{t('expenseForm.categoryLabel')}</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name} ({budget.currency})
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>{t('form.submitting')}</span>
          ) : (
            <>
              <span>{t('expenseForm.submit')}</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddExpenseForm;