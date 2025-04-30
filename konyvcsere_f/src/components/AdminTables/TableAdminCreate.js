import React from 'react'
import useApiContext from '../../contexts/ApiContext';

export default function TableAdminCreate({tHeadLabels, tBodyContent, removeFn, rowIdKey}) {    
  //console.log("cim:" + tHeadLabels + "\ntartalom:" + tBodyContent + "\neditfgv:" + editFn + "\ndelfgv:" + removeFn)
  const {adminRoleChange} = useApiContext(); 
  
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
                {!tBodyContent.some(row => 'full_name' in row) && (
                  <th scope="col">Törlés</th>
                )}
            </tr>
        </thead>

        <tbody>
          {
            tBodyContent.map((row, rowInd) => (
              <tr className='table_admin-row' key={rowInd}>
                {
                  Object.entries(row).map(([key, col], colInd) => (
                    <td key={colInd} className={typeof col === 'string' && col.length >= 25 ? "table_admin-row--longText" : ""}>
                      {key === "role" ? (
                        <select
                          defaultValue={col}
                          onChange={(e) => adminRoleChange(row.id, parseInt(e.target.value))}
                        >
                          <option value="0">Admin</option>
                          <option value="1">Felhasználó</option>
                          <option value="2">Inaktív felhasználó</option>
                        </select>
                      ) : key === "img_url" ? (
                        <img className='table_admin-row_image' alt='admin felület - rekord képe' src={
                            col
                              ? col.includes("http")
                                ? col
                                : `http://localhost:8000/${col}`
                              : 'http://localhost:8000/no_img.jpeg'
                          }
                        onError={(e) => {
                          e.target.onerror = null; // Végtelen ciklus elkerülése érdekében
                          e.target.src = 'http://localhost:8000/no_img.jpeg'
                        }}></img>
                      ) : (
                        col ? col : "-"
                      )}
                    </td>
                  ))
                }
                {
                  !tBodyContent.some(row => 'full_name' in row) && (
                    <td className='table_admin-row--button'>
                      <button onClick={() => removeFn(row[rowIdKey])}>töröl</button>
                    </td> 
                  )
                }
              
             </tr> 
            ))
          }
        </tbody>
      </table>
    </div>
  )
}