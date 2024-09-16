document.addEventListener("DOMContentLoaded", () => {
  const newPayrollBtn = document.getElementById("NewPayroll");
  newPayrollBtn.addEventListener("click", () => {
    const payrollTable = document.getElementById("PayrollTable");
    payrollTable.style.display = "table";
    newPayrollBtn.style.display = "none";
  });

  let personalList = [];

  const loadEmployees = async () => {
    try {
      const res = await fetch("employeesData.json");
      personalList = await res.json();
      displayEmployees(personalList);
    } catch (err) {
      console.error(err);
    }
  };

  const displayEmployees = (employee) => {
    const employeesTable = employee
      .map((employee) => {
        return `
          <tr>
            <th scope="row">${employee.id}</th>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>$${employee.hw}</td>
            <td><input type="number" class="hours-worked" style="width:60px"  min="0"/> h</td>
            <td class='monthly-pay fw-bold'></td>
          </tr>
        `;
      })
      .join("");

    document.getElementById("Employees-table").innerHTML = employeesTable;

    monthlyPay();

    const getEmployeesHW = employee.map((employee) => employee.hw);
    let maxHW = calcMaxWage(getEmployeesHW);
    document.getElementById("Max-wage").innerText = "$" + maxHW;

    let minHW = calcMinWage(getEmployeesHW);
    document.getElementById("Min-wage").innerText = "$" + minHW;

    let avgHW = getAvgHW(getEmployeesHW).toFixed(2);
    document.getElementById("Avg-wage").innerText = "$" + avgHW;
  };

  loadEmployees();
});
