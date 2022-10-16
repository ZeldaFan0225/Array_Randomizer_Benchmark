function shuffle1(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function shuffle2(array) {
    return array.sort(() => Math.random()-0.5)
}

const benchmarkFunctions = [
    shuffle1,
    shuffle2
]

const probe = [
    "0",
    "1",
    "2", 
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
]

const results = Array.from({length: benchmarkFunctions.length}, () => ({}))
const deviation = Array.from({length: benchmarkFunctions.length}, () => ({}))
const runs = 1000000
let index = 0

for(const fn of benchmarkFunctions) {
    console.log(`Testing function ${index+1}...`)
    for(let i = 0; i < runs; ++i) {
        const shuffled = fn(probe)
        if(shuffled.join("") === "length") console.log("length")
        results[index][shuffled.join("")] = (results[index][shuffled.join("")] || 0) + 1
        if(i % 100000 === 0) console.log(`Finished iteration ${i}/${runs}`)
    }

    console.log(`Done testing function ${index+1}`)

    const res = results[index]
    const N = Object.keys(res).length
    const avg = Object.values(res).reduce((a, b) => a+b)/N
    deviation[index] = Math.sqrt(((Object.values(res).map(v => (v-avg)).reduce((a, b) => a+b))**2) / N);
    ++index
}

console.log("Calculating results...")
console.log(`\n\n\nIterations: ${runs}\nTest Data length: ${probe.length}\nAmount of functions tested: ${benchmarkFunctions.length}\nFunctions ranked by deviation:\n${deviation.map((d, i) => ({d, f: benchmarkFunctions[i].name})).sort((a, b) => a.d-b.d).map(d => `${d.f} - ${d.d}`).join("\n")}\n\n` + results.map((r, i) => `Function: ${benchmarkFunctions[i].name}\nStandard Deviation: ${deviation[i]}\nPopulation Size:${Object.keys(r).length}\nTop random results:\n${Object.entries(r).sort(([_, a],[__, b]) => b-a).slice(0, 10).map(([k, v]) => `${k} - ${v}`).join("\n")}`).join("\n\n\n"))
