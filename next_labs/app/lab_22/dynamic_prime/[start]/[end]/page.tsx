import React from 'react'

async function Prime_Start_End({ params } : { params : Promise<{ start: string, end : string }>}) {
    const { start, end } = await params;

    function isPrime(num : number) : boolean {
        if ( num <= 1 ) return false;
        else if ( num === 2 ) return true;
        else if ( num % 2 === 0 ) return false;

        for(let i = 3; i * i <= num; i++) {
            if ( num % i === 0) return false;
        }

        return true
    }

    function primeNumbers(start : number, end : number) : number[]  {
        const result: number[] = [];

        for (let num = start; num <= end; num++) {
            if (isPrime(num)) result.push(num);
        }

        return result
    }

    return (
        <>
            <h2>Prime number between { start } and { end } </h2>
            <h3>{ primeNumbers(Number(start), Number(end)).join(' ') } </h3>
        </>
    )
}

export default Prime_Start_End