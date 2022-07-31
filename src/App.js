import { useEffect, useReducer } from "react";
import "./App.css";
import Button from "./components/Button";
import List from "./components/List";
import { items } from "./mock/items";

function App() {
  
  const initialState = {
    rows:5,
    start: 0,
    end: 5,
    page: 1
  };

  /**
   * @description using reducer as start and end and page depend on each other
   * @date 2022-08-01
   * @param {any} state
   * @param {any} action
   * @returns {any}
   */
  const reducer = (state, action) => {
    const { type, payload } = action;
    return { ...state, [type]: payload };
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { start, end, page, rows } = state;


  useEffect(() => {
    //for first page, we already start from 0
    // logic is simply like if you are on page 4, and allowed rows are 5, 
    // last item will be 20 and start will (4*5)-5=15
    page > 1 
      ? dispatch({ type: "start", payload: page*rows-rows })
      : dispatch({ type: "start", payload: 0 });
    dispatch({ type: "end", payload: rows * page });

    
  }, [page,rows]);

  // slices the items to include only the paginated ones
  let itemsUpdated = items.slice(start, end);

  /**
   * @description returns paginated buttons
   * @date 2022-08-01
   * @returns {any}
   */
  const paginatedButtons = () => {
    const paginatedPages = Math.ceil(items.length / rows);
    const buttons = [];
    for (let i = 1; i <= paginatedPages; i++) {
      buttons.push(
        <Button
          button={i}
          page={page}
          key={i}
          onClick={() => dispatch({ type: "page", payload: i })}
          active={page}
        />
      );
    }
    return buttons;
  };

  
  
  /**
   * @description Handle change of pagination rows
   * @date 2022-08-01
   * @param {any} e
   * @returns {any}
   */
  const handleChange=(e)=>{
    const val=e.target.value;
    dispatch({type:"rows",payload:val})
  }

  return (
    <div className="main">
      <div className="users">Users</div>
      <div className="rows">
        <label className="label">Rows</label>

        <select value={rows} onChange={(e)=>handleChange(e)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            
          </select>
        
      </div>
      <List items={itemsUpdated} />
      <div className="buttonWrapper">{paginatedButtons()}</div>
    </div>
  );
}

export default App;
