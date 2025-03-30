import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Form, Button } from "react-bootstrap";

// !!!!!!! evjarat szuro nem resetelodik
// betumeret alkalmazkodjon az ablak merethez??
// ---foleg a modal ablakban
// mufaj alapjan kereses
// pl kiado, de kiirja az osszeset, de beiras utan kiadja a dolgokat amiket talal es arra lehet kattintani
// konyv feltolteskor kiirja ha valami nincs feltoltve, kotelezo kitoltendo mezok
// keresonel mindketton korvonal, de ne ilyen intenziv


const KonyvKeresRange = ({ range, setRange }) => {
    const [yearRange, setYearRange] = useState(range); 
    /*const [ertek, setErtek] = useState({
        min: min,
        max: max
    });*/
    // ha változik a csuszka értéke
    const handleSliderChange = (newRange) => {
        setYearRange(newRange);
        setRange(newRange); // Szülő komponensnek továbbadjuk az új értékeket
    };

    return (
        <div className="p-3 border rounded bg-light">
            <h5>Évjárat szűrő</h5>
            <Form.Group className="mb-3">
                <Form.Label>Válassz egy évjárat tartományt:</Form.Label>
                <Slider 
                    range 
                    min={1930} 
                    max={new Date().getFullYear()} 
                    step={1} 
                    value={yearRange}
                    onChange={handleSliderChange}
                />
                <div className="d-flex justify-content-between mt-2">
                    <span>{yearRange[0]}</span> 
                    <span>{yearRange[1]}</span>
                </div>
            </Form.Group>

            
        </div>
    );
};

export default KonyvKeresRange;