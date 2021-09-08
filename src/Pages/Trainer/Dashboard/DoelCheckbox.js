import React, { useState } from "react";

const DoelCheckbox = () => {
const [doel, setDoel] = useState([
    {id: 1, value: "MaSelecteer een doelle", isChecked: false},
    {id: 2, value: "Fat Burning - Afvallen voor vrouwen", isChecked: false},
    {id: 3, value: "Fat Ripping - Afvallen voor mannen", isChecked: false},
    {id: 4, value: "Muscle Shaping - Spieropbouw voor vrouwen", isChecked: false},
    {id: 5, value: "Muscle Building - Spieropbouw voor mannen", isChecked: false},
    {id: 6, value: "Mommy - Verantwoord fit worden", isChecked: false},
    {id: 7, value: "Pregnancy - Verantwoord fit blijven", isChecked: false},
    {id: 8, value: "Running - Verbeteren van hardloopprestaties", isChecked: false},
    {id: 9, value: "Obstacle Running - Verbeteren van prestatie", isChecked: false},
]);



    return (
        <>
<label className="text-muted">DOEL</label>



{/* 


<select className="form-control" name="doel" value={doel} onChange={handleChange}>
    <option name="MaSelecteer een doelle" value="Selecteer een doel">Selecteer een doel</option>
    <option name="Fat Burning - Afvallen voor vrouwen" value="Fat Burning - Afvallen voor vrouwen">Fat Burning - Afvallen voor vrouwen</option>
    <option name="Fat Ripping - Afvallen voor mannen" Value="Fat Ripping - Afvallen voor mannen">Fat Ripping - Afvallen voor mannen</option>
    <option name="Muscle Shaping - Spieropbouw voor vrouwen" value="Muscle Shaping - Spieropbouw voor vrouwen">Muscle Shaping - Spieropbouw voor vrouwen</option>
    <option name="Muscle Building - Spieropbouw voor mannen" value="Muscle Building - Spieropbouw voor mannen">Muscle Building - Spieropbouw voor mannen</option>
    <option name="Mommy - Verantwoord fit worden" value="Mommy - Verantwoord fit worden">Mommy - Verantwoord fit worden</option>
    <option name="Pregnancy - Verantwoord fit blijven" value="Pregnancy - Verantwoord fit blijven">Pregnancy - Verantwoord fit blijven</option>
    <option name="Running - Verbeteren van hardloopprestaties" value="Running - Verbeteren van hardloopprestaties">Running - Verbeteren van hardloopprestaties</option>
    <option name="Obstacle Running - Verbeteren van prestaties" value="Obstacle Running - Verbeteren van prestaties">Obstacle Running - Verbeteren van prestaties</option>
</select>
*/}
        </>
    )
}

export default DoelCheckbox;