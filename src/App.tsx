import * as C from "./styles";
import { Item } from "./types/Item";
import { Category } from "./types/categorie";
import { categories } from "./data/categories";
import { items } from "./data/items";
import { useEffect, useState } from "react";
import { filterListByMonth, getCurrentMonth } from "./Helpers/dateFilter";
import TableArea from "./components/tablearea";
import { InfoArea } from "./components/infoArea";
import { InputArea } from "./components/inputArea";

function App() {
  const [List, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  useEffect(() => {
    setFilteredList(filterListByMonth(List, currentMonth));
  }, [List, currentMonth]);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }
    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const handleAddItem = (item: Item) => {
    let newList = [...List];
    newList.push(item);
    setList(newList);
  };

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>sistema financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          onMonthChange={handleMonthChange}
          currentMonth={currentMonth}
          income={income}
          expense={expense}
        />
        {/*area de inserçao*/}
        <InputArea onAdd={handleAddItem} />
        {/*tabela de items*/}
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
}

export default App;
