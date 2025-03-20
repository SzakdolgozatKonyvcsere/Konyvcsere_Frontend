import React from 'react'

export default function TableAdminCreate({tHeadLabels, tBodyContent, editFn, removeFn}) {    
  //console.log("cim:" + tHeadLabels + "\ntartalom:" + tBodyContent + "\neditfgv:" + editFn + "\ndelfgv:" + removeFn)
  return (
    <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <table className="table table_admin">
        <thead>
            <tr className='table_admin-row_head'>
                {
                  /*
                    Each key-value pair (
                      key :  value
                      key1: "label1",
                      key2: "label2", ...
                      ) 
                    is transformed into a <th> element.
                   */
                    tHeadLabels && Object.values(tHeadLabels).map((label, index) => (
                      <th key={index} scope="col">
                        {label}
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
                  <td key={colInd} className={col.length >= 25 ? "table_admin-row--longText" : ""}>
                    {col} 
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