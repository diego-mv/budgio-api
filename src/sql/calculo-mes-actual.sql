SELECT SUM("InstallmentAmount") AS "TotalAmountDueThisMonth"
FROM (
    SELECT 
        "InstallmentAmount",
        "TotalInstallments",
        "IssueDate",
        -- Calculamos cuántos meses han pasado desde la fecha de compra
        EXTRACT(YEAR FROM CURRENT_DATE) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) -
        (EXTRACT(YEAR FROM "IssueDate") * 12 + EXTRACT(MONTH FROM "IssueDate")) AS months_since_issue,
        
        -- Calculamos las cuotas restantes, pero solo sumamos una cuota por producto
        CASE 
            -- Si la compra ya está completamente pagada (meses transcurridos >= total de cuotas), no hay más que pagar
            WHEN EXTRACT(YEAR FROM CURRENT_DATE) * 12 + EXTRACT(MONTH FROM CURRENT_DATE) - (EXTRACT(YEAR FROM "IssueDate") * 12 + EXTRACT(MONTH FROM "IssueDate")) >= "TotalInstallments"
                THEN 0
            ELSE 1  -- Solo sumamos 1 cuota por producto
        END AS remaining_installments,
        
        -- Calculamos la fecha de vencimiento del mes actual (10 de cada mes)
        DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '9 days' AS next_due_date
    FROM public."ExpenseCreditCard"
    WHERE 
        "InstallmentAmount" > 0
        AND "TotalInstallments" > 0
) AS remaining
WHERE 
    remaining_installments > 0
    AND remaining.next_due_date <= CURRENT_DATE;  -- Solo consideramos las compras cuyo vencimiento esté en o antes de la fecha actual
