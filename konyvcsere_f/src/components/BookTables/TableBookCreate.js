import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import { ApiContext } from '../../contexts/ApiContext';

export default function TableBookCreate({bHeadLabels, bBodyContent, edit, remove}){
    const data=bHeadLabels.reduce((accumulator, label, index) => {
        accumulator[`key_${index}`]=label
        return accumulator
    }, {});

    return (
        <div className="row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            <table className="table table_bookadmin">
        <thead>
            <tr className="table_book-row_head">
                {
                    Object.entries(data).map(([key,value])=>(
                        <th key={key} scope="col">
                            {value}
                        </th>
                    ))
                }
                <th scope="col">Módosítás</th>
                <th scope="col">Törlés</th>
            </tr>
        </thead>
        <tbody>
                {
                    bBodyContent.map((row, rowId)=>(
                        <tr className="table_book-row" key={rowId}>
                            {
                                Object.values(row).map((col, colId)=>(
                                    <td scope="col" key={colId}>
                                        {col}
                                    </td>
                                ))
                            }
                            <td className='table_book-row--button'>
                                <button onClick={edit}>✎</button>
                            </td>
                            <td className='table_book-row--button'>
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