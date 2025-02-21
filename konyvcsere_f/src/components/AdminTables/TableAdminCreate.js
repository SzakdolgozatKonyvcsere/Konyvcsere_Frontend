import React, { useEffect, useState } from 'react'
import {useContext} from 'react'
import { ApiContext } from '../../contexts/ApiContext';

export default function TableAdminCreate({tHeadLabels, tBodyContent, editFn, removeFn}) {
  // tHeadLabels should be an array [], with the column names
  {/*const [resolvedLabels, setResolvedLabels] = useState([]);

  useEffect(() => {
    async function resolveLabels() {
      const labels = await Promise.resolve(tHeadLabels); // Ensure labels are resolved
      setResolvedLabels(labels);
    }
    resolveLabels();
  }, [tHeadLabels]);*/}
  
  console.log("Propok: \nlabels: " + tHeadLabels + "\nbody:" + tBodyContent);

  const data = tHeadLabels.reduce((accumulator, label, index) => {
    accumulator[`key_${index}`] = label //Key generation - key_0, key_1...
    return accumulator;
  }, {}); // Must start with an empty object { }

  return (
    <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <table className="table table_admin">
        
        <thead>
            <tr className='table_admin-row_head'>
                {
                  /*
                    Maps through the data object we created from tHeadLabels.
                    Each key-value pair (
                      key  :  value
                      key_0: "label1",
                      key_1: "label2", ...
                      ) 
                    is transformed into a <th> element.
                   */
                  Object.entries(data).map(([key, value]) => (
                    <th key={key} scope="col">
                      {value} 
                    </th>
                  ))
                }
                {/* IGNORE - Edit & Delete column heads */}
                <th scope="col">
                    Módosítás
                </th>
                <th scope="col">
                    Törlés
                </th>
            </tr>
        </thead>

        <tbody>
          {
            tBodyContent.map((row, rowInd) => (
              <tr className='table_admin-row' key={rowInd}>
                {
                  Object.values(row).map((col, colInd) => (
                  <td scope="col" key={colInd} className={col.length >= 100 ? "table_admin-row--longText" : ""}>
                    {col /* Content */} 
                  </td>
                  )
                )}
              <td className='table_admin-row--button'>
                <button onClick={editFn}>✎</button>
              </td>
              <td className='table_admin-row--button'>
                <button onClick={removeFn}>🗑️</button>
              </td> 
             </tr> 
            ))
          }
        </tbody>
      </table>
    </div>
  )
}