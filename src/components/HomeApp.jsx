import { Alert, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'

export const HomeApp = () => {
    const [rows, setrows] = useState([]);
    const [prestamo, setPrestamo] = useState('');
    const [cuotas, setCuotas] = useState('');
    const [tasaEfectiva, setTasaEfectiva] = useState([]);
    const [cuotaMensual, setCuotaMensual] = useState('');
    const calcularPlan = () => {
        let i = tasaEfectiva / 100;
        let r = prestamo * ((i * Math.pow(i + 1, cuotas)) / (Math.pow(1 + i, cuotas) - 1));
        setCuotaMensual(r);

        console.log(i);
        let arr = [];

        let amortizacion = 0;
        let saldo_final = prestamo;
        for (let x = 0; x < cuotas; x++) {
            let mes = x + 1;
            let saldo_inicial = parseFloat(saldo_final);
            let interes = i * saldo_inicial;
            amortizacion = r - interes;
            let couta = r;
            saldo_final = saldo_inicial - amortizacion;

            arr.push({
                mes, saldo_inicial, interes, amortizacion, couta, saldo_final
            })
        }
        setrows(arr);
    }
    return (
        <>
            <div className="container">
                <h1>CRONOGRAMA DE PAGOS - MÉTODO FRANCES</h1>
                <hr />
                <div className='row'>
                    <div className="col-md-5 px-2">
                        <TextField id="outlined-basic" value={prestamo} onChange={(e) => setPrestamo(e.target.value)} label="(P) Prestamo" variant="outlined" className='w-100' />
                        <TextField id="outlined-basic" value={cuotas} onChange={(e) => setCuotas(e.target.value)} label="(n) Cuotas mensuales" variant="outlined" className='w-100 mt-2' />
                        <TextField id="outlined-basic" value={tasaEfectiva} onChange={(e) => setTasaEfectiva(e.target.value)} label="(i) Tasa efectiva mensual" variant="outlined" className='w-100 mt-2' />
                        {
                            cuotaMensual ? (
                                <div>
                                    <Alert severity="success" className='mt-2'>
                                        <span className='fs-6'> P*(i*(i+1)<sup>n</sup>/(1+i)<sup>n</sup>-1) = S/. {cuotaMensual.toFixed(2)}</span><br />
                                    </Alert>
                                    <Alert severity="success" className='mt-2'>
                                        <span className='fs-6'> Valor de cuota mensual = S/. {cuotaMensual.toFixed(2)}</span>
                                    </Alert>
                                </div>
                            ) : ''
                        }


                        <div className="text-end">
                            <Button onClick={() => calcularPlan()} variant="contained" className='mt-2'>Calcular</Button>
                        </div>
                    </div>
                </div>
                <TableContainer component={Paper} className='mt-3'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Mes</TableCell>
                                <TableCell align="center">Saldo inicial</TableCell>
                                <TableCell align="center">Interés</TableCell>
                                <TableCell align="center">Amortización</TableCell>
                                <TableCell align="center">Cuota</TableCell>
                                <TableCell align="center">Saldo final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.mes}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.mes}
                                    </TableCell>
                                    <TableCell align="center">{ (row.saldo_inicial).toFixed(2)}</TableCell>
                                    <TableCell align="center">{row.interes.toFixed(2)}</TableCell>
                                    <TableCell align="center">{row.amortizacion.toFixed(2)}</TableCell>
                                    <TableCell align="center">{row.couta.toFixed(2)}</TableCell>
                                    <TableCell align="center">{row.saldo_final.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
            </div>
        </>
    )
}
